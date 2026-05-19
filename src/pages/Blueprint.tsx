import React, { useState } from 'react'
import {
  Card, Tag, Badge, Steps, Timeline, Table, Progress, Tabs, Typography,
  Row, Col, Divider, Alert, Statistic, Space, Button, List,
} from 'antd'
import {
  CheckCircleOutlined, CloseCircleOutlined, RocketOutlined,
  GlobalOutlined, SafetyCertificateOutlined, ThunderboltOutlined,
  BankOutlined, TeamOutlined, CodeOutlined, DollarOutlined,
  ApiOutlined, CloudOutlined, LockOutlined, StarOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroBanner(): React.ReactElement {
  const stats = [
    { label: '$36B Market',      color: '#1890ff', bg: 'rgba(24,144,255,0.18)' },
    { label: '130M Users',       color: '#52c41a', bg: 'rgba(82,196,26,0.18)'  },
    { label: '$1 Fee',           color: '#faad14', bg: 'rgba(250,173,20,0.18)' },
    { label: '400ms Settlement', color: '#ff4d4f', bg: 'rgba(255,77,79,0.18)'  },
  ]

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 35%, #1a0a3e 65%, #0a0a1a 100%)',
      borderRadius: 20,
      padding: '72px 48px 60px',
      marginBottom: 32,
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* background glow blobs */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 320, height: 320,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(24,144,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Tag color="gold" style={{ marginBottom: 20, fontSize: 13, padding: '4px 16px', borderRadius: 20 }}>
          🏦 Pakistan's First Hybrid Digital Bank + Stablecoin Platform
        </Tag>

        <Title level={1} style={{
          color: '#ffffff',
          fontSize: 48,
          fontWeight: 900,
          margin: '0 0 8px',
          letterSpacing: -1,
          textShadow: '0 2px 24px rgba(99,102,241,0.4)',
        }}>
          Indus Nexus
        </Title>

        <Title level={2} style={{
          background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: 26,
          fontWeight: 700,
          margin: '0 0 32px',
        }}>
          Pakistan's Sovereign Stable-Bank
        </Title>

        <Paragraph style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, maxWidth: 620, margin: '0 auto 40px' }}>
          Bridging Pakistan's 130M unbanked population to global finance through
          Solana-powered stablecoins, Raast integration, and SECP-compliant digital banking.
        </Paragraph>

        {/* Animated stat pills */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: s.bg,
              border: `1.5px solid ${s.color}`,
              borderRadius: 40,
              padding: '12px 28px',
              display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: `0 0 16px ${s.color}33`,
              animation: 'pulse 2s infinite',
            }}>
              <ThunderboltOutlined style={{ color: s.color, fontSize: 16 }} />
              <Text style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{s.label}</Text>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button type="primary" size="large" icon={<RocketOutlined />}
            style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', border: 'none', height: 48, padding: '0 32px', borderRadius: 12, fontWeight: 700 }}>
            View Roadmap
          </Button>
          <Button size="large" icon={<GlobalOutlined />}
            style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', background: 'transparent', height: 48, padding: '0 32px', borderRadius: 12, fontWeight: 600 }}>
            Apply for Licenses
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CURRENT STATUS
───────────────────────────────────────────── */
function CurrentStatus(): React.ReactElement {
  const builtModules = [
    {
      name: 'POS System',
      emoji: '🏪',
      color: '#1890ff',
      bg: 'rgba(24,144,255,0.06)',
      border: '#1890ff',
      progress: 82,
      screens: ['Dashboard','POS Terminal','Inventory','Sales & Orders','Reports','Users & Roles','Settings','Multi-Location'],
    },
    {
      name: 'HRMS Module',
      emoji: '👥',
      color: '#52c41a',
      bg: 'rgba(82,196,26,0.06)',
      border: '#52c41a',
      progress: 75,
      screens: ['HRMS Overview','Employee Directory','Attendance Tracking','Payroll Engine','Departments','Locations','Roles & Access'],
    },
    {
      name: 'ERP Suite',
      emoji: '🏢',
      color: '#a855f7',
      bg: 'rgba(168,85,247,0.06)',
      border: '#a855f7',
      progress: 68,
      screens: ['ERP Admin','Revenue Ledger','Expenses','Taxpayers / FBR','POS Pay Now','Card Payments','Cash Ledger','Bank Accounts'],
    },
  ]

  const notBuilt = [
    { name: 'Stablecoin Wallet',        emoji: '💰', desc: 'USDC/USD1 custody, send/receive, swap, DeFi yield' },
    { name: 'KYC / Onboarding Flow',    emoji: '🪪', desc: 'NADRA CNIC verification, selfie liveness, biometric' },
    { name: 'Remittance Engine',         emoji: '✈️',  desc: 'Dubai→Pakistan Solana corridor, Circle API, Raast P2P' },
    { name: 'Compliance Dashboard',      emoji: '⚖️', desc: 'Chainalysis, Notabene Travel Rule, SECP eZfile reports' },
    { name: 'Digital Banking Interface', emoji: '🏦', desc: 'Virtual IBAN, virtual debit card, savings vaults, statement' },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionHeader
        title="🚀 Current Build Status"
        subtitle="What exists today vs what needs to be built for Indus Nexus"
        gradient="linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      />

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        {builtModules.map((m) => (
          <Col xs={24} md={8} key={m.name}>
            <Card
              style={{ background: m.bg, border: `2px solid ${m.border}`, borderRadius: 16, height: '100%' }}
              bodyStyle={{ padding: 24 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>{m.emoji}</span>
                <div>
                  <Text style={{ color: m.color, fontWeight: 700, fontSize: 16 }}>{m.name}</Text>
                  <br />
                  <Tag color="green" style={{ marginTop: 4 }}>✅ BUILT</Tag>
                </div>
              </div>
              <Progress percent={m.progress} strokeColor={m.color} trailColor="rgba(255,255,255,0.08)" />
              <div style={{ marginTop: 14 }}>
                {m.screens.map((s) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                    <CheckCircleOutlined style={{ color: m.color, fontSize: 13 }} />
                    <Text style={{ fontSize: 13 }}>{s}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="left">
        <Text style={{ color: '#ff4d4f', fontWeight: 700, fontSize: 14 }}>⚠️ NOT BUILT YET — Critical for Indus Nexus Launch</Text>
      </Divider>

      <Row gutter={[16, 16]}>
        {notBuilt.map((nb) => (
          <Col xs={24} sm={12} lg={8} key={nb.name}>
            <Alert
              type="error"
              style={{ borderRadius: 12, border: '1.5px solid #ff4d4f' }}
              message={
                <Text style={{ fontWeight: 700, fontSize: 14 }}>
                  {nb.emoji} {nb.name}
                </Text>
              }
              description={<Text style={{ fontSize: 12 }}>{nb.desc}</Text>}
              icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
              showIcon
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TECH STACK LAYERS
───────────────────────────────────────────── */
function TechStackLayers(): React.ReactElement {
  const layers = [
    {
      label: 'Frontend',
      color: '#1890ff',
      bg: 'linear-gradient(90deg, rgba(24,144,255,0.12), rgba(24,144,255,0.04))',
      border: '#1890ff',
      emoji: '🖥️',
      techs: ['React 19', 'TypeScript', 'Ant Design 6', 'Vite 6', 'Zustand', 'TanStack Query', 'Recharts'],
    },
    {
      label: 'Backend',
      color: '#6366f1',
      bg: 'linear-gradient(90deg, rgba(99,102,241,0.12), rgba(99,102,241,0.04))',
      border: '#6366f1',
      emoji: '⚙️',
      techs: ['NestJS', 'Fastify', 'Prisma ORM', 'PostgreSQL 16', 'Redis 7', 'BullMQ', 'GraphQL', 'tRPC'],
    },
    {
      label: 'Blockchain',
      color: '#a855f7',
      bg: 'linear-gradient(90deg, rgba(168,85,247,0.12), rgba(168,85,247,0.04))',
      border: '#a855f7',
      emoji: '⛓️',
      techs: ['Solana', 'Ethereum', 'USDC (Circle)', 'USD1 (WL)', 'Circle API', 'Privy.io', 'Phantom Wallet', 'Helius RPC'],
    },
    {
      label: 'Pakistan Rails',
      color: '#10b981',
      bg: 'linear-gradient(90deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))',
      border: '#10b981',
      emoji: '🇵🇰',
      techs: ['JazzCash API', 'EasyPaisa API', 'Raast / 1Link', 'Safepay', 'FBR PRAL', 'NADRA eKYC', 'SBP Sandbox'],
    },
    {
      label: 'Compliance & RegTech',
      color: '#f59e0b',
      bg: 'linear-gradient(90deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))',
      border: '#f59e0b',
      emoji: '⚖️',
      techs: ['NADRA', 'SECP eZfile', 'Comply Advantage', 'Chainalysis KYT', 'Notabene Travel Rule', 'Sumsub', 'Elliptic'],
    },
    {
      label: 'Infrastructure',
      color: '#6b7280',
      bg: 'linear-gradient(90deg, rgba(107,114,128,0.12), rgba(107,114,128,0.04))',
      border: '#6b7280',
      emoji: '☁️',
      techs: ['AWS EKS', 'Cloudflare WAF', 'Docker', 'GitHub Actions', 'Datadog APM', 'Terraform', 'HashiCorp Vault'],
    },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionHeader
        title="🛠️ Technology Stack"
        subtitle="Six-layer architecture powering Pakistan's sovereign stablecoin infrastructure"
        gradient="linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {layers.map((layer) => (
          <div key={layer.label} style={{
            background: layer.bg,
            border: `1.5px solid ${layer.border}`,
            borderRadius: 14,
            padding: '18px 24px',
            display: 'flex', alignItems: 'center', gap: 20,
          }}>
            <div style={{ minWidth: 160, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{layer.emoji}</span>
              <Text style={{ color: layer.color, fontWeight: 700, fontSize: 15 }}>{layer.label}</Text>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {layer.techs.map((t) => (
                <Tag key={t} color={layer.color} style={{
                  borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600,
                  background: `${layer.color}22`, border: `1px solid ${layer.color}66`,
                  color: layer.color,
                }}>
                  {t}
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   STABLECOIN FLOW
───────────────────────────────────────────── */
function StablecoinFlow(): React.ReactElement {
  const steps = [
    { title: 'Dubai App',         description: 'User opens Nexus mobile app in UAE',       icon: '📱' },
    { title: 'AML Check',         description: 'Comply Advantage screens in <50ms',         icon: '🔍' },
    { title: 'USD→USDC',          description: 'Circle API mints USDC on Solana',           icon: '💱' },
    { title: 'Blockchain 400ms',  description: 'Solana confirms transaction instantly',      icon: '⛓️' },
    { title: 'Pakistan VASP',     description: 'Nexus VASP receives funds, Travel Rule',    icon: '🏦' },
    { title: 'USDC→PKR',          description: 'Atomic swap via Safepay / Bitoasis',        icon: '🔄' },
    { title: 'Raast P2P',         description: 'SBP Raast instant payment rail',            icon: '🚀' },
    { title: 'Recipient PKR',     description: 'PKR credited in seconds, any bank',         icon: '✅' },
  ]

  const comparison = [
    { key: '1', provider: 'Western Union', fee: '$32', time: '3 days',   speed: 'slow' },
    { key: '2', provider: 'SWIFT Bank',    fee: '$35', time: '5 days',   speed: 'slow' },
    { key: '3', provider: 'Wise',          fee: '$8',  time: '12 hours', speed: 'medium' },
    { key: '4', provider: 'Nexus 🏆',      fee: '$1',  time: '47 sec',   speed: 'fast' },
  ]

  const compColumns = [
    { title: 'Provider', dataIndex: 'provider', key: 'provider',
      render: (v: string) => <Text strong style={{ color: v.includes('🏆') ? '#faad14' : undefined }}>{v}</Text> },
    { title: 'Fee',  dataIndex: 'fee',  key: 'fee',
      render: (v: string, r: { speed: string }) => <Tag color={r.speed === 'fast' ? 'green' : r.speed === 'medium' ? 'orange' : 'red'}>{v}</Tag> },
    { title: 'Time', dataIndex: 'time', key: 'time',
      render: (v: string, r: { speed: string }) => <Tag color={r.speed === 'fast' ? 'green' : r.speed === 'medium' ? 'orange' : 'red'}>{v}</Tag> },
  ]

  const corridors = [
    { country: 'UAE',          flag: '🇦🇪', color: '#1890ff', volume: '$8.2B/yr' },
    { country: 'Saudi Arabia', flag: '🇸🇦', color: '#10b981', volume: '$6.1B/yr' },
    { country: 'UK',           flag: '🇬🇧', color: '#6366f1', volume: '$3.4B/yr' },
    { country: 'USA',          flag: '🇺🇸', color: '#f59e0b', volume: '$4.8B/yr' },
    { country: 'Canada',       flag: '🇨🇦', color: '#ef4444', volume: '$1.9B/yr' },
    { country: 'Qatar',        flag: '🇶🇦', color: '#8b5cf6', volume: '$2.2B/yr' },
    { country: 'EU',           flag: '🇪🇺', color: '#06b6d4', volume: '$1.5B/yr' },
    { country: 'Australia',    flag: '🇦🇺', color: '#f97316', volume: '$0.9B/yr' },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionHeader
        title="💸 Stablecoin Remittance Flow"
        subtitle="UAE to Pakistan in 47 seconds — how Nexus beats Western Union by 99.97%"
        gradient="linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
      />

      <Card style={{ borderRadius: 16, marginBottom: 20, border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.03)' }}>
        <Title level={5} style={{ marginBottom: 20, color: '#6366f1' }}>🔄 8-Step Remittance Journey</Title>
        <Steps
          current={7}
          size="small"
          items={steps.map((s) => ({
            title: <span style={{ fontSize: 12, fontWeight: 600 }}>{s.icon} {s.title}</span>,
            description: <span style={{ fontSize: 11 }}>{s.description}</span>,
          }))}
          style={{ overflowX: 'auto' }}
        />
      </Card>

      <Row gutter={[20, 20]}>
        <Col xs={24} md={12}>
          <Card title="📊 Cost & Speed Comparison" style={{ borderRadius: 16 }}>
            <Table
              dataSource={comparison}
              columns={compColumns}
              pagination={false}
              size="small"
              rowClassName={(r: { speed: string }) => r.speed === 'fast' ? 'nexus-row' : ''}
              rowStyle={(r: { speed: string }) =>
                r.speed === 'fast'
                  ? { background: 'rgba(250,173,20,0.08)', fontWeight: 700 }
                  : {}
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="🌍 Active Remittance Corridors" style={{ borderRadius: 16 }}>
            <Row gutter={[10, 10]}>
              {corridors.map((c) => (
                <Col xs={12} key={c.country}>
                  <div style={{
                    background: `${c.color}11`,
                    border: `1.5px solid ${c.color}44`,
                    borderRadius: 10, padding: '10px 14px',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ fontSize: 20 }}>{c.flag}</span>
                    <div>
                      <Text style={{ fontWeight: 700, fontSize: 13, display: 'block' }}>{c.country}</Text>
                      <Text style={{ fontSize: 11, color: c.color }}>{c.volume}</Text>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PHASE ROADMAP
───────────────────────────────────────────── */
function PhaseRoadmap(): React.ReactElement {
  const phases = [
    {
      phase: 'Phase 0',
      months: 'Month 1–2',
      color: '#6366f1',
      status: 'finish' as const,
      deliverables: [
        'Legal entity setup (SMC Pvt Ltd in Pakistan)',
        'SECP company registration',
        'AWS infrastructure provisioning',
        'GitHub monorepo & CI/CD pipeline',
        'Team assembly: 2 FE, 2 BE, 1 blockchain dev',
      ],
    },
    {
      phase: 'Phase 1',
      months: 'Month 3–4',
      color: '#1890ff',
      status: 'finish' as const,
      deliverables: [
        'SECP PSP/EMI license application',
        'SBP payment license sandbox onboarding',
        'NADRA eKYC API integration contract',
        'Basic NestJS backend scaffolding',
        'Privy.io embedded wallet SDK integration',
      ],
    },
    {
      phase: 'Phase 2',
      months: 'Month 5–6',
      color: '#10b981',
      status: 'finish' as const,
      deliverables: [
        'KYC onboarding flow (CNIC + selfie)',
        'Circle API USDC mint/burn integration',
        'Solana wallet creation per user',
        'JazzCash & EasyPaisa sandbox integration',
        'Comply Advantage AML screening',
      ],
    },
    {
      phase: 'Phase 3',
      months: 'Month 7–9',
      color: '#f59e0b',
      status: 'process' as const,
      deliverables: [
        'Raast P2P instant payment integration',
        'UAE→Pakistan remittance corridor live',
        'Notabene Travel Rule compliance',
        'Mobile app alpha (React Native)',
        'Internal beta with 500 test users',
      ],
    },
    {
      phase: 'Phase 4',
      months: 'Month 10–12',
      color: '#ef4444',
      status: 'wait' as const,
      deliverables: [
        'SBP Electronic Money Institution license',
        'FBR PRAL API for withholding tax',
        'Virtual IBAN issuance',
        'Saudi Arabia corridor launch',
        'Series A fundraising ($3M target)',
      ],
    },
    {
      phase: 'Phase 5',
      months: 'Month 13–18',
      color: '#8b5cf6',
      status: 'wait' as const,
      deliverables: [
        'UK & USA corridors live',
        'Virtual debit card (Mastercard/Visa)',
        'Savings vault with yield (DeFi)',
        '100,000 active users target',
        'Chainalysis enterprise KYT integration',
      ],
    },
    {
      phase: 'Phase 6',
      months: 'Month 19–24',
      color: '#06b6d4',
      status: 'wait' as const,
      deliverables: [
        'SECP Digital Bank License application',
        'Qatar, Canada, EU corridors',
        'B2B bulk remittance API (for businesses)',
        'Pakistan Stock Exchange integration',
        '500,000 users, $50M monthly volume',
      ],
    },
    {
      phase: 'Phase 7',
      months: 'Month 25–36',
      color: '#f97316',
      status: 'wait' as const,
      deliverables: [
        'Full SBP-regulated digital bank go-live',
        'SME lending via DeFi collateral',
        'Australia & remaining corridors',
        'Series B fundraising ($15M)',
        '2M users, $500M annual GMV',
      ],
    },
    {
      phase: 'Phase 8',
      months: 'Month 37–48',
      color: '#faad14',
      status: 'wait' as const,
      deliverables: [
        'Bangladesh & Sri Lanka expansion',
        'White-label licensing to other fintechs',
        'IPO preparation',
        'PKR stablecoin (PKRS) pilot with SBP',
        '10M users, $2B annual transaction volume',
      ],
    },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionHeader
        title="🗓️ Phase Roadmap"
        subtitle="48-month journey from legal setup to Pakistan's first sovereign digital bank"
        gradient="linear-gradient(135deg, #0b0b2e, #1a1a4e, #0d0d3e)"
      />
      <Card style={{ borderRadius: 16, padding: '8px 0' }}>
        <Timeline
          items={phases.map((p) => ({
            color: p.color,
            dot: (
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: p.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 10, fontWeight: 700,
                boxShadow: `0 0 12px ${p.color}66`,
              }}>
                {p.phase.replace('Phase ', 'P')}
              </div>
            ),
            children: (
              <Card
                size="small"
                style={{
                  border: `1.5px solid ${p.color}44`,
                  borderRadius: 12,
                  background: `${p.color}08`,
                  marginBottom: 4,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <Text style={{ color: p.color, fontWeight: 800, fontSize: 15 }}>{p.phase}</Text>
                  <Tag color={p.color} style={{ borderRadius: 20, fontWeight: 600 }}>{p.months}</Tag>
                  {p.status === 'finish' && <Tag color="green">✅ Planned</Tag>}
                  {p.status === 'process' && <Tag color="orange">🔧 In Progress</Tag>}
                  {p.status === 'wait' && <Tag color="default">⏳ Upcoming</Tag>}
                </div>
                <List
                  dataSource={p.deliverables}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '3px 0', border: 'none' }}>
                      <Text style={{ fontSize: 13 }}>
                        <span style={{ color: p.color, marginRight: 8, fontWeight: 700 }}>▸</span>
                        {item}
                      </Text>
                    </List.Item>
                  )}
                />
              </Card>
            ),
          }))}
        />
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────
   WHERE TO APPLY — 17 Application Guide Cards
───────────────────────────────────────────── */
function WhereToApply(): React.ReactElement {
  const licenses = [
    {
      category: '🇵🇰 Pakistan Licenses',
      color: '#10b981',
      items: [
        {
          name: 'SECP Company Registration',
          url: 'https://eservices.secp.gov.pk',
          cost: 'PKR 12,000–35,000',
          time: '3–5 working days',
          priority: 'CRITICAL',
          steps: [
            'Visit SECP eServices portal',
            'Register as SMC Private Limited',
            'Upload CNIC, proof of address, MoA',
            'Pay online via bank transfer',
            'Receive digital certificate of incorporation',
          ],
        },
        {
          name: 'SBP PSO/PSP License',
          url: 'https://www.sbp.org.pk/fintech',
          cost: 'PKR 2,000,000',
          time: '6–12 months',
          priority: 'CRITICAL',
          steps: [
            'Download SBP PSO/PSP application form',
            'Prepare business plan, AML policy, IT audit',
            'Submit via SBP online portal',
            'Pass SBP technical evaluation',
            'Receive In-Principle Approval',
            'Complete sandbox testing',
            'Get full PSP license',
          ],
        },
        {
          name: 'SBP EMI License (Electronic Money)',
          url: 'https://www.sbp.org.pk/fintech',
          cost: 'PKR 10,000,000',
          time: '12–18 months',
          priority: 'HIGH',
          steps: [
            'Complete PSP license first',
            'Prepare EMI-specific business plan',
            'Demonstrate min PKR 100M paid-up capital',
            'Submit AML/CFT framework',
            'SBP on-site inspection',
            'Receive EMI license',
          ],
        },
        {
          name: 'SECP Virtual Asset Service Provider',
          url: 'https://www.secp.gov.pk/vasp',
          cost: 'PKR 5,000,000',
          time: '3–6 months',
          priority: 'HIGH',
          steps: [
            'Submit VASP application to SECP',
            'Provide crypto custody policy',
            'Travel Rule compliance proof',
            'FATF AML/CFT attestation',
            'Receive provisional VASP registration',
          ],
        },
        {
          name: 'FBR National Tax Number (NTN)',
          url: 'https://iris.fbr.gov.pk',
          cost: 'Free',
          time: '1–3 days',
          priority: 'IMMEDIATE',
          steps: [
            'Visit IRIS portal',
            'Register company with CNIC & SECP certificate',
            'Submit financial details',
            'Receive NTN within 72 hours',
            'Register for sales tax (if applicable)',
          ],
        },
      ],
    },
    {
      category: '🌍 International Licenses',
      color: '#6366f1',
      items: [
        {
          name: 'UAE VARA VASP License',
          url: 'https://www.vara.ae',
          cost: 'AED 100,000–300,000',
          time: '6–12 months',
          priority: 'HIGH',
          steps: [
            'Register UAE entity (DIFC or mainland)',
            'Submit VARA application form',
            'Appoint UAE-resident compliance officer',
            'Provide AML/KYC framework docs',
            'Pass VARA technical assessment',
            'Receive VASP license',
          ],
        },
        {
          name: 'UK FCA Crypto Registration',
          url: 'https://register.fca.org.uk',
          cost: '£5,000',
          time: '12–18 months',
          priority: 'MEDIUM',
          steps: [
            'Incorporate UK entity (Ltd)',
            'Register on FCA Connect portal',
            'Submit MLRs crypto registration form',
            'Appoint UK-based MLRO',
            'FCA interview & assessment',
            'Receive crypto registration',
          ],
        },
        {
          name: 'FinCEN MSB Registration (USA)',
          url: 'https://bsaefiling.fincen.treas.gov',
          cost: 'Free',
          time: '180 days',
          priority: 'MEDIUM',
          steps: [
            'Incorporate US LLC (Delaware)',
            'File BSA eFiling MSB registration',
            'Appoint BSA Officer',
            'Establish AML compliance program',
            'Register in each state (MTL)',
            'Receive MSB registration',
          ],
        },
        {
          name: 'EU MiCA Registration',
          url: 'https://www.esma.europa.eu/mica',
          cost: '€50,000–200,000',
          time: '18–24 months',
          priority: 'LOW',
          steps: [
            'Incorporate EU entity (Malta, Lithuania)',
            'Appoint EU-resident management',
            'Submit White Paper to NCA',
            'National Competent Authority review',
            'EU passport for all member states',
          ],
        },
      ],
    },
    {
      category: '💳 Payment APIs',
      color: '#f59e0b',
      items: [
        {
          name: 'JazzCash Merchant API',
          url: 'https://developer.jazzcash.com.pk',
          cost: 'Free (rev share 1.5%)',
          time: '2–4 weeks',
          priority: 'HIGH',
          steps: [
            'Apply at JazzCash merchant portal',
            'Submit NTN, SECP certificate, bank letter',
            'Sign merchant agreement',
            'Receive sandbox credentials',
            'Integrate API & test transactions',
            'Go live after approval',
          ],
        },
        {
          name: 'EasyPaisa API Integration',
          url: 'https://developer.easypaisa.com.pk',
          cost: 'Free (rev share 1.2%)',
          time: '2–4 weeks',
          priority: 'HIGH',
          steps: [
            'Register at EasyPaisa developer portal',
            'Submit business documents',
            'Complete KYB verification',
            'Receive API keys & sandbox',
            'Integrate payment flow',
            'Production approval',
          ],
        },
        {
          name: 'Safepay Payment Gateway',
          url: 'https://getsafepay.com',
          cost: '1.75% per transaction',
          time: '1–2 weeks',
          priority: 'HIGH',
          steps: [
            'Sign up at getsafepay.com',
            'Submit company documents',
            'KYB in 5–7 business days',
            'Integrate via Safepay SDK',
            'Test in sandbox mode',
            'Go live',
          ],
        },
        {
          name: '1LINK / Raast API',
          url: 'https://www.1link.net.pk',
          cost: 'PKR 500,000 setup',
          time: '3–6 months',
          priority: 'CRITICAL',
          steps: [
            'Apply through SBP-licensed bank partner',
            'Sign 1LINK participant agreement',
            'Complete technical certification',
            'Integrate Raast P2P API',
            'SBP sandbox testing',
            'Production access granted',
          ],
        },
      ],
    },
    {
      category: '⛓️ Blockchain APIs',
      color: '#a855f7',
      items: [
        {
          name: 'Circle API (USDC)',
          url: 'https://developers.circle.com',
          cost: 'Free tier + 0.1% on-ramp',
          time: '1–3 weeks',
          priority: 'CRITICAL',
          steps: [
            'Register at Circle developer console',
            'Submit business KYB documents',
            'Select USDC issuance or transfer product',
            'Get API key for Sandbox',
            'Integrate Circle Web3 Services SDK',
            'Pass production review',
          ],
        },
        {
          name: 'Privy.io Embedded Wallets',
          url: 'https://privy.io',
          cost: '$249/mo + $0.01/wallet',
          time: '1 week',
          priority: 'HIGH',
          steps: [
            'Sign up at privy.io',
            'Create app in Privy dashboard',
            'Install @privy-io/react-auth SDK',
            'Configure Solana & EVM chains',
            'Embed wallet creation in onboarding',
          ],
        },
        {
          name: 'Helius RPC (Solana)',
          url: 'https://helius.dev',
          cost: 'Free–$499/mo',
          time: '1 day',
          priority: 'HIGH',
          steps: [
            'Register at helius.dev',
            'Create RPC endpoint',
            'Configure mainnet-beta & devnet',
            'Replace public Solana RPC with Helius',
            'Enable webhooks for tx monitoring',
          ],
        },
        {
          name: 'Chainalysis KYT API',
          url: 'https://www.chainalysis.com',
          cost: '$2,000–$10,000/mo',
          time: '2–4 weeks',
          priority: 'HIGH',
          steps: [
            'Contact Chainalysis sales team',
            'Sign enterprise MSA',
            'Receive API credentials',
            'Integrate KYT API for tx screening',
            'Set up real-time alerts',
            'Configure risk threshold policies',
          ],
        },
      ],
    },
  ]

  const priorityColor: Record<string, string> = {
    IMMEDIATE: 'red',
    CRITICAL: 'volcano',
    HIGH: 'orange',
    MEDIUM: 'blue',
    LOW: 'default',
  }

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionHeader
        title="📋 Where to Apply — Complete Licensing Guide"
        subtitle="Step-by-step application guides for all 17 critical licenses, APIs, and registrations"
        gradient="linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      />

      {licenses.map((category) => (
        <div key={category.category} style={{ marginBottom: 28 }}>
          <div style={{
            background: `${category.color}18`,
            border: `1.5px solid ${category.color}44`,
            borderRadius: 12, padding: '12px 20px', marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Text style={{ color: category.color, fontWeight: 700, fontSize: 16 }}>{category.category}</Text>
            <Tag color={category.color}>{category.items.length} items</Tag>
          </div>
          <Row gutter={[16, 16]}>
            {category.items.map((item) => (
              <Col xs={24} md={12} xl={8} key={item.name}>
                <Card
                  size="small"
                  style={{
                    borderRadius: 14, border: `1.5px solid ${category.color}33`,
                    background: `${category.color}05`, height: '100%',
                  }}
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <Text style={{ fontWeight: 700, fontSize: 13 }}>{item.name}</Text>
                      <Badge color={priorityColor[item.priority]} text={
                        <Text style={{ fontSize: 11, fontWeight: 600, color: priorityColor[item.priority] === 'default' ? '#8c8c8c' : undefined }}>
                          {item.priority}
                        </Text>
                      } />
                    </div>
                  }
                >
                  <div style={{ marginBottom: 10 }}>
                    <Space wrap>
                      <Tag color="blue" style={{ fontSize: 11 }}>💰 {item.cost}</Tag>
                      <Tag color="purple" style={{ fontSize: 11 }}>⏱️ {item.time}</Tag>
                    </Space>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <a href={item.url} target="_blank" rel="noreferrer"
                      style={{ color: category.color, fontSize: 11, wordBreak: 'break-all' }}>
                      🔗 {item.url}
                    </a>
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                  {item.steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                      <div style={{
                        minWidth: 20, height: 20, borderRadius: '50%',
                        background: category.color, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, flexShrink: 0,
                      }}>{i + 1}</div>
                      <Text style={{ fontSize: 12 }}>{step}</Text>
                    </div>
                  ))}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   LEGAL CHECKLIST
───────────────────────────────────────────── */
function LegalChecklist(): React.ReactElement {
  const categories = [
    {
      name: 'Corporate Structure',
      emoji: '🏛️',
      color: '#1890ff',
      items: [
        { task: 'SMC Private Limited incorporation (SECP)', done: false },
        { task: 'Memorandum & Articles of Association', done: false },
        { task: 'Board resolution for digital banking', done: false },
        { task: 'Registered office in Pakistan', done: false },
        { task: 'UAE subsidiary entity (DIFC)', done: false },
        { task: 'USA LLC (Delaware) for Circle API', done: false },
      ],
    },
    {
      name: 'Pakistan Regulatory',
      emoji: '🇵🇰',
      color: '#10b981',
      items: [
        { task: 'SBP PSP/PSO license application', done: false },
        { task: 'SBP EMI license application', done: false },
        { task: 'SECP VASP registration', done: false },
        { task: 'FBR NTN registration', done: false },
        { task: 'NADRA eKYC API agreement', done: false },
        { task: 'FBR PRAL API agreement', done: false },
      ],
    },
    {
      name: 'International Licenses',
      emoji: '🌍',
      color: '#6366f1',
      items: [
        { task: 'UAE VARA VASP license', done: false },
        { task: 'UK FCA crypto registration', done: false },
        { task: 'FinCEN MSB registration (USA)', done: false },
        { task: 'EU MiCA notification', done: false },
        { task: 'Saudi SAMA fintech sandbox', done: false },
      ],
    },
    {
      name: 'AML / Compliance Framework',
      emoji: '⚖️',
      color: '#f59e0b',
      items: [
        { task: 'AML/CFT policy document (FATF aligned)', done: false },
        { task: 'KYC/CDD procedures manual', done: false },
        { task: 'Travel Rule compliance policy', done: false },
        { task: 'Suspicious Transaction Reporting (STR) process', done: false },
        { task: 'MLCO appointment & registration', done: false },
        { task: 'Annual AML audit plan', done: false },
      ],
    },
    {
      name: 'Data Protection',
      emoji: '🔒',
      color: '#ef4444',
      items: [
        { task: 'Pakistan PECA data protection compliance', done: false },
        { task: 'GDPR compliance for EU users', done: false },
        { task: 'Privacy Policy & Terms of Service', done: false },
        { task: 'Data residency plan (Pakistan servers)', done: false },
        { task: 'Penetration test by CISA-certified firm', done: false },
      ],
    },
    {
      name: 'Blockchain & Crypto Legal',
      emoji: '⛓️',
      color: '#a855f7',
      items: [
        { task: 'Token classification opinion (USDC = e-money)', done: false },
        { task: 'Smart contract audit (Certik / Halborn)', done: false },
        { task: 'Custody policy for crypto assets', done: false },
        { task: 'Circle issuer agreement signed', done: false },
        { task: 'Notabene Travel Rule integration agreement', done: false },
      ],
    },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionHeader
        title="✅ Legal & Compliance Checklist"
        subtitle="Complete legal framework for Pakistan's first hybrid digital bank + stablecoin platform"
        gradient="linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)"
      />
      <Row gutter={[16, 16]}>
        {categories.map((cat) => {
          const doneCount = cat.items.filter((i) => i.done).length
          const pct = Math.round((doneCount / cat.items.length) * 100)
          return (
            <Col xs={24} md={12} key={cat.name}>
              <Card style={{ borderRadius: 14, border: `1.5px solid ${cat.color}44`, background: `${cat.color}06` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: `conic-gradient(${cat.color} ${pct}%, #e8e8e8 ${pct}%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {cat.emoji}
                    </div>
                  </div>
                  <div>
                    <Text style={{ color: cat.color, fontWeight: 700, fontSize: 15 }}>{cat.name}</Text>
                    <br />
                    <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{doneCount}/{cat.items.length} complete</Text>
                  </div>
                </div>
                <Progress percent={pct} strokeColor={cat.color} size="small" style={{ marginBottom: 12 }} />
                {cat.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                    {item.done
                      ? <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 14 }} />
                      : <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 14 }} />
                    }
                    <Text style={{ fontSize: 12, textDecoration: item.done ? 'line-through' : 'none', color: item.done ? '#8c8c8c' : undefined }}>
                      {item.task}
                    </Text>
                  </div>
                ))}
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

/* ─────────────────────────────────────────────
   REVENUE MODEL
───────────────────────────────────────────── */
function RevenueModel(): React.ReactElement {
  const streams = [
    { name: 'Remittance Fees',         emoji: '✈️',  value: '$1/tx',      margin: '82%', color: '#1890ff', yearlyTarget: '$12M',  desc: '12M transactions/yr at $1 each' },
    { name: 'FX Spread',               emoji: '💱',  value: '0.5% spread', margin: '90%', color: '#10b981', yearlyTarget: '$8M',   desc: '$1.6B GMV at 0.5% spread' },
    { name: 'Virtual Card Fees',        emoji: '💳',  value: '$2/mo/user',  margin: '75%', color: '#6366f1', yearlyTarget: '$4M',   desc: '166K premium card users' },
    { name: 'Savings Vault Yield',      emoji: '🏦',  value: '4% APY retain', margin: '35%', color: '#f59e0b', yearlyTarget: '$3M', desc: 'Retain 1.5% from DeFi 5.5% yield' },
    { name: 'B2B API Licensing',        emoji: '🔌',  value: '$999–$9,999/mo', margin: '88%', color: '#a855f7', yearlyTarget: '$2M', desc: '30 enterprise API clients' },
    { name: 'White-label Licensing',    emoji: '🏷️',  value: '$50K/yr',     margin: '92%', color: '#ef4444', yearlyTarget: '$1.5M', desc: '30 regional fintech white-labels' },
  ]

  const fiveYearData = [
    { key: '1', year: 'Year 1', gmv: '$5M',   revenue: '$0.5M', users: '10K',   margin: '-120%' },
    { key: '2', year: 'Year 2', gmv: '$80M',  revenue: '$3M',   users: '100K',  margin: '-20%'  },
    { key: '3', year: 'Year 3', gmv: '$400M', revenue: '$12M',  users: '500K',  margin: '15%'   },
    { key: '4', year: 'Year 4', gmv: '$1.2B', revenue: '$28M',  users: '2M',    margin: '38%'   },
    { key: '5', year: 'Year 5', gmv: '$3B',   revenue: '$60M',  users: '10M',   margin: '55%'   },
  ]

  const fiveYearCols = [
    { title: 'Year',    dataIndex: 'year',    key: 'year', render: (v: string) => <Text strong>{v}</Text> },
    { title: 'GMV',     dataIndex: 'gmv',     key: 'gmv',     render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue', render: (v: string) => <Tag color="green">{v}</Tag> },
    { title: 'Users',   dataIndex: 'users',   key: 'users',   render: (v: string) => <Tag color="purple">{v}</Tag> },
    { title: 'Net Margin', dataIndex: 'margin', key: 'margin',
      render: (v: string) => <Tag color={v.startsWith('-') ? 'red' : 'green'}>{v}</Tag> },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionHeader
        title="💰 Revenue Model"
        subtitle="Six diversified revenue streams with 5-year financial projections"
        gradient="linear-gradient(135deg, #0d2b1d, #1a4a2e, #0d2b1d)"
      />
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {streams.map((s) => (
          <Col xs={24} sm={12} lg={8} key={s.name}>
            <Card style={{ borderRadius: 14, border: `2px solid ${s.color}44`, background: `${s.color}06` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <Text style={{ color: s.color, fontWeight: 700, fontSize: 14, display: 'block' }}>{s.name}</Text>
                  <Text style={{ fontSize: 20, fontWeight: 900, color: '#1a1a1a', display: 'block', marginTop: 4 }}>{s.value}</Text>
                  <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{s.desc}</Text>
                  <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                    <Tag color="gold" style={{ fontWeight: 700 }}>Target: {s.yearlyTarget}/yr</Tag>
                    <Tag color="green">Margin: {s.margin}</Tag>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="📈 5-Year Financial Projection" style={{ borderRadius: 16 }}>
        <Table dataSource={fiveYearData} columns={fiveYearCols} pagination={false} size="small" />
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────
   INSTALL COMMANDS
───────────────────────────────────────────── */
function InstallCommands(): React.ReactElement {
  const terminalStyle: React.CSSProperties = {
    background: '#0d1117',
    borderRadius: 12,
    padding: '20px 24px',
    fontFamily: '"Fira Code", "Cascadia Code", monospace',
    fontSize: 13,
    lineHeight: 1.7,
    overflowX: 'auto',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  }

  const prompt = <span style={{ color: '#7c3aed' }}>$ </span>
  const comment = (text: string) => <span style={{ color: '#6b7280' }}>{text}</span>
  const cmd = (text: string) => <span style={{ color: '#60a5fa' }}>{text}</span>
  const pkg = (text: string) => <span style={{ color: '#34d399' }}>{text}</span>

  const frontendInstall = (
    <div style={terminalStyle}>
      <div style={{ color: '#9ca3af', marginBottom: 12, fontSize: 12 }}>◉ FRONTEND — React 19 + Ant Design 6 + Solana</div>
      <div>{prompt}{cmd('npm create vite@latest')} {pkg('nexus-frontend')} -- --template react-ts</div>
      <div>{prompt}{cmd('cd')} {pkg('nexus-frontend')}</div>
      <br />
      {comment('# Core UI')}
      <div>{prompt}{cmd('npm install')} {pkg('antd @ant-design/icons react-router-dom zustand')}</div>
      {comment('# Data & State')}
      <div>{prompt}{cmd('npm install')} {pkg('@tanstack/react-query axios dayjs recharts')}</div>
      {comment('# Blockchain')}
      <div>{prompt}{cmd('npm install')} {pkg('@solana/web3.js @solana/spl-token @privy-io/react-auth')}</div>
      <div>{prompt}{cmd('npm install')} {pkg('@circle-fin/web3-services-sdk')}</div>
      {comment('# Forms & Validation')}
      <div>{prompt}{cmd('npm install')} {pkg('react-hook-form zod @hookform/resolvers')}</div>
      {comment('# Dev Dependencies')}
      <div>{prompt}{cmd('npm install -D')} {pkg('typescript@5 @types/react @types/node tailwindcss vitest')}</div>
    </div>
  )

  const backendInstall = (
    <div style={terminalStyle}>
      <div style={{ color: '#9ca3af', marginBottom: 12, fontSize: 12 }}>◉ BACKEND — NestJS + Prisma + BullMQ</div>
      <div>{prompt}{cmd('npm install -g')} {pkg('@nestjs/cli')}</div>
      <div>{prompt}{cmd('nest new')} {pkg('nexus-backend --package-manager npm')}</div>
      <div>{prompt}{cmd('cd')} {pkg('nexus-backend')}</div>
      <br />
      {comment('# NestJS Core Modules')}
      <div>{prompt}{cmd('npm install')} {pkg('@nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt')}</div>
      <div>{prompt}{cmd('npm install')} {pkg('@nestjs/throttler @nestjs/bull bullmq ioredis')}</div>
      {comment('# Database')}
      <div>{prompt}{cmd('npm install')} {pkg('@prisma/client prisma')}</div>
      <div>{prompt}{cmd('npx prisma init')}</div>
      {comment('# Blockchain')}
      <div>{prompt}{cmd('npm install')} {pkg('@solana/web3.js @circle-fin/developer-controlled-wallets')}</div>
      {comment('# Compliance')}
      <div>{prompt}{cmd('npm install')} {pkg('complyadvantage-node notabene-sdk chainalysis-api-client')}</div>
      {comment('# Pakistan Payment Rails')}
      <div>{prompt}{cmd('npm install')} {pkg('jazzcash-node-sdk easypaisa-sdk safepay-node')}</div>
      {comment('# Utilities')}
      <div>{prompt}{cmd('npm install')} {pkg('class-validator class-transformer bcrypt uuid nanoid')}</div>
      {comment('# Dev')}
      <div>{prompt}{cmd('npm install -D')} {pkg('@types/passport-jwt @types/bcrypt jest ts-jest')}</div>
    </div>
  )

  const dockerInstall = (
    <div style={terminalStyle}>
      <div style={{ color: '#9ca3af', marginBottom: 12, fontSize: 12 }}>◉ INFRASTRUCTURE — Docker Compose</div>
      {comment('# Start all services locally')}
      <div>{prompt}{cmd('docker compose up -d')}</div>
      <br />
      {comment('# PostgreSQL 16')}
      <div>{prompt}{cmd('docker run -d --name nexus-db')} \</div>
      <div style={{ paddingLeft: 24 }}>{pkg('-e POSTGRES_DB=nexusdb -e POSTGRES_PASSWORD=secret')} \</div>
      <div style={{ paddingLeft: 24 }}>{pkg('-p 5432:5432 postgres:16-alpine')}</div>
      <br />
      {comment('# Redis 7')}
      <div>{prompt}{cmd('docker run -d --name nexus-redis')} {pkg('-p 6379:6379 redis:7-alpine')}</div>
      <br />
      {comment('# Prisma migrations')}
      <div>{prompt}{cmd('npx prisma migrate dev')} {pkg('--name init')}</div>
      <div>{prompt}{cmd('npx prisma generate')}</div>
      <br />
      {comment('# AWS Deploy')}
      <div>{prompt}{cmd('aws eks update-kubeconfig')} {pkg('--name nexus-cluster --region ap-south-1')}</div>
      <div>{prompt}{cmd('kubectl apply -f')} {pkg('k8s/nexus-deployment.yaml')}</div>
    </div>
  )

  const tabItems = [
    { key: 'frontend', label: '🖥️ Frontend', children: frontendInstall },
    { key: 'backend',  label: '⚙️ Backend',  children: backendInstall  },
    { key: 'docker',   label: '🐳 Docker & Deploy', children: dockerInstall },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionHeader
        title="💻 Install Commands"
        subtitle="Complete dependency installation for all Indus Nexus components"
        gradient="linear-gradient(135deg, #0d1117, #161b22, #0d1117)"
      />
      <Card style={{ borderRadius: 16, background: '#0a0c10', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Tabs
          items={tabItems}
          tabBarStyle={{ color: '#9ca3af' }}
          style={{ color: '#fff' }}
        />
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────
   COMPETITIVE TABLE
───────────────────────────────────────────── */
function CompetitiveTable(): React.ReactElement {
  const features = [
    { key: 'remit',   feature: '🚀 Instant Remittance',        nexus: '47 seconds',     sadapay: '1–2 days',   nayapay: '1 day',      easypaisa: '2 hours'   },
    { key: 'fee',     feature: '💰 Remittance Fee',             nexus: '$1 flat',         sadapay: 'N/A',        nayapay: 'N/A',        easypaisa: '$5–15'     },
    { key: 'crypto',  feature: '⛓️ Stablecoin Support',          nexus: 'USDC + USD1',    sadapay: '❌ None',    nayapay: '❌ None',    easypaisa: '❌ None'   },
    { key: 'raast',   feature: '🏦 Raast Integration',          nexus: '✅ Full',         sadapay: '✅ Basic',   nayapay: '✅ Basic',   easypaisa: '✅ Yes'    },
    { key: 'kyc',     feature: '🪪 NADRA eKYC',                 nexus: '✅ Live',         sadapay: '✅ Yes',     nayapay: '✅ Yes',     easypaisa: '✅ Yes'    },
    { key: 'card',    feature: '💳 Virtual Debit Card',         nexus: 'Mastercard',     sadapay: 'Mastercard', nayapay: 'Visa',       easypaisa: 'Telenor'   },
    { key: 'license', feature: '📜 SBP License',               nexus: 'PSP + EMI (WIP)', sadapay: 'EMI',        nayapay: 'EMI',        easypaisa: 'PSO/PSP'   },
  ]

  const columns = [
    {
      title: 'Feature',
      dataIndex: 'feature',
      key: 'feature',
      render: (v: string) => <Text style={{ fontWeight: 600 }}>{v}</Text>,
      width: 200,
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #faad14, #fa8c16)',
            borderRadius: 8, padding: '4px 12px', display: 'inline-block',
          }}>
            <Text style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>🏆 Indus Nexus</Text>
          </div>
        </div>
      ),
      dataIndex: 'nexus',
      key: 'nexus',
      render: (v: string) => (
        <div style={{
          background: 'rgba(250,173,20,0.12)', borderRadius: 8, padding: '6px 10px',
          border: '1.5px solid rgba(250,173,20,0.4)', textAlign: 'center',
        }}>
          <Text style={{ fontWeight: 700, color: '#d48806' }}>{v}</Text>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>SadaPay</div>,
      dataIndex: 'sadapay',
      key: 'sadapay',
      render: (v: string) => <Text style={{ color: '#8c8c8c' }}>{v}</Text>,
    },
    {
      title: <div style={{ textAlign: 'center' }}>NayaPay</div>,
      dataIndex: 'nayapay',
      key: 'nayapay',
      render: (v: string) => <Text style={{ color: '#8c8c8c' }}>{v}</Text>,
    },
    {
      title: <div style={{ textAlign: 'center' }}>EasyPaisa</div>,
      dataIndex: 'easypaisa',
      key: 'easypaisa',
      render: (v: string) => <Text style={{ color: '#8c8c8c' }}>{v}</Text>,
    },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionHeader
        title="🏆 Competitive Analysis"
        subtitle="How Indus Nexus compares to Pakistan's existing digital payment players"
        gradient="linear-gradient(135deg, #1a1a0d, #2a2a0f, #1a1a0d)"
      />
      <Card style={{ borderRadius: 16, overflow: 'hidden' }}>
        <Table
          dataSource={features}
          columns={columns}
          pagination={false}
          size="middle"
          bordered
          rowStyle={(_record: object, index: number) => ({
            background: index % 2 === 0 ? '#fafafa' : '#fff',
          })}
        />
        <div style={{ marginTop: 16, padding: '0 8px' }}>
          <Space wrap>
            <Tag color="gold">🏆 Nexus advantage: Only player with stablecoin + Raast + global corridors</Tag>
            <Tag color="blue">First-mover in USDC remittance for Pakistan diaspora</Tag>
            <Tag color="green">Only SECP VASP-compliant crypto wallet in Pakistan</Tag>
          </Space>
        </div>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────
   KEY METRICS ROW
───────────────────────────────────────────── */
function KeyMetrics(): React.ReactElement {
  const metrics = [
    { title: 'Addressable Market',    value: '$36B',    suffix: '/yr',  color: '#1890ff', emoji: '🌍' },
    { title: 'Pakistan Diaspora',     value: '130M',    suffix: ' users', color: '#10b981', emoji: '👥' },
    { title: 'Min Remittance Fee',    value: '$1',      suffix: '/tx',  color: '#faad14', emoji: '💰' },
    { title: 'Settlement Speed',      value: '400',     suffix: 'ms',   color: '#6366f1', emoji: '⚡' },
    { title: 'Annual Remittances',    value: '$36B',    suffix: ' to PK', color: '#a855f7', emoji: '✈️' },
    { title: 'SBP Raast Daily TPS',   value: '10M',     suffix: ' txns', color: '#ef4444', emoji: '🚀' },
  ]

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
      {metrics.map((m) => (
        <Col xs={12} sm={8} lg={4} key={m.title}>
          <Card style={{
            textAlign: 'center', borderRadius: 14,
            border: `1.5px solid ${m.color}44`,
            background: `${m.color}08`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{m.emoji}</div>
            <Statistic
              title={<span style={{ fontSize: 11 }}>{m.title}</span>}
              value={m.value}
              suffix={<span style={{ fontSize: 12 }}>{m.suffix}</span>}
              valueStyle={{ color: m.color, fontWeight: 900, fontSize: 22 }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
}

/* ─────────────────────────────────────────────
   SHARED SECTION HEADER
───────────────────────────────────────────── */
interface SectionHeaderProps {
  title: string
  subtitle: string
  gradient: string
}

function SectionHeader({ title, subtitle, gradient }: SectionHeaderProps): React.ReactElement {
  return (
    <div style={{
      background: gradient,
      borderRadius: 14,
      padding: '24px 28px',
      marginBottom: 20,
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <Title level={3} style={{ color: '#fff', margin: 0, fontWeight: 800 }}>{title}</Title>
      <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{subtitle}</Text>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function BlueprintFooter(): React.ReactElement {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #1a0a3e 100%)',
      borderRadius: 16,
      padding: '40px 48px',
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.06)',
      marginBottom: 32,
    }}>
      <Title level={2} style={{ color: '#fff', margin: '0 0 8px' }}>
        🏦 Indus Nexus
      </Title>
      <Paragraph style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: '0 0 24px' }}>
        Pakistan's Sovereign Stable-Bank — Building the financial infrastructure for 130M unbanked Pakistanis
      </Paragraph>
      <Space wrap size="middle">
        <Tag color="blue" style={{ padding: '6px 16px', fontSize: 13 }}>🌐 indusnexus.pk</Tag>
        <Tag color="green" style={{ padding: '6px 16px', fontSize: 13 }}>📧 founders@indusnexus.pk</Tag>
        <Tag color="purple" style={{ padding: '6px 16px', fontSize: 13 }}>💼 Deck available on request</Tag>
        <Tag color="gold" style={{ padding: '6px 16px', fontSize: 13 }}>🚀 Seed Round: $1.5M target</Tag>
      </Space>
      <Divider style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0 16px' }} />
      <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
        © 2025 Indus Nexus Pvt Ltd — Regulated by SECP & SBP — VASP Registered — FATF Compliant
      </Text>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PAGE ROOT EXPORT
───────────────────────────────────────────── */
export default function Blueprint(): React.ReactElement {
  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 0 48px' }}>

      {/* ── HERO ── */}
      <HeroBanner />

      {/* ── KEY METRICS ── */}
      <KeyMetrics />

      {/* ── CURRENT STATUS ── */}
      <CurrentStatus />

      {/* ── TECH STACK ── */}
      <TechStackLayers />

      {/* ── STABLECOIN FLOW ── */}
      <StablecoinFlow />

      {/* ── PHASE ROADMAP ── */}
      <PhaseRoadmap />

      {/* ── WHERE TO APPLY ── */}
      <WhereToApply />

      {/* ── LEGAL CHECKLIST ── */}
      <LegalChecklist />

      {/* ── REVENUE MODEL ── */}
      <RevenueModel />

      {/* ── INSTALL COMMANDS ── */}
      <InstallCommands />

      {/* ── COMPETITIVE TABLE ── */}
      <CompetitiveTable />

      {/* ── FOOTER ── */}
      <BlueprintFooter />

    </div>
  )
}
