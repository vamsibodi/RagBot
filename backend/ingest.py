import os

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# ==========================================
# READ FAQ FILE
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

file_path = os.path.join(
    BASE_DIR,
    "company_faq.txt"
)

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

print("FAQ Loaded!")

# ==========================================
# SPLIT FAQ USING EMPTY LINES
# ==========================================

documents = text.split("\n\n")

documents = [
    doc.strip()
    for doc in documents
    if doc.strip()
]

print("Documents:", len(documents))

# ==========================================
# LOAD EMBEDDING MODEL
# ==========================================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

print("Embeddings Loaded!")

# ==========================================
# CREATE FAISS INDEX
# ==========================================

db = FAISS.from_texts(
    documents,
    embeddings
)

# ==========================================
# SAVE INDEX
# ==========================================

db.save_local("faiss_index")

print("FAISS Index Saved!")