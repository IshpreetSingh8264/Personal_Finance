import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '', // Added name field
    agreeTerms: false
  });

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
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name, // Use name field
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      console.log('Signup successful:', data);
      // Handle successful signup (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex min-h-screen bg-[#121212] dark:bg-[#121212]">
      <div className="w-full max-w-md mx-auto p-6 flex flex-col justify-center">
        <div className="mt-7 bg-[#1E1E1E] border border-[#292929] rounded-xl shadow-sm dark:bg-[#1E1E1E] dark:border-[#292929]">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-[#FFFFFF]">Sign up</h1>
              <p className="mt-2 text-sm text-[#B0B0B0]">
                Already have an account?{' '}
                <Link 
                  to="/signin" 
                  className="text-[#03DAC6] decoration-2 hover:underline font-medium dark:text-[#03DAC6]"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2 text-[#B0B0B0]">Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="py-3 px-4 block w-full border border-[#292929] rounded-lg text-sm focus:border-[#4CAF50] focus:ring-[#4CAF50] dark:bg-[#1C1C1C] dark:border-[#292929] dark:text-[#E0E0E0] dark:focus:ring-[#4CAF50]"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2 text-[#B0B0B0]">Email address</label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="py-3 px-4 block w-full border border-[#292929] rounded-lg text-sm focus:border-[#4CAF50] focus:ring-[#4CAF50] dark:bg-[#1C1C1C] dark:border-[#292929] dark:text-[#E0E0E0] dark:focus:ring-[#4CAF50]"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm mb-2 text-[#B0B0B0]">Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="py-3 px-4 block w-full border border-[#292929] rounded-lg text-sm focus:border-[#4CAF50] focus:ring-[#4CAF50] dark:bg-[#1C1C1C] dark:border-[#292929] dark:text-[#E0E0E0] dark:focus:ring-[#4CAF50]"
                        required
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm mb-2 text-[#B0B0B0]">Confirm Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="py-3 px-4 block w-full border border-[#292929] rounded-lg text-sm focus:border-[#4CAF50] focus:ring-[#4CAF50] dark:bg-[#1C1C1C] dark:border-[#292929] dark:text-[#E0E0E0] dark:focus:ring-[#4CAF50]"
                        required
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-[#292929] rounded text-[#4CAF50] focus:ring-[#4CAF50] dark:bg-[#1C1C1C] dark:border-[#292929] dark:checked:bg-[#4CAF50] dark:checked:border-[#4CAF50] dark:focus:ring-offset-[#292929]"
                        required
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="ms-3">
                      <label htmlFor="agreeTerms" className="text-sm text-[#E0E0E0]">
                        I accept the <Link className="text-[#03DAC6] decoration-2 hover:underline font-medium dark:text-[#03DAC6]" to="/termsandconditions">Terms and Conditions</Link>
                      </label>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#4CAF50] text-white hover:bg-[#388E3C] disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-[#292929]"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              {/* End Form */}

       
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Signup