import React from 'react'
import { Row, Col, Card, Statistic, Typography, Space, Tag, Table, Progress } from 'antd'
import { RiseOutlined, FallOutlined, BankOutlined, AuditOutlined, DollarOutlined, WarningOutlined } from '@ant-design/icons'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { revenueEntries, expenseEntries, taxpayers, cashLedger } from '../../data/erpData'
import { useModule } from '../../context/ModuleContext'

const { Title, Text } = Typography

export default function ERPOverview(): React.ReactElement {
  const { locationCode } = useModule()

  const rev = (locationCode === 'ALL' ? revenueEntries : revenueEntries.filter(r => r.location === locationCode))
  const exp = (locationCode === 'ALL' ? expenseEntries : expenseEntries.filter(e => e.location === locationCode))

  const totalRevenue = rev.reduce((s, r) => s + r.amount, 0)
  const totalExpenses = exp.reduce((s, e) => s + e.amount, 0)
  const netProfit = totalRevenue - totalExpenses
  const margin = totalRevenue ? Math.round((netProfit / totalRevenue) * 100) : 0

  const overdueFBR = taxpayers.filter(t => t.status === 'Overdue').length
  const pendingFBR = taxpayers.filter(t => t.status === 'Pending').length

  const trend = [
    { day: 'Mon', revenue: 124000, expenses: 78000 },
    { day: 'Tue', revenue: 182000, expenses: 92000 },
    { day: 'Wed', revenue: 156000, expenses: 84000 },
    { day: 'Thu', revenue: 213000, expenses: 105000 },
    { day: 'Fri', revenue: 278000, expenses: 122000 },
    { day: 'Sat', revenue: 342000, expenses: 145000 },
    { day: 'Sun', revenue: 195000, expenses: 88000 },
  ]

  const byCategory = ['Rent','Utilities','Salaries','Inventory','Marketing','Maintenance','Other'].map(cat => ({
    category: cat,
    amount: exp.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0),
  })).filter(c => c.amount > 0)

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            <Space><BankOutlined style={{ color: '#a855f7' }} /> ERP Admin Console</Space>
          </Title>
          <Text type="secondary">Enterprise overview — Revenue, Expenses, Tax & Compliance · {locationCode === 'ALL' ? 'All Locations' : locationCode}</Text>
        </div>
        {(overdueFBR > 0 || pendingFBR > 0) && (
          <Tag color="red" icon={<WarningOutlined />} style={{ fontSize: 13, padding: '4px 10px' }}>
            {overdueFBR} overdue · {pendingFBR} pending FBR filings
          </Tag>
        )}
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: 'linear-gradient(135deg, #f6ffed 0%, #fff 100%)', borderLeft: '4px solid #52c41a' }}>
            <Statistic title="Total Revenue" value={totalRevenue} prefix="₨" valueStyle={{ color: '#52c41a' }} />
            <Space><RiseOutlined style={{ color: '#52c41a' }} /><Text type="secondary" style={{ fontSize: 12 }}>+12.4% MoM</Text></Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: 'linear-gradient(135deg, #fff1f0 0%, #fff 100%)', borderLeft: '4px solid #f5222d' }}>
            <Statistic title="Total Expenses" value={totalExpenses} prefix="₨" valueStyle={{ color: '#f5222d' }} />
            <Space><FallOutlined style={{ color: '#f5222d' }} /><Text type="secondary" style={{ fontSize: 12 }}>-4.1% MoM</Text></Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: 'linear-gradient(135deg, #e6f7ff 0%, #fff 100%)', borderLeft: '4px solid #1890ff' }}>
            <Statistic title="Net Profit" value={netProfit} prefix="₨" valueStyle={{ color: '#1890ff' }} />
            <Progress percent={Math.max(margin, 0)} showInfo={false} strokeColor="#1890ff" size="small" />
            <Text type="secondary" style={{ fontSize: 12 }}>{margin}% margin</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ background: 'linear-gradient(135deg, #f9f0ff 0%, #fff 100%)', borderLeft: '4px solid #a855f7' }}>
            <Statistic title="Tax Liability" value={taxpayers.reduce((s, t) => s + (t.taxDue - t.paid), 0)} prefix="₨" valueStyle={{ color: '#a855f7' }} />
            <Space><AuditOutlined style={{ color: '#a855f7' }} /><Text type="secondary" style={{ fontSize: 12 }}>FBR outstanding</Text></Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="Revenue vs Expenses (last 7 days)">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#52c41a" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="#52c41a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5222d" stopOpacity={0.5}/>
                    <stop offset="100%" stopColor="#f5222d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue"  stroke="#52c41a" fill="url(#rev)" />
                <Area type="monotone" dataKey="expenses" stroke="#f5222d" fill="url(#exp)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Expenses by Category">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byCategory} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="category" width={90} />
                <Tooltip />
                <Bar dataKey="amount" fill="#a855f7" radius={[0,6,6,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title={<Space><AuditOutlined /> FBR Tax Status</Space>}>
            <Table
              size="small"
              rowKey="id"
              pagination={false}
              dataSource={taxpayers}
              columns={[
                { title: 'Type',   dataIndex: 'type' },
                { title: 'Period', dataIndex: 'period' },
                { title: 'Due',    dataIndex: 'taxDue', render: (v: number) => `₨${v.toLocaleString()}` },
                { title: 'Status', dataIndex: 'status', render: (s: string) => (
                  <Tag color={s === 'Filed' ? 'green' : s === 'Pending' ? 'orange' : 'red'}>{s}</Tag>
                )},
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={<Space><DollarOutlined /> Cash Ledger (today)</Space>}>
            <Table
              size="small"
              rowKey="id"
              pagination={false}
              dataSource={cashLedger}
              columns={[
                { title: 'Time', dataIndex: 'date', render: (d: string) => d.slice(11) },
                { title: 'Description', dataIndex: 'description' },
                { title: 'Type',   dataIndex: 'type', render: (t: string) => <Tag color={t === 'In' ? 'green' : 'red'}>{t}</Tag> },
                { title: 'Amount', dataIndex: 'amount', render: (v: number) => `₨${v.toLocaleString()}` },
                { title: 'Bal',    dataIndex: 'balance', render: (v: number) => `₨${v.toLocaleString()}` },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
