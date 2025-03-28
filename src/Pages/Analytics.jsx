import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line } from "recharts";
import Navbar from "../Components/Navbar";
import axios from "axios";

// Lazy load heavy components
const PieChart = lazy(() => import("recharts").then((mod) => ({ default: mod.PieChart })));
const LineChart = lazy(() => import("recharts").then((mod) => ({ default: mod.LineChart })));

export default function BudgetAnalytics() {
  const [transactions, setTransactions] = useState([]); // State for transactions
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const transactionsPerPage = 13;
  const [filterType, setFilterType] = useState(null); // Filter by type
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data.content);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  // Memoize filtered transactions
  const filteredTransactions = useMemo(() => {
    return filterType
      ? transactions.filter((t) => t.type === filterType)
      : transactions;
  }, [transactions, filterType]);

  // Pagination calculations
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  // Calculate aggregates (do not subtract upcoming expenses from balance)
  const income = transactions.filter((t) => t.type === "Income").reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions.filter((t) => t.type === "Expense").reduce((acc, curr) => acc + curr.amount, 0);
  const upcomingExpenses = transactions.filter((t) => t.type === "Upcoming Expense").reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expenses; // upcoming expenses are not subtracted

  // Memoize pie chart data
  const pieData = useMemo(() => [
    { name: "Income", value: income, color: "#4CAF50" },
    { name: "Expenses", value: expenses, color: "#F44336" },
    { name: "Upcoming Expense", value: upcomingExpenses, color: "#FF9800" },
  ], [income, expenses, upcomingExpenses]);

  // Build balance history data from transactions
  const balanceHistoryRaw = transactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((t, index, arr) => {
      const cumulative = arr.slice(0, index + 1).reduce((acc, curr) => {
        return acc + (curr.type === "Income" ? curr.amount : curr.type === "Expense" ? -curr.amount : 0);
      }, 0);
      return { date: t.date, Balance: cumulative };
    });

  // Memoize balance history
  const balanceHistory = useMemo(() => {
    return balanceHistoryRaw.filter((d) => {
      const dDate = new Date(d.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && dDate < start) return false;
      if (end && dDate > end) return false;
      return true;
    });
  }, [balanceHistoryRaw, startDate, endDate]);

  // Handler for pie chart clicks: toggle filter
  const handlePieClick = (data, index) => {
    if (data.name === "Expenses") {
      setFilterType("Expense");
      setCurrentPage(1); // Reset page on filter
    } else if (filterType === data.name) {
      setFilterType(null); // Clear filter
    } else {
      setFilterType(data.name);
      setCurrentPage(1); // Reset page on filter
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen text-[#E0E0E0] p-6">
      <Navbar />
      <h2 className="text-2xl font-bold text-white mb-4 text-center">📊 AI Analytics</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Expense Table - 75% width */}
        <motion.div
          className="bg-[#1E1E1E] p-4 rounded-lg shadow-lg border border-[#292929] w-full md:w-3/4"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          style={{ overflowY: 'hidden' }} // Allow table to expand without scrollbar

        >
          <h3 className="text-lg font-semibold text-white mb-2">Expense Table</h3>
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-gray-400">No transactions found.</p>
          ) : (
            <>
              <table className="w-full text-left border-collapse border border-[#292929] text-sm md:text-base">
                <thead>
                  <tr className="bg-[#1E1E1E] text-white">
                    <th className="p-2 md:p-3 border border-[#292929]">Date</th>
                    <th className="p-2 md:p-3 border border-[#292929]">Description</th>
                    <th className="p-2 md:p-3 border border-[#292929]">Amount</th>
                    <th className="p-2 md:p-3 border border-[#292929]">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((t) => (
                    <motion.tr key={t.id} className="hover:bg-[#1C1C1C]">
                      <td className="p-2 md:p-3 border border-[#292929]">{t.date}</td>
                      <td className="p-2 md:p-3 border border-[#292929]">{t.description}</td>
                      <td className="p-2 md:p-3 border border-[#292929]">${t.amount.toFixed(2)}</td>
                      <td className="p-2 md:p-3 border border-[#292929]">{t.type}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 bg-[#333333] text-white rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-white">Page {currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </motion.div>

        {/* Right Panel - 25% width: Pie chart and Line Chart */}
        <Suspense fallback={<div>Loading...</div>}>
          <motion.div
            className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg border border-[#292929] w-full md:w-1/4 flex flex-col items-center"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
          >
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                onClick={handlePieClick}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            {filterType && (
              <motion.button
                onClick={() => setFilterType(null)}
                className="mt-2 px-4 py-2 bg-[#03DAC6] text-white rounded"
                whileHover={{ scale: 1.05 }}
              >
                Clear Filter: {filterType}
              </motion.button>
            )}

            <div className="mt-6 w-full bg-[#1E1E1E] p-4 rounded-lg shadow-md border border-[#292929]">
              <h3 className="text-lg font-semibold text-white mb-2 text-center">Balance History</h3>
              <div className="flex gap-2 justify-center mb-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
                />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={balanceHistory} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#292929" />
                  <XAxis dataKey="name" stroke="#B0B0B0" tick={{ fill: "#B0B0B0" }} />
                  <YAxis stroke="#B0B0B0" tick={{ fill: "#B0B0B0" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="Balance" stroke="#4CAF50" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </Suspense>
      </div>
    </div >
  );
}
