import React from 'react'
import { Form, Input, Button, Select, Typography, Divider, Row, Col } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, ShopOutlined, PhoneOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const { Title, Text } = Typography

export default function SignupPage(): React.ReactElement {
  const { login } = useAuth()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '48px 40px',
        width: '100%',
        maxWidth: 520,
        boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: 'linear-gradient(135deg, #1890ff, #096dd9)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, marginBottom: 16,
            boxShadow: '0 4px 16px rgba(24,144,255,0.4)',
          }}>🏪</div>
          <Title level={2} style={{ margin: '0 0 8px', color: '#1a1a2e' }}>Create Account</Title>
          <Text type="secondary">Set up your StoreERP merchant account</Text>
        </div>

        <Form layout="vertical" size="large" onFinish={() => login('Admin')}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder="Ahmed" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                <Input placeholder="Ali" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Store Name" name="storeName" rules={[{ required: true }]}>
            <Input prefix={<ShopOutlined style={{ color: '#bfbfbf' }} />} placeholder="My Retail Store" />
          </Form.Item>
          <Form.Item label="Email Address" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input prefix={<MailOutlined style={{ color: '#bfbfbf' }} />} placeholder="ahmed@store.pk" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />} placeholder="0300-1234567" />
          </Form.Item>
          <Form.Item label="Business Type" name="type">
            <Select placeholder="Select business type">
              <Select.Option value="grocery">Grocery Store</Select.Option>
              <Select.Option value="retail">General Retail</Select.Option>
              <Select.Option value="pharmacy">Pharmacy</Select.Option>
              <Select.Option value="restaurant">Restaurant</Select.Option>
              <Select.Option value="electronics">Electronics</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, min: 6 }]}>
            <Input.Password prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} placeholder="Min. 6 characters" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large"
              style={{ height: 48, fontSize: 16, fontWeight: 600, borderRadius: 8, marginTop: 8 }}>
              Create Account &amp; Get Started
            </Button>
          </Form.Item>
        </Form>

        <Divider plain><Text type="secondary" style={{ fontSize: 13 }}>Already have an account?</Text></Divider>
        <Link to="/login">
          <Button type="default" block size="large" style={{ height: 48, borderRadius: 8 }}>
            Back to Sign In
          </Button>
        </Link>
      </div>
    </div>
  )
}
