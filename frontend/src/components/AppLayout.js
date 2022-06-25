
import 'antd/dist/antd.css';
import { FileOutlined, PieChartOutlined, UserOutlined,DesktopOutlined, MenuFoldOutlined,
  MenuUnfoldOutlined, } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children,link) {
  return {
    key,
    icon,
    children,
    label,
    link
  };
}

const items = [
  getItem('Dashboard', '1', <PieChartOutlined />,'/dashboard'),
  getItem('Tenant', '2', <DesktopOutlined />,'/tenant'),
  getItem('User', 'sub1', <UserOutlined />, '/user',[
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Rental ', 'sub2', <PieChartOutlined />,'/rental', [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />,'/files'),
];



const AppLayout = ({children}) => {
  const {pathname} = useLocation();
  console.log('pathname', pathname);

    const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="h-screen"
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="bg-red-400 h-8 m-4" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  >
          {items.map((item) => (
            <Menu.Item key={item.key} title={item.label} icon={item.icon}>
              <NavLink to={`${item.children}`}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
         {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'p-4 text-2xl hover:text-red-400',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {/* <Breadcrumb.Item>{pathname==='/' ? "DashBoard" : {pathname}}</Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout