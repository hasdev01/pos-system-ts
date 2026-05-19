import React, { useState } from 'react'
import { Card, Typography, Row, Col, InputNumber, Button, Radio, Space, Tag, Result, Modal, Input, Divider } from 'antd'
import { CreditCardOutlined, WalletOutlined, BankOutlined, MobileOutlined, CheckCircleOutlined } from '@ant-design/icons'
import type { PaymentMethod } from '../../types/erp'

const { Title, Text } = Typography

const METHODS: { key: PaymentMethod; icon: React.ReactNode; label: string; sub: string }[] = [
  { key: 'Cash',          icon: <WalletOutlined style={{ fontSize: 28 }} />,       label: 'Cash',          sub: 'PKR cash payment'   },
  { key: 'Card',          icon: <CreditCardOutlined style={{ fontSize: 28 }} />,    label: 'Card',          sub: 'Visa / Mastercard / UnionPay' },
  { key: 'Bank Transfer', icon: <BankOutlined style={{ fontSize: 28 }} />,          label: 'Bank Transfer', sub: 'IBFT / Direct deposit' },
  { key: 'JazzCash',      icon: <MobileOutlined style={{ fontSize: 28 }} />,        label: 'JazzCash',      sub: 'Mobile wallet' },
  { key: 'EasyPaisa',     icon: <MobileOutlined style={{ fontSize: 28 }} />,        label: 'EasyPaisa',     sub: 'Mobile wallet' },
]

export default function POSPay(): React.ReactElement {
  const [amount, setAmount] = useState<number | null>(2500)
  const [method, setMethod] = useState<PaymentMethod>('Card')
  const [received, setReceived] = useState<number | null>(null)
  const [success, setSuccess] = useState<{ txnId: string; method: PaymentMethod; amount: number } | null>(null)

  const change = method === 'Cash' && received && amount ? Math.max(received - amount, 0) : 0
  const canPay = amount && amount > 0 && (method !== 'Cash' || (received !== null && received >= amount))

  const payNow = (): void => {
    if (!canPay || !amount) return
    const txnId = `TXN-${Date.now().toString().slice(-8)}`
    setTimeout(() => setSuccess({ txnId, method, amount }), 600)
  }

  return (
    <div>
      <Title level={3} style={{ margin: 0 }}><CreditCardOutlined /> POS — Pay Now</Title>
      <Text type="secondary">Process payment for the current order across all supported methods</Text>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="Choose Payment Method" style={{ marginBottom: 16 }}>
            <Radio.Group
              value={method}
              onChange={e => setMethod(e.target.value as PaymentMethod)}
              style={{ width: '100%' }}
            >
              <Row gutter={[12, 12]}>
                {METHODS.map(m => (
                  <Col xs={24} sm={12} key={m.key}>
                    <Radio.Button
                      value={m.key}
                      style={{
                        height: 'auto', width: '100%', padding: 16, display: 'flex',
                        alignItems: 'center', gap: 12, borderRadius: 10,
                      }}
                    >
                      <span style={{ color: '#a855f7' }}>{m.icon}</span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 700 }}>{m.label}</div>
                        <Text type="secondary" style={{ fontSize: 11 }}>{m.sub}</Text>
                      </div>
                    </Radio.Button>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </Card>

          {method === 'Card' && (
            <Card title="Card Details" size="small">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input placeholder="Card Number (1234 5678 9012 3456)" size="large" />
                <Space style={{ width: '100%' }}>
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" type="password" />
                </Space>
                <Input placeholder="Card Holder Name" />
              </Space>
            </Card>
          )}

          {(method === 'JazzCash' || method === 'EasyPaisa') && (
            <Card title={`${method} Details`} size="small">
              <Input placeholder="Mobile Number (03XX-XXXXXXX)" size="large" />
              <Input placeholder="MPIN" type="password" style={{ marginTop: 8 }} />
            </Card>
          )}

          {method === 'Bank Transfer' && (
            <Card title="Bank Transfer" size="small">
              <Text>Send to: <b>Al-Amin Stores (Pvt) Ltd</b></Text><br />
              <Text>Bank: <b>HBL · 1234-5678-9012-3456</b></Text><br />
              <Input placeholder="Reference / Transaction ID" style={{ marginTop: 8 }} />
            </Card>
          )}

          {method === 'Cash' && (
            <Card title="Cash" size="small">
              <Text>Cash Received</Text>
              <InputNumber
                style={{ width: '100%', marginTop: 6 }}
                size="large" prefix="₨"
                value={received}
                onChange={v => setReceived(v as number | null)}
              />
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Change Due</Text>
                <Text strong style={{ fontSize: 18, color: '#52c41a' }}>₨{change.toLocaleString()}</Text>
              </div>
            </Card>
          )}
        </Col>

        <Col xs={24} lg={10}>
          <Card style={{ background: '#fafafa', position: 'sticky', top: 80 }}>
            <Text type="secondary">Order Total</Text>
            <InputNumber
              size="large"
              prefix="₨"
              value={amount}
              onChange={v => setAmount(v as number | null)}
              style={{ width: '100%', fontSize: 28, marginTop: 6 }}
            />
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Method</Text>
              <Tag color="purple">{method}</Tag>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <Text>GST (17%)</Text>
              <Text>₨{Math.round((amount ?? 0) * 0.17 / 1.17).toLocaleString()}</Text>
            </div>

            <Button
              type="primary"
              size="large"
              block
              style={{ marginTop: 16, height: 56, fontSize: 18, background: '#a855f7', borderColor: '#a855f7' }}
              icon={<CheckCircleOutlined />}
              disabled={!canPay}
              onClick={payNow}
            >
              Pay Now · ₨{(amount ?? 0).toLocaleString()}
            </Button>
            <Text type="secondary" style={{ fontSize: 11, display: 'block', textAlign: 'center', marginTop: 8 }}>
              Secured payment · FBR-compliant invoicing
            </Text>
          </Card>
        </Col>
      </Row>

      <Modal open={!!success} onCancel={() => setSuccess(null)} footer={<Button type="primary" onClick={() => setSuccess(null)}>New Order</Button>}>
        {success && (
          <Result
            status="success"
            title="Payment Successful"
            subTitle={<>
              <b>{success.txnId}</b> · ₨{success.amount.toLocaleString()} via {success.method}
            </>}
          />
        )}
      </Modal>
    </div>
  )
}
