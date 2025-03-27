import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const AiChat = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-b from-[#121212] to-[#1E1E1E] min-h-screen flex items-center overflow-hidden justify-center px-6 sm:px-12 md:px-24 lg:px-3">
                <div className="relative w-full h-[80vh] md:h-[85vh] bg-[#1C1C1C] rounded-xl shadow-lg overflow-hidden">
                    {/* Loading Indicator */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#1C1C1C]">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#03DAC6]"></div>
                        </div>
                    )}

                    {/* AI Chat Frame */}
                    <iframe
                        src="http://localhost:3000/"
                        width="100%"
                        height="100%"
                        className="w-full h-full rounded-xl"
                        onLoad={() => setLoading(false)}
                        style={{ border: "none" }}
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default AiChat;
