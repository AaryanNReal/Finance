// components/Chart.js
import { Bar } from 'react-chartjs-2';
import { useRouter } from 'next/router';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
    const router = useRouter();
    const { income, expenses, savings, investment } = router.query;

    // Function to generate a random RGBA color
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    };

    // Create random colors for each data point
    const backgroundColors = [
        getRandomColor(),
        getRandomColor(),
        getRandomColor(),
        getRandomColor(),
    ];

    const dataValues = [
        parseFloat(income) || 0,
        parseFloat(expenses) || 0,
        parseFloat(savings) || 0,
        parseFloat(investment) || 0,
    ];

    // Define chart data with random colors for each bar
    const chartData = {
        labels: ['Income', 'Expenses', 'Savings', 'Investment'],
        datasets: [
            {
                label: 'Financial Overview',
                data: dataValues,
                backgroundColor: backgroundColors, // Use the array of random colors
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} className="shadow-lg rounded-lg" />;
};

export default Chart;
