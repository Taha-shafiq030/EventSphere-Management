import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // Mock login function
  const login = (email, password) => {
    const mockUsers = [
      { email: "admin@example.com", password: "admin123", role: "Admin" },
      { email: "exhibitor@example.com", password: "exhibitor123", role: "Exhibitor" },
      { email: "attendee@example.com", password: "attendee123", role: "Attendee" },
    ];
    const authenticatedUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (authenticatedUser) {
      setUser(authenticatedUser);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
