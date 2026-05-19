import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Tag, Space, Typography, Row, Col, DatePicker, Modal, Descriptions, Divider, Tooltip } from 'antd'
import { SearchOutlined, ExportOutlined, EyeOutlined, PrinterOutlined, ArrowUpOutlined, DollarOutlined, ShoppingCartOutlined, RollbackOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { salesHistory } from '../data/staticData'
import type { SaleOrder } from '../types'
import { useAuth } from '../context/AuthContext'

const { Title, Text } = Typography
const { RangePicker } = DatePicker

export default function Sales(): React.ReactElement {
  const [search, setSearch]               = useState<string>('')
  const [statusFilter, setStatusFilter]   = useState<string>('All')
  const [selectedOrder, setSelectedOrder] = useState<SaleOrder | null>(null)
  const { user } = useAuth()
  const isCashier = user?.role === 'Cashier'

  const filtered: SaleOrder[] = salesHistory.filter(s => {
    const matchSearch = s.id.includes(search) || s.cashier.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || s.status === statusFilter
    return matchSearch && matchStatus
  })

  const completed   = salesHistory.filter(s => s.status === 'Completed')
  const totalRevenue = completed.reduce((sum, s) => sum + s.total, 0)
  const avgOrder    = Math.round(totalRevenue / completed.length)

  const columns: ColumnsType<SaleOrder & { key: string }> = [
    { title: 'Order ID', dataIndex: 'id',   render: (v: string) => <Text code style={{ fontSize: 12 }}>{v}</Text> },
    { title: 'Date',     dataIndex: 'date'  },
    { title: 'Time',     dataIndex: 'time'  },
    {
      title: 'Cashier', dataIndex: 'cashier',
      render: (v: string) => (
        <Space>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1890ff', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
            {v.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <Text>{v}</Text>
        </Space>
      ),
    },
    { title: 'Items',   dataIndex: 'items',   render: (v: number)  => `${v} items` },
    { title: 'Total',   dataIndex: 'total',   render: (v: number)  => <Text strong>Rs. {v.toLocaleString()}</Text>, sorter: (a, b) => a.total - b.total },
    { title: 'Payment', dataIndex: 'payment', render: (v: string)  => <Tag color={v === 'Cash' ? 'green' : 'blue'}>{v}</Tag> },
    {
      title: 'Status', dataIndex: 'status',
      render: (v: string) => <Tag color={v === 'Completed' ? 'success' : v === 'Refunded' ? 'warning' : 'processing'}>{v}</Tag>,
    },
    {
      title: 'Actions', key: 'actions',
      render: (_, r) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />}     size="small" onClick={() => setSelectedOrder(r)} />
          <Button type="text" icon={<PrinterOutlined />} size="small" />
          {!isCashier && (
            <Tooltip title="Process Refund">
              <Button type="text" icon={<RollbackOutlined />} size="small" danger />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ]

  const statCards = [
    { title: 'Total Revenue',     value: `Rs. ${(totalRevenue / 1000).toFixed(1)}K`, icon: <DollarOutlined />,        sub: '+8.3% this month',  color: '#1890ff', bg: '#e6f7ff' },
    { title: 'Total Orders',      value: completed.length,                            icon: <ShoppingCartOutlined />,  sub: 'Completed orders',  color: '#52c41a', bg: '#f6ffed' },
    { title: 'Avg Order Value',   value: `Rs. ${avgOrder}`,                           icon: <ArrowUpOutlined />,       sub: 'Per transaction',   color: '#faad14', bg: '#fffbe6' },
    { title: "Today's Sales",     value: 'Rs. 8,760',                                icon: <DollarOutlined />,        sub: '5 transactions',    color: '#722ed1', bg: '#f9f0ff' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Title level={3} style={{ margin: 0 }}>Sales &amp; Orders</Title>
        <Button icon={<ExportOutlined />}>Export CSV</Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statCards.map((s, i) => (
          <Col xs={12} lg={6} key={i}>
            <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>{s.title}</Text>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginTop: 4 }}>{s.value}</div>
                  <Text type="secondary" style={{ fontSize: 11 }}>{s.sub}</Text>
                </div>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: s.color }}>{s.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <Input prefix={<SearchOutlined />} placeholder="Search order ID or cashier..." value={search}
            onChange={e => setSearch(e.target.value)} style={{ width: 260, borderRadius: 8 }} />
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 140 }}>
            <Select.Option value="All">All Status</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="Refunded">Refunded</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
          </Select>
          <RangePicker style={{ borderRadius: 8 }} />
        </div>
        <Table
          dataSource={filtered.map(s => ({ ...s, key: s.id }))}
          columns={columns}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          scroll={{ x: 900 }}
        />
      </Card>

      <Modal
        title={`Order Details — ${selectedOrder?.id}`}
        open={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={[
          <Button key="print" icon={<PrinterOutlined />}>Print Receipt</Button>,
          <Button key="close" type="primary" onClick={() => setSelectedOrder(null)}>Close</Button>,
        ]}
        width={500}
      >
        {selectedOrder && (
          <div>
            <Descriptions column={2} bordered size="small" style={{ marginTop: 16 }}>
              <Descriptions.Item label="Order ID">{selectedOrder.id}</Descriptions.Item>
              <Descriptions.Item label="Status"><Tag color="success">{selectedOrder.status}</Tag></Descriptions.Item>
              <Descriptions.Item label="Date">{selectedOrder.date}</Descriptions.Item>
              <Descriptions.Item label="Time">{selectedOrder.time}</Descriptions.Item>
              <Descriptions.Item label="Cashier">{selectedOrder.cashier}</Descriptions.Item>
              <Descriptions.Item label="Payment"><Tag color={selectedOrder.payment === 'Cash' ? 'green' : 'blue'}>{selectedOrder.payment}</Tag></Descriptions.Item>
              <Descriptions.Item label="Items">{selectedOrder.items} items</Descriptions.Item>
              <Descriptions.Item label="Total"><Text strong style={{ color: '#1890ff' }}>Rs. {selectedOrder.total.toLocaleString()}</Text></Descriptions.Item>
            </Descriptions>
            <Divider />
            <Text type="secondary" style={{ fontSize: 12 }}>* Full itemized receipt available upon printing</Text>
          </div>
        )}
      </Modal>
    </div>
  )
}
