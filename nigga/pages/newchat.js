import React, { useState, useEffect } from "react";
import axios from "axios";
import FinancialReportChart from "../components/newchat"; // Adjust the path as needed

export default function NewChat() {
  const [responses, setResponses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [report, setReport] = useState("");
  const [detailedReport, setDetailedReport] = useState(""); // New state for detailed report
  const [advice, setAdvice] = useState("");
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestion(0); // Fetch the first question on component mount
  }, []);

  const fetchQuestion = async (index) => {
    try {
      const response = await axios.get(`http://localhost:8000/get_question/${index}`);
      setCurrentQuestion(response.data.question);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleNext = async () => {
    const updatedResponses = [...responses, inputValue];
    setResponses(updatedResponses);
    setInputValue("");

    if (questionIndex < 9) {
      setQuestionIndex(questionIndex + 1);
      fetchQuestion(questionIndex + 1);
    } else {
      setLoading(true); // Set loading state to true
      try {
        const response = await axios.post("http://localhost:8000/generate_report/", {
          responses: updatedResponses,
        });
        setReport(response.data.report);
        setDetailedReport(response.data.detailedReport || ""); // Get the detailed report
        setChartData(response.data.chartData || { labels: [], values: [] });
        setAdvice(response.data.advice || "");
      } catch (error) {
        console.error("Error generating report:", error);
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const handleReset = () => {
    setResponses([]);
    setReport("");
    setAdvice(""); // Reset advice
    setDetailedReport(""); // Reset detailed report
    setChartData({ labels: [], values: [] });
    setQuestionIndex(0);
    setInputValue("");
    fetchQuestion(0); // Reset to the first question
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center p-6 max-w-lg w-full bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Financial Advisor Chat</h1>
        {loading ? (
          <p className="text-blue-500">Loading...</p>
        ) : report ? (
          <div className="mt-5 p-4 bg-blue-100 border-l-4 border-blue-500 rounded">
            <h2 className="font-semibold text-lg">Your Financial Report</h2>
            <p className="text-gray-700">{report}</p>
            <p className="text-gray-700">{detailedReport}</p> {/* Display detailed report */}
            {chartData.labels.length > 0 && <FinancialReportChart chartData={chartData} />}
            {advice && <p className="text-green-600 mt-4">{advice}</p>}
          </div>
        ) : (
          <div className="flex flex-col space-y-4 w-full">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-gray-800">{currentQuestion}</p>
            </div>
            <div className="flex w-full space-x-2">
              <input
                type="text"
                className="flex-1 p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your answer..."
              />
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
                onClick={handleNext}
              >
                {questionIndex === 9 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        )}
        <button
          className="mt-4 px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
