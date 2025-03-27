import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";

export default function TransactionManager() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return alert("All fields are required!");

    if (isEditing) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === form.id ? { ...form, amount: parseFloat(form.amount) } : t))
      );
      setIsEditing(false);
    } else {
      setTransactions([{ ...form, id: Date.now().toString(), amount: parseFloat(form.amount) }, ...transactions]);
    }

    setForm(initialFormState);
    setIsModalOpen(false);
  };

  const handleEdit = (transaction) => {
    setForm(transaction);
    setIsEditing(true);
    setIsModalOpen(true);
  };

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
      <div className="bg-[#121212] min-h-screen text-[#E0E0E0] p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">💰 Transaction Manager</h2>

        <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-lg border border-[#292929] w-full max-w-4xl overflow-x-auto">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-400">No transactions yet.</p>
          ) : (
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
                {transactions.map((t) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hover:bg-[#1C1C1C]"
                  >
                    <td className="p-2 md:p-3 border border-[#292929]">{t.date}</td>
                    <td className="p-2 md:p-3 border border-[#292929]">{t.description}</td>
                    <td className={`p-2 md:p-3 border border-[#292929] ${t.type === "Income" ? "text-green-400" : "text-red-400"}`}>{t.type}</td>
                    <td className="p-2 md:p-3 border border-[#292929]">₹{t.amount.toFixed(2)}</td>
                    <td className="p-2 md:p-3 border border-[#292929] flex gap-2">
                      <button onClick={() => handleEdit(t)} className="text-[#03DAC6]">✏️</button>
                      <button onClick={() => handleDelete(t.id)} className="text-[#F44336]">🗑️</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 bg-[#4CAF50] text-white p-4 md:p-5 rounded-full shadow-lg hover:bg-[#388E3C]"
        >
          ➕
        </motion.button>

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
                  </select>
                  <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white" />
                  <div className="flex justify-between">
                    <button type="submit" className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#388E3C]">{isEditing ? "Update" : "Add"}</button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-[#F44336] text-white px-4 py-2 rounded hover:bg-[#D32F2F]">Cancel</button>
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

