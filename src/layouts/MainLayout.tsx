import React, { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Badge, Button, Space, Tag, Select } from 'antd'
import {
  DashboardOutlined, ShoppingCartOutlined, InboxOutlined,
  BarChartOutlined, TeamOutlined, SettingOutlined,
  BellOutlined, LogoutOutlined, UserOutlined, ShopOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, FileTextOutlined,
  AppstoreOutlined, BankOutlined, DollarOutlined, CreditCardOutlined,
  WalletOutlined, AuditOutlined, ApartmentOutlined, ClockCircleOutlined,
  IdcardOutlined, SafetyCertificateOutlined, RiseOutlined, FallOutlined,
  EnvironmentOutlined, SwapOutlined, RocketOutlined, GlobalOutlined, ThunderboltOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../context/AuthContext'
import { useModule } from '../context/ModuleContext'
import type { AppModule } from '../context/ModuleContext'

const { Sider, Header, Content } = Layout

interface MainLayoutProps {
  children: React.ReactNode
}

const ROLE_COLORS: Record<UserRole, string> = {
  Admin:   '#f5222d',
  Manager: '#722ed1',
  Cashier: '#1890ff',
}

const ROLE_BADGE_COLOR: Record<UserRole, string> = {
  Admin:   'red',
  Manager: 'purple',
  Cashier: 'blue',
}

const MODULE_THEME: Record<AppModule, { bg: string; accent: string; label: string; icon: string }> = {
  pos:  { bg: '#0f172a', accent: '#1890ff', label: 'Point of Sale', icon: '🏪' },
  hrms: { bg: '#0b3d2e', accent: '#52c41a', label: 'HRMS',          icon: '👥' },
  erp:  { bg: '#1a1130', accent: '#a855f7', label: 'ERP Suite',     icon: '🏢' },
}

function posMenu(role: UserRole): MenuProps['items'] {
  const items: MenuProps['items'] = [
    { key: '/dashboard', icon: <DashboardOutlined />,    label: 'Dashboard'      },
    { key: '/pos',       icon: <ShoppingCartOutlined />, label: 'POS Terminal'   },
    { key: '/inventory', icon: <InboxOutlined />,        label: 'Inventory'      },
    { key: '/sales',     icon: <FileTextOutlined />,     label: 'Sales & Orders' },
  ]
  if (role !== 'Cashier') items.push({ key: '/reports', icon: <BarChartOutlined />, label: 'Reports' })
  if (role !== 'Cashier') {
    items.push({ type: 'divider' as const })
    items.push({ key: '/blueprint', icon: <RocketOutlined />, label: '🏦 Indus Nexus Blueprint' })
  }
  if (role === 'Admin') {
    items.push({ type: 'divider' as const })
    items.push({ key: '/users',    icon: <TeamOutlined />,    label: 'Users'    })
    items.push({ key: '/settings', icon: <SettingOutlined />, label: 'Settings' })
  }
  return items
}

function hrmsMenu(): MenuProps['items'] {
  return [
    { key: '/hrms',             icon: <DashboardOutlined />,        label: 'HRMS Overview' },
    { key: '/hrms/employees',   icon: <IdcardOutlined />,           label: 'Employees'     },
    { key: '/hrms/attendance',  icon: <ClockCircleOutlined />,      label: 'Attendance'    },
    { key: '/hrms/payroll',     icon: <DollarOutlined />,           label: 'Payroll'       },
    { key: '/hrms/departments', icon: <ApartmentOutlined />,        label: 'Departments'   },
    { key: '/hrms/locations',   icon: <EnvironmentOutlined />,      label: 'Locations'     },
    { key: '/hrms/roles',       icon: <SafetyCertificateOutlined />,label: 'Roles & Access'},
  ]
}

function erpMenu(): MenuProps['items'] {
  return [
    { key: '/erp',            icon: <DashboardOutlined />,    label: 'ERP Admin'      },
    { key: '/erp/revenue',    icon: <RiseOutlined />,         label: 'Revenue'        },
    { key: '/erp/expenses',   icon: <FallOutlined />,         label: 'Expenses'       },
    { key: '/erp/pos-pay',    icon: <ShoppingCartOutlined />, label: 'POS Pay Now'    },
    { key: '/erp/cards',      icon: <CreditCardOutlined />,   label: 'Card Payments'  },
    { key: '/erp/cash',       icon: <WalletOutlined />,       label: 'Cash Ledger'    },
    { key: '/erp/taxpayers',  icon: <AuditOutlined />,            label: 'Taxpayers / FBR'    },
    { key: '/erp/banks',      icon: <BankOutlined />,             label: 'Bank Accounts'      },
    { type: 'divider' as const },
    { key: '/erp/wallet',     icon: <ThunderboltOutlined />,      label: '⬡ Stablecoin Wallet' },
    { key: '/erp/remittance', icon: <GlobalOutlined />,           label: '🌍 Remittance'       },
  ]
}

export default function MainLayout({ children }: MainLayoutProps): React.ReactElement {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const navigate  = useNavigate()
  const location  = useLocation()
  const { user, logout } = useAuth()
  const { module, setModule, locationCode, setLocationCode, availableLocations } = useModule()

  const role = user?.role ?? 'Cashier'
  const theme = MODULE_THEME[module]

  const menuItems =
    module === 'hrms' ? hrmsMenu() :
    module === 'erp'  ? erpMenu()  :
    posMenu(role)

  const switchModule = (m: AppModule): void => {
    setModule(m)
    if (m === 'pos')  navigate('/dashboard')
    if (m === 'hrms') navigate('/hrms')
    if (m === 'erp')  navigate('/erp')
  }

  const moduleSwitcher: MenuProps = {
    items: [
      { key: 'pos',  icon: <ShoppingCartOutlined />, label: 'POS — Point of Sale' },
      { key: 'hrms', icon: <TeamOutlined />,         label: 'HRMS — Human Resources' },
      { key: 'erp',  icon: <BankOutlined />,         label: 'ERP — Enterprise Suite' },
    ],
    onClick: ({ key }: { key: string }) => switchModule(key as AppModule),
  }

  const userMenu: MenuProps = {
    items: [
      { key: 'profile', icon: <UserOutlined />,  label: 'My Profile'     },
      { key: 'store',   icon: <ShopOutlined />,  label: 'Store Settings' },
      { type: 'divider' },
      { key: 'logout',  icon: <LogoutOutlined />, label: 'Sign Out', danger: true },
    ],
    onClick: ({ key }: { key: string }) => { if (key === 'logout') logout() },
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        style={{
          background: theme.bg,
          position: 'fixed',
          left: 0, top: 0, bottom: 0,
          zIndex: 100,
          overflow: 'auto',
          transition: 'background 0.3s',
        }}
      >
        <div
          style={{
            height: 64, display: 'flex', alignItems: 'center',
            padding: collapsed ? '0 24px' : '0 20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            gap: 12, cursor: 'pointer',
          }}
          onClick={() => switchModule(module)}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${theme.accent}, rgba(0,0,0,0.3))`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}>{theme.icon}</div>
          {!collapsed && (
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>StoreERP</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>{theme.label}</div>
            </div>
          )}
        </div>

        {!collapsed && (
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{
              background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: ROLE_COLORS[role],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0,
                }}>
                  {user?.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.name}
                  </div>
                  <div style={{ marginTop: 2 }}>
                    <Tag color={ROLE_BADGE_COLOR[role]} style={{ fontSize: 10, padding: '0 6px', lineHeight: '16px' }}>
                      {role}
                    </Tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }: { key: string }) => navigate(key)}
          style={{ background: 'transparent', border: 'none', padding: '8px 0' }}
        />

        {!collapsed && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Tag color="blue" style={{ width: '100%', textAlign: 'center', padding: '4px 0' }}>
              v2.0.0 Multi-Module
            </Tag>
          </div>
        )}
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'margin 0.2s' }}>
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          position: 'sticky', top: 0, zIndex: 99,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          height: 64,
        }}>
          <Space size={12}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 16 }}
            />

            <Dropdown menu={moduleSwitcher} trigger={['click']} placement="bottomLeft">
              <Button
                type="primary"
                icon={<AppstoreOutlined />}
                style={{ background: theme.accent, borderColor: theme.accent, fontWeight: 600 }}
              >
                {theme.label} <SwapOutlined style={{ fontSize: 11 }} />
              </Button>
            </Dropdown>

            <Select
              value={locationCode}
              onChange={setLocationCode}
              style={{ width: 220 }}
              prefix={<EnvironmentOutlined style={{ color: theme.accent }} />}
              options={availableLocations.map(l => ({ value: l.code, label: `${l.code} — ${l.name}` }))}
            />

            <Tag color={ROLE_BADGE_COLOR[role]} style={{ fontSize: 12 }}>
              {role === 'Admin' ? '👑' : role === 'Manager' ? '📊' : '🧾'} {role}
            </Tag>
          </Space>

          <Space size={16}>
            <Badge count={3} size="small">
              <Button type="text" icon={<BellOutlined style={{ fontSize: 18 }} />} shape="circle" />
            </Badge>
            <Dropdown menu={userMenu} trigger={['click']} placement="bottomRight">
              <Space style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}>
                <Avatar style={{ background: ROLE_COLORS[role], fontWeight: 700 }} size={32}>
                  {user?.avatar}
                </Avatar>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>{user?.name}</div>
                  <div style={{ fontSize: 11, color: '#8c8c8c' }}>{user?.email}</div>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ padding: '24px', background: '#f0f2f5', minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
