import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';

const BankAccountLinking = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkedAccounts, setLinkedAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
        ifscCode: '',
        accountType: 'Savings',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate form
        if (!form.bankName || !form.accountNumber || !form.accountHolderName || !form.ifscCode) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in all required fields!',
                background: '#1E1E1E',
                color: '#E0E0E0',
                confirmButtonColor: '#4CAF50'
            });
            setIsLoading(false);
            return;
        }

        try {
            // Mock API call - replace with your actual endpoint
            const token = localStorage.getItem("token");
            // const response = await axios.post(${import.meta.env.VITE_BASE_API_URL}/api/bank-accounts, form, {
            //   headers: { Authorization: Bearer ${token} },
            // });

            // Mock response for demo
            const mockResponse = {
                id: Date.now().toString(),
                ...form,
                accountNumber: form.accountNumber.replace(/\d(?=\d{4})/g, "*") // Mask account number
            };

            // Add the new account to the list
            setLinkedAccounts([...linkedAccounts, mockResponse]);

            // Reset form and close modal
            setForm({
                bankName: '',
                accountNumber: '',
                accountHolderName: '',
                ifscCode: '',
                accountType: 'Savings',
                username: '',
                password: ''
            });

            setIsModalOpen(false);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Bank account linked successfully!',
                background: '#1E1E1E',
                color: '#E0E0E0',
                confirmButtonColor: '#4CAF50'
            });
        } catch (error) {
            console.error('Error linking bank account:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to link bank account. Please try again.',
                background: '#1E1E1E',
                color: '#E0E0E0',
                confirmButtonColor: '#4CAF50'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen text-[#E0E0E0] p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">🏦 Bank Account Management</h2>

            {/* Linked Accounts Display */}
            <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg border border-[#292929] w-full max-w-4xl mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Linked Accounts</h3>

                {linkedAccounts.length === 0 ? (
                    <p className="text-center text-gray-400 py-4">No bank accounts linked yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {linkedAccounts.map((account) => (
                            <motion.div
                                key={account.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#232323] p-4 rounded-lg border border-[#292929]"
                            >
                                <h4 className="text-white font-medium text-lg">{account.bankName}</h4>
                                <div className="mt-2 space-y-1">
                                    <p className="text-sm text-[#E0E0E0]"><span className="text-gray-400">Account Holder:</span> {account.accountHolderName}</p>
                                    <p className="text-sm text-[#E0E0E0]"><span className="text-gray-400">Account Number:</span> {account.accountNumber}</p>
                                    <p className="text-sm text-[#E0E0E0]"><span className="text-gray-400">IFSC:</span> {account.ifscCode}</p>
                                    <p className="text-sm text-[#E0E0E0]"><span className="text-gray-400">Type:</span> {account.accountType}</p>
                                </div>
                                <div className="flex justify-end mt-3">
                                    <button
                                        onClick={() => {
                                            // Handle remove account logic
                                            setLinkedAccounts(linkedAccounts.filter(a => a.id !== account.id));
                                        }}
                                        className="text-[#F44336] text-sm hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add New Bank Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-[#4CAF50] text-white py-3 px-6 rounded-lg hover:bg-[#388E3C] shadow-md flex items-center"
            >
                <span className="mr-2">+</span>
                Link New Bank Account
            </motion.button>

            {/* Modal for Adding/Linking Bank Account */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#1E1E1E] p-6 rounded-lg shadow-xl w-11/12 max-w-md border border-[#292929]"
                        >
                            <h2 className="text-xl font-bold mb-6 text-white">Link Bank Account</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Bank Name *</label>
                                    <input
                                        type="text"
                                        name="bankName"
                                        placeholder="e.g. HDFC Bank"
                                        value={form.bankName}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded bg-[#1C1C1C] border border-[#292929] text-white focus:border-[#4CAF50] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Account Number *</label>
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        placeholder="Enter account number"
                                        value={form.accountNumber}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded bg-[#1C1C1C] border border-[#292929] text-white focus:border-[#4CAF50] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Account Holder Name *</label>
                                    <input
                                        type="text"
                                        name="accountHolderName"
                                        placeholder="Full name as per bank records"
                                        value={form.accountHolderName}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded bg-[#1C1C1C] border border-[#292929] text-white focus:border-[#4CAF50] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">IFSC Code *</label>
                                    <input
                                        type="text"
                                        name="ifscCode"
                                        placeholder="e.g. HDFC0001234"
                                        value={form.ifscCode}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded bg-[#1C1C1C] border border-[#292929] text-white focus:border-[#4CAF50] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Account Type *</label>
                                    <select
                                        name="accountType"
                                        value={form.accountType}
                                        onChange={handleChange}
                                        className="w-full p-3 rounded bg-[#1C1C1C] border border-[#292929] text-white focus:border-[#4CAF50] focus:outline-none"
                                    >
                                        <option value="Savings">Savings</option>
                                        <option value="Current">Current</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Fixed Deposit">Fixed Deposit</option>
                                    </select>
                                </div>

                                <div className="border-t border-[#292929] pt-4 mt-4">
                                    <h3 className="text-sm font-medium text-white mb-3">Online Banking Credentials (Optional)</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Username/Customer ID</label>
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Online banking username"
                                                value={form.username}
                                                onChange={handleChange}
                                                className="w-full p-3 rounded bg-[#1C1C1C] border border-[#292929] text-white focus:border-[#4CAF50] focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={form.password}
                                                onChange={handleChange}
                                                className="w-full p-3 rounded bg-[#1C1C1C] border border-[#292929] text-white focus:border-[#4CAF50] focus:outline-none"
                                            />
                                            <p className="text-xs text-[#F44336] mt-1">
                                                ⚠ Sharing banking credentials is risky. We recommend manual transaction entry instead.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-[#333333] text-white rounded hover:bg-[#444444] transition-colors"
                                    >
                                        Cancel
                                    </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 bg-[#4CAF50] text-white rounded hover:bg-[#388E3C] transition-colors flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                                    {isLoading && (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    Link Account
                                </button>
                            </div>
                        </form>
                    </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
    </div >
  );
};

export default BankAccountLinking;