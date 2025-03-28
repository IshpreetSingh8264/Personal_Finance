import React, { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2"; // Add this import

// Lazy load Navbar and Footer
const Navbar = lazy(() => import("../Components/Navbar"));
const Footer = lazy(() => import("../Components/Footer"));

export default function FinancialGoals() {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const goalsPerPage = 10;

  // Pagination calculations
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);
  const totalPages = Math.ceil(goals.length / goalsPerPage);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/goals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(response.data.content); // Assuming response.data.content contains the goals array
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals(); // Fetch data immediately
  }, []);

  const initialFormState = {
    id: "",
    goal: "",
    description: "",
    deadline: "",
    completed: false,
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.goal || isNaN(form.goal) || Number(form.goal) <= 0) {
      return alert("A valid goal amount is required!");
    }

    try {
      const token = localStorage.getItem("token");
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_BASE_API_URL}/api/goals/${form.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals((prev) =>
          prev.map((goal) => (goal.id === form.id ? { ...form } : goal))
        );
        setIsEditing(false);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/goals`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals((prev) => [response.data, ...prev]); // Add new goal to the list
      }
      setForm(initialFormState);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };

  const handleEdit = (goal) => {
    setForm(goal);
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
        await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/api/goals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals((prev) => prev.filter((goal) => goal.id !== id));
        Swal.fire("Deleted!", "Your goal has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting goal:", error);
        Swal.fire("Error!", "Failed to delete the goal.", "error");
      }
    }
  };

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  return (
    <>
      <div className="z-999 bg-[#121212] min-h-screen text-[#E0E0E0] font-inter">
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          <Navbar />
        </Suspense>
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
                      <th className="p-2 md:p-3 border border-[#292929]">Amount</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Description</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Deadline</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Status</th>
                      <th className="p-2 md:p-3 border border-[#292929]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentGoals.map((goal) => (
                      <motion.tr
                        key={goal.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-[#1C1C1C]"
                      >
                        <td className="p-2 md:p-3 border border-[#292929]">${goal.goal}</td>
                        <td className="p-2 md:p-3 border border-[#292929]">{goal.description || "No description"}</td>
                        <td className="p-2 md:p-3 border border-[#292929]">
                          {goal.deadline ? (
                            <span className="text-red-500">{`${goal.deadline} days`}</span>
                          ) : (
                            "No deadline"
                          )}
                        </td>
                        <td className="p-2 md:p-3 border border-[#292929]">
                          {goal.completed ? "Completed" : "Not Completed"}
                        </td>
                        <td className="p-2 md:p-3 border border-[#292929] flex justify-evenly gap-2">
                          <button
                            onClick={() => handleEdit(goal)}
                            className="p-2 bg-[#03DAC6] hover:bg-[#00BFA5] text-white rounded transition-all duration-200 ease-in-out transform hover:scale-110 cursor-pointer"
                          >
                            <FaEdit size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(goal.id)}
                            className="p-2 bg-[#F44336] hover:bg-[#D32F2F] text-white rounded transition-all duration-200 ease-in-out transform hover:scale-110 cursor-pointer"
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
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 bg-[#333333] text-white rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-white">Page {currentPage} of {totalPages}</span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setForm(initialFormState);
              setIsEditing(false);
              setIsModalOpen(true);
            }}
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
                      type="number"
                      name="goal" // Represents the amount
                      placeholder="Goal Amount (e.g., 1000)"
                      value={form.goal}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
                    />
                    <textarea
                      name="description"
                      placeholder="Detailed Description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
                    ></textarea>
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
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-[#F44336] text-white px-4 py-2 rounded hover:bg-[#D32F2F]"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#388E3C]">
                        {isEditing ? "Update" : "Add"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
