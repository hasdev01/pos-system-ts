import React from 'react'
import { Card, Table, Tag, Typography, Row, Col, Statistic } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { attendance } from '../../data/hrmsData'

const { Title, Text } = Typography

export default function Attendance(): React.ReactElement {
  const present = attendance.filter(a => a.status === 'Present').length
  const late    = attendance.filter(a => a.status === 'Late').length
  const absent  = attendance.filter(a => a.status === 'Absent').length
  const leave   = attendance.filter(a => a.status === 'Leave').length

  return (
    <div>
      <Title level={3} style={{ margin: 0 }}>Attendance</Title>
      <Text type="secondary">Daily check-in / check-out records</Text>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={6}><Card><Statistic title="Present" value={present} prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />} /></Card></Col>
        <Col span={6}><Card><Statistic title="Late"    value={late}    prefix={<ClockCircleOutlined style={{ color: '#fa8c16' }} />} /></Card></Col>
        <Col span={6}><Card><Statistic title="Absent"  value={absent}  prefix={<CloseCircleOutlined style={{ color: '#f5222d' }} />} /></Card></Col>
        <Col span={6}><Card><Statistic title="On Leave" value={leave}  prefix={<ClockCircleOutlined style={{ color: '#1890ff' }} />} /></Card></Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Table
          rowKey="id"
          dataSource={attendance}
          pagination={{ pageSize: 10 }}
          columns={[
            { title: 'Date',     dataIndex: 'date' },
            { title: 'Code',     dataIndex: 'empCode' },
            { title: 'Name',     dataIndex: 'name' },
            { title: 'Check In', dataIndex: 'checkIn' },
            { title: 'Check Out',dataIndex: 'checkOut' },
            { title: 'Hours',    dataIndex: 'hours' },
            { title: 'Status',   dataIndex: 'status', render: (s: string) => (
              <Tag color={s === 'Present' ? 'green' : s === 'Late' ? 'orange' : s === 'Leave' ? 'blue' : 'red'}>{s}</Tag>
            )},
          ]}
        />
      </Card>
    </div>
  )
}
