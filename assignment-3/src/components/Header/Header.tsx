import { Space, Typography, Switch, Avatar } from 'antd';

import { HeaderProps } from './Header.types';

const { Text, Title } = Typography;

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
        <Title
          style={{
            fontSize: '18px',
            fontWeight: 700,
            margin: 0,
          }}
        >
          Bookstore
        </Title>
      </Space>
      <Space>
        <Switch checked={isDarkMode} onChange={handleSwitchTheme} />
        <Text style={{ fontSize: '14px', fontWeight: 500, marginRight: '7px' }}>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          {isDarkMode ? 'Dark' : 'Light'} mode
        </Text>
        <Avatar
          icon={
            /* eslint-disable-next-line   react/jsx-wrap-multilines */
            <i
              style={{ width: '18px', height: '18px' }}
              className="fa-solid fa-user"
            />
          }
        />
        <Text style={{ fontSize: '14px', fontWeight: 500 }}>Tien Anh Luu</Text>
      </Space>
    </Space>
  );
};

export default Header;
