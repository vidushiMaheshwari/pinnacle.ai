from langchain.document_loaders import PyPDFLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain import hub
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def split_data(data):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 0)
    all_splits = text_splitter.split_text(data)
    print(all_splits)
    vectorstore = Chroma.from_texts(all_splits, embedding=OpenAIEmbeddings())
    return vectorstore

def create_model(temperature = 0):
    prompt = hub.pull("rlm/rag-prompt")
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=temperature)
    return llm

def string_to_pdf(text):
    # Generate a unique filename based on the current date and time
    filename = f"Notes.pdf"
    
    # Specify the file name and the page size
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter

    # Choose a font and size for the text
    c.setFont("Helvetica", 12)

    # Add the string text to the PDF
    c.drawString(100, height - 100, text)

    # Save the PDF file
    c.save()
    print(f"PDF created successfully: {filename}")

