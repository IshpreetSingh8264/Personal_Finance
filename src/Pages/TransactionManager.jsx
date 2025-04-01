import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2"; // Add this import
import Papa from "papaparse"; // Add this import for CSV parsing

export default function TransactionManager() {
  const [allTransactions, setAllTransactions] = useState([]); // Store all transactions
  const [currentTransactions, setCurrentTransactions] = useState([]); // Transactions to display in current page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // State for loader

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllTransactions(response.data.content); // Store complete transactions
        setCurrentTransactions(response.data.content.slice(0, transactionsPerPage)); // Set first page transactions
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    // Update current transactions whenever currentPage changes
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    setCurrentTransactions(allTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction));
  }, [currentPage, allTransactions]);

  const initialFormState = {
    id: "",
    description: "",
    amount: "",
    type: "Expense",
    date: new Date().toISOString().split("T")[0],
    time: "",
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return alert("All fields are required!");

    try {
      const token = localStorage.getItem("token");
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_BASE_API_URL}/api/transactions/${form.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllTransactions((prev) =>
          prev.map((t) => (t.id === form.id ? { ...form, amount: parseFloat(form.amount) } : t))
        );
        setIsEditing(false);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/transactions`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllTransactions([response.data, ...allTransactions]);
      }
      setForm(initialFormState);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const handleEdit = (transaction) => {
    setForm(transaction);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/api/transactions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllTransactions((prev) => prev.filter((t) => t.id !== id));
        Swal.fire("Deleted!", "Your transaction has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting transaction:", error);
        Swal.fire("Error!", "Failed to delete the transaction.", "error");
      }
    }
  };

  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setIsUploading(true); // Show loader
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const transactions = results.data
          .map((transaction) => {
            // Map and normalize fields
            const parsedDate = new Date(transaction["date created"]);
            if (isNaN(parsedDate)) {
              console.error(`Invalid date format for transaction:`, transaction);
              return null; // Skip invalid transactions
            }
  
            let normalizedType = transaction.type.toLowerCase();
            if (normalizedType === "debit") normalizedType = "Expense";
            else if (normalizedType === "credit") normalizedType = "Income";
            else {
              console.error(`Invalid type for transaction:`, transaction);
              return null; // Skip invalid transactions
            }
  
            return {
              description: transaction.description,
              amount: parseFloat(transaction.amount),
              type: normalizedType,
              date: parsedDate.toISOString().split("T")[0], // Reformat date to YYYY-MM-DD
              note: transaction.note, // Optional field
            };
          })
          .filter(Boolean); // Remove null values (invalid transactions)
  
        const token = localStorage.getItem("token");
  
        for (const transaction of transactions) {
          try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/transactions`, transaction, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setAllTransactions((prev) => [response.data, ...prev]); // Append new transaction to the state
          } catch (error) {
            console.error("Error importing transaction:", error.response?.data || error.message);
            Swal.fire("Error!", `Failed to save transaction: ${transaction.description}`, "error");
          }
        }
  
        setIsUploading(false); // Hide loader
        Swal.fire("Success!", "All transactions imported successfully.", "success");
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        setIsUploading(false); // Hide loader
        Swal.fire("Error!", "Failed to parse the CSV file.", "error");
      },
    });
  };

  // Calculate total Income, Expenses, and Upcoming Expenses
  const totalIncome = allTransactions.filter(tx => tx.type === "Income").reduce((acc, tx) => acc + tx.amount, 0);
  const totalExpense = allTransactions.filter(tx => tx.type === "Expense").reduce((acc, tx) => acc + tx.amount, 0);
  const totalUpcomingExpense = allTransactions.filter(tx => tx.type === "Upcoming Expense").reduce((acc, tx) => acc + tx.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="z-999 bg-[#121212] min-h-screen text-[#E0E0E0] font-inter">
      <Navbar />
      <div className="bg-[#121212] min-h-screen text-[#E0E0E0] p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">💰 Transaction Manager</h2>

        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
          {/* Left Side: Transactions Table */}
          <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-lg border border-[#292929] w-full md:w-2/3 overflow-x-auto">
            {allTransactions.length === 0 ? (
              <p className="text-center text-gray-400">No transactions yet.</p>
            ) : (
              <>
                <table className="w-full text-left border-collapse border border-[#292929] text-sm md:text-base">
                  <thead>
                    <tr className="bg-[#1E1E1E] text-white">
                      <th className="p-2 md:p-3 border border-[#292929]">Date</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Description</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Type</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Amount</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((t) => (
                      <motion.tr
                        key={t.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }} // Reduce animation duration
                        className="hover:bg-[#1C1C1C]"
                      >
                        <td className="p-2 md:p-3 border border-[#292929]">{t.date}</td>
                        <td className="p-2 md:p-3 border border-[#292929]">{t.description}</td>
                        <td className={`p-2 md:p-3 border border-[#292929] ${t.type === "Income" ? "text-green-400" : t.type === "Expense" ? "text-red-400" : "text-yellow-400"}`}>{t.type}</td>
                        <td className="p-2 md:p-3 border border-[#292929]">₹{t.amount.toFixed(2)}</td>
                        <td className="p-2 md:p-3 border border-[#292929] flex justify-evenly gap-2">
                          <button
                            onClick={() => handleEdit(t)}
                            className="p-2 bg-[#03DAC6] hover:bg-[#00BFA5] text-white rounded transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer"
                          >
                            <FaEdit size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(t.id)}
                            className="p-2 bg-[#F44336] hover:bg-[#D32F2F] text-white rounded transition-transform duration-200 ease-in-out transform hover:scale-110 cursor-pointer"
                          >
                            <FaTrash size={16} />
                          </button>
                        </td>

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
                  <span className="text-white">Page {currentPage} of {Math.ceil(allTransactions.length / transactionsPerPage)}</span>
                  <button
                    disabled={currentPage * transactionsPerPage >= allTransactions.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Side: Financial Summary */}
          <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-lg border border-[#292929] w-full md:w-1/3 flex flex-col gap-4">
            <div className="flex flex-col items-center p-4 bg-[#232323] rounded-lg">
              <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Balance</h3>
              <div className={`text-2xl font-bold ${balance >= 0 ? "text-[#00C853]" : "text-[#F44336]"}`}>
                ₹{balance.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#232323] rounded-lg">
              <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Income</h3>
              <div className="text-2xl font-bold text-[#00C853]">₹{totalIncome.toFixed(2)}</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#232323] rounded-lg">
              <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Expense</h3>
              <div className="text-2xl font-bold text-[#F44336]">₹{Math.abs(totalExpense).toFixed(2)}</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-[#232323] rounded-lg">
              <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Upcoming Expense</h3>
              <div className="text-2xl font-bold text-[#FF9800]">₹{Math.abs(totalUpcomingExpense).toFixed(2)}</div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false); // Reset edit mode
            setForm(initialFormState); // Reset form
          }}
          className="fixed bottom-6 right-6 bg-[#4CAF50] text-white p-4 md:p-5 rounded-full shadow-lg hover:bg-[#388E3C]"
        >
          ➕
        </motion.button>

        <div className="flex justify-center my-4">
          <label className="bg-[#4CAF50] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#388E3C]">
            Upload CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </label>
        </div>
        {isUploading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="text-white text-lg">Uploading transactions...</div>
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <motion.div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md">
              <motion.div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white" />
                  <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white" />
                  <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white">
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                    <option value="Upcoming Expense">Upcoming Expense</option>
                  </select>
                  <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white" />
                  <div className="flex justify-between">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-[#F44336] text-white px-4 py-2 rounded hover:bg-[#D32F2F]">Cancel</button>
                    <button type="submit" className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#388E3C]">{isEditing ? "Update" : "Add"}</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
