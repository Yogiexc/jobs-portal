import torch
from torch.nn.functional import cosine_similarity
from typing import List, Dict

def find_top_matches(source_embedding: List[float], targets: List[Dict], top_k: int = 5) -> List[Dict]:
    """
    Calculate cosine similarity between a source vector and a list of target vectors.
    Returns the top_k targets sorted by highest score.
    """
    if not targets:
        return []

    # Convert to pure tensors
    src_tensor = torch.tensor(source_embedding).unsqueeze(0) # [1, 384]
    
    # Process targets
    target_tensors = torch.tensor([t["embedding"] for t in targets]) # [N, 384]
    
    # Compute similarity efficiently
    similarities = cosine_similarity(src_tensor, target_tensors)
    
    # Pair ID with score
    results = []
    for i, score in enumerate(similarities):
        results.append({
            "id": targets[i]["id"],
            "score": round(float(score), 4)
        })
        
    # Sort descending by score
    results.sort(key=lambda x: x["score"], reverse=True)
    
    return results[:top_k]
