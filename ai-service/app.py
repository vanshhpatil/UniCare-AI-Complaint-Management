from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

priority_model = joblib.load("model/priority_model.pkl")
category_model = joblib.load("model/category_model.pkl")

class Complaint(BaseModel):
    text: str

@app.post("/predict")
def predict(data: Complaint):
    text = data.text.strip()

    priority = priority_model.predict([text])[0]
    category = category_model.predict([text])[0]

    return {
        "priority": str(priority),
        "category": str(category)
    }
