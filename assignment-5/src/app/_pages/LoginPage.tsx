'use client'

import { useRouter } from 'next/navigation'
import { Space, Card, Form, Input, Button, Typography } from 'antd'
import { LoginFieldType } from '../_types/LoginPage.types'

const { Title } = Typography

const LoginPage = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  return (
    <Space
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '6rem',
      }}
    >
      <Card
        bordered
        title={
          <Title level={2} style={{ minWidth: '400px' }}>
            Bookstore
          </Title>
        }
      >
        <Form
          form={form}
          name="login-form"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={() => {
            alert('Login success')
            router.replace('/')
          }}
          onFinishFailed={() => {
            console.log('Failed')
          }}
        >
          <Form.Item<LoginFieldType>
            name="email"
            label="Email (*)"
            rules={[
              {
                required: true,
                message: 'Please fill the email!',
              },
              { type: 'email', message: 'The input is not valid E-mail!' },
            ]}
          >
            <Input type="text" placeholder="Email" />
          </Form.Item>
          <Form.Item<LoginFieldType>
            name="password"
            label="Password (*)"
            rules={[
              {
                required: true,
                message: 'Please fill the password',
              },
              {
                min: 8,
                message: 'Password should have the minimum of 8 characters',
              },
              {
                pattern: /(?=.*[A-Z])(?=.*\W)/,
                message:
                  'Password should contain at least 1 uppercase character and 1 symbol',
              },
            ]}
          >
            <Input type="text" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  )
}

export default LoginPage
