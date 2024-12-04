import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import ManageEvents from "./pages/ManageEvents";
import Analytics from "./pages/Analytics";
import UnauthorizedPage from "./pages/Unauthorized";
import { AuthProvider } from './pages/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import EventDetails from "./pages/EventDetails";

const App = () => {
  // Manage the events state
  const [events, setEvents] = useState([
    {
      id: "1",
      name: "Tech Conference 2024",
      date: "2024-12-15",
      description: "A premier conference showcasing cutting-edge technology.",
      image: "https://via.placeholder.com/600x300",
      registeredUsers: [],
      maxAttendees: 5,
      reviews: [],
    },
    // Add more mock events as needed
  ]);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Exhibitor", "Attendee"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <ManageEvents events={events} setEvents={setEvents} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Exhibitor", "Attendee"]}>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Redirect "/" to "/dashboard" if logged in */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Event Details Route */}
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Exhibitor", "Attendee"]}>
                <EventDetails events={events} setEvents={setEvents} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
