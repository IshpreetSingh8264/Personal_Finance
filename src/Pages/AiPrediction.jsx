import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const predictions = {
  Cryptocurrency: [
    { name: "Bitcoin", currentPrice: "$62,000", predictedPrice: "$65,500" },
    { name: "Ethereum", currentPrice: "$3,500", predictedPrice: "$3,800" },
    { name: "Solana", currentPrice: "$150", predictedPrice: "$170" },
  ],
  Stock: [
    { name: "Tesla", currentPrice: "$750", predictedPrice: "$800" },
    { name: "Apple", currentPrice: "$160", predictedPrice: "$175" },
    { name: "Amazon", currentPrice: "$3,250", predictedPrice: "$3,400" },
  ],
  Bond: [
    { name: "US Treasury 10Y", currentPrice: "$100", predictedPrice: "$102" },
    { name: "Corporate Bond (AAA)", currentPrice: "$98", predictedPrice: "$101" },
    { name: "Municipal Bond", currentPrice: "$105", predictedPrice: "$107" },
  ],
  Mfund: [
    { name: "Global Equity Fund", currentPrice: "$50", predictedPrice: "$53" },
    { name: "Technology Fund", currentPrice: "$75", predictedPrice: "$80" },
    { name: "Bond Fund", currentPrice: "$98", predictedPrice: "$101" }
  ],
  CFDs: [
    { name: "Tesla CFD", currentPrice: "$765", predictedPrice: "$815" },
    { name: "Apple CFD", currentPrice: "$165", predictedPrice: "$180" },
    { name: "Amazon CFD", currentPrice: "$3,250", predictedPrice: "$3,450" }
  ],

  FixDeposits: [
    { name: "1-Year Fixed Deposit", currentPrice: "$100", predictedPrice: "$102" },
    { name: "2-Year Fixed Deposit", currentPrice: "$98", predictedPrice: "$101" },
    { name: "5-Year Fixed Deposit", currentPrice: "$105", predictedPrice: "$107" }
  ]

};

export default function AIPredictions() {
  return (
    <div className="z-999 bg-[#121212] min-h-screen text-[#E0E0E0] font-inter">
      <Navbar />
      <div className="bg-[#121212] min-h-screen text-[#E0E0E0] flex flex-col items-center px-6 py-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-8 text-center"
        >
          📈 AI Market Predictions
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {Object.entries(predictions).map(([category, items], index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg border border-[#292929] flex flex-col items-center w-full"
            >
              <h3 className="text-xl font-semibold text-[#03DAC6] mb-4">{category}</h3>
              <div className="w-full">
                {items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="w-full p-4 rounded-lg bg-[#1C1C1C] mb-3 last:mb-0"
                  >
                    <p className="text-[#B0B0B0] text-sm">{item.name}</p>
                    <p className="text-[#E0E0E0]">
                      Current Price: <span className="font-bold">{item.currentPrice}</span>
                    </p>
                    <p className="text-[#4CAF50] font-medium">
                      Predicted Price: <span className="font-bold">{item.predictedPrice}</span>
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[#757575] text-sm mt-10 text-center max-w-2xl"
        >
          ⚠️ AI predictions are based on data analysis and may not be accurate. Always do your own research before making financial decisions.
        </motion.p>
      </div>
      <Footer />

    </div>
  );
}
