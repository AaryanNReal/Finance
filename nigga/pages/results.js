import Chart from '../components/Chart';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Results = () => {
    const router = useRouter();
    const { income, expenses, savings, investment, debt, financialGoals, riskTolerance } = router.query;
    const username = "user";

    const [financialReport, setFinancialReport] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const generateReport = async () => {
            try {
                if (!income || !expenses || !savings || !investment || !debt || !financialGoals || !riskTolerance) {
                    throw new Error('Some financial data is missing.');
                }

                const payload = {
                    income: parseFloat(income),
                    expenses: parseFloat(expenses),
                    savings: parseFloat(savings),
                    investment: parseFloat(investment),
                    debt: parseFloat(debt),
                    financialGoals,
                    riskTolerance,
                };

                // Send POST request to the backend to generate the financial report
                const response = await fetch('http://localhost:8000/generate-report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch the financial report: ${response.status} ${response.statusText} - ${errorText}`);
                }

                const data = await response.json();
                setFinancialReport(data.report);
            } catch (error) {
                console.error('Error generating report:', error);
                setError('Failed to generate financial report. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (income && expenses && savings && investment && debt && financialGoals && riskTolerance) {
            generateReport();
        }
    }, [income, expenses, savings, investment, debt, financialGoals, riskTolerance]);

    return (
        <div className="flex min-h-screen bg-gray-100 text-black">
            <div className="bg-blue-800 text-white w-full md:w-1/4 min-h-screen p-6 flex flex-col items-center justify-center rounded-tr-3xl rounded-br-3xl shadow-lg">
                <h1 className='text-5xl font-bold mb-4'>Hi, {username}!</h1>
                <h2 className="text-3xl font-semibold mb-4 text-center">Financial Advice Results</h2>
                <ul className="space-y-2">
                    <li><strong>Income:</strong> {income}</li>
                    <li><strong>Expenses:</strong> {expenses}</li>
                    <li><strong>Savings:</strong> {savings}</li>
                    <li><strong>Investment:</strong> {investment}</li>
                    <li><strong>Debt:</strong> {debt}</li>
                    <li><strong>Financial Goals:</strong> {financialGoals}</li>
                    <li><strong>Risk Tolerance:</strong> {riskTolerance}</li>
                </ul>
            </div>

            <div className="flex-grow p-8 bg-gray-100">
                <h1 className="text-4xl font-bold mb-6">Your Financial Overview</h1>

                {loading ? (
                    <p className="text-blue-500 text-xl">Generating your financial report, please wait...</p>
                ) : error ? (
                    <p className="text-red-500 text-xl">{error}</p>
                ) : (
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Financial Report</h2>
                        <p className="text-xl">{financialReport}</p> {/* Increased font size for the report */}
                    </div>
                )}

                <Chart />
            </div>
        </div>
    );
};

export default Results;
