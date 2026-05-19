import React from 'react'
import { Card, Table, Tag, Typography, Row, Col, Statistic } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'
import { cardTxns } from '../../data/erpData'

const { Title, Text } = Typography

const BRAND_COLOR: Record<string, string> = { Visa: 'blue', Mastercard: 'red', UnionPay: 'gold' }

export default function Cards(): React.ReactElement {
  const approved = cardTxns.filter(t => t.status === 'Approved')
  const total = approved.reduce((s, t) => s + t.amount, 0)

  return (
    <div>
      <Title level={3} style={{ margin: 0 }}><CreditCardOutlined /> Card Payments</Title>
      <Text type="secondary">All card terminal transactions across locations</Text>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}><Card><Statistic title="Approved Volume" value={total} prefix="₨" valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="Transactions"   value={approved.length} suffix={`/ ${cardTxns.length}`} /></Card></Col>
        <Col span={8}><Card><Statistic title="Declined"       value={cardTxns.filter(t => t.status === 'Declined').length} valueStyle={{ color: '#f5222d' }} /></Card></Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Table
          rowKey="id"
          dataSource={cardTxns}
          pagination={{ pageSize: 10 }}
          columns={[
            { title: 'Txn',       dataIndex: 'id' },
            { title: 'Date',      dataIndex: 'date' },
            { title: 'Brand',     dataIndex: 'cardBrand', render: (b: string) => <Tag color={BRAND_COLOR[b]}>{b}</Tag> },
            { title: 'Card',      dataIndex: 'cardLast4', render: (v: string) => `•••• ${v}` },
            { title: 'Holder',    dataIndex: 'holder' },
            { title: 'Terminal',  dataIndex: 'terminal' },
            { title: 'Amount',    dataIndex: 'amount', render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Status',    dataIndex: 'status', render: (s: string) => (
              <Tag color={s === 'Approved' ? 'green' : s === 'Declined' ? 'red' : 'orange'}>{s}</Tag>
            )},
          ]}
        />
      </Card>
    </div>
  )
}
