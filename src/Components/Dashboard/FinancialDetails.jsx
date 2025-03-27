import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinancialDetails = ({ data, upExp }) => {
    const Navigator = useNavigate();
    const [expanded, setExpanded] = useState(false);


    const transactions = data
    // Take the first 5 entries
    // setTransactions(sortedTransactions.slice(0, 5));;
    console.log(data.slice(0, 5));

    // Calculate total Income and expenses
    const totalIncome = transactions.filter(tx => tx.type === "Income").reduce((acc, tx) => acc + tx.amount, 0);
    const totalExpense = transactions.filter(tx => tx.type === "Expense").reduce((acc, tx) => acc + tx.amount, 0);
    const balance = totalIncome - totalExpense; // Net balance

    return (
        <div className="bg-[#121212] text-[#E0E0E0] p-5">
            <div className="bg-[#1E1E1E] rounded-xl shadow-sm border border-[#292929] p-4 ">

                {/* Highlighted Financial Summary Section */}
                <div className="bg-[#232323] rounded-lg p-5">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">


                        {/* Balance Column */}
                        <div className="flex flex-col items-center p-4 border-l border-[#292929]">
                            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Balance</h3>
                            <div className={`text-2xl font-bold ${balance >= 0 ? "text-[#00C853]" : "text-[#F44336]"}`}>
                                ₹{balance.toFixed(2)}
                            </div>
                        </div>
                        {/* Income Column */}
                        <div className="flex flex-col items-center p-4">
                            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Income</h3>
                            <div className="text-2xl font-bold text-[#00C853]">₹{totalIncome.toFixed(2)}</div>

                        </div>

                        {/* Expense Column */}
                        <div className="flex flex-col items-center p-4">
                            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Expense</h3>
                            <div className="text-2xl font-bold text-[#F44336]">₹{Math.abs(totalExpense).toFixed(2)}</div>

                        </div>

                        {/* Upcoming Expense Column */}
                        <div className="flex flex-col items-center p-4">
                            <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Upcoming Expense</h3>
                            <div className="text-2xl font-bold text-[#FF9800]">₹{Math.abs(upExp).toFixed(2)}</div>

                        </div>

                    </div>
                </div>

                {/* Horizontal Line */}
                <div className="border-t border-[#292929] my-10"></div>

                {/* Expandable Section */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <h4 className="text-lg font-semibold text-[#FFFFFF] mb-3">Last 5 Transactions</h4>
                    <ul className="space-y-2">
                        {transactions.slice(0, 5).map((tx) => (
                            <li
                                key={tx.id}
                                className="flex justify-between p-3 rounded-lg bg-[#1E1E1E] border border-[#292929]"
                            >
                                <span className="text-[#E0E0E0]">{tx.description}</span>
                                <span
                                    className={tx.type === "Income" ? "text-[#00C853] font-bold" : tx.type === "Expense" ? "text-[#F44336] font-bold" : "text-[#FF9800] font-bold"}
                                >
                                    {tx.type === "Income" ? `+₹${tx.amount.toFixed(2)}` : tx.type === "Expense" ? `-₹${Math.abs(tx.amount).toFixed(2)}` : `-₹${Math.abs(tx.amount).toFixed(2)}`}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* View All Transactions Button */}
                    <div className="flex justify-end mt-4">
                        <a onClick={() => Navigator('/transaction')} className="text-sm text-[#03DAC6] hover:text-[#FFFFFF] cursor-pointer">
                            View All Transactions →
                        </a>
                    </div>
                </motion.div>

                {/* Last Updated and Arrow Inside the Expanded Section */}
                <motion.div
                    initial={false}
                    animate={{ y: expanded ? 0 : -40 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex flex-col items-center mt-4 ${expanded ? "pt-1" : ""}`}
                >
                    {/* Expand/Collapse Button Inside the Expanded Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className={` p-2 rounded-lg cursor-pointer hover:bg-[#333333] transition ${expanded ? "bg-[#292929]" : ""
                            }`}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? <ChevronUp size={32} color="#E0E0E0" /> : <ChevronDown size={32} color="#E0E0E0" />}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default FinancialDetails;
