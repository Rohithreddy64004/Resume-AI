from app.models import ResumeEmbedding
from app.embeddings import create_embedding

def store_resume_embeddings(db, resume_id, text):
    # Split text into chunks
    chunks = [text[i:i+700] for i in range(0, len(text), 600)]
    for chunk in chunks:
        vector = create_embedding(chunk)
        db.add(ResumeEmbedding(
            resume_id=resume_id, 
            content=chunk, 
            embedding=vector
        ))
    db.commit()

def similarity_search(db, query, top_k=3):
    vector = create_embedding(query)
    # pgvector still handles the math, but the vector is generated via TF-IDF math
    results = db.query(ResumeEmbedding).order_by(
        ResumeEmbedding.embedding.cosine_distance(vector)
    ).limit(top_k).all()
    
    if not results:
        return "No historical context found."
        
    return "\n\n".join([r.content for r in results])