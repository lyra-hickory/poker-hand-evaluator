from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware

from .evaluate_hand import evaluate_hand
from .models.CardModel import Card

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Submit your hand to /eval-hand/ in order to have it evaluated. "
                       "Check out the docs for more information at /docs/"}

# TODO: Test the api endpoint
@app.post("/eval-hand/")
async def evaluate(cards: list[Card], response: Response):
    # Validate the cards input
    # Valid amount of cards?
    if len(cards) != 5:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return f'Invalid amount of cards given, 5 cards are expected.'
    # Valid values?
    for c in cards:
        if c.value_as_int is None:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return f'Invalid value given for {c}. Values must conform to {c.valid_value_keys}...'
    # Evaluate our hand and return as response
    return evaluate_hand(cards)
