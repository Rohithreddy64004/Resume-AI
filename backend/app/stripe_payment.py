import stripe
import os
from fastapi import HTTPException

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

def create_checkout(user_id: int, email: str):
    try:
        session = stripe.checkout.Session.create(
            customer_email=email,
            payment_method_types=['card'],
            line_items=[{
                'price': os.getenv('STRIPE_PRICE_ID'),
                'quantity': 1,
            }],
            mode='subscription',
            # Query params tell the React Dashboard to show the success message
            success_url="http://localhost:5173/dashboard?payment=success",
            cancel_url="http://localhost:5173/dashboard?payment=cancelled",
            metadata={"user_id": str(user_id)}
        )
        return session.url
    except Exception as e:
        print(f"Stripe Error: {e}")
        raise HTTPException(status_code=400, detail="Stripe configuration error.")