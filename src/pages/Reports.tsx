import React, { useState } from 'react'
import { Card, Row, Col, Typography, Button, Select, Table, Tag, Space } from 'antd'
import { ArrowUpOutlined, FileExcelOutlined, FilePdfOutlined } from '@ant-design/icons'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts'
import type { ColumnsType } from 'antd/es/table'
import { salesByMonth, salesByDay } from '../data/staticData'

const { Title, Text } = Typography

interface TopProduct { name: string; sold: number; revenue: number; category: string }

const topProducts: TopProduct[] = [
  { name: 'Basmati Rice 5kg',   sold: 142, revenue: 120700, category: 'Grains'      },
  { name: 'Cooking Oil 1L',     sold: 98,  revenue: 31360,  category: 'Oils'        },
  { name: 'Milk 1L',            sold: 87,  revenue: 13920,  category: 'Dairy'       },
  { name: 'Tea Leaves 250g',    sold: 76,  revenue: 21280,  category: 'Beverages'   },
  { name: 'Wheat Flour 2kg',    sold: 65,  revenue: 14300,  category: 'Grains'      },
  { name: 'Sugar 1kg',          sold: 60,  revenue: 10800,  category: 'Sweeteners'  },
  { name: 'Biscuits Assorted',  sold: 55,  revenue: 6600,   category: 'Snacks'      },
]

const monthlyProfit = salesByMonth.map(m => ({
  ...m,
  cost:   Math.round(m.sales * 0.65),
  profit: Math.round(m.sales * 0.35),
}))

export default function Reports(): React.ReactElement {
  const [period, setPeriod] = useState<string>('monthly')

  const cols: ColumnsType<TopProduct & { key: number }> = [
    { title: '#',        render: (_, __, i) => i + 1,                                     width: 50 },
    { title: 'Product',  dataIndex: 'name',     render: (v: string) => <Text strong>{v}</Text> },
    { title: 'Category', dataIndex: 'category', render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: 'Units Sold', dataIndex: 'sold',   sorter: (a, b) => a.sold - b.sold },
    { title: 'Revenue',  dataIndex: 'revenue',  render: (v: number) => <Text>Rs. {v.toLocaleString()}</Text>, sorter: (a, b) => a.revenue - b.revenue },
  ]

  const summaryCards = [
    { title: 'Total Revenue (6 Months)', value: 'Rs. 1.97M', change: '+12%' },
    { title: 'Total Profit',             value: 'Rs. 690K',  change: '+9%'  },
    { title: 'Total Orders',             value: '1,284',     change: '+15%' },
    { title: 'Avg Daily Sales',          value: 'Rs. 10.8K', change: '+6%'  },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Title level={3} style={{ margin: 0 }}>Reports &amp; Analytics</Title>
        <Space>
          <Select value={period} onChange={setPeriod} style={{ width: 140 }}>
            <Select.Option value="daily">Daily</Select.Option>
            <Select.Option value="monthly">Monthly</Select.Option>
          </Select>
          <Button icon={<FileExcelOutlined />}>Excel</Button>
          <Button icon={<FilePdfOutlined />} type="primary">PDF</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {summaryCards.map((s, i) => (
          <Col xs={12} lg={6} key={i}>
            <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <Text type="secondary" style={{ fontSize: 12 }}>{s.title}</Text>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', margin: '6px 0' }}>{s.value}</div>
              <Tag color="success"><ArrowUpOutlined /> {s.change} vs last period</Tag>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="Revenue vs Profit (Monthly)" bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyProfit}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`Rs. ${Number(v ?? 0).toLocaleString()}`]} />
                <Legend />
                <Bar dataKey="sales"  name="Revenue" fill="#1890ff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit"  fill="#52c41a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="This Week Trend" bordered={false}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={salesByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`Rs. ${Number(v ?? 0).toLocaleString()}`, 'Sales']} />
                <Line type="monotone" dataKey="sales" stroke="#722ed1" strokeWidth={2.5} dot={{ r: 5, fill: '#722ed1' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card title="Top Selling Products" bordered={false}
        style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Table
          dataSource={topProducts.map((p, i) => ({ ...p, key: i }))}
          columns={cols}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  )
}
