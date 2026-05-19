import React, { useState } from 'react'
import { Row, Col, Card, Table, Tag, Button, Modal, Statistic, Space, Typography, Steps, message, Alert, Select, DatePicker, Result } from 'antd'
import { DollarOutlined, PlayCircleOutlined, FileDoneOutlined } from '@ant-design/icons'
import { payrollRuns as seedRuns, employees, locations } from '../../data/hrmsData'
import type { PayrollRun, PayrollStatus } from '../../types/hrms'
import { useAuth } from '../../context/AuthContext'
import { useModule } from '../../context/ModuleContext'

const { Title, Text } = Typography

const STATUS_COLOR: Record<PayrollStatus, string> = {
  Draft: 'orange', Processed: 'blue', Paid: 'green',
}

export default function Payroll(): React.ReactElement {
  const { user } = useAuth()
  const { locationCode } = useModule()
  const [runs, setRuns] = useState<PayrollRun[]>(seedRuns)
  const [runModal, setRunModal] = useState(false)
  const [runLocation, setRunLocation] = useState<string>(locationCode === 'ALL' ? 'KHI-01' : locationCode)
  const [step, setStep] = useState(0)
  const [processing, setProcessing] = useState(false)

  const canRunPayroll = user?.role === 'Admin' || user?.role === 'Manager'
  // Note: in a real system Finance role would also run payroll; using AuthContext's UserRole here.

  const scoped = locationCode === 'ALL' ? runs : runs.filter(r => r.location === locationCode || r.location === 'All')

  const totals = scoped.reduce((acc, r) => {
    acc.gross += r.gross; acc.net += r.net; acc.tax += r.tax; return acc
  }, { gross: 0, net: 0, tax: 0 })

  const eligibleEmployees = employees.filter(e => e.status === 'Active' && (runLocation === 'ALL' || e.location === runLocation))
  const previewGross = eligibleEmployees.reduce((s, e) => s + e.basicSalary + e.allowances, 0)
  const previewDeductions = eligibleEmployees.reduce((s, e) => s + e.deductions, 0)
  const previewTax = Math.round(previewGross * 0.08)
  const previewNet = previewGross - previewDeductions - previewTax

  const startRun = (): void => { setRunModal(true); setStep(0) }

  const processRun = (): void => {
    setProcessing(true)
    setTimeout(() => {
      const month = new Date().toISOString().slice(0, 7)
      const newRun: PayrollRun = {
        id: `PR-${runLocation}-${month}`,
        month,
        location: runLocation,
        employees: eligibleEmployees.length,
        gross: previewGross,
        deductions: previewDeductions,
        tax: previewTax,
        net: previewNet,
        status: 'Processed',
        runDate: new Date().toISOString().slice(0, 10),
        runBy: user?.name ?? 'System',
      }
      setRuns([newRun, ...runs])
      setProcessing(false)
      setStep(2)
      message.success(`Payroll ${newRun.id} processed`)
    }, 1200)
  }

  const markPaid = (id: string): void => {
    setRuns(runs.map(r => r.id === id ? { ...r, status: 'Paid' as PayrollStatus } : r))
    message.success(`${id} marked as Paid`)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Payroll</Title>
          <Text type="secondary">Run payroll, view history, and manage disbursements</Text>
        </div>
        {canRunPayroll && (
          <Button type="primary" size="large" icon={<PlayCircleOutlined />} onClick={startRun}>
            Run Payroll
          </Button>
        )}
      </div>

      {!canRunPayroll && (
        <Alert
          message="Restricted Access"
          description="Only Admin, Manager, or Finance roles can run payroll. You can view history below."
          type="info" showIcon style={{ marginBottom: 16 }}
        />
      )}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title="Total Gross (YTD)" value={totals.gross} prefix="₨" valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title="Total Tax Withheld" value={totals.tax} prefix="₨" valueStyle={{ color: '#fa8c16' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title="Total Net Paid" value={totals.net} prefix="₨" valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
      </Row>

      <Card title="Payroll Runs" style={{ marginTop: 16 }}>
        <Table
          rowKey="id"
          dataSource={scoped}
          pagination={{ pageSize: 10 }}
          columns={[
            { title: 'Run ID',    dataIndex: 'id' },
            { title: 'Period',    dataIndex: 'month' },
            { title: 'Location',  dataIndex: 'location' },
            { title: 'Employees', dataIndex: 'employees' },
            { title: 'Gross',     dataIndex: 'gross',      render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Tax',       dataIndex: 'tax',        render: (v: number) => `₨${v.toLocaleString()}` },
            { title: 'Net',       dataIndex: 'net',        render: (v: number) => <Text strong style={{ color: '#52c41a' }}>₨{v.toLocaleString()}</Text> },
            { title: 'Status',    dataIndex: 'status',     render: (s: PayrollStatus) => <Tag color={STATUS_COLOR[s]}>{s}</Tag> },
            {
              title: 'Action', key: 'action',
              render: (_, r) => r.status === 'Processed' && canRunPayroll
                ? <Button size="small" type="primary" icon={<FileDoneOutlined />} onClick={() => markPaid(r.id)}>Mark Paid</Button>
                : <Button size="small">View Slip</Button>
            },
          ]}
        />
      </Card>

      <Modal
        title="Run Payroll"
        open={runModal}
        onCancel={() => { setRunModal(false); setStep(0) }}
        width={760}
        footer={
          step === 0 ? [
            <Button key="c" onClick={() => setRunModal(false)}>Cancel</Button>,
            <Button key="n" type="primary" onClick={() => setStep(1)}>Continue</Button>,
          ] : step === 1 ? [
            <Button key="b" onClick={() => setStep(0)}>Back</Button>,
            <Button key="p" type="primary" loading={processing} icon={<DollarOutlined />} onClick={processRun}>Process Payroll</Button>,
          ] : [
            <Button key="d" type="primary" onClick={() => setRunModal(false)}>Done</Button>,
          ]
        }
      >
        <Steps current={step} items={[
          { title: 'Configure' }, { title: 'Review' }, { title: 'Complete' },
        ]} style={{ marginBottom: 24 }} />

        {step === 0 && (
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div>
              <Text strong>Location</Text>
              <Select
                value={runLocation}
                onChange={setRunLocation}
                style={{ width: '100%', marginTop: 6 }}
                options={[{ value: 'ALL', label: 'All Locations' }, ...locations.map(l => ({ value: l.code, label: `${l.code} — ${l.name}` }))]}
              />
            </div>
            <div>
              <Text strong>Pay Period</Text>
              <DatePicker.MonthPicker style={{ width: '100%', marginTop: 6 }} placeholder="Select month" />
            </div>
            <Alert message={`${eligibleEmployees.length} active employees eligible for this payroll run`} type="info" showIcon />
          </Space>
        )}

        {step === 1 && (
          <div>
            <Alert type="warning" showIcon message="Review carefully — this will record a new payroll run" style={{ marginBottom: 16 }} />
            <Row gutter={16}>
              <Col span={6}><Card size="small"><Statistic title="Employees" value={eligibleEmployees.length} /></Card></Col>
              <Col span={6}><Card size="small"><Statistic title="Gross" value={previewGross} prefix="₨" /></Card></Col>
              <Col span={6}><Card size="small"><Statistic title="Tax (8%)" value={previewTax} prefix="₨" /></Card></Col>
              <Col span={6}><Card size="small"><Statistic title="Net" value={previewNet} prefix="₨" valueStyle={{ color: '#52c41a' }} /></Card></Col>
            </Row>
            <Table
              size="small"
              style={{ marginTop: 16 }}
              rowKey="empCode"
              dataSource={eligibleEmployees.slice(0, 6)}
              pagination={false}
              columns={[
                { title: 'Code', dataIndex: 'empCode' },
                { title: 'Name', dataIndex: 'name' },
                { title: 'Basic', dataIndex: 'basicSalary', render: (v: number) => `₨${v.toLocaleString()}` },
                { title: 'Net',   key: 'net', render: (_, r) => `₨${(r.basicSalary + r.allowances - r.deductions - Math.round((r.basicSalary + r.allowances) * 0.08)).toLocaleString()}` },
              ]}
            />
            {eligibleEmployees.length > 6 && (
              <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                …and {eligibleEmployees.length - 6} more employees
              </Text>
            )}
          </div>
        )}

        {step === 2 && (
          <Result
            status="success"
            title="Payroll Processed Successfully"
            subTitle={`${eligibleEmployees.length} employees · Net ₨${previewNet.toLocaleString()}`}
          />
        )}
      </Modal>
    </div>
  )
}
