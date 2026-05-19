import React from 'react'
import { Card, Table, Typography, Tag, Row, Col, Statistic } from 'antd'
import { FallOutlined } from '@ant-design/icons'
import { expenseEntries } from '../../data/erpData'
import { useModule } from '../../context/ModuleContext'

const { Title, Text } = Typography

const CAT_COLOR: Record<string, string> = {
  Rent: 'magenta', Utilities: 'gold', Salaries: 'blue',
  Inventory: 'cyan', Marketing: 'purple', Maintenance: 'orange', Other: 'default',
}

export default function Expenses(): React.ReactElement {
  const { locationCode } = useModule()
  const data = locationCode === 'ALL' ? expenseEntries : expenseEntries.filter(e => e.location === locationCode)

  const paid    = data.filter(e => e.status === 'Paid').reduce((s, e) => s + e.amount, 0)
  const pending = data.filter(e => e.status === 'Pending').reduce((s, e) => s + e.amount, 0)
  const overdue = data.filter(e => e.status === 'Overdue').reduce((s, e) => s + e.amount, 0)

  return (
    <div>
      <Title level={3} style={{ margin: 0 }}><FallOutlined style={{ color: '#f5222d' }} /> Expenses</Title>
      <Text type="secondary">Operating costs across all locations</Text>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}><Card><Statistic title="Paid"    value={paid}    prefix="₨" valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="Pending" value={pending} prefix="₨" valueStyle={{ color: '#fa8c16' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="Overdue" value={overdue} prefix="₨" valueStyle={{ color: '#f5222d' }} /></Card></Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Table
          rowKey="id"
          dataSource={data}
          pagination={{ pageSize: 10 }}
          columns={[
            { title: 'Entry',    dataIndex: 'id' },
            { title: 'Date',     dataIndex: 'date' },
            { title: 'Category', dataIndex: 'category', render: (v: string) => <Tag color={CAT_COLOR[v]}>{v}</Tag> },
            { title: 'Vendor',   dataIndex: 'vendor' },
            { title: 'Location', dataIndex: 'location' },
            { title: 'Amount',   dataIndex: 'amount', render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Status',   dataIndex: 'status', render: (s: string) => (
              <Tag color={s === 'Paid' ? 'green' : s === 'Pending' ? 'orange' : 'red'}>{s}</Tag>
            )},
          ]}
        />
      </Card>
    </div>
  )
}
