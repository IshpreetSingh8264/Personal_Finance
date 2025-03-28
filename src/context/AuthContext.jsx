import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check localStorage for token on app load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken&&localStorage.getItem("isLoggedIn") === "true"&&storedToken!=null) {
            setUser({ token: storedToken }); // Restore user session
        } else {
            setUser(null); // No token found
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");

        setUser({ token }); // Update user state with the token
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null); // Clear user state
    };

    if (loading) return <div>Loading...</div>; // Prevent flickering

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
