import React from 'react'
import { Card, Table, Tag, Typography, Row, Col, Statistic } from 'antd'
import { WalletOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { cashLedger } from '../../data/erpData'

const { Title, Text } = Typography

export default function CashLedger(): React.ReactElement {
  const cashIn  = cashLedger.filter(c => c.type === 'In').reduce((s, c) => s + c.amount, 0)
  const cashOut = cashLedger.filter(c => c.type === 'Out').reduce((s, c) => s + c.amount, 0)
  const balance = cashLedger[cashLedger.length - 1]?.balance ?? 0

  return (
    <div>
      <Title level={3} style={{ margin: 0 }}><WalletOutlined /> Cash Ledger</Title>
      <Text type="secondary">Daily cash drawer movements and reconciliation</Text>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}><Card><Statistic title="Cash In"  value={cashIn}  prefix={<ArrowUpOutlined />}   valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="Cash Out" value={cashOut} prefix={<ArrowDownOutlined />} valueStyle={{ color: '#f5222d' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="Drawer Balance" value={balance} prefix="₨" valueStyle={{ color: '#1890ff' }} /></Card></Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Table
          rowKey="id"
          dataSource={cashLedger}
          pagination={false}
          columns={[
            { title: 'Date/Time',  dataIndex: 'date' },
            { title: 'Description',dataIndex: 'description' },
            { title: 'By',         dataIndex: 'by' },
            { title: 'Type',       dataIndex: 'type', render: (t: string) => <Tag color={t === 'In' ? 'green' : 'red'}>{t}</Tag> },
            { title: 'Amount',     dataIndex: 'amount',  render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Balance',    dataIndex: 'balance', render: (v: number) => <b>₨{v.toLocaleString()}</b> },
          ]}
        />
      </Card>
    </div>
  )
}
