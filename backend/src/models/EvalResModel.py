from pydantic import BaseModel

class EvaluateResponse(BaseModel):
    playingHand:list[str] = []
    kickers:list[str] = []
    rank:str = ''
