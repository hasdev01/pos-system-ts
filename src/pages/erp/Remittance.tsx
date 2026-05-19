import React, { useState } from 'react'
import {
  Card, Row, Col, Typography, Tag, Button, Table, Steps, Input,
  Alert, Statistic, Progress, Space, Divider, Timeline,
} from 'antd'
import {
  SendOutlined, GlobalOutlined, CheckCircleOutlined, ClockCircleOutlined,
  ThunderboltOutlined, DollarOutlined, SafetyOutlined, PhoneOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

const { Title, Text } = Typography

interface RemittanceRecord {
  id: string
  from: string
  to: string
  amount: string
  fee: string
  pkr: string
  status: 'Delivered' | 'Processing' | 'AML Check' | 'Failed'
  time: string
  seconds: number
}

const remittances: RemittanceRecord[] = [
  { id: 'REM-2001', from: '🇦🇪 UAE',    to: 'Lahore',  amount: '$100', fee: '$1', pkr: 'PKR 27,900', status: 'Delivered',  time: '5 mins ago',  seconds: 47 },
  { id: 'REM-2002', from: '🇬🇧 UK',     to: 'Karachi', amount: '$250', fee: '$1', pkr: 'PKR 69,800', status: 'Processing', time: '8 mins ago',  seconds: 0  },
  { id: 'REM-2003', from: '🇺🇸 USA',    to: 'Lahore',  amount: '$500', fee: '$1', pkr: 'PKR 1,39,500', status: 'Delivered',time: '2 hrs ago',   seconds: 43 },
  { id: 'REM-2004', from: '🇨🇦 Canada', to: 'Islamabad', amount: '$75', fee: '$1', pkr: 'PKR 20,900', status: 'AML Check', time: '15 mins ago', seconds: 0  },
  { id: 'REM-2005', from: '🇸🇦 Saudi',  to: 'Faisalabad', amount: '$200', fee: '$1', pkr: 'PKR 55,800', status: 'Delivered', time: '1 day ago',  seconds: 51 },
  { id: 'REM-2006', from: '🇦🇪 UAE',    to: 'Multan',  amount: '$150', fee: '$1', pkr: 'PKR 41,900', status: 'Delivered',  time: '1 day ago',   seconds: 44 },
]

const STATUS_COLOR: Record<string, string> = {
  Delivered: 'success', Processing: 'processing', 'AML Check': 'warning', Failed: 'error',
}

const CORRIDOR_DETAILS: Record<string, { partner: string; currency: string; network: string }> = {
  'UAE-PK':  { partner: 'Al Ansari Exchange', currency: 'AED → USDC → PKR', network: 'Solana' },
  'UK-PK':   { partner: 'Currencycloud (FCA)', currency: 'GBP → USDC → PKR', network: 'Solana' },
  'USA-PK':  { partner: 'Circle Direct', currency: 'USD → USDC → PKR', network: 'Solana' },
  'CA-PK':   { partner: 'Wise Business API', currency: 'CAD → USDC → PKR', network: 'Solana' },
  'SA-PK':   { partner: 'STC Pay / Al Rajhi', currency: 'SAR → USDC → PKR', network: 'Solana' },
  'QA-PK':   { partner: 'Al Ansari GCC', currency: 'QAR → USDC → PKR', network: 'Solana' },
}

export default function Remittance(): React.ReactElement {
  const [step, setStep]           = useState(0)
  const [corridor, setCorridor]   = useState('UAE-PK')
  const [amount, setAmount]       = useState('')
  const [phone, setPhone]         = useState('')
  const [name, setName]           = useState('')
  const [tracking, setTracking]   = useState('')
  const [trackResult, setTrackResult] = useState<RemittanceRecord | null>(null)

  const rate = 280.12
  const fee  = 1
  const recvUsdc  = parseFloat(amount || '0') - fee
  const recvPkr   = recvUsdc > 0 ? (recvUsdc * rate).toLocaleString('en-PK', { maximumFractionDigits: 0 }) : '0'
  const corridor_info = CORRIDOR_DETAILS[corridor]

  const handleTrack = (): void => {
    const found = remittances.find(r => r.id.toLowerCase() === tracking.toLowerCase())
    setTrackResult(found ?? null)
  }

  const handleSendNext = (): void => {
    if (step < 3) setStep(s => s + 1)
  }

  const cols: ColumnsType<RemittanceRecord> = [
    { title: 'Ref ID', dataIndex: 'id', render: (v: string) => <Text code>{v}</Text>, width: 110 },
    { title: 'From', dataIndex: 'from' },
    { title: 'To', dataIndex: 'to' },
    {
      title: 'Amount', dataIndex: 'amount',
      render: (a: string, r: RemittanceRecord) => (
        <div>
          <Text strong>{a}</Text> <Tag color="blue">{r.fee} fee</Tag>
          <br /><Text type="secondary" style={{ fontSize: 11 }}>{r.pkr}</Text>
        </div>
      ),
    },
    {
      title: 'Status', dataIndex: 'status',
      render: (s: string) => <Tag color={STATUS_COLOR[s]}>{s}</Tag>,
    },
    {
      title: 'Speed', dataIndex: 'seconds',
      render: (s: number) => s > 0
        ? <Tag color="green"><ThunderboltOutlined /> {s}s</Tag>
        : <Tag><ClockCircleOutlined /> In progress</Tag>,
    },
    { title: 'Time', dataIndex: 'time', render: (t: string) => <Text type="secondary">{t}</Text> },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Remittance Tracker</Title>
          <Text type="secondary">Cross-border payments · $1 flat · 47 seconds · Solana USDC</Text>
        </div>
        <Tag color="green" style={{ fontSize: 13, padding: '4px 12px' }}>
          <ThunderboltOutlined /> 8 Corridors Active
        </Tag>
      </div>

      <Alert
        message="Demo Mode — Static Simulation"
        description="New transfer flow is a UI demo. Real cross-border transfers require Phase 4 backend (Circle API + Raast P2M + Notabene Travel Rule)."
        type="info" showIcon closable style={{ marginBottom: 24, borderRadius: 10 }}
      />

      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { title: 'PKR 3,55,800', label: 'Total Remitted (30d)', color: '#1890ff', icon: <DollarOutlined /> },
          { title: '$23 saved',    label: 'Fees saved vs WU/Remitly', color: '#52c41a', icon: <ThunderboltOutlined /> },
          { title: '44s avg',      label: 'Avg delivery time', color: '#f59e0b', icon: <ClockCircleOutlined /> },
          { title: '6 sent',       label: 'Total transfers',  color: '#8b5cf6', icon: <SendOutlined /> },
        ].map(s => (
          <Col xs={12} md={6} key={s.label}>
            <Card style={{ borderRadius: 12 }} styles={{ body: { padding: 16 } }}>
              <Statistic title={<Text type="secondary" style={{ fontSize: 12 }}>{s.label}</Text>}
                value={s.title} prefix={<span style={{ color: s.color }}>{s.icon}</span>}
                valueStyle={{ fontSize: 20, fontWeight: 700, color: s.color }} />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* SEND NEW */}
        <Col xs={24} lg={14}>
          <Card title={<Space><SendOutlined />New Transfer</Space>} style={{ borderRadius: 12 }}>
            <Steps current={step} size="small" style={{ marginBottom: 24 }}
              items={[
                { title: 'Corridor' },
                { title: 'Amount' },
                { title: 'Recipient' },
                { title: 'Confirm' },
              ]}
            />

            {step === 0 && (
              <div>
                <Text strong>Select Sending Corridor</Text>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 12 }}>
                  {[
                    { key: 'UAE-PK', flag: '🇦🇪', label: 'UAE' },
                    { key: 'UK-PK',  flag: '🇬🇧', label: 'UK' },
                    { key: 'USA-PK', flag: '🇺🇸', label: 'USA' },
                    { key: 'CA-PK',  flag: '🇨🇦', label: 'Canada' },
                    { key: 'SA-PK',  flag: '🇸🇦', label: 'Saudi' },
                    { key: 'QA-PK',  flag: '🇶🇦', label: 'Qatar' },
                  ].map(c => (
                    <Button key={c.key} block
                      type={corridor === c.key ? 'primary' : 'default'}
                      onClick={() => setCorridor(c.key)}
                      style={{ borderRadius: 10, height: 52 }}>
                      <div style={{ fontSize: 20 }}>{c.flag}</div>
                      <div style={{ fontSize: 11 }}>{c.label}</div>
                    </Button>
                  ))}
                </div>
                {corridor_info && (
                  <Alert style={{ marginTop: 12 }} type="info"
                    message={`Partner: ${corridor_info.partner} · ${corridor_info.currency} · ${corridor_info.network}`} />
                )}
                <Button type="primary" block style={{ marginTop: 16, borderRadius: 8 }} onClick={handleSendNext}>
                  Next →
                </Button>
              </div>
            )}

            {step === 1 && (
              <div>
                <Text strong>Amount to Send (USD)</Text>
                <Input size="large" prefix="$" value={amount} onChange={e => setAmount(e.target.value)}
                  placeholder="100.00" style={{ marginTop: 8, borderRadius: 8 }} />
                {parseFloat(amount) > 1 && (
                  <div style={{ background: '#f6ffed', borderRadius: 10, padding: 12, marginTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text type="secondary">You send</Text><Text strong>${amount} USD</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text type="secondary">Transfer fee</Text><Text strong style={{ color: '#f59e0b' }}>$1.00</Text>
                    </div>
                    <Divider style={{ margin: '8px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text type="secondary">USDC sent</Text><Text strong>${recvUsdc.toFixed(2)} USDC</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary">Recipient gets</Text>
                      <Text strong style={{ color: '#52c41a', fontSize: 16 }}>PKR {recvPkr}</Text>
                    </div>
                    <Tag style={{ marginTop: 8 }} color="blue">Rate: 1 USDC = PKR {rate}</Tag>
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <Button block onClick={() => setStep(0)}>← Back</Button>
                  <Button type="primary" block onClick={handleSendNext} disabled={!amount || parseFloat(amount) <= 1} style={{ borderRadius: 8 }}>Next →</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <Text strong>Recipient Details (Pakistan)</Text>
                <Input size="large" prefix={<PhoneOutlined />} value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX" style={{ marginTop: 8, marginBottom: 12, borderRadius: 8 }} />
                <Input size="large" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Recipient Full Name" style={{ borderRadius: 8 }} />
                <Alert style={{ marginTop: 12 }} type="info" showIcon
                  message="Funds delivered via Raast P2M to any Pakistan bank or mobile wallet. Recipient notified via WhatsApp." />
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <Button block onClick={() => setStep(1)}>← Back</Button>
                  <Button type="primary" block onClick={handleSendNext} disabled={!phone || !name} style={{ borderRadius: 8 }}>Next →</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ textAlign: 'center' }}>
                <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a' }} />
                <Title level={4} style={{ color: '#52c41a', marginTop: 16 }}>Transfer Submitted!</Title>
                <Text type="secondary">Your ${amount} is being processed</Text>
                <div style={{ background: '#f6ffed', borderRadius: 12, padding: 16, margin: '16px 0', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text type="secondary">Ref ID</Text><Text strong>REM-{Math.floor(Math.random() * 9000 + 1000)}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text type="secondary">Corridor</Text><Text strong>{corridor}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text type="secondary">Recipient</Text><Text strong>{name} · {phone}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text type="secondary">Expected delivery</Text><Text strong style={{ color: '#52c41a' }}>~47 seconds</Text>
                  </div>
                </div>
                <Progress percent={35} status="active" strokeColor={{ from: '#1890ff', to: '#52c41a' }} />
                <Text type="secondary" style={{ fontSize: 12 }}>AML Check → Solana TX → Raast Delivery</Text>
                <div style={{ marginTop: 16 }}>
                  <Button block onClick={() => { setStep(0); setAmount(''); setPhone(''); setName('') }}>New Transfer</Button>
                </div>
              </div>
            )}
          </Card>
        </Col>

        {/* TRACKER */}
        <Col xs={24} lg={10}>
          <Card title={<Space><SearchOutlined />Track Transfer</Space>} style={{ borderRadius: 12, marginBottom: 16 }}>
            <Input.Search
              placeholder="REM-2001"
              value={tracking}
              onChange={e => setTracking(e.target.value)}
              onSearch={handleTrack}
              enterButton="Track"
              size="large"
              style={{ marginBottom: 12 }}
            />
            {trackResult && (
              <div style={{ background: '#fafafa', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text strong>{trackResult.id}</Text>
                  <Tag color={STATUS_COLOR[trackResult.status]}>{trackResult.status}</Tag>
                </div>
                <Timeline style={{ marginTop: 12 }}
                  items={[
                    { color: 'green', children: <><Text strong>Initiated</Text> <Text type="secondary">Transfer started</Text></> },
                    { color: trackResult.status !== 'AML Check' ? 'green' : 'blue', children: <><Text strong>AML Screening</Text> <Text type="secondary">Chainalysis + OFAC</Text></> },
                    { color: ['Processing', 'Delivered'].includes(trackResult.status) ? 'green' : 'gray', children: <><Text strong>Solana TX</Text> <Text type="secondary">USDC transferred</Text></> },
                    { color: trackResult.status === 'Delivered' ? 'green' : 'gray', children: <><Text strong>Raast Delivery</Text> <Text type="secondary">{trackResult.to} · {trackResult.pkr}</Text></> },
                  ]}
                />
                {trackResult.seconds > 0 && (
                  <Tag color="green" style={{ marginTop: 8 }}><ThunderboltOutlined /> Delivered in {trackResult.seconds}s</Tag>
                )}
              </div>
            )}
            {tracking && !trackResult && (
              <Alert message="No transfer found. Try REM-2001 through REM-2006." type="warning" showIcon />
            )}
          </Card>

          {/* Corridor cards */}
          <Card title={<Space><GlobalOutlined />Active Corridors</Space>} style={{ borderRadius: 12 }}>
            {[
              { flag: '🇦🇪', name: 'UAE → PK',    fee: '$1', time: '47s', status: 'Live' },
              { flag: '🇬🇧', name: 'UK → PK',     fee: '$1', time: '47s', status: 'Live' },
              { flag: '🇺🇸', name: 'USA → PK',    fee: '$1', time: '47s', status: 'Live' },
              { flag: '🇨🇦', name: 'Canada → PK', fee: '$1', time: '47s', status: 'Beta' },
              { flag: '🇸🇦', name: 'Saudi → PK',  fee: '$1', time: '47s', status: 'Beta' },
              { flag: '🇶🇦', name: 'Qatar → PK',  fee: '$1', time: '47s', status: 'Soon' },
            ].map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                <span style={{ fontSize: 20, marginRight: 10 }}>{c.flag}</span>
                <div style={{ flex: 1 }}>
                  <Text strong style={{ fontSize: 13 }}>{c.name}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 11 }}>{c.fee} fee · {c.time}</Text>
                </div>
                <Tag color={c.status === 'Live' ? 'success' : c.status === 'Beta' ? 'warning' : 'default'}>{c.status}</Tag>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* History Table */}
      <Card title="Transfer History" style={{ marginTop: 16, borderRadius: 12 }}
        extra={<Tag color="blue">Last 30 days</Tag>}>
        <Table dataSource={remittances} columns={cols} rowKey="id" pagination={false} scroll={{ x: 700 }} size="small" />
      </Card>

      {/* Compliance */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {[
          { icon: <SafetyOutlined />, label: 'AML Screening', desc: 'Chainalysis KYT + OFAC/UN sanctions', color: '#ef4444' },
          { icon: <GlobalOutlined />, label: 'FATF Travel Rule', desc: 'Notabene.id — sender+receiver tagged', color: '#8b5cf6' },
          { icon: <ThunderboltOutlined />, label: 'PVARA Licensed', desc: 'Pakistan Virtual Assets Act 2026', color: '#f59e0b' },
          { icon: <CheckCircleOutlined />, label: 'Sharia Compliant', desc: 'No interest — fee-based model', color: '#10b981' },
        ].map(c => (
          <Col xs={12} md={6} key={c.label}>
            <Card style={{ borderRadius: 12, textAlign: 'center' }} styles={{ body: { padding: 16 } }}>
              <div style={{ fontSize: 22, color: c.color, marginBottom: 4 }}>{c.icon}</div>
              <Text strong style={{ fontSize: 13 }}>{c.label}</Text>
              <br /><Text type="secondary" style={{ fontSize: 11 }}>{c.desc}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
