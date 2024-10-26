// components/FinancialForm.js
import { useState } from 'react';
import Router from 'next/router';

const FinancialForm = () => {
    const [formData, setFormData] = useState({
        income: '',
        expenses: '',
        savings: '',
        investment: '',
        debt: '',
        financialGoals: '',
        riskTolerance: 'Low', // Default value for the dropdown
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Router.push({
            pathname: '/results',
            query: formData,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-center mb-6">Financial Advice Form</h2>
            {['income', 'expenses', 'savings', 'investment', 'debt'].map((field) => (
                <div key={field} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' ')}:
                    </label>
                    <input
                        type="number"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 hover:border-blue-400"
                    />
                </div>
            ))}
            {/* Financial Goals Input */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="financialGoals">
                    Financial Goals:
                </label>
                <input
                    type="text"
                    name="financialGoals"
                    value={formData.financialGoals}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 hover:border-blue-400"
                />
            </div>
            {/* Risk Tolerance Dropdown */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="riskTolerance">
                    Risk Tolerance:
                </label>
                <select
                    name="riskTolerance"
                    value={formData.riskTolerance}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 hover:border-blue-400"
                >
                    <option value="Select">Select</option>
                    <option value="Less">Less</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
            >
                Submit
            </button>
        </form>
    );
};

export default FinancialForm;