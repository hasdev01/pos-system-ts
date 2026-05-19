import type { RevenueEntry, ExpenseEntry, Taxpayer, CardTxn, CashEntry } from '../types/erp'

export const revenueEntries: RevenueEntry[] = [
  { id: 'REV-5001', date: '2026-05-15', source: 'POS Sales',  location: 'KHI-01', amount: 184_500, tax: 31_365, net: 153_135 },
  { id: 'REV-5002', date: '2026-05-15', source: 'POS Sales',  location: 'LHE-01', amount: 142_300, tax: 24_191, net: 118_109 },
  { id: 'REV-5003', date: '2026-05-15', source: 'Online',     location: 'KHI-01', amount:  56_800, tax:  9_656, net:  47_144 },
  { id: 'REV-5004', date: '2026-05-14', source: 'Wholesale',  location: 'ISB-01', amount: 312_000, tax: 53_040, net: 258_960 },
  { id: 'REV-5005', date: '2026-05-14', source: 'POS Sales',  location: 'KHI-01', amount: 178_900, tax: 30_413, net: 148_487 },
  { id: 'REV-5006', date: '2026-05-13', source: 'Service',    location: 'KHI-01', amount:  42_000, tax:  7_140, net:  34_860 },
  { id: 'REV-5007', date: '2026-05-13', source: 'POS Sales',  location: 'PEW-01', amount:  68_500, tax: 11_645, net:  56_855 },
]

export const expenseEntries: ExpenseEntry[] = [
  { id: 'EXP-7001', date: '2026-05-15', category: 'Utilities',   vendor: 'K-Electric',           location: 'KHI-01', amount:  48_000, status: 'Paid'    },
  { id: 'EXP-7002', date: '2026-05-14', category: 'Rent',        vendor: 'Block 6 Properties',   location: 'KHI-01', amount: 250_000, status: 'Paid'    },
  { id: 'EXP-7003', date: '2026-05-14', category: 'Inventory',   vendor: 'Unilever PK',          location: 'LHE-01', amount: 412_500, status: 'Paid'    },
  { id: 'EXP-7004', date: '2026-05-13', category: 'Marketing',   vendor: 'Meta Ads',             location: 'KHI-01', amount:  85_000, status: 'Pending' },
  { id: 'EXP-7005', date: '2026-05-12', category: 'Maintenance', vendor: 'Cool Air Services',    location: 'ISB-01', amount:  22_500, status: 'Paid'    },
  { id: 'EXP-7006', date: '2026-05-10', category: 'Utilities',   vendor: 'SSGC',                 location: 'KHI-01', amount:  14_300, status: 'Overdue' },
  { id: 'EXP-7007', date: '2026-05-08', category: 'Salaries',    vendor: 'Payroll PR-2026-04',   location: 'KHI-01', amount: 2_831_000, status: 'Paid'  },
]

export const taxpayers: Taxpayer[] = [
  { id: 1, ntn: '3456789-1', name: 'Al-Amin Stores (Pvt) Ltd', type: 'Sales Tax',  period: '2026-04', taxable: 3_180_000, taxDue: 540_600,  paid: 540_600,  status: 'Filed',   fbrRef: 'FBR-STR-2026-04-994532' },
  { id: 2, ntn: '3456789-1', name: 'Al-Amin Stores (Pvt) Ltd', type: 'Income Tax', period: '2026-Q1', taxable: 8_240_000, taxDue: 1_236_000,paid: 1_236_000,status: 'Filed',   fbrRef: 'FBR-INC-2026-Q1-114421' },
  { id: 3, ntn: '3456789-1', name: 'Al-Amin Stores (Pvt) Ltd', type: 'WHT',        period: '2026-04', taxable:   254_000, taxDue: 25_400,   paid: 0,        status: 'Pending', fbrRef: '-' },
  { id: 4, ntn: '3456789-1', name: 'Al-Amin Stores (Pvt) Ltd', type: 'Sales Tax',  period: '2026-05', taxable: 1_184_000, taxDue: 201_280,  paid: 0,        status: 'Pending', fbrRef: '-' },
  { id: 5, ntn: '3456789-1', name: 'Al-Amin Stores (Pvt) Ltd', type: 'Sales Tax',  period: '2026-03', taxable: 3_040_000, taxDue: 516_800,  paid: 0,        status: 'Overdue', fbrRef: '-' },
]

export const cardTxns: CardTxn[] = [
  { id: 'CRD-8001', date: '2026-05-15 11:05', cardLast4: '4421', cardBrand: 'Visa',       holder: 'Customer #1023', amount:  1480, status: 'Approved', terminal: 'POS-KHI-01' },
  { id: 'CRD-8002', date: '2026-05-15 12:30', cardLast4: '8821', cardBrand: 'Mastercard', holder: 'Customer #1024', amount:   740, status: 'Approved', terminal: 'POS-KHI-01' },
  { id: 'CRD-8003', date: '2026-05-15 14:12', cardLast4: '6633', cardBrand: 'UnionPay',   holder: 'Customer #1025', amount:  2210, status: 'Approved', terminal: 'POS-LHE-01' },
  { id: 'CRD-8004', date: '2026-05-15 15:48', cardLast4: '1199', cardBrand: 'Visa',       holder: 'Customer #1026', amount:   450, status: 'Declined', terminal: 'POS-LHE-01' },
  { id: 'CRD-8005', date: '2026-05-15 16:55', cardLast4: '5577', cardBrand: 'Mastercard', holder: 'Customer #1027', amount:  3120, status: 'Approved', terminal: 'POS-ISB-01' },
]

export const cashLedger: CashEntry[] = [
  { id: 'CSH-9001', date: '2026-05-15 09:00', type: 'In',  description: 'Opening Float',           amount: 25_000, balance: 25_000, by: 'Ahmed Ali'    },
  { id: 'CSH-9002', date: '2026-05-15 10:23', type: 'In',  description: 'Sale ORD-1001',           amount:  1_480, balance: 26_480, by: 'Ahmed Ali'    },
  { id: 'CSH-9003', date: '2026-05-15 11:48', type: 'In',  description: 'Sale ORD-1003',           amount:  2_210, balance: 28_690, by: 'Sara Khan'    },
  { id: 'CSH-9004', date: '2026-05-15 13:00', type: 'Out', description: 'Petty cash - cleaning',   amount:    800, balance: 27_890, by: 'Faisal Mirza' },
  { id: 'CSH-9005', date: '2026-05-15 13:15', type: 'In',  description: 'Sale ORD-1005',           amount:  1_890, balance: 29_780, by: 'Ahmed Ali'    },
  { id: 'CSH-9006', date: '2026-05-15 17:30', type: 'Out', description: 'Bank deposit',            amount: 20_000, balance:  9_780, by: 'Hina Yousaf'  },
]
