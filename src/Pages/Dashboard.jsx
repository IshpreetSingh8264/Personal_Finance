import React from 'react'
import Navbar from '../Components/Navbar'
import FinancialDetails from '../Components/Dashboard/FinancialDetails'
import Recommendations from '../Components/Dashboard/Recommendation'

function Dashboard() {
    return (
        <div className="bg-[#1E1E1E] min-h-screen">
            <Navbar />
            <FinancialDetails />
            <Recommendations />

        </div>
    )
}

export default Dashboard
