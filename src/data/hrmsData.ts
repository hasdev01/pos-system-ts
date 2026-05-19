import type {
  Location, Department, Employee, PayrollRun, AttendanceRecord, EmployeeRole,
} from '../types/hrms'

export const locations: Location[] = [
  { id: 1, code: 'KHI-01', name: 'Al-Amin Karachi Main',  city: 'Karachi',   address: 'Shahrah-e-Faisal, Block 6, PECHS',   manager: 'Faisal Mirza',  employees: 18, status: 'Active'   },
  { id: 2, code: 'LHE-01', name: 'Al-Amin Lahore Gulberg', city: 'Lahore',    address: 'MM Alam Road, Gulberg III',          manager: 'Asma Rauf',     employees: 12, status: 'Active'   },
  { id: 3, code: 'ISB-01', name: 'Al-Amin Islamabad F-10', city: 'Islamabad', address: 'F-10 Markaz',                        manager: 'Bilal Ahmed',   employees: 9,  status: 'Active'   },
  { id: 4, code: 'PEW-01', name: 'Al-Amin Peshawar Saddar',city: 'Peshawar',  address: 'Saddar Bazar',                       manager: 'Imran Khattak', employees: 6,  status: 'Inactive' },
]

export const departments: Department[] = [
  { id: 1, name: 'Operations', head: 'Faisal Mirza',  employees: 16, location: 'KHI-01' },
  { id: 2, name: 'Finance',    head: 'Hina Yousaf',   employees: 5,  location: 'KHI-01' },
  { id: 3, name: 'HR',         head: 'Sadia Iqbal',   employees: 3,  location: 'KHI-01' },
  { id: 4, name: 'Sales',      head: 'Asma Rauf',     employees: 14, location: 'LHE-01' },
  { id: 5, name: 'IT',         head: 'Bilal Ahmed',   employees: 4,  location: 'ISB-01' },
]

const roles: EmployeeRole[] = ['Cashier','Sales','Accountant','Manager','Storekeeper','Finance','HR','Admin']

export const employees: Employee[] = [
  { id: 1,  empCode: 'EMP-1001', name: 'Ahmed Ali',     email: 'ahmed@store.pk',     phone: '0300-1234567', cnic: '42101-1234567-1', role: 'Cashier',     department: 'Operations', location: 'KHI-01', joinDate: '2023-04-12', basicSalary: 45000, allowances: 8000,  deductions: 1500, status: 'Active',   avatar: 'AA' },
  { id: 2,  empCode: 'EMP-1002', name: 'Sara Khan',     email: 'sara@store.pk',      phone: '0301-9876543', cnic: '42101-7654321-2', role: 'Cashier',     department: 'Operations', location: 'KHI-01', joinDate: '2024-01-08', basicSalary: 42000, allowances: 6000,  deductions: 1200, status: 'Active',   avatar: 'SK' },
  { id: 3,  empCode: 'EMP-1003', name: 'Usman Raza',    email: 'usman@store.pk',     phone: '0312-5551234', cnic: '35202-1112223-3', role: 'Sales',       department: 'Sales',      location: 'LHE-01', joinDate: '2022-09-30', basicSalary: 55000, allowances: 10000, deductions: 2200, status: 'Active',   avatar: 'UR' },
  { id: 4,  empCode: 'EMP-1004', name: 'Faisal Mirza',  email: 'faisal@store.pk',    phone: '0333-4445566', cnic: '42101-9988776-4', role: 'Manager',     department: 'Operations', location: 'KHI-01', joinDate: '2020-06-15', basicSalary: 120000,allowances: 25000, deductions: 4500, status: 'Active',   avatar: 'FM' },
  { id: 5,  empCode: 'EMP-1005', name: 'Hina Yousaf',   email: 'hina@store.pk',      phone: '0345-1122334', cnic: '42201-3344556-5', role: 'Finance',     department: 'Finance',    location: 'KHI-01', joinDate: '2021-11-02', basicSalary: 95000, allowances: 18000, deductions: 3200, status: 'Active',   avatar: 'HY' },
  { id: 6,  empCode: 'EMP-1006', name: 'Asma Rauf',     email: 'asma@store.pk',      phone: '0321-2233445', cnic: '35202-5566778-6', role: 'Manager',     department: 'Sales',      location: 'LHE-01', joinDate: '2021-03-20', basicSalary: 110000,allowances: 22000, deductions: 4100, status: 'Active',   avatar: 'AR' },
  { id: 7,  empCode: 'EMP-1007', name: 'Bilal Ahmed',   email: 'bilal@store.pk',     phone: '0301-7788990', cnic: '61101-1212121-7', role: 'Manager',     department: 'IT',         location: 'ISB-01', joinDate: '2022-01-10', basicSalary: 130000,allowances: 28000, deductions: 4800, status: 'Active',   avatar: 'BA' },
  { id: 8,  empCode: 'EMP-1008', name: 'Sadia Iqbal',   email: 'sadia@store.pk',     phone: '0300-9999999', cnic: '42101-8765432-8', role: 'HR',          department: 'HR',         location: 'KHI-01', joinDate: '2023-07-05', basicSalary: 75000, allowances: 12000, deductions: 2400, status: 'Active',   avatar: 'SI' },
  { id: 9,  empCode: 'EMP-1009', name: 'Imran Khattak', email: 'imran@store.pk',     phone: '0334-5566778', cnic: '17301-2323232-9', role: 'Manager',     department: 'Operations', location: 'PEW-01', joinDate: '2020-12-01', basicSalary: 90000, allowances: 16000, deductions: 3000, status: 'On Leave', avatar: 'IK' },
  { id: 10, empCode: 'EMP-1010', name: 'Mehwish Tariq', email: 'mehwish@store.pk',   phone: '0312-1010101', cnic: '42101-4040404-0', role: 'Accountant',  department: 'Finance',    location: 'KHI-01', joinDate: '2024-02-14', basicSalary: 65000, allowances: 10000, deductions: 2100, status: 'Active',   avatar: 'MT' },
  { id: 11, empCode: 'EMP-1011', name: 'Tariq Mehmood', email: 'tariq@store.pk',     phone: '0301-2020202', cnic: '35202-7070707-1', role: 'Storekeeper', department: 'Operations', location: 'LHE-01', joinDate: '2023-09-01', basicSalary: 38000, allowances: 5000,  deductions: 900,  status: 'Active',   avatar: 'TM' },
  { id: 12, empCode: 'EMP-1012', name: 'Nida Bashir',   email: 'nida@store.pk',      phone: '0345-3030303', cnic: '61101-8080808-2', role: 'Sales',       department: 'Sales',      location: 'ISB-01', joinDate: '2024-05-22', basicSalary: 48000, allowances: 7000,  deductions: 1300, status: 'Active',   avatar: 'NB' },
]

