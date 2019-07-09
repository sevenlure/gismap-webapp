import React from 'react'
import styled from 'styled-components'
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout

const LayoutWrapper = styled.div`
    
    

`

export default class AppWithLayout extends React.Component {
    
  render() {
    const { children } = this.props
    return (
      <LayoutWrapper className="page-wrapper">
        <Layout>
          <Header style={{  height: '46px', position: 'fixed', zIndex: 1, width: '100%' }}>
            {/* <div className="logo" /> */}
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}> */}
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ background: '#fff', 'display':'flex', 'flex':1 }}>
            {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </LayoutWrapper>
    )
  }
}
