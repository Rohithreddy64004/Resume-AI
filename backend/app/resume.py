from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from PyPDF2 import PdfReader
from datetime import datetime
import io, hashlib

from app.database import get_db
from app.auth import get_current_user
from app.ai import analyze_resume_ai
from app.rag import similarity_search, store_resume_embeddings
from app.models import Review, User, Resume

router = APIRouter()

@router.post("/analyze")
async def analyze(
    resume: UploadFile = File(...), 
    job_description: str = Form(...), 
    db: Session = Depends(get_db), 
    user: User = Depends(get_current_user)
):
    # 1. PLAN GATING
    if user.plan == "FREE":
        today = datetime.utcnow().date()
        usage = db.query(Review).filter(Review.user_id == user.id, Review.created_at >= today).count()
        if usage >= 3: 
            raise HTTPException(status_code=403, detail="Free limit reached. Upgrade to Pro.")

    # 2. PDF PROCESSING
    if not resume.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Please upload a PDF file.")

    content = await resume.read()
    file_hash = hashlib.sha256(content).hexdigest()

    # 3. KNOWLEDGE BASE & EXTRACTION
    db_resume = db.query(Resume).filter(Resume.file_hash == file_hash, Resume.user_id == user.id).first()
    
    if db_resume:
        resume_text = db_resume.extracted_text
    else:
        try:
            pdf = PdfReader(io.BytesIO(content))
            resume_text = ""
            for page in pdf.pages:
                resume_text += page.extract_text() or ""
            
            if len(resume_text.strip()) < 50:
                raise ValueError("PDF is unreadable or contains too little text.")

            new_resume = Resume(user_id=user.id, filename=resume.filename, file_hash=file_hash, extracted_text=resume_text)
            db.add(new_resume)
            db.commit()
            db.refresh(new_resume)
            
            # Index for RAG
            store_resume_embeddings(db, new_resume.id, resume_text)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"PDF Error: {str(e)}")

    # 4. RAG & AI
    context = similarity_search(db, job_description)
    result = analyze_resume_ai(resume_text, job_description, context)

    # 5. SAVE REVIEW
    new_review = Review(user_id=user.id, score=result.get('score', 0), feedback=result)
    db.add(new_review)
    db.commit()
    
    return result