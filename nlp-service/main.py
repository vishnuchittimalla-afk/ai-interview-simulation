
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI(title="Interview NLP Evaluation Service")


class EvaluationRequest(BaseModel):
    candidate_answer: str
    reference_answer: str


@app.get("/")
def home():
    return {
        "success": True,
        "message": "Interview NLP Service is running"
    }


@app.post("/evaluate")
def evaluate_answer(request: EvaluationRequest):
    candidate_answer = request.candidate_answer.strip()
    reference_answer = request.reference_answer.strip()

    if not candidate_answer or not reference_answer:
        return {
            "success": False,
            "message": "Both answers are required"
        }

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(
        [candidate_answer, reference_answer]
    )

    similarity = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )[0][0]

    similarity_score = round(float(similarity) * 100, 2)

    return {
        "success": True,
        "similarity_score": similarity_score,
        "method": "TF-IDF + Cosine Similarity"
    }
