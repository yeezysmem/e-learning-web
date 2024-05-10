import openai

openai.api_key = 'pk-ZEdsByaTwSOuLxLdcBZnxVglrGdQEiCKTUosWRHULGYsUCwJ'
openai.base_url = "http://localhost:3040/v1/"

completion = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "How do I list all files in a directory using Python?"},
    ],
)

print(completion)