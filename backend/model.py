import os
import json
from unittest import result
import openai
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from prompt_text import data, ai_mode
from utils import create_model, split_data

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

class AI_Model:
    
    def __init__(self, lecture_data, temperature=0.0) -> None:
        llm = create_model(temperature)
        vectorstore = split_data(lecture_data)
        self.qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=vectorstore.as_retriever(),
        )
        self.chat_history = []
    
    def answer_question(self, question):
        result = self.qa_chain({"query": question, "chat_history": self.chat_history})
        self.chat_history.append((question, result['result']))
        return result['result']
    
    def generate_notes(self):
        prompt = ai_mode["notes"]
        result = self.qa_chain({"query": prompt, "chat_history": self.chat_history})
        self.chat_history.append(("Create Notes", result['result']))
        return result['result']
    
    def generate_quiz(self):
        prompt = ai_mode["quiz"]
        iters = 3
        while iters > 0:
            iters -= 1
            try:
                result = self.qa_chain({"query": prompt, "chat_history": self.chat_history})
                quiz = json.loads(result['result'])
                self.chat_history.append(("Generate a quiz", result['result']))
                return quiz
            except:
                print("Failed iteration")
                continue
        
        raise Exception("There was a problem in generating the quiz.")


def runner():
    question = "What is the time complexity of removing from the front of an arraylist?"
    model = AI_Model("".join(data), 0.6)
    # quiz = model.generate_quiz()
    # print(quiz)
    # print(len(quiz))
    # ans = model.answer_question(question)
    # print(ans)
    notes = model.generate_notes()
    print(notes)

runner()