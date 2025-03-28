import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Lazy load pages
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const Transaction = lazy(() => import("./Pages/TransactionManager"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));
const AiChat = lazy(() => import("./Pages/AiChat"));
const FinancialGoals = lazy(() => import("./Pages/FinancialGoals"));
const Analytics = lazy(() => import("./Pages/Analytics"));
const AIPrediction = lazy(() => import("./Pages/AiPrediction"));
const TermsAndConditions = lazy(() => import("./Components/TermsAndConditions"));

const isSignedIn = Boolean(localStorage.getItem("token")); // Example logic to check if the user is signed in

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/" element={<ProtectedRoute isSignedIn={isSignedIn}><Dashboard /></ProtectedRoute>} />
            <Route path="/contactus" element={<ProtectedRoute isSignedIn={isSignedIn}><ContactUs /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute isSignedIn={isSignedIn}><AboutUs /></ProtectedRoute>} />
            <Route path="/aichat" element={<ProtectedRoute isSignedIn={isSignedIn}><AiChat /></ProtectedRoute>} />
            <Route path="/transaction" element={<ProtectedRoute isSignedIn={isSignedIn}><Transaction /></ProtectedRoute>} />
            <Route path="/financialgoals" element={<ProtectedRoute isSignedIn={isSignedIn}><FinancialGoals /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute isSignedIn={isSignedIn}><Analytics /></ProtectedRoute>} />
            <Route path="/prediction" element={<ProtectedRoute isSignedIn={isSignedIn}><AIPrediction /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);
