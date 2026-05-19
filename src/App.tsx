import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import POSTerminal from './pages/POSTerminal'
import Inventory from './pages/Inventory'
import Sales from './pages/Sales'
import Reports from './pages/Reports'
import Users from './pages/Users'
import Settings from './pages/Settings'
import AccessDenied from './pages/AccessDenied'
import HRMSOverview from './pages/hrms/HRMSOverview'
import Employees from './pages/hrms/Employees'
import Payroll from './pages/hrms/Payroll'
import Locations from './pages/hrms/Locations'
import Departments from './pages/hrms/Departments'
import Attendance from './pages/hrms/Attendance'
import Roles from './pages/hrms/Roles'

import Blueprint from './pages/Blueprint'
import ERPOverview from './pages/erp/ERPOverview'
import Revenue from './pages/erp/Revenue'
import Expenses from './pages/erp/Expenses'
import Taxpayers from './pages/erp/Taxpayers'
import POSPay from './pages/erp/POSPay'
import Cards from './pages/erp/Cards'
import CashLedger from './pages/erp/CashLedger'
import Banks from './pages/erp/Banks'
import StablecoinWallet from './pages/erp/StablecoinWallet'
import Remittance from './pages/erp/Remittance'

export default function App(): React.ReactElement {
  const { user } = useAuth()

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  const role = user.role
  const isManagerPlus = role !== 'Cashier'
  const isAdmin = role === 'Admin'

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* POS */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pos" element={<POSTerminal />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/reports" element={isManagerPlus ? <Reports /> : <AccessDenied />} />
        <Route path="/users" element={isAdmin ? <Users /> : <AccessDenied />} />
        <Route path="/settings" element={isAdmin ? <Settings /> : <AccessDenied />} />

        {/* HRMS */}
        <Route path="/hrms" element={<HRMSOverview />} />
        <Route path="/hrms/employees" element={<Employees />} />
        <Route path="/hrms/attendance" element={<Attendance />} />
        <Route path="/hrms/payroll" element={isManagerPlus ? <Payroll /> : <AccessDenied />} />
        <Route path="/hrms/departments" element={<Departments />} />
        <Route path="/hrms/locations" element={<Locations />} />
        <Route path="/hrms/roles" element={isAdmin ? <Roles /> : <AccessDenied />} />

        {/* ERP */}
        <Route path="/erp" element={isManagerPlus ? <ERPOverview /> : <AccessDenied />} />
        <Route path="/erp/revenue" element={isManagerPlus ? <Revenue /> : <AccessDenied />} />
        <Route path="/erp/expenses" element={isManagerPlus ? <Expenses /> : <AccessDenied />} />
        <Route path="/erp/taxpayers" element={isAdmin ? <Taxpayers /> : <AccessDenied />} />
        <Route path="/erp/pos-pay" element={<POSPay />} />
        <Route path="/erp/cards" element={isManagerPlus ? <Cards /> : <AccessDenied />} />
        <Route path="/erp/cash" element={isManagerPlus ? <CashLedger /> : <AccessDenied />} />
        <Route path="/erp/banks" element={isAdmin ? <Banks /> : <AccessDenied />} />
        <Route path="/erp/wallet" element={isManagerPlus ? <StablecoinWallet /> : <AccessDenied />} />
        <Route path="/erp/remittance" element={isManagerPlus ? <Remittance /> : <AccessDenied />} />

        {/* Blueprint */}
        <Route path="/blueprint" element={<Blueprint />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MainLayout>
  )
}
