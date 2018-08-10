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
      <Content>
        <div>
          <Top/>
          <Main/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {/* Will turn these into links*/}
        Made by Nicholas Lewanowicz and Contributors
      </Footer>
    </Layout>
  </Layout>
)