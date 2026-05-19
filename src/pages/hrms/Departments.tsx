import React from 'react'
import { Card, Table, Typography, Tag } from 'antd'
import { departments } from '../../data/hrmsData'

const { Title, Text } = Typography

export default function Departments(): React.ReactElement {
  return (
    <div>
      <Title level={3} style={{ margin: 0 }}>Departments</Title>
      <Text type="secondary">Organizational structure across the company</Text>

      <Card style={{ marginTop: 16 }}>
        <Table
          rowKey="id"
          dataSource={departments}
          pagination={false}
          columns={[
            { title: 'Department', dataIndex: 'name', render: (v: string) => <Text strong>{v}</Text> },
            { title: 'Head',       dataIndex: 'head' },
            { title: 'Location',   dataIndex: 'location', render: (v: string) => <Tag color="blue">{v}</Tag> },
            { title: 'Headcount',  dataIndex: 'employees' },
          ]}
        />
      </Card>
    </div>
  )
}
