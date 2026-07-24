import numpy as np
from sklearn.feature_extraction.text import HashingVectorizer

# We use HashingVectorizer because it doesn't require a pre-trained model
# and uses pure math to create a 384-length vector.
vectorizer = HashingVectorizer(n_features=384)

def create_embedding(text: str):
    try:
        if not text.strip():
            return [0.0] * 384
            
        # Pure mathematical transformation
        vec = vectorizer.transform([text]).toarray()[0]
        return vec.tolist()
    except Exception as e:
        print(f"Math Vector Error: {e}")
        return [0.0] * 384