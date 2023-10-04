'use client'

import Link from 'next/link'
import { Typography, Space } from 'antd'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const { Title, Text } = Typography

export default function ErrorPage() {
  return (
    <Space
      direction="vertical"
      align="center"
      style={{
        width: '100%',
        marginTop: '6rem',
      }}
    >
      <Title level={1} style={{ marginBottom: '10px' }}>
        404
      </Title>
      <Text style={{ fontSize: '16px' }}>Page not found</Text>
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <AiOutlineArrowLeft style={{ marginRight: '4px' }} /> Go back to home
        page
      </Link>
    </Space>
  )
}
