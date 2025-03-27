import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";

// 🟢 Transaction Manager Component
export default function TransactionManager() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Load transactions from LocalStorage on page load
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  // ✅ Save transactions to LocalStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  // 🔹 Default form state
  const initialFormState = {
    id: "",
    description: "",
    amount: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  };

  const [form, setForm] = useState(initialFormState);

  // 🔹 Handle Input Changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 Add or Update Transaction
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return alert("All fields are required!");

    if (isEditing) {
      // 🔄 Update existing transaction
      setTransactions((prev) =>
        prev.map((t) => (t.id === form.id ? { ...form, amount: parseFloat(form.amount) } : t))
      );
      setIsEditing(false);
    } else {
      // ➕ Add new transaction
      setTransactions([{ ...form, id: Date.now().toString(), amount: parseFloat(form.amount) }, ...transactions]);
    }

    setForm(initialFormState);
    setIsModalOpen(false);
  };

  // ✏️ Edit Transaction
  const handleEdit = (transaction) => {
    setForm(transaction);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // ❌ Delete Transaction
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      const updatedTransactions = transactions.filter((t) => t.id !== id);
      setTransactions(updatedTransactions);
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    }
  };

  return (
    <div>
      <Navbar />

      <div className="bg-[#121212] min-h-screen text-[#E0E0E0] p-6">
        <h2 className="text-2xl font-bold text-white mb-4">💰 Transaction Manager</h2>

        {/* 🟢 Transaction Table */}
        <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-lg border border-[#292929]">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-400">No transactions yet.</p>
          ) : (
            <table className="w-full text-left border-collapse border border-[#292929]">
              <thead>
                <tr className="bg-[#1E1E1E] text-white">
                  <th className="p-3 border border-[#292929]">Date</th>
                  <th className="p-3 border border-[#292929]">Description</th>
                  <th className="p-3 border border-[#292929]">Type</th>
                  <th className="p-3 border border-[#292929]">Amount</th>
                  <th className="p-3 border border-[#292929]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, index) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-[#1C1C1C]"
                  >
                    <td className="p-3 border border-[#292929]">{t.date}</td>
                    <td className="p-3 border border-[#292929]">{t.description}</td>
                    <td className={`p-3 border border-[#292929] ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                      {t.type}
                    </td>
                    <td className="p-3 border border-[#292929]">${t.amount.toFixed(2)}</td>
                    <td className="p-3 border border-[#292929]">
                      <button onClick={() => handleEdit(t)} className="text-[#03DAC6] mr-4">✏️</button>
                      <button onClick={() => handleDelete(t.id)} className="text-[#F44336]">🗑️</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 🟢 Floating Add Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 bg-[#4CAF50] text-white p-4 rounded-full shadow-lg hover:bg-[#388E3C]"
        >
          ➕
        </motion.button>

        {/* 🟢 Add/Edit Transaction Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg w-96"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
                  />
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
                  />
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
                  />

                  <div className="flex justify-between">
                    <button type="submit" className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#388E3C]">
                      {isEditing ? "Update" : "Add"}
                    </button>
                    <button onClick={() => setIsModalOpen(false)} className="bg-[#F44336] text-white px-4 py-2 rounded hover:bg-[#D32F2F]">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
