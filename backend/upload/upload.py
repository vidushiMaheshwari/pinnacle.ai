# convert PDF to text and send it to MongoDB
def file_to_data(file_paths):
    data = []
    for file_path in file_paths:
        loader = PyPDFLoader(file_path)
        data  += loader.load() 
    return data