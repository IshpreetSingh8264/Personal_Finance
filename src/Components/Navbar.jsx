import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navbarRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }
    }, []);

    return (
        <>
            {/* Navbar */}
            <header ref={navbarRef} className="fixed top-0 left-0 w-full bg-[#121212] border-b border-[#292929] z-50">
                <nav className="max-w-[85rem] mx-auto px-6 flex items-center justify-between py-3">
                    {/* Brand Logo */}
                    <Link to="/" className="text-xl font-semibold text-white flex items-center gap-x-2">
                        <svg className="w-10 h-auto" width={100} height={100} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width={100} height={100} rx={10} fill="#4CAF50" />
                            <path d="M37.656 68V31.6364H51.5764C54.2043 31.6364 56.3882 32.0507 58.1283 32.8793C59.8802 33.696 61.1882 34.8146 62.0523 36.2351C62.9282 37.6555 63.3662 39.2654 63.3662 41.0646C63.3662 42.5443 63.0821 43.8108 62.5139 44.8643C61.9458 45.906 61.1823 46.7524 60.2235 47.4034C59.2646 48.0544 58.1934 48.522 57.0097 48.8061V49.1612C58.2999 49.2322 59.5369 49.6288 60.7206 50.3509C61.9162 51.0611 62.8927 52.0672 63.6503 53.3693C64.4079 54.6714 64.7867 56.2457 64.7867 58.0923C64.7867 59.9744 64.3309 61.6671 63.4195 63.1705C62.508 64.6619 61.1349 65.8397 59.3002 66.7038C57.4654 67.5679 55.1572 68 52.3754 68H37.656Z" fill="white" />
                        </svg>
                        Brand
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden sm:flex items-center gap-6">
                        {["Home", "Contact Us", "Work", "Blog"].map((item, index) => (
                            <Link key={index} to={item === "Contact Us" ? "/contactus" : "/"} className="relative text-[#B0B0B0] hover:text-[#4CAF50] transition-all duration-300 font-medium group">
                                {item}
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#4CAF50] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Sign in / Sign up */}
                    <div className="hidden sm:flex gap-3">
                        <Link to="/login" className="py-2 px-4 rounded-lg border border-[#292929] bg-[#333333] text-[#E0E0E0] hover:bg-[#1E1E1E] transition">
                            Sign in
                        </Link>
                        <Link to="/signup" className="py-2 px-4 rounded-lg bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C] transition">
                            Sign up
                        </Link>
                    </div>

                    {/* Custom Hamburger Button */}
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
                            <div className="mobile-menu">
                                {["Home", "Contact Us", "Work", "Blog"].map((item, index) => (
                                    <Link key={index} to={item === "Contact Us" ? "/contactus" : "/"} className="text-[#B0B0B0] hover:text-[#4CAF50] transition-all duration-300 font-medium">
                                        {item}
                                    </Link>
                                ))}

                                <div className="flex flex-col gap-3 mt-3 mobile-auth">
                                    <Link to="/login" className="py-2 px-4 rounded-lg border border-[#292929] bg-[#333333] text-[#E0E0E0] hover:bg-[#1E1E1E] transition">
                                        Sign in
                                    </Link>
                                    <Link to="/signup" className="py-2 px-4 rounded-lg bg-[#4CAF50] text-white font-semibold hover:bg-[#388E3C] transition">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Spacer to push content down */}
            <div style={{ height: `${navbarHeight}px` }} aria-hidden="true"></div>
        </>
    );
}
