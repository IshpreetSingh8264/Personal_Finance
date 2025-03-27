import React from 'react'
import Navbar from '../Components/Navbar'
import FinancialDetails from '../Components/Dashboard/FinancialDetails'

function Dashboard() {
    return (
        <div className="bg-[#1E1E1E] min-h-screen">
            <Navbar />
            <FinancialDetails />
            
        </div>
    )
}

export default Dashboard
