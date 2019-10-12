import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout, Menu, Icon, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import pathLogo from 'icons/index.js'
import { get as _get } from 'lodash-es'
import { withRouter } from 'next/router'
import windowSize from 'react-window-size'
import AvatarUser from 'src/containers/auth/avatar-user'
import Router from 'next/router'
import slug from 'src/routes'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const LayoutWrapper = styled.div`
  display: flex;
  flex: 1;

  .sider-menu-logo {
    position: relative;
    height: 64px;
    padding-left: 24px;
    overflow: hidden;
    line-height: 64px;
    background: #001529;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;

    h1 {
      color: white;
      margin: 0px;
      padding-left: 8px;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 0;

    .header--left {
      display: flex;
      align-items: center;
      .ant-menu-horizontal {
        border-bottom: none;
      }
      .ant-menu-item ant-menu-item-selected {
        border-bottom: none;
      }
    }
  }
`

@connect(
  state => ({
    isAuthenticated: _get(state, 'AuthStore.isAuthenticated', false)
  }),
  {}
)
// @hocProtectLogin
@windowSize
class AppWithLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    windowWidth: PropTypes.number,
    isAuthenticated: PropTypes.bool
  }

  state = {
    isLoaded: false,
    collapsed: false,
    broken: false
  }

  onCollapse = collapsed => {
    // console.log(collapsed)
    this.setState({ collapsed })
  }
  componentDidMount = () => {
    const { isAuthenticated } = this.props
    if (!isAuthenticated) {
      Router.push(slug.login)
    }
  }

  render() {
    // console.log(this.props.isRegister, 'isRegister')
    const { children, windowWidth, isAuthenticated } = this.props

    // NOTE  moible
    const styleMobile = {
      // position: 'absolute',
      // display: 'block',
      // height: '100%'
    }
    return (
      <LayoutWrapper windowWidth={windowWidth}>
        <Head>
          <title>Bất động sản</title>
        </Head>

        <Layout>
          <Sider
            breakpoint='lg'
            collapsedWidth={this.state.broken ? '0' : '80'}
            onBreakpoint={broken => {
              this.setState({ broken })
            }}
            style={this.state.broken ? styleMobile : {}}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className='sider-menu-logo'>
              <Icon style={{ fontSize: '2rem' }} component={pathLogo.logo} />
              {!this.state.collapsed && <h1>Company</h1>}
            </div>
            <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
              <Menu.Item key='1'>
                <Icon type='pie-chart' />
                <span>Option 1</span>
              </Menu.Item>
              <Menu.Item key='2'>
                <Icon type='desktop' />
                <span>Option 2</span>
              </Menu.Item>
              <SubMenu
                key='sub2'
                title={
                  <span>
                    <Icon type='team' />
                    <span>Team</span>
                  </span>
                }
              >
                <Menu.Item key='6'>Team 1</Menu.Item>
                <Menu.Item key='8'>Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key='9'>
                <Icon type='file' />
                <span>File</span>
              </Menu.Item>
              <SubMenu
                key='sub1'
                title={
                  <span>
                    <Icon type='user' />
                    <span>Tài khoản</span>
                  </span>
                }
              >
                <Menu.Item key='3'>Danh sách</Menu.Item>
                <Menu.Item key='4'>Tạo tài khoản</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header className='header' style={{}}>
              <div className='header--right'></div>
              <div className='header--left'>
                {isAuthenticated && (
                  <div>
                    <AvatarUser />
                  </div>
                )}
              </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </LayoutWrapper>
    )
  }
}

export default withRouter(AppWithLayout)
