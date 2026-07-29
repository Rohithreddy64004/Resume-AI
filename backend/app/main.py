from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os, stripe

from app.database import Base, engine, get_db
from app.models import User
from app.schemas import UserCreate, UserLogin
from app.auth import hash_password, verify_password, create_token, get_current_user
from app.resume import router as resume_router
from app.stripe_payment import create_checkout

# Initialize DB Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ResumeAI Production API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)

@app.get("/")
def root():
    return {
        "message": "ResumeAI backend is running",
        "status": "healthy"
    }

@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/signup")
def signup(u: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == u.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")
    db.add(User(email=u.email, password=hash_password(u.password)))
    db.commit()
    return {"msg": "Success"}

@app.post("/login")
def login(u: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == u.email).first()
    if not user or not verify_password(u.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": create_token({"user_id": user.id}), "token_type": "bearer"}

@app.get("/users/me")
def me(user: User = Depends(get_current_user)):
    return {
        "email": user.email, 
        "plan": user.plan, 
        "reviews_used": len(user.reviews)
    }

@app.post("/create-checkout-session")
def checkout(user: User = Depends(get_current_user)):
    url = create_checkout(user.id, user.email)
    return {"url": url}

@app.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.getenv("STRIPE_WEBHOOK_SECRET")
        )
    except Exception as e:
        return {"error": "Invalid signature"}

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Retrieve user_id from metadata we sent in stripe_payment.py
        user_id = session.get('metadata', {}).get('user_id')
        
        if user_id:
            user = db.query(User).filter(User.id == int(user_id)).first()
            if user:
                user.plan = "PRO" # This unlocks unlimited reviews
                db.commit()
                print(f"User {user_id} successfully upgraded to PRO via Stripe.")

    return {"status": "success"}