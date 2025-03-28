import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ContactUs from "./Pages/ContactUs";
import Transection from "./Pages/TransactionManager";
import AboutUs from "./Pages/AboutUs";
import AiChat from "./Pages/AiChat";
import FinancialGoals from "./Pages/FinancialGoals";
import Analytics from "./Pages/Analytics";
import AIPrediction from "./Pages/AiPrediction";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import TermsAndConditions from "./Components/TermsAndConditions";

const isSignedIn = Boolean(localStorage.getItem("token")); // Example logic to check if the user is signed in

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/" element={<ProtectedRoute isSignedIn={isSignedIn}><Dashboard /></ProtectedRoute>} />
          <Route path="/contactus" element={<ProtectedRoute isSignedIn={isSignedIn}><ContactUs /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute isSignedIn={isSignedIn}><AboutUs /></ProtectedRoute>} />
          <Route path="/aichat" element={<ProtectedRoute isSignedIn={isSignedIn}><AiChat /></ProtectedRoute>} />
          <Route path="/transaction" element={<ProtectedRoute isSignedIn={isSignedIn}><Transection /></ProtectedRoute>} />
          <Route path="/test" element={<ProtectedRoute isSignedIn={isSignedIn}><Signup /></ProtectedRoute>} />
          <Route path="/financialgoals" element={<ProtectedRoute isSignedIn={isSignedIn}><FinancialGoals /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute isSignedIn={isSignedIn}><Analytics /></ProtectedRoute>} />
          <Route path="/prediction" element={<ProtectedRoute isSignedIn={isSignedIn}><AIPrediction /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);
