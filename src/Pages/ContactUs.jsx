import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import Navbar from "../Components/Navbar";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email address";
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => setSuccess(false), 5000);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4 py-10">
                {/* Page Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-4xl font-bold text-white mb-6 text-center"
                >
                    Contact Us
                </motion.h2>

                {/* Contact Details Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-4xl bg-[#1E1E1E] p-8 rounded-lg shadow-lg mb-6"
                >
                    <h3 className="text-2xl font-semibold text-[#E0E0E0] mb-4">Our Contact Information</h3>
                    <p className="text-[#B0B0B0] mb-4">
                        Have any questions? Feel free to reach out through the following channels.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4">
                            <FiMail className="text-[#03DAC6] text-2xl" />
                            <a href="mailto:borndeveloper@gmail.com" className="text-[#E0E0E0]">borndeveloper@gmail.com</a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FiPhone className="text-[#03DAC6] text-2xl" />
                            <a href="tel:09855801283" className="text-[#E0E0E0]">+91 98558-01283</a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FiMapPin className="text-[#03DAC6] text-2xl" />
                            <p className="text-[#E0E0E0]">123 Main Street, New York</p>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-6 mt-4">
                        <FiFacebook className="text-[#03DAC6] text-2xl cursor-pointer hover:text-[#4CAF50] transition" />
                        <FiInstagram className="text-[#03DAC6] text-2xl cursor-pointer hover:text-[#4CAF50] transition" />
                        <FiTwitter className="text-[#03DAC6] text-2xl cursor-pointer hover:text-[#4CAF50] transition" />
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    className="w-full max-w-4xl bg-[#1E1E1E] p-8 rounded-lg shadow-lg"
                >
                    {success && <p className="text-[#00C853] text-center mb-4">✅ Message sent successfully!</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-[#B0B0B0] mb-2 font-medium">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-[#1C1C1C] text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#292929] focus:outline-none focus:border-[#4CAF50]"
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="text-[#F44336] text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-[#B0B0B0] mb-2 font-medium">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[#1C1C1C] text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#292929] focus:outline-none focus:border-[#4CAF50]"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-[#F44336] text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-[#B0B0B0] mb-2 font-medium">Your Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-[#1C1C1C] text-[#E0E0E0] px-4 py-3 rounded-lg border border-[#292929] focus:outline-none focus:border-[#4CAF50] h-32 resize-none"
                                placeholder="Enter your message"
                            ></textarea>
                            {errors.message && <p className="text-[#F44336] text-sm mt-1">{errors.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white font-medium py-3 rounded-lg transition duration-200"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default ContactUs;
