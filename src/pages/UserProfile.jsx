import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Admin",
    profileImage: null, // Profile image URL
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userDetails });
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = file ? URL.createObjectURL(file) : null;
    setFormData((prevData) => ({
      ...prevData,
      profileImage: imageUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDetails(formData);
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Password changed successfully!");
    setIsPasswordChanging(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <ul>
          <li>
            <button
              onClick={() => navigate("/")}
              className="text-gray-700 hover:bg-gray-200 py-2 px-4 w-full text-left"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setIsPasswordChanging(true)}
              className="text-gray-700 hover:bg-gray-200 py-2 px-4 w-full text-left"
            >
              Change Password
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-6">
        <motion.h1
          className="text-4xl font-extrabold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          User Profile
        </motion.h1>

        {!isEditing ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-6">
              {userDetails.profileImage ? (
                <img
                  src={userDetails.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-500"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-gray-800">{userDetails.name}</h2>
                <p className="text-gray-600">{userDetails.email}</p>
                <p className="text-gray-600">{userDetails.role}</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Edit Profile
              </button>

              <button
                onClick={() => setIsPasswordChanging(true)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Change Password
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-6 mb-4">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-500"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {isPasswordChanging && (
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white p-6 rounded-lg shadow-md mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Change Password</h2>

            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={() => setIsPasswordChanging(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
