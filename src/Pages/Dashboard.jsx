import React, { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";

const Navbar = lazy(() => import("../Components/Navbar"));
const FinancialDetails = lazy(() => import("../Components/Dashboard/FinancialDetails"));
const Recommendations = lazy(() => import("../Components/Dashboard/Recommendation"));
const QuickActions = lazy(() => import("../Components/Dashboard/QuickActions"));

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [upExp, setupExp] = useState(0);
    const [topGoals, setTopGoals] = useState([]); // State for top 3 financial goals

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

    useEffect(() => {
        const storedGoals = localStorage.getItem("todos");
        if (storedGoals) {
            const parsedGoals = JSON.parse(storedGoals);
            setTopGoals(parsedGoals.slice(0, 3)); // Get top 3 latest goals
        }
    }, []);

    const GoalItem = ({ goal, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center bg-[#232323] border border-[#292929] rounded-lg p-4 shadow-sm transition duration-200 ease-in-out"
        >
            {/* Goal Icon */}
            <div className="mr-3">
                {goal.completed ? (
                    <CheckCircle size={24} className="text-[#00C853]" />
                ) : (
                    <Circle size={24} className="text-[#B0B0B0]" />
                )}
            </div>

            {/* Goal Text */}
            <div className="flex-1">
                <p className="text-[#E0E0E0] font-medium">{goal.text}</p>
                <p className="text-sm text-[#B0B0B0] mt-1">
                    {goal.deadline
                        ? `Due in: ${goal.deadline} days`
                        : "No deadline"}
                </p>
                <p className="text-sm text-[#B0B0B0]">
                    Status: {goal.completed ? "Completed" : "Not Completed"}
                </p>
            </div>

         
        </motion.div>
    );

    return (
        <div className="bg-[#121212] min-h-screen text-[#E0E0E0] font-inter">
            <Suspense fallback={<div>Loading Navbar...</div>}>
                <Navbar />
            </Suspense>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-[#1A1A1A] text-[#E0E0E0] rounded-lg p-6 mx-6 mt-6 shadow-lg border border-[#292929] flex flex-col items-center text-center"
            >
                <h1 className="text-2xl font-bold text-[#FFFFFF]">
                    Hey there, User! 👋
                </h1>
                <p className="text-[#B0B0B0] mt-2">
                    Let’s make today a productive one! Stay ahead of your finances with insights tailored for you.
                </p>
            </motion.div>

            {/* Top 3 Financial Goals Section */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-[#1A1A1A] text-[#E0E0E0] rounded-lg p-6 mx-6 mt-6 shadow-lg border border-[#292929]"
            >
                <h2 className="text-xl font-bold text-[#FFFFFF] mb-4">
                    🎯 Top Financial Goals
                </h2>

                {topGoals.length > 0 ? (
                    <div className="space-y-4">
                        {topGoals.map((goal, index) => (
                            <GoalItem key={goal.id} goal={goal} index={index} />
                        ))}
                    </div>
                ) : (
                    <p className="text-[#B0B0B0] text-center">
                        No financial goals added yet. Start planning today!
                    </p>
                )}
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
