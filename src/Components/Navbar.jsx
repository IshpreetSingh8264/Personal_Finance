import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-[var(--background-primary)] text-sm py-3 dark:bg-neutral-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center justify-between">
                    {/* Brand logo - left side */}
                    <a
                        className="flex-none text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80"
                        href="#"
                        aria-label="Brand"
                    >
                        <span className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white">
                            <svg
                                className="w-10 h-auto"
                                width={100}
                                height={100}
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width={100} height={100} rx={10} fill="black" />
                                <path
                                    d="M37.656 68V31.6364H51.5764C54.2043 31.6364 56.3882 32.0507 58.1283 32.8793C59.8802 33.696 61.1882 34.8146 62.0523 36.2351C62.9282 37.6555 63.3662 39.2654 63.3662 41.0646C63.3662 42.5443 63.0821 43.8108 62.5139 44.8643C61.9458 45.906 61.1823 46.7524 60.2235 47.4034C59.2646 48.0544 58.1934 48.522 57.0097 48.8061V49.1612C58.2999 49.2322 59.5369 49.6288 60.7206 50.3509C61.9162 51.0611 62.8927 52.0672 63.6503 53.3693C64.4079 54.6714 64.7867 56.2457 64.7867 58.0923C64.7867 59.9744 64.3309 61.6671 63.4195 63.1705C62.508 64.6619 61.1349 65.8397 59.3002 66.7038C57.4654 67.5679 55.1572 68 52.3754 68H37.656ZM44.2433 62.4957H51.3279C53.719 62.4957 55.4413 62.04 56.4948 61.1286C57.5601 60.2053 58.0928 59.0215 58.0928 57.5774C58.0928 56.5002 57.8264 55.5296 57.2938 54.6655C56.7611 53.7895 56.0035 53.103 55.021 52.6058C54.0386 52.0968 52.8667 51.8423 51.5054 51.8423H44.2433V62.4957ZM44.2433 47.1016H50.7597C51.896 47.1016 52.92 46.8944 53.8314 46.4801C54.7429 46.054 55.459 45.4562 55.9798 44.6868C56.5125 43.9055 56.7789 42.9822 56.7789 41.9169C56.7789 40.5083 56.2817 39.3482 55.2874 38.4368C54.3049 37.5253 52.843 37.0696 50.9017 37.0696H44.2433V47.1016Z"
                                    fill="white"
                                />
                            </svg>
                            Brand
                        </span>
                    </a>

                    {/* Mobile menu toggle button */}
                    <div className="sm:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                            id="hs-navbar-example-collapse"
                            aria-expanded={isOpen ? "true" : "false"}
                            aria-controls="hs-navbar-example"
                            aria-label="Toggle navigation"
                        >
                            {isOpen ? (
                                <svg
                                    className="shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            ) : (
                                <svg
                                    className="shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1={3} x2={21} y1={6} y2={6} />
                                    <line x1={3} x2={21} y1={12} y2={12} />
                                    <line x1={3} x2={21} y1={18} y2={18} />
                                </svg>
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </div>

                {/* Navigation links and buttons container */}
                <div
                    id="hs-navbar-example"
                    className={`overflow-hidden transition-all duration-300 sm:block ${isOpen ? "block" : "hidden"}`}
                    aria-labelledby="hs-navbar-example-collapse"
                >
                    <div className="flex flex-col gap-20 mt-5 sm:flex-row sm:items-center sm:justify-center sm:mt-0 sm:ps-5">
                        {/* Center-aligned navigation links */}
                        <div className="flex flex-col sm:flex-row gap-5">
                            <a
                                className="font-medium text-[var(--primary)] focus:outline-none"
                                href="#"
                                aria-current="page"
                            >
                                Landing
                            </a>
                            <a
                                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                                href="#"
                            >
                                Account
                            </a>
                            <a
                                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                                href="#"
                            >
                                Work
                            </a>
                            <a
                                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                                href="#"
                            >
                                Blog
                            </a>
                        </div>

                        {/* Right-aligned sign in/sign up buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                href="#"
                            >
                                Sign in
                            </a>
                            <a
                                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[var(--primary)] text-white hover:bg-[var(--hover-state)] disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                href="#"
                            >
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
