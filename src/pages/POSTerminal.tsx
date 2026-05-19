import React, { useState, useEffect, useRef } from 'react'
import {
  Row, Col, Card, Button, Input, Typography, Divider, Tag,
  Space, Modal, Empty, Badge, Radio, Progress,
} from 'antd'
import {
  SearchOutlined, PlusOutlined, MinusOutlined, DeleteOutlined,
  PrinterOutlined, CreditCardOutlined, DollarOutlined, CheckCircleOutlined,
  QrcodeOutlined, MobileOutlined, BankOutlined,
} from '@ant-design/icons'
import { products } from '../data/staticData'
import type { CartItem, Product } from '../types'

const { Title, Text } = Typography

type PayMethod = 'cash' | 'card' | 'jazzcash' | 'easypaisa' | 'raast'

// Confetti particles
function launchConfetti(): void {
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')!
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; rot: number; rotV: number }[] = []
  const colors = ['#f59e0b','#10b981','#3b82f6','#8b5cf6','#ef4444','#fbbf24']
  for (let i = 0; i < 140; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rot: 0,
      rotV: (Math.random() - 0.5) * 0.2,
    })
  }

  let frame = 0
  const animate = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.15
      p.rot += p.rotV
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      ctx.restore()
    })
    frame++
    if (frame < 120) requestAnimationFrame(animate)
    else canvas.remove()
  }
  animate()
}

function RaastQR({ amount }: { amount: number }): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const size = 180
    canvas.width = size
    canvas.height = size

    // Draw QR-like pattern
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, size, size)
    ctx.fillStyle = '#000'

    const cell = 8
    const cols = Math.floor(size / cell)
    // Seed from amount for deterministic pattern
    let seed = amount * 31 + 17
    const rand = (): number => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff }

    // Corner squares
    const corner = (x: number, y: number): void => {
      ctx.fillStyle = '#000'
      ctx.fillRect(x * cell, y * cell, 7 * cell, 7 * cell)
      ctx.fillStyle = '#fff'
      ctx.fillRect((x + 1) * cell, (y + 1) * cell, 5 * cell, 5 * cell)
      ctx.fillStyle = '#000'
      ctx.fillRect((x + 2) * cell, (y + 2) * cell, 3 * cell, 3 * cell)
    }
    corner(1, 1); corner(cols - 8, 1); corner(1, cols - 8)

    // Data cells
    for (let r = 0; r < cols; r++) {
      for (let c = 0; c < cols; c++) {
        const inCorner =
          (r < 8 && c < 8) || (r < 8 && c >= cols - 8) || (r >= cols - 8 && c < 8)
        if (!inCorner && rand() > 0.52) {
          ctx.fillStyle = '#000'
          ctx.fillRect(c * cell, r * cell, cell - 1, cell - 1)
        }
      }
    }

    // Raast label
    ctx.fillStyle = '#1677ff'
    ctx.font = 'bold 11px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('RAAST', size / 2, size - 4)
  }, [amount])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <canvas ref={canvasRef} style={{ border: '4px solid #1677ff', borderRadius: 12 }} />
      <Text style={{ fontSize: 12, color: '#1677ff', fontWeight: 600 }}>Scan with any Pakistan bank app</Text>
    </div>
  )
}

