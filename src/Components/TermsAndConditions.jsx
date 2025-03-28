import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
    return (
        <div className="bg-[#121212] min-h-screen text-[#E0E0E0] p-6">
            <h1 className="text-4xl font-bold text-[#FFFFFF] mb-6 text-center">Terms and Conditions for Inflow Project</h1>

            <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg border border-[#292929]">
                <h2 className="text-2xl font-semibold text-[#FFFFFF]">1. Acceptance of Terms</h2>
                <p className="text-[#B0B0B0] mt-2">
                    By accessing and using the Inflow application, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use the application.
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">2. Use of the Application</h2>
                <p className="text-[#B0B0B0] mt-2">
                    The Inflow application is designed for personal finance management and provides features including but not limited to transaction tracking, budgeting, investment recommendations, and financial insights.
                </p>
                <p className="text-[#B0B0B0] mt-2">
                    Users must create an account to access the full features of the application. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">3. User Responsibilities</h2>
                <p className="text-[#B0B0B0] mt-2">
                    You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p className="text-[#B0B0B0] mt-2">
                    You are responsible for all activities that occur under your account. You agree to notify Inflow immediately of any unauthorized use of your account or any other breach of security.
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">4. Data Privacy</h2>
                <p className="text-[#B0B0B0] mt-2">
                    Inflow respects your privacy. By using the application, you consent to the collection, use, and sharing of your personal data as outlined in our Privacy Policy.
                </p>
                <p className="text-[#B0B0B0] mt-2">
                    The application may collect and store financial data and personal information to provide services, analyze user behavior, and improve the application.
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">5. Intellectual Property Rights</h2>
                <p className="text-[#B0B0B0] mt-2">
                    All content, trademarks, and other intellectual property rights in the Inflow application, including but not limited to text, graphics, logos, and software, are owned by or licensed to Inflow.
                </p>
                <p className="text-[#B0B0B0] mt-2">
                    You may not reproduce, distribute, modify, or create derivative works from any content without the express written permission of Inflow.
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">6. Disclaimers</h2>
                <p className="text-[#B0B0B0] mt-2">
                    The financial insights and recommendations provided by Inflow are for informational purposes only and should not be considered as financial advice. Users should consult with a qualified financial advisor before making any financial decisions.
                </p>
                <p className="text-[#B0B0B0] mt-2">
                    Inflow does not guarantee the accuracy or completeness of any financial data, insights, or recommendations provided through the application.
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">7. Limitation of Liability</h2>
                <p className="text-[#B0B0B0] mt-2">
                    Inflow shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the application, including but not limited to loss of data, profits, or other intangibles.
                </p>
                <p className="text-[#B0B0B0] mt-2">
                    Inflow is not responsible for any losses or damages resulting from unauthorized access to or use of our servers and/or any personal information stored therein.
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">8. Termination</h2>
                <p className="text-[#B0B0B0] mt-2">
                    Inflow reserves the right to terminate or suspend your account and access to the application immediately, without prior notice or liability, for any reason, including if you breach these Terms and Conditions.
                </p>
                <p className="text-[#B0B0B0] mt-2">
                    Upon termination, your right to use the application will immediately cease.
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">9. Modifications to Terms</h2>
                <p className="text-[#B0B0B0] mt-2">
                    Inflow reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the application. Your continued use of the application after any changes constitutes your acceptance of the new Terms and Conditions.
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">10. Governing Law</h2>
                <p className="text-[#B0B0B0] mt-2">
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of Indian Government. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
                </p>

                <h2 className="text-2xl font-semibold text-[#FFFFFF] mt-4">11. Contact Information</h2>
                <p className="text-[#B0B0B0] mt-2">
                    For any questions regarding these Terms and Conditions, please contact us at borndeveloper@gmail.com.
                </p>
            </div>
            <div className="ms-3">
                <label htmlFor="agreeTerms" className="text-sm text-[#E0E0E0]">
                    Back to sign up <Link className="text-[#03DAC6] decoration-2 hover:underline font-medium dark:text-[#03DAC6]" to="/signup">Sign Up</Link>
                </label>
            </div>
        </div>
    );
};

export default TermsAndConditions;
