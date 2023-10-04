import { Space, Typography, Switch, Avatar, Button } from 'antd'
import { FaUserAlt } from 'react-icons/fa'
import { HeaderProps } from '../_types/Header.types'

const { Text } = Typography

const Header = ({ isDarkMode, handleSwitchTheme }: HeaderProps) => {
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
            // color: isDarkMode ? 'white' : 'black',
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
        <Avatar icon={<FaUserAlt />} />
        <Text style={{ fontSize: '14px', fontWeight: 500 }}>Tien Anh Luu</Text>
      </Space>
    </Space>
  )
}

export default Header
