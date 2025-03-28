import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this import is correct

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from AuthContext

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const contentType = response.headers.get('Content-Type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json(); // Expecting { token: "actual_token", user: {...} }
      } else {
        data = await response.text(); // In case API returns raw JWT
      }

      console.log('Login successful:', data);

      // Ensure token is a string
      const token = typeof data === "string" ? data : data.token;

      if (!token || typeof token !== "string") {
        throw new Error("Invalid token received from API");
      }

      // Store token properly
      localStorage.setItem("token", token);
      login(token); // Pass only the token

      navigate('/'); // Redirect after login
    } catch (error) {
      console.error('Error during login:', error);
    }
  };



  return (
    <div className="flex min-h-screen bg-[var(--background-primary)]">
      <div className="w-full max-w-md mx-auto p-6 flex flex-col justify-center">
        <div className="mt-7 bg-[var(--background-secondary)] border border-[var(--border-dividers)] rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-[var(--headings)]">Sign in</h1>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Don't have an account yet?{' '}
                <Link
                  to="/signup"
                  className="text-[var(--secondary)] decoration-2 hover:underline font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 text-[var(--text-primary)]">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border border-[var(--border-dividers)] rounded-lg text-sm bg-[var(--input-field-background)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="block text-sm mb-2 text-[var(--text-primary)]">Password</label>
                      <a className="text-sm text-[var(--secondary)] decoration-2 hover:underline font-medium" href="#">
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full border border-[var(--border-dividers)] rounded-lg text-sm bg-[var(--input-field-background)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                      required
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-[var(--border-dividers)] rounded text-[var(--primary)] focus:ring-[var(--primary)]"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label htmlFor="rememberMe" className="ml-3 text-sm text-[var(--text-secondary)]">Remember me</label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[var(--button-primary)] text-white hover:bg-[var(--hover-state)]"
                  >
                    Sign in
                  </button>
                </div>
              </form>

             


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
