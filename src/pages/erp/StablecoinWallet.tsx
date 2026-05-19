import React, { useState, useEffect } from 'react'
import {
  Card, Row, Col, Typography, Tag, Button, Table, Tabs, Progress,
  Statistic, Space, Modal, Input, Select, Alert, Divider, Badge,
} from 'antd'
import {
  WalletOutlined, SwapOutlined, SendOutlined, DownloadOutlined,
  RiseOutlined, SafetyOutlined, GlobalOutlined, ThunderboltOutlined,
  CopyOutlined, CheckCircleOutlined, ClockCircleOutlined, LinkOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

const { Title, Text } = Typography

interface Txn {
  id: string
  type: 'send' | 'receive' | 'convert'
  amount: string
  currency: string
  to: string
  status: 'Confirmed' | 'Pending' | 'Processing'
  time: string
  hash: string
  pkrValue: number
}

const txns: Txn[] = [
  { id: 'T001', type: 'send',    amount: '99.00',  currency: 'USDC', to: 'Dubai → Lahore',   status: 'Confirmed',  time: '2 mins ago',  hash: '3xKp...9mQr', pkrValue: 27720 },
  { id: 'T002', type: 'receive', amount: '250.00', currency: 'USDC', to: 'UAE Wallet',       status: 'Confirmed',  time: '1 hr ago',    hash: '7yNt...2wVs', pkrValue: 70000 },
  { id: 'T003', type: 'convert', amount: '50.00',  currency: 'USDC', to: 'PKR 14,000',       status: 'Confirmed',  time: '3 hrs ago',   hash: '9aLq...5jRk', pkrValue: 14000 },
  { id: 'T004', type: 'send',    amount: '199.00', currency: 'USDC', to: 'London → Karachi', status: 'Processing', time: '5 mins ago',  hash: '2bMn...8oXp', pkrValue: 55720 },
  { id: 'T005', type: 'receive', amount: '500.00', currency: 'USDC', to: 'Canada Wallet',    status: 'Pending',    time: '12 mins ago', hash: '4cFr...1sYe', pkrValue: 140000 },
]

const STATUS_COLOR: Record<string, string> = { Confirmed: 'success', Pending: 'warning', Processing: 'processing' }
const TYPE_COLOR:   Record<string, string> = { send: 'red', receive: 'green', convert: 'blue' }
const TYPE_ICON:    Record<string, string> = { send: '↑', receive: '↓', convert: '⇄' }

function LiveRateBadge(): React.ReactElement {
  const [rate, setRate] = useState(280.12)
  const [blink, setBlink] = useState(false)
  useEffect(() => {
    const t = setInterval(() => {
      setRate(r => +(r + (Math.random() - 0.5) * 0.5).toFixed(2))
      setBlink(true)
      setTimeout(() => setBlink(false), 400)
    }, 4000)
    return () => clearInterval(t)
  }, [])
  return (
    <Tag color={blink ? 'green' : 'blue'} style={{ fontSize: 13, padding: '4px 12px', transition: 'all 0.3s' }}>
      <ThunderboltOutlined /> 1 USDC = PKR {rate}
      <Badge status="processing" style={{ marginLeft: 8 }} />
    </Tag>
  )
}

export default function StablecoinWallet(): React.ReactElement {
  const [sendModal, setSendModal]     = useState(false)
  const [receiveModal, setReceiveModal] = useState(false)
  const [convertModal, setConvertModal] = useState(false)
  const [sendAmount, setSendAmount]   = useState('')
  const [recipient, setRecipient]     = useState('')
  const [corridor, setCorridor]       = useState('UAE-PK')
  const [converting, setConverting]   = useState(false)
  const [sendDone, setSendDone]       = useState(false)
  const [copied, setCopied]           = useState(false)

  const walletAddr = '7xKp9mQr3NtVsLqFrYeXpMnRkCbZwAeJdHiGuOsTfPvBl'

  const handleSend = (): void => {
    setSendDone(true)
    setTimeout(() => { setSendModal(false); setSendDone(false); setSendAmount(''); setRecipient('') }, 2500)
  }

  const handleConvert = (): void => {
    setConverting(true)
    setTimeout(() => { setConverting(false); setConvertModal(false) }, 2000)
  }

  const copyAddr = (): void => {
    navigator.clipboard.writeText(walletAddr)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const cols: ColumnsType<Txn> = [
    {
      title: 'Type', dataIndex: 'type', width: 90,
      render: (t: string) => <Tag color={TYPE_COLOR[t]}>{TYPE_ICON[t]} {t.toUpperCase()}</Tag>,
    },
    {
      title: 'Amount', dataIndex: 'amount',
      render: (a: string, r: Txn) => (
        <div>
          <Text strong>{a} {r.currency}</Text>
          <br /><Text type="secondary" style={{ fontSize: 11 }}>≈ PKR {r.pkrValue.toLocaleString()}</Text>
        </div>
      ),
    },
    { title: 'Corridor / To', dataIndex: 'to', render: (t: string) => <Text>{t}</Text> },
    {
      title: 'Status', dataIndex: 'status',
      render: (s: string) => <Badge status={STATUS_COLOR[s] as 'success' | 'warning' | 'processing'} text={s} />,
    },
    {
      title: 'TX Hash', dataIndex: 'hash',
      render: (h: string) => (
        <Space size={4}>
          <Text code style={{ fontSize: 11 }}>{h}</Text>
          <LinkOutlined style={{ color: '#1890ff', cursor: 'pointer', fontSize: 11 }} />
        </Space>
      ),
    },
    { title: 'Time', dataIndex: 'time', render: (t: string) => <Text type="secondary">{t}</Text> },
  ]

  const pkrEquiv = (280.12 * 348.5).toLocaleString('en-PK', { maximumFractionDigits: 0 })

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Stablecoin Wallet</Title>
          <Text type="secondary">USDC · Solana Network · Privy MPC Custody</Text>
        </div>
        <LiveRateBadge />
      </div>

      <Alert
        message="Demo Mode — Static Data"
        description="This wallet UI is a functional demo. Real USDC transactions require Phase 4 backend integration (Circle API + Solana). Switch to production to enable live transfers."
        type="info" showIcon closable
        style={{ marginBottom: 24, borderRadius: 10 }}
      />

      {/* Balance Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card
            style={{ borderRadius: 16, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', border: '1px solid rgba(24,144,255,0.3)' }}
            styles={{ body: { padding: 24 } }}
          >
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, display: 'block', marginBottom: 8 }}>
              USDC BALANCE (Solana)
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#2775CA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                ⬡
              </div>
              <div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>348.50</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>USDC</div>
              </div>
            </div>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>≈ PKR {pkrEquiv}</Text>
            <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Button size="small" icon={<SendOutlined />} type="primary" onClick={() => setSendModal(true)}>Send</Button>
              <Button size="small" icon={<DownloadOutlined />} ghost onClick={() => setReceiveModal(true)}>Receive</Button>
              <Button size="small" icon={<SwapOutlined />} ghost onClick={() => setConvertModal(true)}>Convert</Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 16, background: 'linear-gradient(135deg, #0b3d2e 0%, #064e3b 100%)', border: '1px solid rgba(16,185,129,0.3)' }}
            styles={{ body: { padding: 24 } }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, display: 'block', marginBottom: 8 }}>PKR WALLET</Text>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 4 }}>PKR 48,250</div>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Available balance</Text>
            <div style={{ marginTop: 16 }}>
              <Progress percent={68} size="small" strokeColor="#10b981" trailColor="rgba(255,255,255,0.1)" showInfo={false} />
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>PKR 48,250 / 70,000 limit</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 16, background: 'linear-gradient(135deg, #1a1130 0%, #2d1b69 100%)', border: '1px solid rgba(139,92,246,0.3)' }}
            styles={{ body: { padding: 24 } }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, display: 'block', marginBottom: 8 }}>TOTAL REMITTED (30 days)</Text>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 4 }}>$2,840</div>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>≈ PKR 7,95,200</Text>
            <div style={{ marginTop: 12, display: 'flex', gap: 16 }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 700 }}>23</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Transfers</div>
              </div>
              <div>
                <div style={{ color: '#10b981', fontWeight: 700 }}>$23 saved</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>vs traditional</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Stats Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { title: '47 seconds', desc: 'Avg transfer time', icon: <ThunderboltOutlined />, color: '#f59e0b' },
          { title: '$1.00 flat', desc: 'Per transfer fee', icon: <RiseOutlined />, color: '#10b981' },
          { title: 'Solana', desc: '400ms block time', icon: <GlobalOutlined />, color: '#3b82f6' },
          { title: 'PVARA', desc: 'Regulated VASP', icon: <SafetyOutlined />, color: '#8b5cf6' },
        ].map(s => (
          <Col xs={12} md={6} key={s.title}>
            <Card style={{ borderRadius: 12, textAlign: 'center' }} styles={{ body: { padding: 16 } }}>
              <div style={{ fontSize: 24, color: s.color, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>{s.desc}</div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Transaction History */}
      <Card title={<Space><ClockCircleOutlined />Transaction History (Solana)</Space>}
        style={{ borderRadius: 12 }}
        extra={<Tag color="blue">Live Solana Feed (Demo)</Tag>}
      >
        <Table dataSource={txns} columns={cols} rowKey="id" pagination={false} scroll={{ x: 600 }} size="small" />
      </Card>

      {/* Tabs: Flow + Network Info */}
      <Card style={{ marginTop: 16, borderRadius: 12 }} styles={{ body: { padding: 0 } }}>
        <Tabs style={{ padding: '0 24px' }}
          items={[
            {
              key: '1', label: 'Cross-Border Flow',
              children: (
                <div style={{ padding: '0 0 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
                    {[
                      { icon: '🇦🇪', label: 'Dubai App', sub: 'AED' },
                      { icon: '🛡', label: 'AML Check', sub: 'Chainalysis' },
                      { icon: '⬡', label: 'USD→USDC', sub: 'Circle API' },
                      { icon: '⚡', label: 'Solana TX', sub: '400ms' },
                      { icon: '🏦', label: 'PK VASP', sub: 'PVARA' },
                      { icon: '💱', label: 'USDC→PKR', sub: 'SBP rate' },
                      { icon: '📡', label: 'Raast', sub: '1Link' },
                      { icon: '🇵🇰', label: 'Recipient', sub: 'Any PK bank' },
                    ].map((step, i, arr) => (
                      <React.Fragment key={i}>
                        <div style={{ textAlign: 'center', minWidth: 80 }}>
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f0f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 6px' }}>
                            {step.icon}
                          </div>
                          <div style={{ fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>{step.label}</div>
                          <div style={{ fontSize: 10, color: '#8c8c8c' }}>{step.sub}</div>
                        </div>
                        {i < arr.length - 1 && (
                          <div style={{ color: '#1890ff', fontSize: 18, flexShrink: 0 }}>→</div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <Divider style={{ margin: '16px 0' }} />
                  <Row gutter={16}>
                    <Col span={12}>
                      <div style={{ background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                        <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>Traditional Wire Transfer</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#ef4444' }}>$32</div>
                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>fee per $100 · 3-5 days</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                        <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>Indus Nexus (USDC)</div>
                        <div style={{ fontSize: 36, fontWeight: 900, color: '#10b981' }}>$1</div>
                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>flat fee · 47 seconds</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              ),
            },
            {
              key: '2', label: 'Wallet Address',
              children: (
                <div style={{ padding: '0 0 24px' }}>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>Your Solana USDC wallet address (MPC — non-custodial via Privy.io)</Text>
                  <div style={{ background: '#f5f5f5', borderRadius: 10, padding: 16, display: 'flex', alignItems: 'center', gap: 12, wordBreak: 'break-all' }}>
                    <Text code style={{ flex: 1, fontSize: 12 }}>{walletAddr}</Text>
                    <Button icon={copied ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
                      onClick={copyAddr} size="small">
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                  <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Tag>Network: Solana Mainnet</Tag>
                    <Tag color="green">Token: USDC (SPL)</Tag>
                    <Tag color="blue">Custody: Privy MPC</Tag>
                    <Tag color="purple">FATF Travel Rule: Active</Tag>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* SEND MODAL */}
      <Modal title={<Space><SendOutlined />Send USDC</Space>}
        open={sendModal} onCancel={() => { setSendModal(false); setSendDone(false) }} footer={null} centered>
        {sendDone ? (
          <div style={{ textAlign: 'center', padding: 32 }}>
            <CheckCircleOutlined style={{ fontSize: 56, color: '#52c41a' }} />
            <Title level={4} style={{ color: '#52c41a', marginTop: 16 }}>Transfer Initiated!</Title>
            <Text type="secondary">Confirming on Solana · Est. 47 seconds</Text>
          </div>
        ) : (
          <div style={{ padding: '8px 0' }}>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Corridor</Text>
              <Select value={corridor} onChange={setCorridor} style={{ width: '100%', marginTop: 6 }}>
                <Select.Option value="UAE-PK">🇦🇪 UAE → Pakistan</Select.Option>
                <Select.Option value="UK-PK">🇬🇧 UK → Pakistan</Select.Option>
                <Select.Option value="USA-PK">🇺🇸 USA → Pakistan</Select.Option>
                <Select.Option value="CA-PK">🇨🇦 Canada → Pakistan</Select.Option>
                <Select.Option value="SA-PK">🇸🇦 Saudi → Pakistan</Select.Option>
              </Select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Amount (USDC)</Text>
              <Input size="large" prefix="$" value={sendAmount} onChange={e => setSendAmount(e.target.value)}
                placeholder="0.00" style={{ marginTop: 6, borderRadius: 8 }} />
              {sendAmount && (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  ≈ PKR {(parseFloat(sendAmount || '0') * 280.12).toLocaleString()} · Fee: $1.00 · Recipient gets ${(parseFloat(sendAmount || '0') - 1).toFixed(2)}
                </Text>
              )}
            </div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Recipient Phone (Pakistan)</Text>
              <Input size="large" prefix="🇵🇰" value={recipient} onChange={e => setRecipient(e.target.value)}
                placeholder="03XX-XXXXXXX" style={{ marginTop: 6, borderRadius: 8 }} />
            </div>
            <Alert message="AML screening runs automatically before transfer. FATF Travel Rule applied." type="info" showIcon style={{ marginBottom: 16 }} />
            <Button type="primary" block size="large" icon={<SendOutlined />} onClick={handleSend}
              disabled={!sendAmount || !recipient} style={{ borderRadius: 8 }}>
              Send {sendAmount} USDC via Solana
            </Button>
          </div>
        )}
      </Modal>

      {/* RECEIVE MODAL */}
      <Modal title={<Space><DownloadOutlined />Receive USDC</Space>}
        open={receiveModal} onCancel={() => setReceiveModal(false)} footer={null} centered>
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ width: 160, height: 160, background: '#f5f5f5', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 14, color: '#8c8c8c', border: '1px dashed #d9d9d9' }}>
            [QR Code]<br />Solana USDC
          </div>
          <Text code style={{ fontSize: 11, wordBreak: 'break-all' }}>{walletAddr.slice(0, 20)}...{walletAddr.slice(-8)}</Text>
          <div style={{ marginTop: 16 }}>
            <Button icon={<CopyOutlined />} block onClick={copyAddr}>{copied ? 'Copied!' : 'Copy Address'}</Button>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Tag>Solana Mainnet</Tag>
            <Tag color="blue">USDC (SPL)</Tag>
          </div>
        </div>
      </Modal>

      {/* CONVERT MODAL */}
      <Modal title={<Space><SwapOutlined />Convert USDC → PKR</Space>}
        open={convertModal} onCancel={() => setConvertModal(false)} footer={null} centered>
        <div style={{ padding: '8px 0' }}>
          <div style={{ background: '#fafafa', borderRadius: 10, padding: 16, marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#8c8c8c' }}>Current Rate</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#1890ff' }}>1 USDC = PKR 280.12</div>
            <Tag color="green">Live SBP rate · Updated 30s ago</Tag>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>USDC Amount to Convert</Text>
            <Input size="large" prefix="⬡" placeholder="0.00" style={{ marginTop: 6, borderRadius: 8 }} />
          </div>
          <div style={{ background: '#f6ffed', borderRadius: 10, padding: 12, marginBottom: 16 }}>
            <Text type="secondary">You will receive via Raast: </Text>
            <Text strong style={{ color: '#52c41a' }}>PKR 0.00</Text>
            <Text type="secondary"> (0.5% conversion fee)</Text>
          </div>
          <Button type="primary" block size="large" icon={<SwapOutlined />} loading={converting} onClick={handleConvert} style={{ borderRadius: 8 }}>
            Convert via Raast
          </Button>
        </div>
      </Modal>
    </div>
  )
}
