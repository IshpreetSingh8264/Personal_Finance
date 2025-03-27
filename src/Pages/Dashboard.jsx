import React, { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";

const Navbar = lazy(() => import("../Components/Navbar"));
const FinancialDetails = lazy(() => import("../Components/Dashboard/FinancialDetails"));
const Recommendations = lazy(() => import("../Components/Dashboard/Recommendation"));
const QuickActions = lazy(() => import("../Components/Dashboard/QuickActions"));

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [upExp, setupExp] = useState(0);

    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
            const parsedTransactions = JSON.parse(storedTransactions);
            const sortedTransactions = parsedTransactions.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
            setTransactions(sortedTransactions);
        }
    }, []);

    useEffect(() => {
        let temp = 0;
        transactions.forEach((el) => {
            if (el.type === "Upcoming Expense") {
                temp += el.amount;
            }
        });
        setupExp(temp);
    }, [transactions]);

    return (
        <div className="bg-[#121212] min-h-screen text-[#E0E0E0] font-inter">
            <Suspense fallback={<div>Loading Navbar...</div>}>
                <Navbar />
            </Suspense>

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

            <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-[#1C1C1C] bg-opacity-75">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03DAC6]"></div>
            </div>}>
                <QuickActions />
            </Suspense>
            <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-[#1C1C1C] bg-opacity-75">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03DAC6]"></div>
            </div>}>
                <FinancialDetails data={transactions} upExp={upExp} />
            </Suspense>
            <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-[#1C1C1C] bg-opacity-75">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03DAC6]"></div>
            </div>}>
                <Recommendations />
            </Suspense>
        </div>
    );
}

export default Dashboard;