import React from "react";
import Navbar from "../Components/Navbar";
import FinancialDetails from "../Components/Dashboard/FinancialDetails";
import Recommendations from "../Components/Dashboard/Recommendation";
import QuickActions from "../Components/Dashboard/QuickActions";
import { motion } from "framer-motion";
// import TransactionManager from './TransactionManager'

function Dashboard() {
    return (
        <div className="bg-[#121212] min-h-screen text-[#E0E0E0] font-inter">
            <Navbar />

            {/* Animated Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-[#1A1A1A] text-[#E0E0E0] rounded-lg p-6 mx-6 mt-6 shadow-lg border border-[#292929]"
            >
                <h1 className="text-2xl font-bold text-[#FFFFFF]">
                    Hey there, User! 👋
                </h1>
                <p className="text-[#B0B0B0] mt-2">
                    Let’s make today a productive one! Stay ahead of your finances with insights tailored for you.
                </p>
            </motion.div>

            <QuickActions />
            <FinancialDetails />
            <Recommendations />

        </div>
    );
}

export default Dashboard;
