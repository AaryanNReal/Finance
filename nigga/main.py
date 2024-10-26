import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM, AutoProcessor, AutoModelForTextToWaveform
from fastapi.middleware.cors import CORSMiddleware

# Load model and tokenizer
model_name = "meta-llama/Llama-3.2-1B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Load text-to-speech model and processor
speech_model_name = "suno/bark"
speech_processor = AutoProcessor.from_pretrained(speech_model_name)
speech_model = AutoModelForTextToWaveform.from_pretrained(speech_model_name)

# Set device (CPU or GPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
speech_model.to(device)

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextGenerationRequest(BaseModel):
    prompt: str
    max_length: int = 500
    temperature: float = 0.1

class SpeechRequest(BaseModel):
    text: str

@app.post("/generate-text")
async def generate_text(request: TextGenerationRequest):
    try:
        inputs = tokenizer(request.prompt, return_tensors="pt").to(device)
        attention_mask = torch.ones(inputs["input_ids"].shape, device=device)

        with torch.no_grad():
            outputs = model.generate(
                inputs["input_ids"],
                attention_mask=attention_mask,
                max_length=request.max_length,
                num_return_sequences=1,
                temperature=request.temperature,
                pad_token_id=tokenizer.eos_token_id
            )

        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return {"generated_text": generated_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-speech")
async def generate_speech(request: SpeechRequest):
    try:
        inputs = speech_processor(request.text, return_tensors="pt").to(device)

        with torch.no_grad():
            audio = speech_model.generate(**inputs)

        # Return the generated audio (handle encoding/decoding as needed)
        return {"audio": audio}  # You might want to convert audio to a suitable format (like WAV)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Text generation API is running!"}
