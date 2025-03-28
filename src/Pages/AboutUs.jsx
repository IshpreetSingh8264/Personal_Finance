import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

const AboutUs = () => {
    return (
        <div className="bg-[#121212] text-[#E0E0E0]">
            <Navbar />

            {/* Large Centered Image Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center mt-8"
            >
                <img
                    src="/images/aboutusinflow.png" // Change this to your desired image URL
                    alt="Inflow Overview"
                    className="max-w-200 rounded-lg" // Ensure the image is responsive
                    loading="lazy" // Lazy-load image for performance
                />
            </motion.div>

            <div className="bg-[#121212] text-[#E0E0E0] min-h-screen py-24 px-8 sm:px-16 md:px-28 lg:px-40 xl:px-52">

                {/* Heading Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl font-bold text-white leading-tight">About Inflow</h1>
                    <p className="text-[#B0B0B0] mt-4 text-xl max-w-2xl mx-auto">
                        AI-powered financial assistant making money management smarter, seamless, and effortless.
                    </p>
                </motion.div>

                {/* Problem Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-col lg:flex-row items-center bg-[#1E1E1E] p-12 rounded-2xl shadow-lg mb-16"
                >
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-semibold text-white">🚀 The Problem</h2>
                        <p className="text-[#B0B0B0] mt-6 text-lg leading-relaxed">
                            Managing personal finances is overwhelming. Traditional expense trackers only record transactions but fail to provide meaningful insights.
                        </p>
                        <ul className="list-disc mt-6 pl-8 text-[#03DAC6] text-lg">
                            <li>🔹 Scattered financial data (bank accounts, UPI, wallets)</li>
                            <li>🔹 Lack of intelligent financial guidance</li>
                            <li>🔹 Inefficient money management leading to poor financial decisions</li>
                        </ul>
                    </div>
                    <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
                        <img src="/images/2.png" alt="Problem Illustration" className="w-full max-w-lg rounded-xl" loading="lazy" />
                    </div>
                </motion.div>

                {/* Solution Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col lg:flex-row-reverse items-center bg-[#1E1E1E] p-12 rounded-2xl shadow-lg mb-16"
                >
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-semibold text-white">💡 The Solution – Inflow</h2>
                        <p className="text-[#B0B0B0] mt-6 text-lg leading-relaxed">
                            Inflow is an AI-powered smart finance assistant that not only tracks expenses but analyzes spending habits and provides actionable insights.
                        </p>
                        <ul className="list-disc mt-6 pl-8 text-[#4CAF50] text-lg">
                            <li>✅ Seamless Bank Integration – Auto-fetches bank transactions</li>
                            <li>✅ AI-Driven Expense Categorization – No manual tagging needed</li>
                            <li>✅ Personalized Financial Insights – Smart budgeting & investments</li>
                        </ul>
                    </div>
                    <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
                        <img src="/images/application.png" alt="Solution Illustration" className="w-full max-w-lg rounded-xl" loading="lazy" />
                    </div>
                </motion.div>

                {/* Market Opportunity */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-[#1E1E1E] p-12 rounded-2xl shadow-lg mb-16 text-center"
                >
                    <h2 className="text-4xl font-semibold text-white">🌍 Market Opportunity</h2>
                    <img src="/images/analytics.png" alt="Market Growth" className="w-full max-w-lg mx-auto my-6 rounded-xl" loading="lazy" />
                    <p className="text-[#B0B0B0] mt-4 text-lg leading-relaxed">
                        The global personal finance software market is expected to reach **$4,221.1 million by 2032**. Inflow targets a growing user base seeking AI-driven financial tools.
                    </p>
                    <p>Source: alliedmarketresearch.com</p>
                </motion.div>

                {/* Business Model */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col lg:flex-row items-center bg-[#1E1E1E] p-12 rounded-2xl shadow-lg mb-16"
                >
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-semibold text-white">💰 Business Model</h2>
                        <ul className="list-disc mt-6 pl-8 text-[#4CAF50] text-lg">
                            <li>💲 **Free Plan**: Expense tracking, AI categorization, bank linking</li>
                            <li>💎 **Pro Plan ($4.99/month)**: Advanced analytics, financial coaching</li>
                            <li>🏦 **Enterprise Partnerships**: AI-powered finance tools for banks & fintech</li>
                        </ul>
                    </div>
                    <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
                        <img src="images/5.png" alt="Business Model" className="w-full max-w-lg rounded-xl" loading="lazy" />
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-center mt-20"
                >
                    <h2 className="text-4xl font-semibold text-white">🚀 Join Us in Transforming Finance!</h2>
                    <p className="text-[#B0B0B0] mt-4 text-lg">
                        Interested in investing or partnering? Let's talk!
                    </p>
                    <Link
                        to="/contactus"
                        className="mt-6 inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white py-4 px-10 rounded-xl text-xl font-medium transition duration-300"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
