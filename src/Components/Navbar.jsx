import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for authentication
    const navbarRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }
        // Simulate checking user authentication status
        const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(userLoggedIn);
    }, []);

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload(); // Refresh the page to reflect the changes";
        setIsLoggedIn(false);
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Transaction", path: "/transaction" },
        { name: "AI Chat", path: "/aichat" },
        { name: "AI Analytics", path: "/analytics" },
        { name: "AI Prediction", path: "/prediction" },
        { name: "Financial Goals", path: "/FinancialGoals" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contactus" },
    ];

    return (
        <>
            <header ref={navbarRef} className="fixed top-0 left-0 w-full bg-[#121212] border-b border-[#292929] z-50">
                <nav className="max-w-[85rem] mx-auto px-6 flex items-center justify-between py-3">
                    <Link to="/" className="text-xl font-semibold text-white flex items-center gap-x-2">
                        <img src="images/logo.png" alt="Logo" className="w-30" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="relative text-[#B0B0B0] hover:text-[#4CAF50] transition-all duration-300 font-medium group"
                            >
                                {link.name}
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#4CAF50] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Sign-in/Sign-up or Log-out Buttons */}
                    <div className="hidden sm:flex gap-3">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="py-2 px-4 rounded-lg bg-[#E53935] text-white font-semibold hover:bg-[#D32F2F] transition"
                            >
                                Log out
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="py-2 px-4 rounded-lg border border-[#292929] bg-[#333333] text-[#E0E0E0] hover:bg-[#1E1E1E] transition">
                                    Sign in
                                </Link>
                                <Link to="/signup" className="py-2 px-4 rounded-lg bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C] transition">
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className={`toggle ${isOpen ? "open" : ""} sm:hidden`}>
                        <div className="bars" id="bar1"></div>
                        <div className="bars" id="bar2"></div>
                        <div className="bars" id="bar3"></div>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="sm:hidden absolute top-full left-0 w-full bg-[#121212] border-t border-[#292929] shadow-lg"
                        >
                            <div className="mobile-menu flex flex-col items-center py-4 gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="text-[#B0B0B0] hover:text-[#4CAF50] transition-all duration-300 font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="flex flex-col gap-3 mt-3">
                                    {isLoggedIn ? (
                                        <button
                                            onClick={handleLogout}
                                            className="py-2 px-4 rounded-lg bg-[#E53935] text-white font-semibold hover:bg-[#D32F2F] transition"
                                        >
                                            Log out
                                        </button>
                                    ) : (
                                        <>
                                            <Link to="/login" className="py-2 px-4 rounded-lg border border-[#292929] bg-[#333333] text-[#E0E0E0] hover:bg-[#1E1E1E] transition">
                                                Sign in
                                            </Link>
                                            <Link to="/signup" className="py-2 px-4 rounded-lg bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C] transition">
                                                Sign up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Push Content Down to Avoid Overlapping with Fixed Navbar */}
            <div style={{ height: `${navbarHeight}px` }} aria-hidden="true"></div>
        </>
    );
}