void roles

export const payrollRuns: PayrollRun[] = [
  { id: 'PR-2026-04', month: '2026-04', location: 'All',    employees: 45, gross: 3_180_000, deductions: 95_000,  tax: 254_000, net: 2_831_000, status: 'Paid',      runDate: '2026-04-30', runBy: 'Hina Yousaf'   },
  { id: 'PR-2026-03', month: '2026-03', location: 'All',    employees: 44, gross: 3_120_000, deductions: 92_000,  tax: 249_600, net: 2_778_400, status: 'Paid',      runDate: '2026-03-30', runBy: 'Hina Yousaf'   },
  { id: 'PR-2026-02', month: '2026-02', location: 'All',    employees: 43, gross: 3_040_000, deductions: 90_000,  tax: 243_200, net: 2_706_800, status: 'Paid',      runDate: '2026-02-28', runBy: 'Hina Yousaf'   },
  { id: 'PR-KHI-2026-05', month: '2026-05', location: 'KHI-01', employees: 18, gross: 1_240_000, deductions: 36_000, tax: 99_200, net: 1_104_800, status: 'Processed', runDate: '2026-05-14', runBy: 'Mehwish Tariq' },
  { id: 'PR-LHE-2026-05', month: '2026-05', location: 'LHE-01', employees: 12, gross:   860_000, deductions: 24_500, tax: 68_800, net:   766_700, status: 'Draft',     runDate: '2026-05-14', runBy: 'Mehwish Tariq' },
]

export const attendance: AttendanceRecord[] = [
  { id: 1, empCode: 'EMP-1001', name: 'Ahmed Ali',     date: '2026-05-15', checkIn: '09:02', checkOut: '18:05', hours: 9.0, status: 'Present' },
  { id: 2, empCode: 'EMP-1002', name: 'Sara Khan',     date: '2026-05-15', checkIn: '09:14', checkOut: '18:10', hours: 8.9, status: 'Late'    },
  { id: 3, empCode: 'EMP-1003', name: 'Usman Raza',    date: '2026-05-15', checkIn: '08:55', checkOut: '17:58', hours: 9.0, status: 'Present' },
  { id: 4, empCode: 'EMP-1004', name: 'Faisal Mirza',  date: '2026-05-15', checkIn: '08:48', checkOut: '19:20', hours: 10.5,status: 'Present' },
  { id: 5, empCode: 'EMP-1005', name: 'Hina Yousaf',   date: '2026-05-15', checkIn: '09:05', checkOut: '18:00', hours: 8.9, status: 'Present' },
  { id: 6, empCode: 'EMP-1009', name: 'Imran Khattak', date: '2026-05-15', checkIn: '-',     checkOut: '-',     hours: 0,   status: 'Leave'   },
  { id: 7, empCode: 'EMP-1008', name: 'Sadia Iqbal',   date: '2026-05-15', checkIn: '-',     checkOut: '-',     hours: 0,   status: 'Absent'  },
  { id: 8, empCode: 'EMP-1010', name: 'Mehwish Tariq', date: '2026-05-15', checkIn: '09:00', checkOut: '18:02', hours: 9.0, status: 'Present' },
]

export const ROLE_PERMISSIONS: Record<EmployeeRole, string[]> = {
  Admin:       ['*'],
  Manager:     ['hrms.view','hrms.employees','hrms.attendance','erp.view','erp.revenue','erp.expenses'],
  Finance:     ['hrms.payroll.view','hrms.payroll.run','erp.view','erp.revenue','erp.expenses','erp.taxpayers','erp.cash'],
  HR:          ['hrms.view','hrms.employees','hrms.attendance','hrms.departments'],
  Accountant:  ['erp.view','erp.revenue','erp.expenses','erp.cash','hrms.payroll.view'],
  Cashier:     ['pos.use','erp.pos-pay'],
  Sales:       ['pos.use','erp.pos-pay','erp.revenue.view'],
  Storekeeper: ['pos.use','inventory.view'],
}
