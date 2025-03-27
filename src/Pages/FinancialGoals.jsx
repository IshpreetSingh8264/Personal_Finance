import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar";

export default function FinancialGoals() {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const goalsPerPage = 5;

  // Pagination calculations
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);
  const totalPages = Math.ceil(goals.length / goalsPerPage);

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem("goals", JSON.stringify(goals));
    }
  }, [goals]);

  const initialFormState = {
    id: "",
    text: "",
    deadline: "",
    completed: false,
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.text.trim()) return alert("Goal description is required!");

    if (isEditing) {
      setGoals((prev) =>
        prev.map((goal) => (goal.id === form.id ? { ...form } : goal))
      );
      setIsEditing(false);
    } else {
      setGoals([{ ...form, id: Date.now().toString() }, ...goals]);
    }

    setForm(initialFormState);
    setIsModalOpen(false);
  };

  const handleEdit = (goal) => {
    setForm(goal);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      const updatedGoals = goals.filter((goal) => goal.id !== id);
      setGoals(updatedGoals);
      localStorage.setItem("goals", JSON.stringify(updatedGoals));
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="bg-[#121212] min-h-screen text-[#E0E0E0] p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">🎯 Financial Goals</h2>

          <div className="bg-[#1E1E1E] p-4 rounded-lg shadow-lg border border-[#292929] w-full max-w-4xl overflow-x-auto">
            {goals.length === 0 ? (
              <p className="text-center text-gray-400">No goals yet.</p>
            ) : (
              <>
                <table className="w-full text-left border-collapse border border-[#292929] text-sm md:text-base">
                  <thead>
                    <tr className="bg-[#1E1E1E] text-white">
                      <th className="p-2 md:p-3 border border-[#292929]">Goal</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Deadline</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Status</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentGoals.map((goal) => (
                      <motion.tr
                        key={goal.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hover:bg-[#1C1C1C]"
                      >
                        <td className="p-2 md:p-3 border border-[#292929]">{goal.text}</td>
                        <td className="p-2 md:p-3 border border-[#292929]">
                          {goal.deadline ? `${goal.deadline} days` : "No deadline"}
                        </td>
                        <td className="p-2 md:p-3 border border-[#292929]">
                          {goal.completed ? "Completed" : "Not Completed"}
                        </td>
                        <td className="p-2 md:p-3 border border-[#292929] flex gap-2">
                          <button onClick={() => handleEdit(goal)} className="text-[#03DAC6]">✏️</button>
                          <button onClick={() => handleDelete(goal.id)} className="text-[#F44336]">🗑️</button>
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
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Goal" : "Add Goal"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="text"
                placeholder="Goal Description"
                value={form.text}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
              />
              <input
                type="number"
                name="deadline"
                placeholder="Deadline (in days)"
                value={form.deadline}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
              />
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  name="completed"
                  checked={form.completed}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                Completed
              </label>
              <div className="flex justify-between">
                <button type="submit" className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#388E3C]">
                  {isEditing ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#F44336] text-white px-4 py-2 rounded hover:bg-[#D32F2F]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
          )}
      </AnimatePresence>
    </div >
    </div >
  </>
  );
}
