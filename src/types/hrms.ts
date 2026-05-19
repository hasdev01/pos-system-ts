export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated'
export type EmployeeRole =
  | 'Admin'
  | 'Manager'
  | 'Finance'
  | 'HR'
  | 'Cashier'
  | 'Accountant'
  | 'Sales'
  | 'Storekeeper'

export interface Location {
  id: number
  code: string
  name: string
  city: string
  address: string
  manager: string
  employees: number
  status: 'Active' | 'Inactive'
}

export interface Department {
  id: number
  name: string
  head: string
  employees: number
  location: string
}

export interface Employee {
  id: number
  empCode: string
  name: string
  email: string
  phone: string
  cnic: string
  role: EmployeeRole
  department: string
  location: string
  joinDate: string
  basicSalary: number
  allowances: number
  deductions: number
  status: EmployeeStatus
  avatar: string
}

export type PayrollStatus = 'Draft' | 'Processed' | 'Paid'

export interface PayrollRun {
  id: string
  month: string
  location: string
  employees: number
  gross: number
  deductions: number
  tax: number
  net: number
  status: PayrollStatus
  runDate: string
  runBy: string
}

export interface PayrollLine {
  empCode: string
  name: string
  role: EmployeeRole
  basic: number
  allowances: number
  deductions: number
  tax: number
  net: number
}

export interface AttendanceRecord {
  id: number
  empCode: string
  name: string
  date: string
  checkIn: string
  checkOut: string
  hours: number
  status: 'Present' | 'Absent' | 'Late' | 'Leave'
}
