import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup form submitted:', formData);
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
                  to="/login" 
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
                        I accept the <a className="text-[#03DAC6] decoration-2 hover:underline font-medium dark:text-[#03DAC6]" href="#">Terms and Conditions</a>
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

              {/* Divider */}
              <div className="py-3 flex items-center text-xs text-[#757575] uppercase before:flex-[1_1_0%] before:border-t before:border-[#292929] before:me-6 after:flex-[1_1_0%] after:border-t after:border-[#292929] after:ms-6 dark:text-[#757575] dark:before:border-[#292929] dark:after:border-[#292929]">
                Or
              </div>

              {/* Social signup buttons */}
              <div className="grid grid-cols-2 gap-x-2">
                <button
                  type="button"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-[#333333] shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#4CAF50] transition-all text-sm dark:bg-[#1C1C1C] dark:hover:bg-[#292929] dark:border-[#292929] dark:text-[#E0E0E0] dark:hover:text-white dark:focus:ring-offset-[#292929]"
                >
                  <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                    <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
                    <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
                    <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
                    <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
                  </svg>
                  Sign up with Google
                </button>
                <button
                  type="button"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-[#333333] shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#4CAF50] transition-all text-sm dark:bg-[#1C1C1C] dark:hover:bg-[#292929] dark:border-[#292929] dark:text-[#E0E0E0] dark:hover:text-white dark:focus:ring-offset-[#292929]"
                >
                  <svg className="w-4 h-auto" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1543 0C4.6293 0 0.154298 4.475 0.154298 10C0.153164 12.0993 0.813112 14.1456 2.04051 15.8487C3.26792 17.5517 5.00044 18.8251 6.9923 19.488C7.4923 19.575 7.6793 19.275 7.6793 19.012C7.6793 18.775 7.6663 17.988 7.6663 17.15C5.1543 17.613 4.5043 16.538 4.3043 15.975C4.1913 15.687 3.7043 14.8 3.2793 14.562C2.9293 14.375 2.4293 13.912 3.2663 13.9C4.0543 13.887 4.6163 14.625 4.8043 14.925C5.7043 16.437 7.1423 16.012 7.7163 15.75C7.8043 15.1 8.0663 14.663 8.3543 14.413C6.1293 14.163 3.8043 13.3 3.8043 9.475C3.8043 7.888 4.5243 6.588 5.6793 5.875C5.6173 5.65 5.4293 4.875 5.9293 4.688C6.5793 4.513 7.0293 5.2 8.2663 5.487C9.2163 5.738 10.5793 6.537 11.2043 7.325C11.6663 6.987 11.8043 5.5 12.2043 4.862C13.3923 3.775 14.5293 2.887 15.7033 2.987C17.4363 3.012 18.7043 3.312 19.2043 4.225C19.4293 4.488 19.6543 5.625 19.2043 6.25C17.9273 8.225 15.4763 8.225 15.2043 10C15.0293 12.463 12.6583 14.325 9.2043 14.325C9.2043 17.15 8.2043 18.438 7.0043 19.45C5.8043 19.575 4.8043 19.25 3.8043 18.475C1.0543 18.075 0.1543 16.55 0.1543 15.7C0.1543 14.5 2.2043 13.425 2.0043 10.4C2.0043 6.5 3.0543 5.8 5.2043 3.6C7.1163 2.25 8.5793 2.75 9.5293 2.4C9.5543 2.375 10.2043 2.775 10.2043 3.025C10.2043 3.275 9.9543 4.325 9.2043 5.025C10.4543 4.975 10.9043 4.625 11.0043 5.225C11.4043 6.475 10.6543 8.625 10.1543 10Z" fill="#4285F4"/>
                  </svg>
                  Sign up with Facebook
                </button>
              </div>
              {/* End Social signup buttons */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Signup