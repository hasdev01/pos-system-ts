import React from 'react'
import { Row, Col, Card, Statistic, Table, Tag, Progress, Space, Typography } from 'antd'
import { TeamOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { employees, locations, payrollRuns, attendance } from '../../data/hrmsData'
import { useModule } from '../../context/ModuleContext'

const { Title, Text } = Typography

const COLORS = ['#52c41a','#1890ff','#722ed1','#fa8c16','#13c2c2']

export default function HRMSOverview(): React.ReactElement {
  const { locationCode } = useModule()
  const scoped = locationCode === 'ALL' ? employees : employees.filter(e => e.location === locationCode)

  const activeCount = scoped.filter(e => e.status === 'Active').length
  const onLeave = scoped.filter(e => e.status === 'On Leave').length
  const totalPayroll = scoped.reduce((s, e) => s + e.basicSalary + e.allowances - e.deductions, 0)

  const byDept = Array.from(scoped.reduce((m, e) => m.set(e.department, (m.get(e.department) || 0) + 1), new Map<string,number>()))
    .map(([name, value]) => ({ name, value }))

  const byRole = Array.from(scoped.reduce((m, e) => m.set(e.role, (m.get(e.role) || 0) + 1), new Map<string,number>()))
    .map(([role, count]) => ({ role, count }))

  const presentToday = attendance.filter(a => a.status === 'Present').length
  const attendancePct = Math.round((presentToday / Math.max(attendance.length,1)) * 100)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>HRMS Overview</Title>
        <Text type="secondary">Human Resources Management — {locationCode === 'ALL' ? 'All Locations' : locationCode}</Text>
      </div>

      <Row gutter={[16,16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Active Employees" value={activeCount} prefix={<TeamOutlined style={{ color: '#52c41a' }} />} />
            <Text type="secondary" style={{ fontSize: 12 }}>{onLeave} on leave</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Monthly Payroll" value={totalPayroll} prefix="₨" valueStyle={{ color: '#1890ff' }} />
            <Text type="secondary" style={{ fontSize: 12 }}>Net of deductions</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Locations" value={locations.filter(l => l.status === 'Active').length} prefix={<EnvironmentOutlined style={{ color: '#722ed1' }} />} />
            <Text type="secondary" style={{ fontSize: 12 }}>Operational branches</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Attendance Today" value={attendancePct} suffix="%" prefix={<ClockCircleOutlined style={{ color: '#fa8c16' }} />} />
            <Progress percent={attendancePct} showInfo={false} strokeColor="#52c41a" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16,16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="Employees by Role">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={byRole}>
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#52c41a" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Headcount by Department">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={byDept} dataKey="value" nameKey="name" outerRadius={90} label>
                  {byDept.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16,16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="Recent Payroll Runs">
            <Table
              size="small"
              rowKey="id"
              pagination={false}
              dataSource={payrollRuns.slice(0, 5)}
              columns={[
                { title: 'Run ID',  dataIndex: 'id' },
                { title: 'Period',  dataIndex: 'month' },
                { title: 'Location',dataIndex: 'location' },
                { title: 'Net',     dataIndex: 'net', render: (v: number) => `₨${v.toLocaleString()}` },
                { title: 'Status',  dataIndex: 'status', render: (s: string) => (
                  <Tag color={s === 'Paid' ? 'green' : s === 'Processed' ? 'blue' : 'orange'}>{s}</Tag>
                )},
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Today's Attendance">
            <Space direction="vertical" style={{ width: '100%' }}>
              {attendance.slice(0,6).map(a => (
                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{a.name}</div>
                    <Text type="secondary" style={{ fontSize: 11 }}>{a.checkIn} → {a.checkOut}</Text>
                  </div>
                  <Tag color={
                    a.status === 'Present' ? 'green' :
                    a.status === 'Late'    ? 'orange' :
                    a.status === 'Leave'   ? 'blue' : 'red'
                  }>{a.status}</Tag>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
