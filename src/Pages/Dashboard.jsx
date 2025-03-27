import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import FinancialDetails from "../Components/Dashboard/FinancialDetails";
import Recommendations from "../Components/Dashboard/Recommendation";
import QuickActions from "../Components/Dashboard/QuickActions";
import { motion } from "framer-motion";
// import TransactionManager from './TransactionManager'

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [upExp, setupExp] = useState()

    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
            const parsedTransactions = JSON.parse(storedTransactions);
            // Sort transactions by datetime in descending order (latest first)
            const sortedTransactions = parsedTransactions.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
            setTransactions(sortedTransactions);
        }


    }, []);

    useEffect(() => {
        setupExp(0);
        let temp = 0;
        transactions.map((el) => {
            if (el.type == "Upcoming Expense") {
                temp += el.amount;
            }
            
        })
        setupExp(temp);
        console.log(temp);
    }, [transactions])


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
            <FinancialDetails data={transactions} upExp={upExp} />
            <Recommendations />

        </div>
    );
}

export default Dashboard;
