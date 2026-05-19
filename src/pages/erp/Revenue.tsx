import React from 'react'
import { Card, Table, Typography, Tag, Row, Col, Statistic } from 'antd'
import { RiseOutlined } from '@ant-design/icons'
import { revenueEntries } from '../../data/erpData'
import { useModule } from '../../context/ModuleContext'

const { Title, Text } = Typography

export default function Revenue(): React.ReactElement {
  const { locationCode } = useModule()
  const data = locationCode === 'ALL' ? revenueEntries : revenueEntries.filter(r => r.location === locationCode)

  const totalGross = data.reduce((s, r) => s + r.amount, 0)
  const totalTax   = data.reduce((s, r) => s + r.tax, 0)
  const totalNet   = data.reduce((s, r) => s + r.net, 0)

  return (
    <div>
      <Title level={3} style={{ margin: 0 }}><RiseOutlined style={{ color: '#52c41a' }} /> Revenue</Title>
      <Text type="secondary">All income across POS, Online, Wholesale, Service</Text>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}><Card><Statistic title="Gross Revenue" value={totalGross} prefix="₨" valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="Sales Tax (17%)" value={totalTax} prefix="₨" valueStyle={{ color: '#fa8c16' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="Net Revenue" value={totalNet} prefix="₨" valueStyle={{ color: '#1890ff' }} /></Card></Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Table
          rowKey="id"
          dataSource={data}
          pagination={{ pageSize: 10 }}
          columns={[
            { title: 'Entry',    dataIndex: 'id' },
            { title: 'Date',     dataIndex: 'date' },
            { title: 'Source',   dataIndex: 'source', render: (v: string) => <Tag color="green">{v}</Tag> },
            { title: 'Location', dataIndex: 'location' },
            { title: 'Gross',    dataIndex: 'amount', render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Tax',      dataIndex: 'tax',    render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Net',      dataIndex: 'net',    render: (v: number) => <b style={{ color: '#52c41a' }}>₨{v.toLocaleString()}</b> },
          ]}
        />
      </Card>
    </div>
  )
}
