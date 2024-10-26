from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# Allow CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Responses(BaseModel):
    responses: list[str]

@app.get("/get_question/{index}")
async def get_question(index: int):
    questions = [
        "What is your total debt?",
        "How much do you save each month?",
        "What are your monthly expenses?",
        "What are your financial goals?",
        "Do you have any investments?",
        "What is your income?",
        "Do you have an emergency fund?",
        "What is your current job situation?",
        "How do you manage your budget?",
        "Are you planning any major purchases?"
    ]
    if 0 <= index < len(questions):
        return {"question": questions[index]}
    raise HTTPException(status_code=404, detail="Question not found")

@app.post("/generate_report/")
async def generate_report(responses: Responses):
    # Generate report (mockup logic; replace with real analysis)
    report = "Based on your responses, here is your financial report."
    
    # Example chart data; replace with real data processing logic
    chart_data = {
        "labels": ["Debt", "Savings", "Expenses"],
        "values": [3000, 2000, 1500]  # Sample data
    }
    
    # Generate detailed text-based advice (example logic)
    advice = generate_financial_advice(responses.responses)
    detailed_report = generate_detailed_report(responses.responses)

    return {
        "report": report,
        "detailedReport": detailed_report,  # Detailed text report
        "chartData": chart_data,
        "advice": advice
    }

def generate_financial_advice(responses):
    advice = []

    if responses[0].isdigit() and int(responses[0]) > 0:  # Total debt
        advice.append("Consider consolidating your debt to reduce interest rates.")
    
    if responses[1].isdigit() and int(responses[1]) > 0:  # Savings
        advice.append("Great job saving! Aim to save at least 20% of your income.")
    
    if responses[2].isdigit() and int(responses[2]) > 0:  # Expenses
        advice.append("Review your monthly expenses and identify areas to cut back.")
    
    return " ".join(advice)

def generate_detailed_report(responses):
    detailed_report = []

    if responses[0].isdigit():
        detailed_report.append(f"Your total debt is ${responses[0]}. It's important to keep this in check.")
    
    if responses[1].isdigit():
        detailed_report.append(f"You save ${responses[1]} each month, which is a solid practice.")
    
    if responses[2].isdigit():
        detailed_report.append(f"Your monthly expenses are ${responses[2]}, consider tracking them for better management.")
    
    return " ".join(detailed_report)  # Join detailed report into a single string
