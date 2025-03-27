import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, TrendingDown } from "lucide-react";

const recommendations = [
    {
        id: 1,
        title: "Increase Your Savings",
        description: "Consider allocating 10% of your income to a savings account to build financial security.",
        icon: <TrendingUp size={32} color="#00C853" />,
    },
    {
        id: 2,
        title: "Cut Down on Unnecessary Expenses",
        description: "Your entertainment subscriptions make up 15% of your expenses. Reducing this can help you save more.",
        icon: <TrendingDown size={32} color="#F44336" />,
    },
    {
        id: 3,
        title: "Invest Wisely",
        description: "Consider investing in index funds or high-yield savings accounts for better returns over time.",
        icon: <Lightbulb size={32} color="#03DAC6" />,
    }
];

const Recommendations = () => {
    return (
        <div className="bg-[#121212] text-[#E0E0E0] min-h-screen p-6">
            <div className="bg-[#1E1E1E] rounded-xl shadow-sm border border-[#292929] p-6">
                <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Personalized Recommendations</h2>
                <p className="text-[#B0B0B0] mb-6">Based on your spending habits, here are some recommendations to improve your financial health.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recommendations.map((rec) => (
                        <motion.div
                            key={rec.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: rec.id * 0.2 }}
                            className="bg-[#232323] rounded-lg p-5 border border-[#292929] flex items-center gap-4"
                        >
                            <div className="flex-shrink-0">{rec.icon}</div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#FFFFFF]">{rec.title}</h3>
                                <p className="text-[#B0B0B0] mt-1">{rec.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
