from fastapi import FastAPI

from CardModel import Card

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Submit your hand to /eval-hand/ in order to have it evaluated. "
                       "Check out the docs for more information at /docs/"}

@app.post("/eval-hand/")
async def evaluate(cards: list[Card]):
    return cards
