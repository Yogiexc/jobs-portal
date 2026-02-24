from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from embedding import generate_embedding
from matching import find_top_matches

app = FastAPI(
    title="DIGITEFA AI Recommendation Service",
    description="Microservice for processing text into embeddings and performing vector similarity matching.",
    version="1.0.0"
)

class TextPayload(BaseModel):
    text: str

class EmbeddingResponse(BaseModel):
    embedding: List[float]

class MatchTarget(BaseModel):
    id: str
    embedding: List[float]

class MatchRequest(BaseModel):
    source_embedding: List[float]
    targets: List[MatchTarget]
    top_k: int = 5

class MatchResult(BaseModel):
    id: str
    score: float

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/embed", response_model=EmbeddingResponse)
def embed_text(payload: TextPayload):
    try:
        vector = generate_embedding(payload.text)
        return {"embedding": vector}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend", response_model=List[MatchResult])
def recommend(payload: MatchRequest):
    try:
        results = find_top_matches(
            source_embedding=payload.source_embedding,
            targets=[{"id": t.id, "embedding": t.embedding} for t in payload.targets],
            top_k=payload.top_k
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
