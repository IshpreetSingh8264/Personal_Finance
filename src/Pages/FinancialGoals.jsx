import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../Components/Navbar";

export default function FinancialGoals() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Function to update localStorage (ensures latest state is saved)
  const updateLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleAddOrUpdateTodo = () => {
    if (!input.trim()) return;

    let updatedTodos;
    if (editing) {
      updatedTodos = todos.map((todo) =>
        todo.id === editing ? { ...todo, text: input } : todo
      );
      setEditing(null);
    } else {
      updatedTodos = [{ id: uuidv4(), text: input }, ...todos];
    }

    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos); // Update localStorage immediately
    setInput("");
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInput(todoToEdit.text);
    setEditing(id);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos); // Update localStorage after delete
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] font-inter">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center py-24 bg-[#121212] text-[#E0E0E0]">
        <h1 className="text-2xl font-bold text-white mb-4">Financial Goals</h1>

        {/* Input Section */}
        <div className="bg-[#1E1E1E] p-4 rounded-lg w-full max-w-md shadow-lg border border-[#292929]">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded bg-[#1C1C1C] border border-[#292929] text-white"
            />
            <button
              onClick={handleAddOrUpdateTodo}
              className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#388E3C]"
            >
              {editing ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="mt-4 w-full max-w-md">
          <AnimatePresence>
            {todos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-[#1E1E1E] flex items-center justify-between p-3 rounded-lg mt-2 border border-[#292929]"
              >
                <span>{todo.text}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(todo.id)} className="text-[#03DAC6]">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(todo.id)} className="text-[#F44336]">
                    🗑️
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
