import React, { useState } from 'react'
import { Card, Table, Button, Input, Tag, Space, Typography, Avatar, Row, Col, Modal, Form, Select, Switch, Tooltip } from 'antd'
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { users } from '../data/staticData'
import type { User } from '../types'

const { Title, Text } = Typography

const roleColors: Record<string, string> = { Admin: 'red', Manager: 'purple', Cashier: 'blue' }

export default function Users(): React.ReactElement {
  const [search, setSearch]     = useState<string>('')
  const [addModal, setAddModal] = useState<boolean>(false)

  const filtered: User[] = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const columns: ColumnsType<User & { key: number }> = [
    {
      title: 'User', key: 'user',
      render: (_, r) => (
        <Space>
          <Avatar style={{ background: roleColors[r.role] ?? '#1890ff', fontWeight: 700 }}>
            {r.name.split(' ').map((n: string) => n[0]).join('')}
          </Avatar>
          <div>
            <Text strong>{r.name}</Text>
            <div><Text type="secondary" style={{ fontSize: 12 }}>{r.email}</Text></div>
          </div>
        </Space>
      ),
    },
    { title: 'Role',       dataIndex: 'role',      render: (v: string) => <Tag color={roleColors[v] ?? 'default'}>{v}</Tag> },
    { title: 'Phone',      dataIndex: 'phone'      },
    { title: 'Last Login', dataIndex: 'lastLogin', render: (v: string) => <Text type="secondary" style={{ fontSize: 12 }}>{v}</Text> },
    { title: 'Status',     dataIndex: 'status',    render: (v: string) => <Tag color={v === 'Active' ? 'success' : 'default'}>{v}</Tag> },
    {
      title: 'Actions', key: 'actions',
      render: () => (
        <Space>
          <Tooltip title="Edit">           <Button type="text" icon={<EditOutlined />}   size="small" /></Tooltip>
          <Tooltip title="Reset Password"> <Button type="text" icon={<LockOutlined />}   size="small" /></Tooltip>
          <Tooltip title="Delete">         <Button type="text" icon={<DeleteOutlined />} size="small" danger /></Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ margin: 0 }}>User Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModal(true)}>Add User</Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Users',  value: users.length,                                    color: '#1890ff' },
          { label: 'Active',       value: users.filter(u => u.status === 'Active').length,  color: '#52c41a' },
          { label: 'Cashiers',     value: users.filter(u => u.role === 'Cashier').length,   color: '#faad14' },
          { label: 'Admins',       value: users.filter(u => u.role !== 'Cashier').length,   color: '#f5222d' },
        ].map((s, i) => (
          <Col xs={12} lg={6} key={i}>
            <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
              <Text type="secondary">{s.label}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Input prefix={<SearchOutlined />} placeholder="Search users..." value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 280, marginBottom: 16, borderRadius: 8 }} />
        <Table
          dataSource={filtered.map(u => ({ ...u, key: u.id }))}
          columns={columns}
          pagination={{ pageSize: 8 }}
          scroll={{ x: 700 }}
        />
      </Card>

      <Modal
        title="Add New User"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setAddModal(false)}>Cancel</Button>,
          <Button key="save" type="primary" onClick={() => setAddModal(false)}>Create User</Button>,
        ]}
        width={480}
      >
        <Form layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item label="First Name" required><Input /></Form.Item></Col>
            <Col span={12}><Form.Item label="Last Name"  required><Input /></Form.Item></Col>
          </Row>
          <Form.Item label="Email Address" required><Input type="email" /></Form.Item>
          <Form.Item label="Phone"><Input /></Form.Item>
          <Form.Item label="Role" required>
            <Select placeholder="Select role">
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Cashier">Cashier</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Temporary Password" required><Input.Password /></Form.Item>
          <Form.Item label="Active"><Switch defaultChecked /></Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
