export interface RevenueEntry {
  id: string
  date: string
  source: 'POS Sales' | 'Online' | 'Wholesale' | 'Service'
  location: string
  amount: number
  tax: number
  net: number
}

export interface ExpenseEntry {
  id: string
  date: string
  category: 'Rent' | 'Utilities' | 'Salaries' | 'Inventory' | 'Marketing' | 'Maintenance' | 'Other'
  vendor: string
  location: string
  amount: number
  status: 'Paid' | 'Pending' | 'Overdue'
}

export type TaxpayerStatus = 'Filed' | 'Pending' | 'Overdue'

export interface Taxpayer {
  id: number
  ntn: string
  name: string
  type: 'Sales Tax' | 'Income Tax' | 'WHT'
  period: string
  taxable: number
  taxDue: number
  paid: number
  status: TaxpayerStatus
  fbrRef: string
}

export type PaymentMethod = 'Cash' | 'Card' | 'Bank Transfer' | 'JazzCash' | 'EasyPaisa'

export interface CardTxn {
  id: string
  date: string
  cardLast4: string
  cardBrand: 'Visa' | 'Mastercard' | 'UnionPay'
  holder: string
  amount: number
  status: 'Approved' | 'Declined' | 'Pending'
  terminal: string
}

export interface CashEntry {
  id: string
  date: string
  type: 'In' | 'Out'
  description: string
  amount: number
  balance: number
  by: string
}
