from sentence_transformers import SentenceTransformer

# Load model once on startup
model_name = "sentence-transformers/all-MiniLM-L6-v2"
model = SentenceTransformer(model_name)

def generate_embedding(text: str) -> list[float]:
    """
    Generate an embedding vector for the provided text using MiniLM.
    Returns a 384-dimensional list of floats.
    """
    # encode() returns a numpy array, we convert to python list
    embedding = model.encode(text)
    return embedding.tolist()
