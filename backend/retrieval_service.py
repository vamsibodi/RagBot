from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document

# ==========================================
# FAQ DATA
# ==========================================

faq_data = [
    {
        "question": "What are office hours?",
        "answer": "Office hours are Monday to Friday, 9 AM to 6 PM."
    },
    {
        "question": "How do I reset my password?",
        "answer": "Go to login page, click Forgot Password, enter your email, check inbox for reset link."
    },
    {
        "question": "How do I apply for leave?",
        "answer": "Login to HR portal, go to Leave section, select dates, submit for manager approval."
    },
    {
        "question": "What is the WiFi password?",
        "answer": "Corporate WiFi name is CorpNet. Contact IT helpdesk for password at helpdesk@company.com."
    },
    {
        "question": "How do I contact HR?",
        "answer": "Email hr@company.com or call extension 1001 during office hours."
    },
    {
        "question": "What is the work from home policy?",
        "answer": "Employees can work from home 2 days per week with manager approval."
    },
    {
        "question": "How do I submit an expense report?",
        "answer": "Login to finance portal, click Expenses, fill the form, attach receipts, submit for approval."
    },
    {
        "question": "What is the dress code?",
        "answer": "Business casual Monday to Thursday. Casual Friday allowed."
    },
    {
        "question": "How do I book a meeting room?",
        "answer": "Use the Room Booking app on intranet or email admin@company.com with date and time."
    },
    {
        "question": "Who do I contact for IT issues?",
        "answer": "Contact IT helpdesk at helpdesk@company.com or extension 1234, available 8 AM to 8 PM."
    },
    {
        "question": "What is the annual leave entitlement?",
        "answer": "Full-time employees get 20 days annual leave per year plus public holidays."
    },
    {
        "question": "How do I access the company VPN?",
        "answer": "Download Cisco AnyConnect from IT portal, enter vpn.company.com, use your company credentials."
    },
    {
        "question": "What health benefits are available?",
        "answer": "Company provides medical, dental and vision insurance. Contact HR for full details."
    },
    {
        "question": "How do I update my personal information?",
        "answer": "Login to HR portal, go to My Profile, click Edit, update your information and save."
    },
    {
        "question": "What is the notice period for resignation?",
        "answer": "Standard notice period is 30 days. Senior roles may require 60 days."
    }
]

# ==========================================
# CREATE DOCUMENTS
# ==========================================

documents = []

for item in faq_data:

    documents.append(
        Document(
            page_content=item["question"],
            metadata={
                "answer": item["answer"]
            }
        )
    )

# ==========================================
# EMBEDDINGS
# ==========================================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ==========================================
# VECTOR STORE
# ==========================================

vectorstore = FAISS.from_documents(
    documents,
    embeddings
)

# ==========================================
# RETRIEVAL FUNCTION
# ==========================================

def retrieve_answer(question: str):

    results = vectorstore.similarity_search(
        question,
        k=1
    )

    if results:

        return results[0].metadata["answer"]

    return "No answer found."