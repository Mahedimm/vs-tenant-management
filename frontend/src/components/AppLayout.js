
import 'antd/dist/antd.css';

import { FileOutlined, PieChartOutlined, UserOutlined,AuditOutlined, MenuFoldOutlined,
  MenuUnfoldOutlined, TeamOutlined, ApartmentOutlined, DashboardOutlined} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu,Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { logOut, changePassword } from '../redux/authentication/actionCreator';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function getItem(label, key, icon, children,subMenu) {
  return {
    key,
    icon,
    children,
    label,
  subMenu
  };
}

const items = [
  getItem('Dashboard', '1', <DashboardOutlined />,'/dashboard'),
  getItem('Landlord','sub1', <AuditOutlined />,'/landlord',[
    getItem("Tenant",'2',<TeamOutlined />,"/landlord/tenant"),
    getItem("Flat", '3',<ApartmentOutlined />,"/landlord/flat"),

]),
  getItem('Management', 'sub2', <UserOutlined />, '/user',[
    getItem("User",'4',<UserOutlined />,"/user"),
    getItem("Role", '5',<FileOutlined />,"/role"),
  ]),
  getItem('Rental ', 'sub3', <PieChartOutlined />,'/rental', [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />,'/files'),
];



const AppLayout = ({children}) => {
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  console.log('pathname', pathname);
  console.log(items);

  const SignOut = e => {
    e.preventDefault();
    dispatch(logOut());
};
const [screenSize,setScreenSize] = useState(undefined);

useEffect(() => {

  const isWindow = typeof window !== 'undefined';
  if (isWindow) {
  const handleResize = () => setScreenSize(window.innerWidth);

  window.addEventListener('resize', handleResize);

  handleResize();

  return () => window.removeEventListener('resize', handleResize);
  }
}, []);

useEffect(() => {
  if (screenSize <= 900) {
    setCollapsed(true);
  } else {
    setCollapsed(false);
  }
}, [screenSize]);

    const [collapsed, setCollapsed] = useState(true);
 

 
  return (
    <Layout className="h-screen"
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
       className="w-32"
      >
       <NavLink to="/" className="text-white">
          <h1 className='text-white bg-red-500 rounded-full p-2  cursor-pointer shadow-md w-10 h-10 m-auto my-4 text-center '> TM </h1>
        </NavLink>

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  >
          {items.map((item) => (
            item.subMenu ? 
              <SubMenu title={item.label} key={item.key} icon={item.icon}>{
              item.subMenu.map((submenu)=>(
              <Menu.Item key={submenu.key} title={submenu.label} icon={submenu.icon} >
                 <NavLink to={`${submenu.children}`}>{submenu.label}</NavLink>
             </Menu.Item>
             ))}
            </SubMenu>
           : 
            <Menu.Item key={item.key} title={item.label} icon={item.icon}> 
              <NavLink to={`${item.children}`}>{item.label}</NavLink>
            </Menu.Item>
            ))}
          
         
          
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background flex justify-between  items-center "
          style={{
            padding: 10,
          }}
        >
         {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: ' text-2xl hover:text-red-400',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Button onClick={SignOut}>logOut</Button>
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