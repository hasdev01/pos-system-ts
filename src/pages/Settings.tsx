import React from 'react'
import { Card, Form, Input, Button, Switch, Select, Divider, Typography, Row, Col, Tabs, InputNumber } from 'antd'
import { ShopOutlined, BellOutlined, PrinterOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons'
import type { TabsProps } from 'antd'

const { Title, Text } = Typography

interface SettingToggle { label: string; name: string; desc: string; default: boolean }

const notificationToggles: SettingToggle[] = [
  { label: 'Low stock alerts',   name: 'lowStock',      desc: 'Notify when product stock falls below threshold',   default: true  },
  { label: 'Daily sales summary',name: 'dailySummary',  desc: 'Receive end-of-day sales report via email',         default: true  },
  { label: 'New user login',     name: 'newLogin',      desc: 'Alert when a new session is started',               default: false },
  { label: 'Refund requests',    name: 'refunds',       desc: 'Notify when a refund is processed',                 default: true  },
  { label: 'Weekly report',      name: 'weeklyReport',  desc: 'Receive weekly performance summary',                default: false },
]

const securityToggles: SettingToggle[] = [
  { label: 'Auto-lock POS after inactivity', name: 'autoLock', desc: 'Locks terminal after 5 minutes of inactivity',  default: true  },
  { label: 'Require PIN for refunds',        name: 'pinRefund', desc: 'Manager PIN required to process refunds',       default: true  },
  { label: 'Two-factor authentication',      name: 'twoFa',     desc: 'Extra security for admin login',                default: false },
]

export default function Settings(): React.ReactElement {
  const tabs: TabsProps['items'] = [
    {
      key: 'store',
      label: <span><ShopOutlined /> Store</span>,
      children: (
        <Card bordered={false} style={{ borderRadius: 12 }}>
          <Title level={5} style={{ marginBottom: 20 }}>Store Information</Title>
          <Form layout="vertical" initialValues={{ storeName: 'Al-Amin Store', address: 'Shop #14, Main Bazaar, Karachi', phone: '021-3456789', email: 'info@alaminstore.pk', currency: 'PKR', taxRate: 5 }}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Store Name" name="storeName"><Input prefix={<ShopOutlined />} /></Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Phone Number" name="phone"><Input /></Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Address" name="address"><Input.TextArea rows={2} /></Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Email" name="email"><Input type="email" /></Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Website" name="website"><Input prefix={<GlobalOutlined />} placeholder="www.store.pk" /></Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Currency" name="currency">
                  <Select>
                    <Select.Option value="PKR">PKR — Pakistani Rupee</Select.Option>
                    <Select.Option value="USD">USD — US Dollar</Select.Option>
                    <Select.Option value="AED">AED — UAE Dirham</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Tax Rate (%)" name="taxRate">
                  <InputNumber min={0} max={100} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary">Save Store Settings</Button>
          </Form>
        </Card>
      ),
    },
    {
      key: 'notifications',
      label: <span><BellOutlined /> Notifications</span>,
      children: (
        <Card bordered={false} style={{ borderRadius: 12 }}>
          <Title level={5} style={{ marginBottom: 20 }}>Notification Preferences</Title>
          {notificationToggles.map(n => (
            <div key={n.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div>
                <Text strong>{n.label}</Text>
                <div><Text type="secondary" style={{ fontSize: 12 }}>{n.desc}</Text></div>
              </div>
              <Switch defaultChecked={n.default} />
            </div>
          ))}
          <Button type="primary" style={{ marginTop: 20 }}>Save Preferences</Button>
        </Card>
      ),
    },
    {
      key: 'receipt',
      label: <span><PrinterOutlined /> Receipt</span>,
      children: (
        <Card bordered={false} style={{ borderRadius: 12 }}>
          <Title level={5} style={{ marginBottom: 20 }}>Receipt Settings</Title>
          <Form layout="vertical" initialValues={{ header: 'Al-Amin Store', footer: 'Thank you for shopping with us!', showTax: true, showLogo: false }}>
            <Form.Item label="Receipt Header Text" name="header"><Input /></Form.Item>
            <Form.Item label="Receipt Footer Message" name="footer"><Input.TextArea rows={2} /></Form.Item>
            <Row gutter={16}>
              <Col span={12}><Form.Item label="Show Tax Breakdown" name="showTax"  valuePropName="checked"><Switch /></Form.Item></Col>
              <Col span={12}><Form.Item label="Print Logo"         name="showLogo" valuePropName="checked"><Switch /></Form.Item></Col>
            </Row>
            <Form.Item label="Printer Type">
              <Select defaultValue="thermal">
                <Select.Option value="thermal">Thermal Printer (80mm)</Select.Option>
                <Select.Option value="a4">A4 Printer</Select.Option>
                <Select.Option value="email">Email Receipt</Select.Option>
              </Select>
            </Form.Item>
            <Button type="primary">Save Receipt Settings</Button>
          </Form>
        </Card>
      ),
    },
    {
      key: 'security',
      label: <span><LockOutlined /> Security</span>,
      children: (
        <Card bordered={false} style={{ borderRadius: 12 }}>
          <Title level={5} style={{ marginBottom: 20 }}>Security Settings</Title>
          <Form layout="vertical">
            <Form.Item label="Current Password" ><Input.Password /></Form.Item>
            <Form.Item label="New Password"     ><Input.Password /></Form.Item>
            <Form.Item label="Confirm Password" ><Input.Password /></Form.Item>
            <Button type="primary" style={{ marginBottom: 24 }}>Change Password</Button>
          </Form>
          <Divider />
          <Title level={5}>Session Settings</Title>
          {securityToggles.map(s => (
            <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div>
                <Text strong>{s.label}</Text>
                <div><Text type="secondary" style={{ fontSize: 12 }}>{s.desc}</Text></div>
              </div>
              <Switch defaultChecked={s.default} />
            </div>
          ))}
        </Card>
      ),
    },
  ]

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>Settings</Title>
      <Tabs items={tabs} type="card" />
    </div>
  )
}
