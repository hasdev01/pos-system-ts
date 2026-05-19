import React from 'react'
import { Result, Button, Typography } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const { Text } = Typography

const ROLE_PERMS: Record<string, string> = {
  Cashier: 'POS Terminal, Inventory (view only), Sales & Orders',
  Manager: 'POS Terminal, Inventory, Sales & Orders, Reports',
  Admin:   'All pages',
}

export default function AccessDenied(): React.ReactElement {
  const navigate    = useNavigate()
  const { user }    = useAuth()
  const role        = user?.role ?? 'Cashier'

  return (
    <div style={{
      minHeight: '60vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Result
        icon={<LockOutlined style={{ color: '#f5222d', fontSize: 64 }} />}
        title="Access Denied"
        subTitle={
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
              Your role <strong>{role}</strong> does not have permission to view this page.
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              You can access: <strong>{ROLE_PERMS[role]}</strong>
            </Text>
          </div>
        }
        extra={
          <Button type="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        }
      />
    </div>
  )
}
