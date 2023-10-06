import { useRouter } from 'next/navigation'
import { Space, Typography, Switch, Avatar, Button } from 'antd'
import { FaUserAlt } from 'react-icons/fa'
import { useTheme } from '../_context/ThemeContext'

const { Text } = Typography

const Header = () => {
  const router = useRouter()
  const { isDarkMode, handleSwitchTheme } = useTheme()

  return (
    <Space
      style={{
        width: '100%',
        padding: '6px 12px',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${
          isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'
        }`,
        backgroundColor: isDarkMode ? 'rgb(36,37,38)' : 'white',
      }}
    >
      <Space>
        <Button
          type="text"
          href="/"
          style={{
            fontSize: '18px',
            fontWeight: 700,
            margin: 0,
            padding: 0,
            height: '100%',
          }}
        >
          Bookstore
        </Button>
      </Space>
      <Space>
        <Switch checked={isDarkMode} onChange={handleSwitchTheme} />
        <Text
          style={{
            fontSize: '14px',
            fontWeight: 500,
            marginRight: '7px',
            // color: isDarkMode ? 'white' : 'black',
          }}
        >
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          {isDarkMode ? 'Dark' : 'Light'} mode
        </Text>
        <Avatar
          onClick={() => router.replace('/login')}
          icon={<FaUserAlt />}
          style={{ cursor: 'pointer' }}
        />
        <Text style={{ fontSize: '14px', fontWeight: 500 }}>Tien Anh Luu</Text>
      </Space>
    </Space>
  )
}

export default Header
