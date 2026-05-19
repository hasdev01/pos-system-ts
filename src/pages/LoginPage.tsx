import React, { useState } from 'react'
import { Form, Input, Button, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined, ShopOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../context/AuthContext'

const { Title, Text } = Typography

interface RoleOption {
  role: UserRole
  label: string
  icon: string
  desc: string
  color: string
  bg: string
  border: string
  credentials: string
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: 'Admin',
    label: 'Admin',
    icon: '👑',
    desc: 'Full access — all pages, settings, users',
    color: '#f5222d',
    bg: '#fff1f0',
    border: '#ffa39e',
    credentials: 'admin@store.pk',
  },
  {
    role: 'Manager',
    label: 'Manager',
    icon: '📊',
    desc: 'POS, Inventory, Sales & Reports',
    color: '#722ed1',
    bg: '#f9f0ff',
    border: '#d3adf7',
    credentials: 'faisal@store.pk',
  },
  {
    role: 'Cashier',
    label: 'Cashier',
    icon: '🧾',
    desc: 'POS Terminal, Inventory (view), Sales',
    color: '#1890ff',
    bg: '#e6f7ff',
    border: '#91d5ff',
    credentials: 'ahmed@store.pk',
  },
]

export default function LoginPage(): React.ReactElement {
  const { login } = useAuth()
  const [selectedRole, setSelectedRole] = useState<UserRole>('Admin')

  const handleLogin = (): void => {
    login(selectedRole)
  }

  const selected = ROLE_OPTIONS.find(r => r.role === selectedRole)!

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    }}>
      {/* Left branding panel */}
      <div style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px',
        color: '#fff',
        display: 'flex',
      }}>
        <div style={{ maxWidth: 420, textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: 'linear-gradient(135deg, #1890ff, #096dd9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px', fontSize: 36,
            boxShadow: '0 8px 32px rgba(24,144,255,0.4)',
          }}>🏪</div>
          <Title level={2} style={{ color: '#fff', marginBottom: 16 }}>StoreERP Pro</Title>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.8 }}>
            Role-based Point of Sale &amp; Inventory Management System
          </Text>

          <div style={{ marginTop: 40 }}>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, display: 'block', marginBottom: 16 }}>
              WHAT EACH ROLE CAN ACCESS
            </Text>
            {[
              { role: 'Admin',   icon: '👑', perms: 'All pages including Users & Settings' },
              { role: 'Manager', icon: '📊', perms: 'POS, Inventory, Sales, Reports'       },
              { role: 'Cashier', icon: '🧾', perms: 'POS Terminal, Inventory (view), Sales'},
            ].map(r => (
              <div key={r.role} style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', marginBottom: 16 }}>
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <div>
                  <Text style={{ color: '#fff', fontWeight: 600 }}>{r.role}</Text>
                  <div><Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>{r.perms}</Text></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div style={{
        width: '100%',
        maxWidth: 500,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 40px',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.3)',
        overflowY: 'auto',
      }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <ShopOutlined style={{ fontSize: 28, color: '#1890ff' }} />
            <Title level={3} style={{ margin: 0, color: '#1a1a2e' }}>StoreERP Pro</Title>
          </div>
          <Title level={2} style={{ margin: '20px 0 6px', color: '#1a1a2e' }}>Welcome back</Title>
          <Text type="secondary" style={{ fontSize: 15 }}>Select your role and sign in</Text>
        </div>

        {/* Role selector */}
        <div style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', display: 'block', marginBottom: 10 }}>
            LOGIN AS
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ROLE_OPTIONS.map(opt => (
              <div
                key={opt.role}
                onClick={() => setSelectedRole(opt.role)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
                  border: selectedRole === opt.role ? `2px solid ${opt.color}` : '2px solid #f0f0f0',
                  background: selectedRole === opt.role ? opt.bg : '#fafafa',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: selectedRole === opt.role ? opt.color : '#e8e8e8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0, transition: 'all 0.15s',
                }}>
                  {opt.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: selectedRole === opt.role ? opt.color : '#1a1a2e' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 2 }}>{opt.desc}</div>
                </div>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  border: `2px solid ${selectedRole === opt.role ? opt.color : '#d9d9d9'}`,
                  background: selectedRole === opt.role ? opt.color : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {selectedRole === opt.role && (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo credentials hint */}
        <div style={{
          background: selected.bg,
          border: `1px solid ${selected.border}`,
          borderRadius: 8, padding: '10px 14px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 18 }}>{selected.icon}</span>
          <div>
            <Text style={{ fontSize: 12, color: '#595959', display: 'block' }}>
              Signing in as <strong>{selected.role}</strong>
            </Text>
            <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{selected.credentials}</Text>
          </div>
        </div>

        <Form layout="vertical" size="large" onFinish={handleLogin}>
          <Form.Item label="Email Address" name="email" rules={[{ required: true, message: 'Enter your email' }]}>
            <Input
              prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
              placeholder={selected.credentials}
            />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Enter your password' }]}>
            <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="••••••••" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary" htmlType="submit" block size="large"
              style={{
                height: 48, fontSize: 16, fontWeight: 600, borderRadius: 8,
                background: selected.color, borderColor: selected.color,
              }}
            >
              Sign In as {selected.label}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 8, padding: '10px 14px', marginBottom: 20 }}>
          <Text style={{ fontSize: 12, color: '#52c41a' }}>
            <strong>Demo:</strong> Fill any values and click Sign In — role is set by your selection above
          </Text>
        </div>

        <Divider plain><Text type="secondary" style={{ fontSize: 13 }}>New to StoreERP?</Text></Divider>
        <Link to="/signup">
          <Button type="default" block size="large" style={{ height: 48, borderRadius: 8 }}>
            Create an Account
          </Button>
        </Link>
      </div>
    </div>
  )
}
