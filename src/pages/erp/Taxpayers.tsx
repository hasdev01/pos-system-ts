import React, { useState } from 'react'
import { Card, Table, Tag, Typography, Space, Button, Modal, Result, message, Row, Col, Statistic } from 'antd'
import { AuditOutlined, FileDoneOutlined, CloudUploadOutlined, BankOutlined } from '@ant-design/icons'
import { taxpayers as seed } from '../../data/erpData'
import type { Taxpayer, TaxpayerStatus } from '../../types/erp'

const { Title, Text } = Typography

export default function Taxpayers(): React.ReactElement {
  const [data, setData] = useState<Taxpayer[]>(seed)
  const [filed, setFiled] = useState<Taxpayer | null>(null)

  const totalDue = data.reduce((s, t) => s + (t.taxDue - t.paid), 0)
  const filedCount = data.filter(t => t.status === 'Filed').length

  const fileWithFBR = (t: Taxpayer): void => {
    const ref = `FBR-${t.type.slice(0,3).toUpperCase()}-${t.period}-${Math.floor(Math.random() * 900000 + 100000)}`
    const next = data.map(x => x.id === t.id ? { ...x, status: 'Filed' as TaxpayerStatus, paid: x.taxDue, fbrRef: ref } : x)
    setData(next)
    setFiled({ ...t, fbrRef: ref, status: 'Filed', paid: t.taxDue })
    message.success(`Filed with FBR — ${ref}`)
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          <Space><AuditOutlined style={{ color: '#a855f7' }} /> Taxpayers / FBR System</Space>
        </Title>
        <Text type="secondary">Sales Tax, Income Tax, and Withholding filings with Federal Board of Revenue (FBR Pakistan)</Text>
      </div>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}><Card><Statistic title="Outstanding Tax Liability" value={totalDue} prefix="₨" valueStyle={{ color: '#f5222d' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="Filings Completed" value={filedCount} suffix={`/ ${data.length}`} valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={8}><Card><Statistic title="NTN" value="3456789-1" prefix={<BankOutlined />} /></Card></Col>
      </Row>

      <Card>
        <Table
          rowKey="id"
          dataSource={data}
          pagination={false}
          columns={[
            { title: 'NTN',     dataIndex: 'ntn' },
            { title: 'Type',    dataIndex: 'type',  render: (v: string) => <Tag color="purple">{v}</Tag> },
            { title: 'Period',  dataIndex: 'period' },
            { title: 'Taxable Income', dataIndex: 'taxable', render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Tax Due',    dataIndex: 'taxDue',  render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Paid',       dataIndex: 'paid',    render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'FBR Ref',    dataIndex: 'fbrRef' },
            { title: 'Status',     dataIndex: 'status',  render: (s: TaxpayerStatus) => (
              <Tag color={s === 'Filed' ? 'green' : s === 'Pending' ? 'orange' : 'red'}>{s}</Tag>
            )},
            {
              title: 'Action', key: 'action',
              render: (_, r) => r.status !== 'Filed'
                ? <Button type="primary" size="small" icon={<CloudUploadOutlined />} onClick={() => fileWithFBR(r)}>File with FBR</Button>
                : <Button size="small" icon={<FileDoneOutlined />}>View Receipt</Button>
            },
          ]}
        />
      </Card>

      <Modal
        open={!!filed}
        onCancel={() => setFiled(null)}
        footer={<Button type="primary" onClick={() => setFiled(null)}>Close</Button>}
      >
        {filed && (
          <Result
            status="success"
            title="Tax Return Filed Successfully"
            subTitle={<>
              FBR Reference: <b>{filed.fbrRef}</b><br />
              {filed.type} · {filed.period} · ₨{filed.taxDue.toLocaleString()} paid
            </>}
          />
        )}
      </Modal>
    </div>
  )
}
