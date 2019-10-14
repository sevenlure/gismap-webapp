import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout, Menu, Icon, Breadcrumb } from 'antd'
import hocProtectLogin from 'src/hoc/is-authenticated'
import { connect } from 'react-redux'
import { updateKeyPath, updateSubMenu } from 'src/redux/actions/generalAction'
import pathLogo from 'icons/index.js'
import { get as _get, map as _map, last as _last, isEqual as _isEqual } from 'lodash-es'
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

    .header--right {
      padding-left: 24px;
    }
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
    isAuthenticated: _get(state, 'AuthStore.isAuthenticated', false),
    token: _get(state, 'AuthStore.token', null),
    subMenu: _get(state, 'GeneralStore.menu.subMenu', []),
    keyPath: _get(state, 'GeneralStore.menu.keyPath', []),
    breadcrumb: _get(state, 'GeneralStore.menu.breadcrumb', [])
  }),
  { updateKeyPath, updateSubMenu }
)
@hocProtectLogin
@windowSize
class AppWithLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    windowWidth: PropTypes.number,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    updateKeyPath: PropTypes.func,
    updateSubMenu: PropTypes.func,
    subMenu: PropTypes.array,
    keyPath: PropTypes.array,
    breadcrumb: PropTypes.array
  }

  state = {
    isLoaded: false,
    collapsed: false,
    broken: false,
    pageName: ''
  }

  onCollapse = collapsed => {
    // console.log(collapsed)
    this.setState({ collapsed })
  }
  componentDidMount = () => {
    const { isAuthenticated } = this.props
    if (!isAuthenticated) {
      Router.push(slug.login)
    } else {
      this.changePageName()
    }
  }

  componentDidUpdate = prevProps => {
    if (!_isEqual(prevProps.breadcrumb, this.props.breadcrumb)) {
      this.changePageName()
    }
  }

  changePageName = () => {
    const item = _last(this.props.breadcrumb)
    // console.log(item, '------item----')
    this.setState({
      pageName: item ? item.name : 'Trang chủ'
    })
  }

  hanldeOnSelect = ({ keyPath }) => {
    this.props.updateKeyPath(keyPath)
    Router.push(keyPath[0])
  }

  handleOnOpenChange = openKeys => {
    this.props.updateSubMenu(openKeys)
  }

  render() {
    const { children, windowWidth, isAuthenticated, subMenu, keyPath } = this.props
    console.log(keyPath, 'keyPath')
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
            width={250}
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
            <Menu
              theme='dark'
              openKeys={subMenu}
              selectedKeys={keyPath}
              mode='inline'
              onSelect={this.hanldeOnSelect}
              onOpenChange={this.handleOnOpenChange}
            >
              <Menu.Item key={slug.basic}>
                <Icon type='home' />
                <span>Trang chủ</span>
              </Menu.Item>
              <SubMenu
                key={slug.manager.basic}
                title={
                  <span>
                    <Icon type='user' />
                    <span>Thông tin công ty</span>
                  </span>
                }
              >
                <Menu.Item key={slug.manager.policy.base}>Chính sách công ty</Menu.Item>
                <Menu.Item key={slug.manager.department.base}>Phòng ban</Menu.Item>
                <Menu.Item key={slug.manager.user.base}>Nhân sự</Menu.Item>
                <Menu.Item key={slug.manager.organization.base}>Sơ đồ tổ chức</Menu.Item>
              </SubMenu>
              <Menu.Item key={slug.project.base}>
                <Icon type='bank' />
                <span>Dự án bất động sản</span>
              </Menu.Item>
              <Menu.Item key={slug.report.base}>
                <Icon type='area-chart' />
                <span>Thống kê báo cáo</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className='header' style={{}}>
              <div className='header--right'>
                <h2>{this.state.pageName}</h2>
              </div>
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
                <Breadcrumb.Item>
                  <a
                    href='#'
                    onClick={e => {
                      e.preventDefault()
                      this.hanldeOnSelect({
                        keyPath: [slug.basic]
                      })
                    }}
                  >
                    Trang chủ
                  </a>
                </Breadcrumb.Item>

                {this.props.breadcrumb &&
                  _map(this.props.breadcrumb, (item, index) => {
                    if (index < this.props.breadcrumb.length - 1) {
                      return (
                        <Breadcrumb.Item key={index}>
                          <a
                            href='#'
                            onClick={e => {
                              e.preventDefault()
                              this.hanldeOnSelect({
                                keyPath: [item.slug]
                              })
                            }}
                          >
                            {item.name}
                          </a>
                        </Breadcrumb.Item>
                      )
                    } else {
                      return <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>
                    }
                  })}
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2019 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </LayoutWrapper>
    )
  }
}

export default withRouter(AppWithLayout)
