from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import g4f

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a data model for the request body
class PromptRequest(BaseModel):
    prompt: str

@app.post("/api/generate-text/")
async def generate_text(request: PromptRequest):
    # Use g4f to get a response with 'model' and 'messages'
    response = g4f.ChatCompletion.create(
        provider=g4f.Provider.You,
        model="gpt-3.5-turbo",  # Replace with the correct model name
        messages=[{"role": "user", "content": request.prompt}]
    )
    return {"response": response}
