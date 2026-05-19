import type { Product, SaleOrder, User, SalesByDay, SalesByMonth, CategoryStat } from '../types'

export const products: Product[] = [
  { id: 1,  name: 'Basmati Rice 5kg',     sku: 'RICE-001', category: 'Grains',      price: 850, cost: 620, stock: 142, unit: 'Bag',     image: '🌾' },
  { id: 2,  name: 'Cooking Oil 1L',        sku: 'OIL-002',  category: 'Oils',        price: 320, cost: 240, stock: 78,  unit: 'Bottle',  image: '🫙' },
  { id: 3,  name: 'Sugar 1kg',             sku: 'SUG-003',  category: 'Sweeteners',  price: 180, cost: 130, stock: 200, unit: 'Pack',    image: '🍬' },
  { id: 4,  name: 'Milk 1L',               sku: 'MLK-004',  category: 'Dairy',       price: 160, cost: 120, stock: 55,  unit: 'Carton', image: '🥛' },
  { id: 5,  name: 'Wheat Flour 2kg',       sku: 'FLR-005',  category: 'Grains',      price: 220, cost: 160, stock: 90,  unit: 'Pack',   image: '🌾' },
  { id: 6,  name: 'Tea Leaves 250g',       sku: 'TEA-006',  category: 'Beverages',   price: 280, cost: 200, stock: 120, unit: 'Pack',   image: '🍵' },
  { id: 7,  name: 'Salt 1kg',              sku: 'SLT-007',  category: 'Spices',      price: 60,  cost: 40,  stock: 310, unit: 'Pack',   image: '🧂' },
  { id: 8,  name: 'Red Chilli 100g',       sku: 'CHI-008',  category: 'Spices',      price: 95,  cost: 65,  stock: 8,   unit: 'Pack',   image: '🌶️' },
  { id: 9,  name: 'Tomato Ketchup 500g',   sku: 'KET-009',  category: 'Condiments',  price: 195, cost: 140, stock: 45,  unit: 'Bottle', image: '🍅' },
  { id: 10, name: 'Biscuits Assorted',     sku: 'BIS-010',  category: 'Snacks',      price: 120, cost: 85,  stock: 180, unit: 'Pack',   image: '🍪' },
  { id: 11, name: 'Lentils 1kg',           sku: 'LEN-011',  category: 'Pulses',      price: 240, cost: 175, stock: 95,  unit: 'Pack',   image: '🫘' },
  { id: 12, name: 'Eggs (12 pcs)',         sku: 'EGG-012',  category: 'Dairy',       price: 280, cost: 210, stock: 30,  unit: 'Tray',   image: '🥚' },
]

export const salesHistory: SaleOrder[] = [
  { id: 'ORD-1001', date: '2026-05-15', time: '10:23 AM', cashier: 'Ahmed Ali',   items: 5, total: 1480, payment: 'Cash', status: 'Completed' },
  { id: 'ORD-1002', date: '2026-05-15', time: '11:05 AM', cashier: 'Ahmed Ali',   items: 3, total: 740,  payment: 'Card', status: 'Completed' },
  { id: 'ORD-1003', date: '2026-05-15', time: '11:48 AM', cashier: 'Sara Khan',   items: 8, total: 2210, payment: 'Cash', status: 'Completed' },
  { id: 'ORD-1004', date: '2026-05-15', time: '12:30 PM', cashier: 'Sara Khan',   items: 2, total: 440,  payment: 'Card', status: 'Completed' },
  { id: 'ORD-1005', date: '2026-05-15', time: '01:15 PM', cashier: 'Ahmed Ali',   items: 6, total: 1890, payment: 'Cash', status: 'Completed' },
  { id: 'ORD-1006', date: '2026-05-14', time: '09:10 AM', cashier: 'Usman Raza',  items: 4, total: 960,  payment: 'Cash', status: 'Completed' },
  { id: 'ORD-1007', date: '2026-05-14', time: '10:55 AM', cashier: 'Ahmed Ali',   items: 7, total: 1750, payment: 'Card', status: 'Completed' },
  { id: 'ORD-1008', date: '2026-05-14', time: '02:40 PM', cashier: 'Usman Raza',  items: 3, total: 620,  payment: 'Cash', status: 'Refunded'  },
  { id: 'ORD-1009', date: '2026-05-13', time: '11:20 AM', cashier: 'Sara Khan',   items: 9, total: 3120, payment: 'Card', status: 'Completed' },
  { id: 'ORD-1010', date: '2026-05-13', time: '03:00 PM', cashier: 'Ahmed Ali',   items: 5, total: 1340, payment: 'Cash', status: 'Completed' },
]

export const users: User[] = [
  { id: 1, name: 'Ahmed Ali',   email: 'ahmed@store.pk',  role: 'Cashier', status: 'Active',   lastLogin: '2026-05-15 10:00 AM', phone: '0300-1234567' },
  { id: 2, name: 'Sara Khan',   email: 'sara@store.pk',   role: 'Cashier', status: 'Active',   lastLogin: '2026-05-15 09:30 AM', phone: '0301-9876543' },
  { id: 3, name: 'Usman Raza',  email: 'usman@store.pk',  role: 'Cashier', status: 'Active',   lastLogin: '2026-05-14 08:45 AM', phone: '0312-5551234' },
  { id: 4, name: 'Admin User',  email: 'admin@store.pk',  role: 'Admin',   status: 'Active',   lastLogin: '2026-05-15 08:00 AM', phone: '0321-1112233' },
  { id: 5, name: 'Faisal Mirza',email: 'faisal@store.pk', role: 'Manager', status: 'Inactive', lastLogin: '2026-05-10 11:00 AM', phone: '0333-4445566' },
]

export const salesByDay: SalesByDay[] = [
  { day: 'Mon', sales: 12400 },
  { day: 'Tue', sales: 18200 },
  { day: 'Wed', sales: 15600 },
  { day: 'Thu', sales: 21300 },
  { day: 'Fri', sales: 27800 },
  { day: 'Sat', sales: 34200 },
  { day: 'Sun', sales: 19500 },
]

export const salesByMonth: SalesByMonth[] = [
  { month: 'Nov', sales: 285000 },
  { month: 'Dec', sales: 342000 },
  { month: 'Jan', sales: 298000 },
  { month: 'Feb', sales: 315000 },
  { month: 'Mar', sales: 378000 },
  { month: 'Apr', sales: 356000 },
  { month: 'May', sales: 149000 },
]

export const categoryStats: CategoryStat[] = [
  { name: 'Grains',     value: 35 },
  { name: 'Dairy',      value: 20 },
  { name: 'Oils',       value: 15 },
  { name: 'Beverages',  value: 12 },
  { name: 'Spices',     value: 10 },
  { name: 'Others',     value: 8  },
]
