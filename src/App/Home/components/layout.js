import React from 'react'
import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;


export default ({ Sidebar, Main, Top, isCollapsed }) => (
  <Layout style={{ minHeight: '100VH' }} >
    <Sider
      collapsedWidth='0'
      trigger={null}
      collapsible
      collapsed={isCollapsed}>
      <Sidebar/>
    </Sider>
    <Layout>
      <Content className='bg-white-50'>
        <div>
          <Top/>
          <div className='bg-white shadow-3 vh-75 br2 mh2 mt2'><Main/></div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Made by Nicholas Lewanowicz and Contributors
      </Footer>
    </Layout>
  </Layout>
)