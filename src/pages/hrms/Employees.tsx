import React, { useMemo, useState } from 'react'
import { Card, Table, Tag, Input, Select, Space, Button, Avatar, Typography, Modal, Form, InputNumber, message } from 'antd'
import { UserAddOutlined, SearchOutlined } from '@ant-design/icons'
import { employees as seedEmployees, locations, departments } from '../../data/hrmsData'
import type { Employee, EmployeeRole, EmployeeStatus } from '../../types/hrms'
import { useAuth } from '../../context/AuthContext'
import { useModule } from '../../context/ModuleContext'

const { Title, Text } = Typography

const ROLE_COLORS: Record<EmployeeRole, string> = {
  Admin: 'red', Manager: 'purple', Finance: 'gold', HR: 'cyan',
  Cashier: 'blue', Accountant: 'geekblue', Sales: 'green', Storekeeper: 'orange',
}

export default function Employees(): React.ReactElement {
  const { user } = useAuth()
  const { locationCode } = useModule()
  const [data, setData] = useState<Employee[]>(seedEmployees)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<string>('All')
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const canEdit = user?.role === 'Admin' || user?.role === 'Manager'

  const filtered = useMemo(() => data.filter(e => {
    if (locationCode !== 'ALL' && e.location !== locationCode) return false
    if (role !== 'All' && e.role !== role) return false
    if (search && !`${e.name} ${e.empCode} ${e.email}`.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }), [data, search, role, locationCode])

  const onAdd = (): void => {
    form.validateFields().then(values => {
      const next: Employee = {
        id: Math.max(...data.map(d => d.id)) + 1,
        empCode: `EMP-${1000 + data.length + 1}`,
        avatar: (values.name as string).split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase(),
        status: 'Active' as EmployeeStatus,
        joinDate: new Date().toISOString().slice(0,10),
        ...values,
      }
      setData([next, ...data])
      message.success(`Employee ${next.empCode} added`)
      setOpen(false)
      form.resetFields()
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Employees</Title>
          <Text type="secondary">{filtered.length} of {data.length} employees</Text>
        </div>
        {canEdit && (
          <Button type="primary" icon={<UserAddOutlined />} size="large" onClick={() => setOpen(true)}>
            Add Employee
          </Button>
        )}
      </div>

      <Card>
        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search name, code, email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 280 }}
            allowClear
          />
          <Select
            value={role}
            onChange={setRole}
            style={{ width: 180 }}
            options={[
              { value: 'All', label: 'All Roles' },
              ...Object.keys(ROLE_COLORS).map(r => ({ value: r, label: r })),
            ]}
          />
        </Space>

        <Table
          rowKey="id"
          dataSource={filtered}
          pagination={{ pageSize: 10 }}
          columns={[
            {
              title: 'Employee', key: 'name',
              render: (_, r) => (
                <Space>
                  <Avatar style={{ background: '#52c41a', fontWeight: 700 }}>{r.avatar}</Avatar>
                  <div>
                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                    <Text type="secondary" style={{ fontSize: 11 }}>{r.empCode} · {r.email}</Text>
                  </div>
                </Space>
              ),
            },
            { title: 'Role',        dataIndex: 'role',        render: (r: EmployeeRole) => <Tag color={ROLE_COLORS[r]}>{r}</Tag> },
            { title: 'Department',  dataIndex: 'department' },
            { title: 'Location',    dataIndex: 'location' },
            { title: 'Basic',       dataIndex: 'basicSalary',  render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Net Salary',  key: 'net',  render: (_, r) => `₨${(r.basicSalary + r.allowances - r.deductions).toLocaleString()}` },
            { title: 'Status',      dataIndex: 'status', render: (s: EmployeeStatus) => (
              <Tag color={s === 'Active' ? 'green' : s === 'On Leave' ? 'orange' : 'red'}>{s}</Tag>
            )},
          ]}
        />
      </Card>

      <Modal title="Add Employee" open={open} onOk={onAdd} onCancel={() => setOpen(false)} width={640}>
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
          <Space style={{ width: '100%' }} size="large">
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]} style={{ flex: 1 }}><Input /></Form.Item>
            <Form.Item name="cnic" label="CNIC" rules={[{ required: true }]} style={{ flex: 1 }}><Input /></Form.Item>
          </Space>
          <Space style={{ width: '100%' }} size="large">
            <Form.Item name="role" label="Role" rules={[{ required: true }]} style={{ width: 180 }}>
              <Select options={Object.keys(ROLE_COLORS).map(r => ({ value: r, label: r }))} />
            </Form.Item>
            <Form.Item name="department" label="Department" rules={[{ required: true }]} style={{ width: 200 }}>
              <Select options={departments.map(d => ({ value: d.name, label: d.name }))} />
            </Form.Item>
            <Form.Item name="location" label="Location" rules={[{ required: true }]} style={{ width: 180 }}>
              <Select options={locations.map(l => ({ value: l.code, label: l.code }))} />
            </Form.Item>
          </Space>
          <Space style={{ width: '100%' }} size="large">
            <Form.Item name="basicSalary" label="Basic Salary" rules={[{ required: true }]} style={{ flex: 1 }}>
              <InputNumber style={{ width: '100%' }} prefix="₨" />
            </Form.Item>
            <Form.Item name="allowances" label="Allowances" initialValue={0} style={{ flex: 1 }}>
              <InputNumber style={{ width: '100%' }} prefix="₨" />
            </Form.Item>
            <Form.Item name="deductions" label="Deductions" initialValue={0} style={{ flex: 1 }}>
              <InputNumber style={{ width: '100%' }} prefix="₨" />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </div>
  )
}
