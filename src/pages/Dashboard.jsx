import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Chart Data
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Event Registrations",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "#60A5FA",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Monthly Revenue ($)",
        data: [2000, 2500, 1800, 3200, 4000],
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.3)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Completed", "Ongoing", "Cancelled"],
    datasets: [
      {
        data: [12, 7, 3],
        backgroundColor: ["#22D3EE", "#60A5FA", "#F87171"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Analytics",
      },
    },
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4 items-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Notifications Icon */}
          <button className="relative">
            <FaBell className="text-blue-500 text-2xl" />
            {/* Example Notification Dot */}
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
              3
            </span>
          </button>

          {/* Profile Image Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center">
              <img
                src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48">
                <button
                  onClick={() => alert("Logging out...")}
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-gray-900 text-white py-3 flex justify-around">
        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/events" className="hover:text-gray-300">
          Events
        </Link>
        <Link to="/analytics" className="hover:text-gray-300">
          Analytics
        </Link>
        <Link to="/profile" className="hover:text-gray-300">
          Profile
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <p className="text-gray-500 mt-2">View and manage your events.</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold">Total Attendees</h2>
            <p className="text-gray-500 mt-2">Track event attendance.</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-gray-500 mt-2">Stay updated with event notifications.</p>
          </motion.div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Registrations</h2>
            <Bar data={barData} options={chartOptions} />
          </div>

          {/* Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Revenue</h2>
            <Line data={lineData} options={chartOptions} />
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Event Status</h2>
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
