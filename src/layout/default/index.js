import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout, Menu, Icon, Breadcrumb, Avatar } from 'antd'
import hocProtectLogin from 'src/hoc/is-authenticated'
import { connect } from 'react-redux'
import {
  updateKeyPath,
  updateSubMenu,
  getDepartment,
  getListUser,
  isLoadedDanhMuc
} from 'src/redux/actions/generalAction'
// import pathLogo from 'icons/index.js'
import { get as _get, map as _map, last as _last, isEqual as _isEqual } from 'lodash-es'
import { withRouter } from 'next/router'
import windowSize from 'react-window-size'
import AvatarUser from 'src/containers/auth/avatar-user'
import Router from 'next/router'
import slug from 'src/routes'
import moment from 'moment'
import Ink from 'react-ink'

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
    breadcrumb: _get(state, 'GeneralStore.menu.breadcrumb', []),
    backgroundColor: _get(state, 'GeneralStore.them.backgroundColor', [])
  }),
  { updateKeyPath, updateSubMenu, getDepartment, getListUser, isLoadedDanhMuc }
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
    getDepartment: PropTypes.func,
    getListUser: PropTypes.func,
    isLoadedDanhMuc: PropTypes.func,
    subMenu: PropTypes.array,
    keyPath: PropTypes.array,
    breadcrumb: PropTypes.array,
    backgroundColor: PropTypes.string
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
  componentDidMount = async () => {
    const { isAuthenticated } = this.props
    if (!isAuthenticated) {
      Router.push(slug.login)
    } else {
      this.changePageName()
    }

    this.props.isLoadedDanhMuc(false)
    await Promise.all([this.props.getDepartment(), this.props.getListUser()])
      .then(() => {
        this.props.isLoadedDanhMuc(true)
      })
      .catch(e => {
        console.log(e, 'e')
      })
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
    // console.log(keyPath, 'keyPath')
    // NOTE  moible
    const styleMobile = {
      // position: 'absolute',
      // display: 'block',
      // height: '100%'
    }
    return (
      <LayoutWrapper windowWidth={windowWidth}>
        <Head>
          <title>Location Analytics</title>
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
              {/* <Icon style={{ fontSize: '2rem' }} component={pathLogo.logo} /> */}
              <Avatar src={'/static/images/logo.png'} size={40} />

              {!this.state.collapsed && <h1>PNRwork</h1>}
            </div>
            <Menu
              theme='dark'
              openKeys={subMenu}
              selectedKeys={keyPath}
              mode='inline'
              onSelect={this.hanldeOnSelect}
              onOpenChange={this.handleOnOpenChange}
            >
              <Menu.Item key={slug.home}>
                <Icon type='home' />
                <span>Trang chủ</span>
                <Ink
                  style={{
                    color: '#d35400',
                    background: true,
                    duration: 1000
                  }}
                />
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
                <Menu.Item key={slug.manager.policy.base}>
                  Chính sách công ty
                  <Ink
                    style={{
                      color: '#d35400',
                      background: true,
                      duration: 1000
                    }}
                  />
                </Menu.Item>
                <Menu.Item key={slug.manager.department.base}>
                  Phòng ban
                  <Ink
                    style={{
                      color: '#d35400',
                      background: true,
                      duration: 1000
                    }}
                  />
                </Menu.Item>
                <Menu.Item key={slug.manager.user.base}>
                  Nhân sự
                  <Ink
                    style={{
                      color: '#d35400',
                      background: true,
                      duration: 1000
                    }}
                  />
                </Menu.Item>
                <Menu.Item key={slug.manager.organization.base}>
                  Sơ đồ tổ chức
                  <Ink
                    style={{
                      color: '#d35400',
                      background: true,
                      duration: 1000
                    }}
                  />
                </Menu.Item>
              </SubMenu>
              <Menu.Item key={slug.project.base}>
                <Icon type='bank' />
                <span>Dự án bất động sản</span>
                <Ink
                  style={{
                    color: '#d35400',
                    background: true,
                    duration: 1000
                  }}
                />
              </Menu.Item>
              <Menu.Item key={slug.report.base}>
                <Icon type='area-chart' />

                <span>Thống kê báo cáo</span>
                <Ink
                  style={{
                    color: '#d35400',
                    background: true,
                    duration: 1000
                  }}
                />
              </Menu.Item>
              <Menu.Item key={slug.trip.base}>
                <Icon type='car' />
                <span>Chuyến công tác</span>
                <Ink
                  style={{
                    color: '#d35400',
                    background: true,
                    duration: 1000
                  }}
                />
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
              <div style={{ padding: 24, background: this.props.backgroundColor, minHeight: 360 }}>{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>PNR ©{moment().format('YYYY')} Created by G.I.S Team</Footer>
          </Layout>
        </Layout>
      </LayoutWrapper>
    )
  }
}

export default withRouter(AppWithLayout)
