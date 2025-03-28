import React, { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";
import Footer from "../Components/Footer";

const Navbar = lazy(() => import("../Components/Navbar"));
const FinancialDetails = lazy(() => import("../Components/Dashboard/FinancialDetails"));
const QuickActions = lazy(() => import("../Components/Dashboard/QuickActions"));

function Dashboard() {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [upExp, setupExp] = useState(0);
    const [topGoals, setTopGoals] = useState([]); // No longer using localStorage

    useEffect(() => {
        // Fetch user details
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token"); // Retrieve the stored token
            if (!token) return;

            try {
                const response = await fetch("http://localhost:8080/api/auth/user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data); // Store in state
                    localStorage.setItem("user", JSON.stringify(data)); // Store user details in localStorage
                } else {
                    console.error("Failed to fetch user details");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);


    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/transactions`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const sortedTransactions = data.content.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
                    setTransactions(sortedTransactions);
                } else {
                    console.error("Failed to fetch transactions");
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
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
        const fetchGoals = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/goals`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTopGoals(data.content.slice(0, 3)); // Fetch top 3 goals
                } else {
                    console.error("Failed to fetch goals");
                }
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };

        fetchGoals();
    }, []);

    const GoalItem = ({ goal }) => (
        <div className="flex items-center bg-[#232323] border border-[#292929] rounded-lg p-4 shadow-sm">
            <div className="mr-3">
                {goal.completed ? (
                    <CheckCircle size={24} className="text-[#00C853]" />
                ) : (
                    <Circle size={24} className="text-[#B0B0B0]" />
                )}
            </div>

            <div className="flex-1">
                <p className="text-[#E0E0E0] font-medium">{goal.text}</p>
                <p className="text-sm text-[#B0B0B0] mt-1">
                    {goal.description ? `Description: ${goal.description} ` : "No deadline"}
                </p>
                <p className="text-sm text-[#B0B0B0] mt-1">
                    {goal.deadline ? `Due in: ${goal.deadline} days` : "No deadline"}
                </p>
                <p className="text-sm text-[#B0B0B0]">
                    Status: {goal.completed ? "Completed" : "Not Completed"}
                </p>
            </div>
        </div>
    );

    return (
        <div className="z-999 bg-[#121212] min-h-screen text-[#E0E0E0] font-inter">
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
                    Hey there, {user ? user.name : "User"}! 👋
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

            <div className="bg-[#1A1A1A] text-[#E0E0E0] rounded-lg p-6 mx-6 mt-6 shadow-lg border border-[#292929]">
                <h2 className="text-xl font-bold text-[#FFFFFF] mb-4">
                    🎯 Top Financial Goals
                </h2>

                {topGoals.length > 0 ? (
                    <div className="space-y-4">
                        {topGoals.map((goal) => (
                            <GoalItem key={goal.id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <p className="text-[#B0B0B0] text-center">
                        No financial goals added yet. Start planning today!
                    </p>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
