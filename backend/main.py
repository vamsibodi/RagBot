from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from retrieval_service import retrieve_answer

# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI()

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# REQUEST MODEL
# ==========================================

class QueryRequest(BaseModel):
    question: str

# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():

    return {
        "message": "RAG API Running"
    }

# ==========================================
# CHAT API
# ==========================================

@app.post("/chat")
async def chat(request: QueryRequest):

    try:

        answer = retrieve_answer(
            request.question
        )

        return {
            "answer": answer
        }

    except Exception as e:

        return {
            "error": str(e)
        }