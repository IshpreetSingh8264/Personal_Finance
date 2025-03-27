import React, { useState } from "react";
import { Plus, PlusCircle, BarChart, Target, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const Navigator = useNavigate();

    // Toggle FAB Menu
    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <>
            {/* Floating Action Button (FAB) */}
            <div className="fixed bottom-6 right-6 flex flex-col items-end">
                {/* Action Buttons */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="mb-4 flex flex-col gap-3"
                        >
                            {/* Add Transaction */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => Navigator('/transaction')}
                                className="flex items-center gap-3 p-4 bg-[#3D8B40] hover:bg-[#2E6C31] text-white rounded-lg shadow-lg transition"
                            >
                                <PlusCircle size={20} /> Add Transaction
                            </motion.button>

                            {/* View Reports */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => Navigator('/analytics')}
                                className="flex items-center gap-3 p-4 bg-[#029C94] hover:bg-[#017D76] text-white rounded-lg shadow-lg transition"
                            >
                                <BarChart size={20} /> View Reports
                            </motion.button>

                            {/* Set Financial Goal */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => Navigator('/financialgoals')}
                                className="flex items-center gap-3 p-4 bg-[#D17D00] hover:bg-[#A66300] text-white rounded-lg shadow-lg transition"
                            >
                                <Target size={20} /> Set Financial Goal
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FAB Button */}
                <motion.button
                    onClick={toggleExpand}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, rotate: 90 }}
                    className="p-4 rounded-full shadow-xl transition duration-300 bg-[#4CAF50] hover:bg-[#388E3C] text-white flex items-center justify-center"
                >
                    {isExpanded ? <X size={24} /> : <Plus size={24} />}
                </motion.button>
            </div>
        </>
    );
};

export default QuickActions;
