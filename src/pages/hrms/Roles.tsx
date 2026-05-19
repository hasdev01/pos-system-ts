import React from 'react'
import { Card, Table, Tag, Typography, Space } from 'antd'
import { SafetyCertificateOutlined } from '@ant-design/icons'
import { ROLE_PERMISSIONS } from '../../data/hrmsData'

const { Title, Text } = Typography

export default function Roles(): React.ReactElement {
  const data = Object.entries(ROLE_PERMISSIONS).map(([role, perms]) => ({
    key: role, role, perms,
  }))

  return (
    <div>
      <Title level={3} style={{ margin: 0 }}>
        <Space><SafetyCertificateOutlined /> Roles & Access Control</Space>
      </Title>
      <Text type="secondary">Permission matrix per role — controls which actions each employee can perform</Text>

      <Card style={{ marginTop: 16 }}>
        <Table
          dataSource={data}
          pagination={false}
          columns={[
            { title: 'Role', dataIndex: 'role', render: (r: string) => <Tag color="purple" style={{ fontSize: 13, padding: '2px 10px' }}>{r}</Tag>, width: 180 },
            {
              title: 'Permissions', dataIndex: 'perms',
              render: (perms: string[]) => perms[0] === '*'
                ? <Tag color="red"><b>Full Access</b></Tag>
                : <Space wrap>{perms.map(p => <Tag key={p}>{p}</Tag>)}</Space>
            },
          ]}
        />
      </Card>

      <Card title="Role Hierarchy" style={{ marginTop: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div><Tag color="red">Admin</Tag> Full system access — can manage everything</div>
          <div><Tag color="purple">Manager</Tag> Operations, employees, reports for their location</div>
          <div><Tag color="gold">Finance</Tag> Run payroll, manage taxpayers, revenue & expenses</div>
          <div><Tag color="cyan">HR</Tag> Manage employees, attendance, departments</div>
          <div><Tag color="geekblue">Accountant</Tag> Revenue, expenses, cash ledger, view payroll</div>
          <div><Tag color="green">Sales</Tag> POS use, view own location's revenue</div>
          <div><Tag color="blue">Cashier</Tag> POS use and Pay Now</div>
          <div><Tag color="orange">Storekeeper</Tag> View inventory, POS use</div>
        </Space>
      </Card>
    </div>
  )
}
