import React from "react";
import { PlusCircle, BarChart, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {

    const Navigator = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#1A1A1A] text-[#E0E0E0] rounded-lg p-6 mx-6 mt-6 shadow-lg border border-[#292929]"
        >
            {/* Centered Heading */}
            <h2 className="text-xl font-semibold text-[#FFFFFF] mb-2 text-center">
                Quick Actions
            </h2>
            <p className="text-[#B0B0B0] text-center mb-4 text-sm">
                Manage your finances efficiently with these quick actions. Stay on top of your transactions, reports, and financial goals.
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Add Transaction */}
                <button onClick={()=>Navigator('/transaction')} className=" cursor-pointer flex items-center gap-3 p-4 bg-[#3D8B40] hover:bg-[#2E6C31] text-white rounded-lg font-medium shadow-md transition">
                    <PlusCircle size={24} /> Add Transaction
                </button>

                {/* View Reports */}
                <button onClick={()=>Navigator('/analytics')} className="flex cursor-pointer items-center gap-3 p-4 bg-[#029C94] hover:bg-[#017D76] text-white rounded-lg font-medium shadow-md transition">
                    <BarChart size={24} /> View Reports
                </button>

                {/* Set Financial Goal */}
                <button onClick={()=>Navigator('/analytics')} className="flex cursor-pointer items-center gap-3 p-4 bg-[#D17D00] hover:bg-[#A66300] text-white rounded-lg font-medium shadow-md transition">
                    <Target size={24} /> Set Financial Goal
                </button>
            </div>
        </motion.div>
    );
};

export default QuickActions;
