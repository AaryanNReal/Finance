from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this if your frontend runs on a different port
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

class FinancialData(BaseModel):
    income: float
    expenses: float
    savings: float
    investment: float
    debt: float
    financialGoals: str
    riskTolerance: str

@app.post("/generate-report")
async def generate_report(financial_data: FinancialData):
    # Create a financial report
    report = f"""
    Financial Report:
    1. Your Income: ${financial_data.income}
    2. Your Expenses: ${financial_data.expenses}
    3. Your Savings: ${financial_data.savings}
    4. Your Investments: ${financial_data.investment}
    5. Your Debt: ${financial_data.debt}
    6. Your Financial Goals: {financial_data.financialGoals}
    7. Risk Tolerance Level: {financial_data.riskTolerance}

    Advice:
    - Try to increase savings and reduce unnecessary expenses.
    - Consider paying off your debt before making more investments.
    - Align your investments with your financial goals and risk tolerance.
    """

    return {"report": report}
