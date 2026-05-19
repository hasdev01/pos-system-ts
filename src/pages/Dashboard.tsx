import React from 'react'
import { Row, Col, Card, Typography, Table, Tag, Progress, List, Avatar, Badge, Alert } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, ShoppingCartOutlined, DollarOutlined, InboxOutlined, WarningOutlined } from '@ant-design/icons'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import type { ColumnsType } from 'antd/es/table'
import { salesByDay, categoryStats, salesHistory, products } from '../data/staticData'
import type { SaleOrder, Product } from '../types'
import { useAuth } from '../context/AuthContext'

const { Title, Text } = Typography
const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2']

interface KpiCard {
  title: string
  value: number
  prefix: string
  suffix: string
  icon: React.ReactNode
  color: string
  bg: string
  change: string
  up: boolean
  sub: string
}

export default function Dashboard(): React.ReactElement {
  const { user } = useAuth()
  const role = user?.role ?? 'Cashier'
  const isCashier = role === 'Cashier'

  const lowStock: Product[] = products.filter(p => p.stock < 20)

  // Cashier sees only their own sales (Ahmed Ali)
  const visibleSales = isCashier
    ? salesHistory.filter(s => s.cashier === 'Ahmed Ali')
    : salesHistory

  const recentSales = visibleSales.slice(0, 5).map(s => ({ ...s, key: s.id }))

  const recentCols: ColumnsType<SaleOrder & { key: string }> = [
    { title: 'Order',   dataIndex: 'id',      render: (v: string) => <Text code style={{ fontSize: 12 }}>{v}</Text> },
    { title: 'Time',    dataIndex: 'time'     },
    { title: 'Cashier', dataIndex: 'cashier'  },
    { title: 'Total',   dataIndex: 'total',   render: (v: number) => <Text strong>Rs. {v.toLocaleString()}</Text> },
    { title: 'Payment', dataIndex: 'payment', render: (v: string) => <Tag color={v === 'Cash' ? 'green' : 'blue'}>{v}</Tag> },
  ]

  // Cashier sees shift-only stats, Manager/Admin see full store stats
  const cashierShiftSales = salesHistory.filter(s => s.cashier === 'Ahmed Ali' && s.date === '2026-05-15')
  const cashierShiftTotal = cashierShiftSales.reduce((sum, s) => sum + s.total, 0)

  const kpiCards: KpiCard[] = isCashier
    ? [
        { title: 'My Shift Sales',     value: cashierShiftTotal,    prefix: 'Rs. ', suffix: '',      icon: <DollarOutlined />,       color: '#1890ff', bg: '#e6f7ff', change: '3 orders',   up: true,  sub: 'Today so far'    },
        { title: 'My Orders Today',    value: cashierShiftSales.length, prefix: '', suffix: ' orders', icon: <ShoppingCartOutlined />, color: '#52c41a', bg: '#f6ffed', change: 'Completed',  up: true,  sub: 'All completed'   },
        { title: 'Items Processed',    value: cashierShiftSales.reduce((s, o) => s + o.items, 0), prefix: '', suffix: ' pcs', icon: <InboxOutlined />, color: '#faad14', bg: '#fffbe6', change: 'Today',  up: true, sub: 'This shift' },
        { title: 'Low Stock Alerts',   value: lowStock.length,      prefix: '',     suffix: ' items', icon: <WarningOutlined />,      color: '#f5222d', bg: '#fff1f0', change: 'Notify mgr', up: false, sub: 'Inform manager'  },
      ]
    : [
        { title: "Today's Sales",    value: 8760,            prefix: 'Rs. ', suffix: '',      icon: <DollarOutlined />,       color: '#1890ff', bg: '#e6f7ff', change: '+12.5%',      up: true,  sub: '28 transactions'     },
        { title: 'Total Revenue',    value: 149000,          prefix: 'Rs. ', suffix: '',      icon: <ShoppingCartOutlined />, color: '#52c41a', bg: '#f6ffed', change: '+8.3%',       up: true,  sub: 'This month'          },
        { title: 'Items Sold Today', value: 94,              prefix: '',     suffix: ' pcs',  icon: <InboxOutlined />,        color: '#faad14', bg: '#fffbe6', change: '+5.1%',       up: true,  sub: 'Across 12 categories'},
        { title: 'Low Stock Alerts', value: lowStock.length, prefix: '',     suffix: ' items',icon: <WarningOutlined />,      color: '#f5222d', bg: '#fff1f0', change: '2 critical',  up: false, sub: 'Needs restock'       },
      ]

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {isCashier ? `My Shift — ${user?.name}` : 'Dashboard'}
          </Title>
          <Text type="secondary">
            {isCashier
              ? 'Thursday, May 15, 2026 — Showing your shift data only'
              : `Thursday, May 15, 2026 — Al-Amin Store (${role} view)`}
          </Text>
        </div>
        <Badge status="processing" text={<Text style={{ color: '#52c41a', fontWeight: 600 }}>Store Open</Text>} />
      </div>

      {isCashier && (
        <Alert
          message="Cashier View"
          description="You are seeing your own shift data only. Store-wide analytics are available to Manager and Admin roles."
          type="info"
          showIcon
          style={{ marginBottom: 20, borderRadius: 8 }}
        />
      )}

      {/* KPI Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {kpiCards.map((kpi, i) => (
          <Col xs={24} sm={12} xl={6} key={i}>
            <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 13 }}>{kpi.title}</Text>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', margin: '6px 0' }}>
                    {kpi.prefix}{kpi.value.toLocaleString()}{kpi.suffix}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag color={kpi.up ? 'success' : 'error'} style={{ margin: 0 }}>
                      {kpi.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {kpi.change}
                    </Tag>
                    <Text type="secondary" style={{ fontSize: 12 }}>{kpi.sub}</Text>
                  </div>
                </div>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: kpi.bg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 22, color: kpi.color,
                }}>
                  {kpi.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* Sales Chart — full width for cashier (no pie chart) */}
        <Col xs={24} lg={isCashier ? 24 : 16}>
          <Card title={isCashier ? 'Store Sales This Week (Read Only)' : 'Sales This Week'} bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={salesByDay}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1890ff" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1890ff" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`Rs. ${Number(v ?? 0).toLocaleString()}`, 'Sales']} />
                <Area type="monotone" dataKey="sales" stroke="#1890ff" strokeWidth={2.5}
                  fill="url(#salesGrad)" dot={{ r: 4, fill: '#1890ff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Category Pie — Manager/Admin only */}
        {!isCashier && <Col xs={24} lg={8}>
          <Card title="Sales by Category" bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%" cy="45%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ value }: { value: number }) => `${value}%`}
                  labelLine={false}
                >
                  {categoryStats.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v ?? 0}%`]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Recent Transactions */}
        <Col xs={24} lg={16}>
          <Card title={isCashier ? 'My Recent Transactions' : 'Recent Transactions'} bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Table dataSource={recentSales} columns={recentCols} pagination={false} size="small" />
          </Card>
        </Col>

        {/* Low Stock */}
        <Col xs={24} lg={8}>
          <Card
            title={<span><WarningOutlined style={{ color: '#f5222d', marginRight: 8 }} />Low Stock Alerts</span>}
            bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
          >
            <List
              dataSource={lowStock}
              renderItem={(item: Product) => (
                <List.Item style={{ padding: '10px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
                    <Avatar style={{ background: '#fff1f0', fontSize: 20 }}>{item.image}</Avatar>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ fontSize: 13 }}>{item.name}</Text>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                        <Progress
                          percent={Math.round((item.stock / 50) * 100)}
                          size="small"
                          showInfo={false}
                          strokeColor={item.stock < 10 ? '#f5222d' : '#faad14'}
                          style={{ flex: 1, marginRight: 12 }}
                        />
                        <Tag color={item.stock < 10 ? 'error' : 'warning'}>{item.stock} left</Tag>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
