import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function AnalyticsPage() {
  const navigate = useNavigate();

  const barData = {
    labels: ["Event 1", "Event 2", "Event 3", "Event 4"],
    datasets: [
      {
        label: "Participants",
        data: [150, 200, 180, 220],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  const pieData = {
    labels: ["Admins", "Exhibitors", "Attendees"],
    datasets: [
      {
        data: [10, 40, 200],
        backgroundColor: ["#3b82f6", "#10b981", "#ef4444"],
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Event Registrations",
        data: [50, 75, 120, 90, 150],
        borderColor: "#3b82f6",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Analytics
      </motion.h1>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-500 text-white py-2 px-4 rounded mb-6 self-start"
      >
        &larr; Back to Dashboard
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
          <div className="w-full max-w-xs h-100">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Event Participation
            </h2>
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
          <div className="w-full max-w-xs h-100">
            <h2 className="text-lg font-semibold mb-2 text-center">
              User Statistics
            </h2>
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center col-span-1 md:col-span-2">
          <div className="w-full max-w-2xl h-100">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Event Trends
            </h2>
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
