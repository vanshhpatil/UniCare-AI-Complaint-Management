import pandas as pd
import joblib
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

df = pd.read_csv("data/complaints.csv")

X = df["text"]
y_priority = df["priority"]
y_category = df["category"]

def train_and_save(y, path):
    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer(stop_words="english", max_features=5000)),
        ("clf", LogisticRegression(max_iter=1000))
    ])
    pipeline.fit(X, y)
    joblib.dump(pipeline, path)

train_and_save(y_priority, "model/priority_model.pkl")
train_and_save(y_category, "model/category_model.pkl")

print("✅ Priority & Category models trained")
