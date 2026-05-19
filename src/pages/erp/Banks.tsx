import React from 'react'
import { Row, Col, Card, Typography, Statistic, Tag, Space } from 'antd'
import { BankOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const banks = [
  { bank: 'Habib Bank Limited (HBL)',    account: '1234-5678-9012-3456', branch: 'Karachi Main', balance: 4_820_500, status: 'Active' },
  { bank: 'United Bank Limited (UBL)',   account: '9876-5432-1098-7654', branch: 'Lahore MM',    balance: 1_245_000, status: 'Active' },
  { bank: 'Meezan Bank',                 account: '1122-3344-5566-7788', branch: 'F-10 Markaz',  balance:   742_300, status: 'Active' },
  { bank: 'Bank Alfalah',                account: '5566-7788-9900-1122', branch: 'PECHS',        balance:    98_500, status: 'Active' },
]

const total = banks.reduce((s, b) => s + b.balance, 0)

export default function Banks(): React.ReactElement {
  return (
    <div>
      <Title level={3} style={{ margin: 0 }}><BankOutlined /> Bank Accounts</Title>
      <Text type="secondary">Linked corporate bank accounts and balances</Text>

      <Card style={{ marginTop: 16, background: 'linear-gradient(135deg, #f9f0ff, #fff)' }}>
        <Statistic title="Total Cash Position" value={total} prefix="₨" valueStyle={{ color: '#a855f7', fontSize: 32 }} />
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {banks.map(b => (
          <Col xs={24} md={12} key={b.account}>
            <Card hoverable>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong style={{ fontSize: 16 }}>{b.bank}</Text>
                  <Tag color="green">{b.status}</Tag>
                </div>
                <Text type="secondary">{b.branch}</Text>
                <Text code>{b.account}</Text>
                <Statistic value={b.balance} prefix="₨" valueStyle={{ color: '#1890ff', fontSize: 22 }} />
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
