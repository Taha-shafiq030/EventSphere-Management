import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
        <p className="mb-6">You do not have permission to access this page.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
