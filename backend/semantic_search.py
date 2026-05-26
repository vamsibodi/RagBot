# semantic_search.py

import os

from dotenv import load_dotenv

# Latest HuggingFace Embeddings
from langchain_huggingface import HuggingFaceEmbeddings

# FAISS
from langchain_community.vectorstores import FAISS

# Cosine Similarity
from sklearn.metrics.pairwise import cosine_similarity


def semantic_search():

    print("Starting Semantic Search...\n")

    # Load ENV
    load_dotenv()

    try:

        # Current Folder
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))

        # FAISS DB Path
        faiss_path = os.path.join(BASE_DIR, "faiss_index")

        print("Loading Embedding Model...")

        # Embedding Model
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        print("Embedding Model Loaded!")

        # Load FAISS Database
        print("\nLoading FAISS Vector Database...")

        vectorstore = FAISS.load_local(
            faiss_path,
            embeddings,
            allow_dangerous_deserialization=True
        )

        print("FAISS Database Loaded Successfully!")

        # User Query
        query = input("\nEnter Your IT Support Question: ")

        # Convert Query to Embedding
        print("\nGenerating Query Embedding...")

        query_embedding = embeddings.embed_query(query)

        # Semantic Search
        print("\nPerforming Semantic Search...\n")

        results = vectorstore.similarity_search_with_score(
            query,
            k=3
        )

        # Print Results
        for index, (doc, score) in enumerate(results):

            print("=" * 70)
            print(f"Result {index + 1}")
            print("=" * 70)

            print("\nDocument Content:\n")
            print(doc.page_content)

            print("\nFAISS Distance Score:")
            print(score)

            # Document Embedding
            doc_embedding = embeddings.embed_query(
                doc.page_content
            )

            # Cosine Similarity
            similarity = cosine_similarity(
                [query_embedding],
                [doc_embedding]
            )[0][0]

            print("\nCosine Similarity Score:")
            print(round(similarity, 4))

            print("\n")

    except Exception as e:

        print("\nERROR OCCURRED:")
        print(str(e))


if __name__ == "__main__":
    semantic_search()