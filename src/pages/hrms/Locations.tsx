import React from 'react'
import { Row, Col, Card, Tag, Typography, Statistic, Space } from 'antd'
import { EnvironmentOutlined, TeamOutlined, ShopOutlined } from '@ant-design/icons'
import { locations } from '../../data/hrmsData'

const { Title, Text } = Typography

export default function Locations(): React.ReactElement {
  return (
    <div>
      <Title level={3} style={{ margin: 0 }}>Multi-Location Management</Title>
      <Text type="secondary">All branches and outlets across Pakistan</Text>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {locations.map(loc => (
          <Col xs={24} md={12} lg={8} key={loc.id}>
            <Card
              title={<Space><EnvironmentOutlined style={{ color: '#52c41a' }} />{loc.code}</Space>}
              extra={<Tag color={loc.status === 'Active' ? 'green' : 'red'}>{loc.status}</Tag>}
              hoverable
            >
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{loc.name}</div>
              <Text type="secondary" style={{ fontSize: 12 }}>{loc.address}</Text>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                <Statistic title="Employees" value={loc.employees} prefix={<TeamOutlined />} valueStyle={{ fontSize: 18 }} />
                <Statistic title="Manager"   value={loc.manager}   prefix={<ShopOutlined />}  valueStyle={{ fontSize: 14 }} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
