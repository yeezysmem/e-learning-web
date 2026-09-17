import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

app = FastAPI(title="SkillUp AI Mentor Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-2-preview",
    google_api_key=os.getenv("GEMINI_API_KEY"),
)

vectorstore = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings
)
retriever = vectorstore.as_retriever(search_kwargs={"k": 1})

llm = ChatGoogleGenerativeAI(
    model="gemini-3.6-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.3
)

system_prompt = (
    "You are an AI Mentor for the SkillUp learning platform.\n"
    "Your goal is to help students understand and complete their programming tasks.\n"
    "Rules:\n"
    "1. Use the PROVIDED CONTEXT to validate the student's code and query.\n"
    "2. Provide clear hints and point out logical or syntax errors.\n"
    "3. NEVER provide a fully working final solution—guide the student toward the correct answer.\n\n"
    "LESSON CONTEXT & CRITERIA:\n{context}"
)

prompt_template = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "Student Code:\n```javascript\n{user_code}\n```\nQuestion: {prompt}")
])

class RAGPromptRequest(BaseModel):
    prompt: str
    user_code: str = ""

@app.post("/api/generate-text/")
async def generate_text(request: RAGPromptRequest):
    try:
        search_query = f"{request.prompt} {request.user_code}"
        docs = retriever.invoke(search_query)
        
        context_text = docs[0].page_content if docs else "General JavaScript knowledge."

        formatted_prompt = prompt_template.format_messages(
            context=context_text,
            user_code=request.user_code,
            prompt=request.prompt
        )
        
        # Generate feedback via Gemini API
        ai_response = llm.invoke(formatted_prompt)
        
        return {
            "response": ai_response.content,
            "matched_chapter": docs[0].metadata.get("title") if docs else None
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
