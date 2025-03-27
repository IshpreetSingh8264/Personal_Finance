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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/aichat" element={<AiChat />} />
        <Route path="/transaction" element={<Transection />} />
        <Route path="/test" element={<Signup />} />
        <Route path="/financialgoals" element={<FinancialGoals />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/prediction" element={<AIPrediction />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
