# main.py

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np  # Required for handling NaN/Inf
from io import BytesIO

app = FastAPI()

# CORS middleware to allow requests from the React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Read the uploaded Excel file into a BytesIO object
        contents = await file.read()
        df = pd.read_excel(BytesIO(contents))

        # Clean the data: Replace NaN and Infinity with None
        df = df.replace({np.nan: None})  # Fixes "fill 'value' or 'method'" error
        df = df.replace([np.inf, -np.inf], None)  # Replace Infinity with None

        # Convert the DataFrame to a list of dictionaries
        data = df.to_dict(orient='records')

        return JSONResponse(content={"data": data})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Formula Builder Tool API!"}