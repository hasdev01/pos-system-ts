export interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  cost: number
  stock: number
  unit: string
  image: string
}

export interface CartItem extends Product {
  qty: number
}

export interface SaleOrder {
  id: string
  date: string
  time: string
  cashier: string
  items: number
  total: number
  payment: 'Cash' | 'Card'
  status: 'Completed' | 'Refunded' | 'Pending'
}

export interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Manager' | 'Cashier'
  status: 'Active' | 'Inactive'
  lastLogin: string
  phone: string
}

export interface SalesByDay {
  day: string
  sales: number
}

export interface SalesByMonth {
  month: string
  sales: number
}

export interface CategoryStat {
  name: string
  value: number
}
