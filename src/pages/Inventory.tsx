import React, { useState } from 'react'
import { Card, Table, Button, Input, Select, Tag, Space, Typography, Row, Col, Progress, Modal, Form, InputNumber, Tooltip, Alert } from 'antd'
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, WarningOutlined, InboxOutlined, ExportOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { products } from '../data/staticData'
import type { Product } from '../types'
import { useAuth } from '../context/AuthContext'

const { Title, Text } = Typography

interface StockStatus { color: 'error' | 'warning' | 'processing' | 'success'; label: string }

const stockStatus = (stock: number): StockStatus => {
  if (stock < 10)  return { color: 'error',      label: 'Critical' }
  if (stock < 20)  return { color: 'warning',     label: 'Low'      }
  if (stock < 50)  return { color: 'processing',  label: 'Medium'   }
  return               { color: 'success',     label: 'Good'     }
}

export default function Inventory(): React.ReactElement {
  const [search, setSearch]               = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [addModal, setAddModal]           = useState<boolean>(false)
  const { user } = useAuth()
  const isCashier = user?.role === 'Cashier'

  const categories: string[] = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const filtered: Product[] = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter
    return matchSearch && matchCat
  })

  const totalProducts = products.length
  const totalStock    = products.reduce((s, p) => s + p.stock, 0)
  const lowStockCount = products.filter(p => p.stock < 20).length
  const totalValue    = products.reduce((s, p) => s + p.price * p.stock, 0)

  const columns: ColumnsType<Product> = [
    {
      title: 'Product', key: 'product',
      render: (_, r) => (
        <Space>
          <span style={{ fontSize: 24 }}>{r.image}</span>
          <div>
            <Text strong style={{ fontSize: 13 }}>{r.name}</Text>
            <div><Text type="secondary" style={{ fontSize: 11 }}>{r.sku}</Text></div>
          </div>
        </Space>
      ),
    },
    { title: 'Category', dataIndex: 'category', render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: 'Price',    dataIndex: 'price',    render: (v: number) => <Text strong>Rs. {v}</Text>, sorter: (a, b) => a.price - b.price },
    { title: 'Cost',     dataIndex: 'cost',     render: (v: number) => <Text type="secondary">Rs. {v}</Text> },
    {
      title: 'Stock', key: 'stock',
      render: (_, r) => {
        const s = stockStatus(r.stock)
        return (
          <Space direction="vertical" size={2} style={{ minWidth: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>{r.stock}</Text>
              <Tag color={s.color} style={{ margin: 0 }}>{s.label}</Tag>
            </div>
            <Progress
              percent={Math.min(100, (r.stock / 200) * 100)}
              size="small" showInfo={false}
              strokeColor={r.stock < 10 ? '#f5222d' : r.stock < 20 ? '#faad14' : '#52c41a'}
            />
          </Space>
        )
      },
      sorter: (a, b) => a.stock - b.stock,
    },
    { title: 'Value', key: 'value', render: (_, r) => <Text>Rs. {(r.price * r.stock).toLocaleString()}</Text>, sorter: (a, b) => (a.price * a.stock) - (b.price * b.stock) },
    { title: 'Unit', dataIndex: 'unit' },
    {
      title: 'Actions', key: 'actions',
      render: () => (
        isCashier ? (
          <Tooltip title="View only — Cashier cannot edit">
            <Button type="text" icon={<EyeOutlined />} size="small" disabled />
          </Tooltip>
        ) : (
          <Space>
            <Tooltip title="Edit">  <Button type="text" icon={<EditOutlined />}   size="small" /></Tooltip>
            <Tooltip title="Delete"><Button type="text" icon={<DeleteOutlined />} size="small" danger /></Tooltip>
          </Space>
        )
      ),
    },
  ]

  const statCards = [
    { title: 'Total Products',    value: totalProducts,                       icon: <InboxOutlined />,   color: '#1890ff', bg: '#e6f7ff' },
    { title: 'Total Stock Units', value: totalStock,                          icon: <InboxOutlined />,   color: '#52c41a', bg: '#f6ffed' },
    { title: 'Low Stock Items',   value: lowStockCount,                       icon: <WarningOutlined />, color: '#f5222d', bg: '#fff1f0' },
    { title: 'Inventory Value',   value: `Rs. ${(totalValue / 1000).toFixed(0)}K`, icon: <InboxOutlined />, color: '#722ed1', bg: '#f9f0ff' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <Title level={3} style={{ margin: 0 }}>Inventory Management</Title>
        <Space>
          <Button icon={<ExportOutlined />}>Export</Button>
          {!isCashier && (
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModal(true)}>Add Product</Button>
          )}
        </Space>
      </div>

      {isCashier && (
        <Alert
          message="View Only Mode"
          description="You are logged in as Cashier. You can view inventory but cannot add, edit or delete products."
          type="info"
          showIcon
          style={{ marginBottom: 20, borderRadius: 8 }}
        />
      )}

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statCards.map((s, i) => (
          <Col xs={12} lg={6} key={i}>
            <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>{s.title}</Text>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', marginTop: 4 }}>{s.value}</div>
                </div>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: s.color }}>{s.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <Input prefix={<SearchOutlined />} placeholder="Search product or SKU..." value={search}
            onChange={e => setSearch(e.target.value)} style={{ width: 280, borderRadius: 8 }} />
          <Select value={categoryFilter} onChange={setCategoryFilter} style={{ width: 160 }}>
            {categories.map(c => <Select.Option key={c} value={c}>{c}</Select.Option>)}
          </Select>
        </div>
        <Table
          dataSource={filtered.map(p => ({ ...p, key: p.id }))}
          columns={columns}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          scroll={{ x: 900 }}
        />
      </Card>

      <Modal
        title="Add New Product"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setAddModal(false)}>Cancel</Button>,
          <Button key="save" type="primary" onClick={() => setAddModal(false)}>Save Product</Button>,
        ]}
        width={600}
      >
        <Form layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={14}><Form.Item label="Product Name" required><Input placeholder="e.g. Basmati Rice 5kg" /></Form.Item></Col>
            <Col span={10}><Form.Item label="SKU" required><Input placeholder="e.g. RICE-001" /></Form.Item></Col>
            <Col span={12}>
              <Form.Item label="Category" required>
                <Select placeholder="Select category">
                  {categories.filter(c => c !== 'All').map(c => <Select.Option key={c} value={c}>{c}</Select.Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Unit">
                <Select placeholder="Select unit">
                  {['Kg', 'Pack', 'Bottle', 'Bag', 'Carton', 'Tray', 'Piece'].map(u => <Select.Option key={u} value={u}>{u}</Select.Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}><Form.Item label="Selling Price (Rs.)"><InputNumber style={{ width: '100%' }} min={0} /></Form.Item></Col>
            <Col span={8}><Form.Item label="Cost Price (Rs.)"><InputNumber style={{ width: '100%' }} min={0} /></Form.Item></Col>
            <Col span={8}><Form.Item label="Initial Stock"><InputNumber style={{ width: '100%' }} min={0} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}
