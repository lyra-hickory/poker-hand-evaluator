from fastapi import FastAPI, Response, status

from CardModel import Card, CardValueEnum

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Submit your hand to /eval-hand/ in order to have it evaluated. "
                       "Check out the docs for more information at /docs/"}

@app.post("/eval-hand/")
async def evaluate(cards: list[Card], response: Response):
    for c in cards:
        if c.value_as_int is None:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return f'Invalid value given for {c}. Values must conform to {CardValueEnum.__dict__['_member_names_']}'
    return cards
