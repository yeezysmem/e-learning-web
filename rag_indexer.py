import os
import psycopg2
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.documents import Document

load_dotenv()

# Gemini Embeddings
embeddings = GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-2-preview",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

def index_chapters_to_rag():
    DATABASE_URL = os.getenv("DATABASE_URL")
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    query = """
        SELECT 
            c.id, 
            c.title, 
            c.description, 
            c."taskDescription", 
            c."taskCriteria", 
            c."codeSnippet", 
            c.explanation,
            co.title AS course_title
        FROM "Chapter" c
        JOIN "Course" co ON c."courseId" = co.id
        WHERE c."isPublished" = true;
    """
    
    cursor.execute(query)
    chapters = cursor.fetchall()
    
    documents = []
    for chap_id, title, desc, task_desc, criteria, snippet, explanation, course_title in chapters:
        content_parts = [
            f"Course: {course_title}",
            f"Chapter: {title}",
            f"Theory: {desc or ''}",
            f"Task: {task_desc or ''}",
            f"Evaluation Criteria: {criteria or ''}",
            f"Reference Solution: {snippet or ''}",
            f"Explanation: {explanation or ''}"
        ]
        
        full_content = "\n".join(part for part in content_parts if part)
        
        doc = Document(
            page_content=full_content,
            metadata={"chapter_id": str(chap_id), "title": title}
        )
        documents.append(doc)
        
    cursor.close()
    conn.close()

    if documents:
        vectorstore = Chroma.from_documents(
            documents=documents,
            embedding=embeddings,
            persist_directory="./chroma_db"
        )
        print(f"Successfuly indexed {len(documents)} chapter from Gemini API to ChromaDB!")
    else:
        print("We can't find any chapter.")

if __name__ == "__main__":
    index_chapters_to_rag()