export default function POSTerminal(): React.ReactElement {
  const [cart, setCart]             = useState<CartItem[]>([])
  const [search, setSearch]         = useState<string>('')
  const [selectedCategory, setCategory] = useState<string>('All')
  const [paymentModal, setPaymentModal] = useState<boolean>(false)
  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [payMethod, setPayMethod]   = useState<PayMethod>('cash')
  const [cashGiven, setCashGiven]   = useState<string>('')
  const [jazzPhone, setJazzPhone]   = useState<string>('')
  const [epPhone, setEpPhone]       = useState<string>('')
  const [processingPct, setProcessingPct] = useState(0)
  const [orderNum] = useState(() => Math.floor(Math.random() * 900 + 1100))

  const categories: string[] = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const filtered: Product[] = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory
    return matchSearch && matchCat
  })

  const addToCart = (product: Product): void => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const updateQty = (id: number, qty: number): void => {
    if (qty < 1) { removeFromCart(id); return }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const removeFromCart = (id: number): void => setCart(prev => prev.filter(i => i.id !== id))

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const tax      = Math.round(subtotal * 0.05)
  const discount = cart.length > 3 ? Math.round(subtotal * 0.02) : 0
  const total    = subtotal + tax - discount
  const change   = Math.max(0, parseFloat(cashGiven || '0') - total)

  const handleCheckout = (): void => {
    let pct = 0
    const interval = setInterval(() => {
      pct += Math.random() * 30 + 10
      if (pct >= 100) {
        pct = 100
        clearInterval(interval)
        setTimeout(() => {
          setProcessingPct(0)
          setPaymentModal(false)
          setSuccessModal(true)
          launchConfetti()
        }, 400)
      }
      setProcessingPct(Math.min(pct, 100))
    }, 350)
  }

  const handleNewSale = (): void => {
    setCart([])
    setSuccessModal(false)
    setCashGiven('')
    setJazzPhone('')
    setEpPhone('')
    setPayMethod('cash')
  }

  const handlePrint = (): void => {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`
      <html><head><title>Receipt #ORD-${orderNum}</title>
      <style>
        body{font-family:monospace;max-width:300px;margin:20px auto;font-size:13px}
        h2{text-align:center;margin:0 0 4px}
        p{text-align:center;margin:2px 0;color:#666}
        hr{border:1px dashed #ccc}
        .row{display:flex;justify-content:space-between;margin:4px 0}
        .total{font-weight:bold;font-size:16px;border-top:2px solid #000;padding-top:6px;margin-top:6px}
      </style></head><body>
      <h2>Store Receipt</h2>
      <p>Indus Nexus POS</p>
      <p>Order #ORD-${orderNum}</p>
      <p>${new Date().toLocaleString()}</p>
      <hr/>
      ${cart.map(i => `<div class="row"><span>${i.name} x${i.qty}</span><span>Rs. ${(i.price * i.qty).toLocaleString()}</span></div>`).join('')}
      <hr/>
      <div class="row"><span>Subtotal</span><span>Rs. ${subtotal.toLocaleString()}</span></div>
      <div class="row"><span>GST (5%)</span><span>Rs. ${tax.toLocaleString()}</span></div>
      ${discount > 0 ? `<div class="row"><span>Discount</span><span>-Rs. ${discount.toLocaleString()}</span></div>` : ''}
      <div class="row total"><span>TOTAL</span><span>Rs. ${total.toLocaleString()}</span></div>
      <hr/>
      <p>Payment: ${payMethod.toUpperCase()}</p>
      <p style="margin-top:16px">Thank you for your purchase!</p>
      </body></html>
    `)
    w.document.close()
    w.print()
  }

  const METHOD_LABEL: Record<PayMethod, string> = {
    cash: 'Cash', card: 'Card', jazzcash: 'JazzCash', easypaisa: 'EasyPaisa', raast: 'Raast QR',
  }

  return (
    <div style={{ height: 'calc(100vh - 112px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ margin: 0 }}>POS Terminal</Title>
        <Space>
          <Badge status="processing" />
          <Text type="secondary" style={{ fontSize: 13 }}>Cashier: Ahmed Ali</Text>
          <Tag color="green">Open</Tag>
        </Space>
      </div>

      <Row gutter={16} style={{ flex: 1, overflow: 'hidden' }}>
        {/* Product Panel */}
        <Col xs={24} lg={14} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Card bordered={false}
            style={{ borderRadius: 12, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            styles={{ body: { padding: 16, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } }}
          >
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <Input prefix={<SearchOutlined />} placeholder="Search product or SKU..."
                value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, borderRadius: 8 }} />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {categories.map(c => (
                <Button key={c} size="small" type={selectedCategory === c ? 'primary' : 'default'}
                  onClick={() => setCategory(c)} style={{ borderRadius: 20, fontSize: 12 }}>
                  {c}
                </Button>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
              <Row gutter={[10, 10]}>
                {filtered.map((product: Product) => {
                  const inCart = cart.find(i => i.id === product.id)
                  return (
                    <Col xs={12} sm={8} md={8} key={product.id}>
                      <Card hoverable onClick={() => addToCart(product)}
                        style={{
                          borderRadius: 10, cursor: 'pointer', userSelect: 'none',
                          border: inCart ? '2px solid #1890ff' : '1px solid #f0f0f0',
                          background: inCart ? '#e6f7ff' : '#fff',
                        }}
                        styles={{ body: { padding: 12 } }}
                      >
                        <div style={{ textAlign: 'center', fontSize: 32, marginBottom: 6 }}>{product.image}</div>
                        <Text strong style={{ fontSize: 12, display: 'block', lineHeight: 1.3, marginBottom: 4 }}>{product.name}</Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text style={{ color: '#1890ff', fontWeight: 700, fontSize: 13 }}>Rs. {product.price}</Text>
                          <Text type="secondary" style={{ fontSize: 11 }}>{product.stock} {product.unit}</Text>
                        </div>
                        {inCart && <Tag color="blue" style={{ marginTop: 6, width: '100%', textAlign: 'center' }}>{inCart.qty} in cart</Tag>}
                      </Card>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </Card>
        </Col>

        {/* Cart Panel */}
        <Col xs={24} lg={10} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Card bordered={false}
            style={{ borderRadius: 12, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            styles={{ body: { padding: 16, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text strong style={{ fontSize: 15 }}>Cart</Text>
              <Badge count={cart.reduce((s, i) => s + i.qty, 0)} style={{ background: '#1890ff' }}>
                <Tag color="blue">{cart.length} items</Tag>
              </Badge>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 12 }}>
              {cart.length === 0 ? (
                <Empty description="Cart is empty" image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: 60 }} />
              ) : (
                cart.map((item: CartItem) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
                    <span style={{ fontSize: 22 }}>{item.image}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text strong style={{ fontSize: 12, display: 'block' }}>{item.name}</Text>
                      <Text type="secondary" style={{ fontSize: 11 }}>Rs. {item.price} each</Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Button size="small" icon={<MinusOutlined />} onClick={() => updateQty(item.id, item.qty - 1)} shape="circle" />
                      <Text strong style={{ minWidth: 24, textAlign: 'center' }}>{item.qty}</Text>
                      <Button size="small" icon={<PlusOutlined />} onClick={() => updateQty(item.id, item.qty + 1)} shape="circle" type="primary" />
                    </div>
                    <Text strong style={{ minWidth: 70, textAlign: 'right', fontSize: 13 }}>
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </Text>
                    <Button size="small" icon={<DeleteOutlined />} onClick={() => removeFromCart(item.id)} type="text" danger />
                  </div>
                ))
              )}
            </div>

            <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: 12 }}>
              {[
                { label: 'Subtotal', value: subtotal },
                { label: 'GST (5%)', value: tax },
                { label: 'Discount', value: -discount, color: '#52c41a' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text type="secondary">{row.label}</Text>
                  <Text style={{ color: row.color }}>Rs. {Math.abs(row.value).toLocaleString()}</Text>
                </div>
              ))}
              <Divider style={{ margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Title level={4} style={{ margin: 0 }}>Total</Title>
                <Title level={4} style={{ margin: 0, color: '#1890ff' }}>Rs. {total.toLocaleString()}</Title>
              </div>
              <Button block type="primary" size="large" icon={<CreditCardOutlined />}
                disabled={cart.length === 0}
                onClick={() => setPaymentModal(true)}
                style={{ borderRadius: 8, height: 52, fontWeight: 700, fontSize: 15 }}>
                Checkout — Rs. {total.toLocaleString()}
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* PAYMENT MODAL */}
      <Modal
        title={<Space><CreditCardOutlined />Payment — Rs. {total.toLocaleString()}</Space>}
        open={paymentModal} onCancel={() => setPaymentModal(false)} footer={null} centered width={480}
      >
        <div style={{ padding: '8px 0' }}>
          {processingPct > 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <Progress type="circle" percent={Math.round(processingPct)} strokeColor={{ '0%': '#1890ff', '100%': '#52c41a' }} />
              <div style={{ marginTop: 16 }}>
                <Text strong>Processing {METHOD_LABEL[payMethod]} payment...</Text>
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {processingPct < 40 ? 'Initiating transaction...' : processingPct < 80 ? 'Verifying with gateway...' : 'Confirming payment...'}
              </Text>
            </div>
          ) : (
            <>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Select Payment Method</Text>
              <Radio.Group value={payMethod} onChange={e => setPayMethod(e.target.value as PayMethod)} style={{ width: '100%' }}>
                <Row gutter={[8, 8]}>
                  {([
                    { key: 'cash',      label: 'Cash',      icon: <DollarOutlined />,    color: '#52c41a' },
                    { key: 'card',      label: 'Card',      icon: <CreditCardOutlined />, color: '#1890ff' },
                    { key: 'jazzcash',  label: 'JazzCash',  icon: <MobileOutlined />,     color: '#8b0000' },
                    { key: 'easypaisa', label: 'EasyPaisa', icon: <MobileOutlined />,     color: '#009900' },
                    { key: 'raast',     label: 'Raast QR',  icon: <QrcodeOutlined />,     color: '#0050d0' },
                  ] as const).map(m => (
                    <Col span={12} key={m.key}>
                      <Radio.Button value={m.key} style={{
                        width: '100%', height: 52, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 8, borderRadius: 10,
                        borderColor: payMethod === m.key ? m.color : undefined,
                        background: payMethod === m.key ? `${m.color}15` : undefined,
                      }}>
                        <span style={{ color: m.color, fontSize: 18 }}>{m.icon}</span>
                        <Text strong style={{ color: payMethod === m.key ? m.color : undefined }}>{m.label}</Text>
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>

              <Divider style={{ margin: '16px 0' }} />

              {payMethod === 'cash' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text type="secondary">Amount Due</Text>
                    <Text strong style={{ fontSize: 16, color: '#1890ff' }}>Rs. {total.toLocaleString()}</Text>
                  </div>
                  <Text strong style={{ display: 'block', marginBottom: 6 }}>Cash Received</Text>
                  <Input size="large" prefix="Rs." value={cashGiven} onChange={e => setCashGiven(e.target.value)}
                    placeholder="Enter amount" style={{ borderRadius: 8 }} />
                  {parseFloat(cashGiven) >= total && (
                    <div style={{ background: '#f6ffed', borderRadius: 10, padding: 12, marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                      <Text strong>Change</Text>
                      <Text strong style={{ fontSize: 18, color: '#52c41a' }}>Rs. {change.toLocaleString()}</Text>
                    </div>
                  )}
                </div>
              )}

              {payMethod === 'card' && (
                <div style={{ background: '#f0f7ff', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                  <BankOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
                  <div><Text strong>Card Terminal Ready</Text></div>
                  <Text type="secondary" style={{ fontSize: 13 }}>Insert / Tap / Swipe card on terminal</Text>
                  <div style={{ marginTop: 8 }}>
                    <Tag>Visa</Tag><Tag>Mastercard</Tag><Tag>UnionPay</Tag>
                  </div>
                </div>
              )}

              {payMethod === 'jazzcash' && (
                <div>
                  <Text strong style={{ display: 'block', marginBottom: 6 }}>Customer JazzCash Number</Text>
                  <Input size="large" prefix={<MobileOutlined style={{ color: '#8b0000' }} />}
                    value={jazzPhone} onChange={e => setJazzPhone(e.target.value)}
                    placeholder="03XX-XXXXXXX" style={{ borderRadius: 8 }} />
                  <div style={{ background: '#fff5f5', borderRadius: 10, padding: 12, marginTop: 12 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Customer will receive USSD push notification on their JazzCash app to approve Rs. {total.toLocaleString()}
                    </Text>
                  </div>
                </div>
              )}

              {payMethod === 'easypaisa' && (
                <div>
                  <Text strong style={{ display: 'block', marginBottom: 6 }}>Customer EasyPaisa Number</Text>
                  <Input size="large" prefix={<MobileOutlined style={{ color: '#009900' }} />}
                    value={epPhone} onChange={e => setEpPhone(e.target.value)}
                    placeholder="03XX-XXXXXXX" style={{ borderRadius: 8 }} />
                  <div style={{ background: '#f6fff6', borderRadius: 10, padding: 12, marginTop: 12 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Customer will confirm Rs. {total.toLocaleString()} payment in their EasyPaisa app
                    </Text>
                  </div>
                </div>
              )}

              {payMethod === 'raast' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <RaastQR amount={total} />
                  <div style={{ background: '#f0f5ff', borderRadius: 10, padding: 12, width: '100%', textAlign: 'center' }}>
                    <Text strong style={{ color: '#1677ff' }}>Rs. {total.toLocaleString()}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Scan with any Pakistan bank app · Raast P2M · Real-time
                    </Text>
                    <div style={{ marginTop: 8 }}>
                      <Tag color="blue">1Link ISO 20022</Tag><Tag color="green">SBP Regulated</Tag>
                    </div>
                  </div>
                </div>
              )}

              <Button type="primary" block size="large" style={{ marginTop: 16, borderRadius: 8, height: 52, fontWeight: 700 }}
                onClick={handleCheckout}
                disabled={
                  (payMethod === 'cash' && parseFloat(cashGiven || '0') < total) ||
                  (payMethod === 'jazzcash' && !jazzPhone) ||
                  (payMethod === 'easypaisa' && !epPhone)
                }
              >
                Confirm {METHOD_LABEL[payMethod]} Payment — Rs. {total.toLocaleString()}
              </Button>
            </>
          )}
        </div>
      </Modal>

      {/* SUCCESS MODAL */}
      <Modal open={successModal} footer={null} centered closable={false} width={380}>
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 72, marginBottom: 8 }}>🎉</div>
          <CheckCircleOutlined style={{ fontSize: 56, color: '#52c41a', marginBottom: 12 }} />
          <Title level={3} style={{ color: '#52c41a', marginBottom: 4 }}>Payment Successful!</Title>
          <Text type="secondary">Order #ORD-{orderNum}</Text>
          <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 12, padding: 16, margin: '20px 0', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text type="secondary">Method</Text>
              <Tag color={payMethod === 'cash' ? 'green' : payMethod === 'card' ? 'blue' : payMethod === 'jazzcash' ? 'red' : payMethod === 'easypaisa' ? 'green' : 'geekblue'}>
                {METHOD_LABEL[payMethod]}
              </Tag>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text type="secondary">Amount Paid</Text>
              <Text strong style={{ fontSize: 16, color: '#52c41a' }}>Rs. {total.toLocaleString()}</Text>
            </div>
            {payMethod === 'cash' && change > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text type="secondary">Change</Text>
                <Text strong>Rs. {change.toLocaleString()}</Text>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text type="secondary">Items</Text>
              <Text strong>{cart.reduce((s, i) => s + i.qty, 0)} pcs ({cart.length} products)</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary">Time</Text>
              <Text strong>{new Date().toLocaleTimeString()}</Text>
            </div>
          </div>
          <Row gutter={12}>
            <Col span={12}>
              <Button block icon={<PrinterOutlined />} size="large" onClick={handlePrint} style={{ borderRadius: 8 }}>
                Print Receipt
              </Button>
            </Col>
            <Col span={12}>
              <Button block type="primary" size="large" onClick={handleNewSale} style={{ borderRadius: 8 }}>
                New Sale
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  )
}
