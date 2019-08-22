import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout, Menu, Icon, Divider, Button, Drawer } from 'antd'
import { connect } from 'react-redux'
import { userLogout } from 'src/redux/actions/authAction'
import { clearUserInfo } from 'src/redux/actions/generalAction.js'
import { get as _get } from 'lodash-es'
import Router, { withRouter } from 'next/router'
import slug from 'src/routes'
// import hocProtectLogin from 'src/hoc/is-authenticated'
// import posed from 'react-pose'
// import { isEqual as _isEqual } from 'lodash-es'
// import Link from 'next/link'
// import { COLOR } from 'src/constant/theme'
import { Modal } from 'antd'
import Register from 'src/containers/register'
import windowSize from 'react-window-size'
// import ModalChangePassword from 'src/containers/user/modalChangePassword'

const { Header, Content, Footer } = Layout
// const { SubMenu } = Menu

const LayoutWrapper = styled.div`
  .ant-menu-root {
    ${props => (props.windowWidth < 900 ? 'display: block;' : '')}
    ${props => (props.windowWidth < 900 ? 'align-items: center;' : '')}
  }

  .menu-lg {
    ${props => (props.windowWidth < 900 ? 'display: none;' : '')}
  }

  .menu-mobile {
    ${props => (props.windowWidth < 900 ? '' : 'display: none;')}
  }

  .ant-layout-header {
    padding: 0 24px 0 24px;
  }

  .ant-menu-submenu-selected {
    background: #52c41a;
  }
  .ant-menu-submenu-open {
    color: #fff !important;
  }
  .ant-menu-horizontal {
    line-height: 67px;
    font-family: HelveticaNeue-Medium;
  }

  .ant-drawer-body {
    padding: 0;
  }
`

const ChildrenContainer = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex: 1 1 0%;
  min-height: 75vh;
  > * {
    width: 100%;
  }
`

@connect(
  state => ({
    FirstName: _get(state, 'GeneralStore.userInfo.FirstName', ''),
    LastName: _get(state, 'GeneralStore.userInfo.LastName', ''),
    isAuthenticated: _get(state, 'AuthStore.isAuthenticated'),
    token: _get(state, 'AuthStore.token'),
    menuSelected: _get(state, 'GeneralStore.menuSelected'),
    breadcrumbArr: _get(state, 'GeneralStore.breadcrumb')
  }),
  {
    userLogout,
    clearUserInfo
  }
)
// @hocProtectLogin
@windowSize
class AppWithLayout extends React.Component {
  static propTypes = {
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    breadcrumbArr: PropTypes.array.isRequired,
    children: PropTypes.node,
    clearUserInfo: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    router: PropTypes.any,
    userLogout: PropTypes.func,
    windowWidth: PropTypes.number
  }

  state = {
    isOnDrawer: false,
    isRegister: false
  }

  componentDidMount = () => {
    // console.log('componentDidMount Layout')
    Promise.all([]).then(() => {})
  }
  hanldeChangeMenu = ({ key }) => {
    if (!key || key.includes('blank')) return
    Router.push(key)
  }

  getPathForMenu(path) {
    let result = ''

    let tampArr = path.split('/')

    if (path.includes('ttmoitruong') || path.includes('manager')) {
      result = '/' + tampArr[1] + '/' + tampArr[2]
    } else result = '/' + tampArr[1]

    return result
  }

  hanldeRegister = () => {
    this.setState({
      isRegister: true
    })
  }

  getStyleReponsive = () => {
    const { windowWidth } = this.props
    let style
    if (windowWidth >= 992) {
      style = {
        width: 968,
        bodyStyle: {
          padding: '30px 70px'
        }
      }
    } else if (windowWidth >= 576) {
      style = {
        width: 500,
        bodyStyle: {
          padding: '30px 70px'
        }
      }
    } else if (windowWidth < 576) {
      style = {}
    }
    return {
      ...style
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isOnDrawer && nextProps.windowWidth > 900) {
      this.setState({ isOnDrawer: false })
    }
  }

  render() {
    let pathMenu = ''
    const pathname = this.props.router.pathname
    pathMenu = this.getPathForMenu(pathname)

    const { children, windowWidth } = this.props
    return (
      <LayoutWrapper windowWidth={windowWidth}>
        <Head>
          <title>Travel</title>
        </Head>

        <Layout>
          <Header
            style={{
              height: '70px',
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              top: '0px',
              background: '#fff',
              paddingRight: 24
            }}
          >
            <Menu
              style={{
                color: '#9ea7d0',
                fontWeight: 500,
                fontSize: 16,
                textAlign: 'right',
                height: 70,
                borderBottom: 'none'
              }}
              theme='light'
              mode='horizontal'
              defaultSelectedKeys={[slug.basic]}
              selectedKeys={[pathMenu]}
              onClick={this.hanldeChangeMenu}
            >
              <Menu.Item className='menu-lg' key={slug.basic}>
                Tìm vé xe
              </Menu.Item>
              <Menu.Item className='menu-lg' key={slug.promotion.base}>
                Khuyến mãi
              </Menu.Item>
              <Menu.Item className='menu-lg' key={slug.infoTour.base}>
                Lịch trình - Giá vé
              </Menu.Item>
              <Menu.Item className='menu-lg' key={slug.introduce.base}>
                Giới thiệu
              </Menu.Item>
              <Menu.Item className='menu-lg' key={slug.contact.base}>
                Liên hệ
              </Menu.Item>
              <Menu.Item style={{ padding: 0 }} className='menu-lg' key='blank'>
                <Divider
                  key='blank'
                  className='menu-lg'
                  type='vertical'
                  style={{
                    height: 28,
                    color: 'rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.08)'
                  }}
                />
              </Menu.Item>

              <Menu.Item key={slug.login}>Đăng nhập</Menu.Item>
              <Menu.Item style={{ padding: 0 }} key='blankRegister'>
                <Button style={{ padding: '0 20px' }} onClick={this.hanldeRegister} type='primary'>
                  Đăng ký
                </Button>
              </Menu.Item>
              <Menu.Item style={{ padding: 0, float: 'left' }} key='blankIcon'>
                <Icon
                  className='menu-mobile'
                  type='unordered-list'
                  style={{ fontSize: 24, color: '#1890ff' }}
                  onClick={() => {
                    this.setState({
                      isOnDrawer: true
                    })
                  }}
                />
              </Menu.Item>
            </Menu>
            <Modal
              title={<h2 style={{ marginBottom: 0 }}>Đăng ký tài khoản</h2>}
              visible={this.state.isRegister}
              footer={null}
              destroyOnClose={true}
              // onOk={this.handleOk}
              {...this.getStyleReponsive()}
            >
              <Register />
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '20px',
                  zIndex: 10
                }}
              >
                <Button
                  onClick={() => {
                    this.setState({
                      isRegister: false
                    })
                  }}
                >
                  Đóng
                </Button>
              </div>
            </Modal>
            <Drawer
              title='Travel'
              placement='left'
              bodyStyle={{ padding: 0 }}
              closable={false}
              onClose={() => {
                this.setState({
                  isOnDrawer: false
                })
              }}
              visible={this.state.isOnDrawer}
            >
              <Menu
                style={{
                  color: '#9ea7d0',
                  fontWeight: 500,
                  fontSize: 16,
                  height: 70,
                  borderBottom: 'none'
                }}
                mode='inline'
                defaultSelectedKeys={[slug.basic]}
                selectedKeys={[pathMenu]}
                onClick={this.hanldeChangeMenu}
              >
                <Menu.Item className='menu-mobile' key={slug.basic}>
                  Tìm vé xe
                </Menu.Item>
                <Menu.Item className='menu-mobile' key={slug.promotion.base}>
                  Khuyến mãi
                </Menu.Item>
                <Menu.Item className='menu-mobile' key={slug.infoTour.base}>
                  Lịch trình - Giá vé
                </Menu.Item>
                <Menu.Item className='menu-mobile' key={slug.introduce.base}>
                  Giới thiệu
                </Menu.Item>
                <Menu.Item className='menu-mobile' key={slug.contact.base}>
                  Liên hệ
                </Menu.Item>
              </Menu>
            </Drawer>
          </Header>
          <Content>
            <ChildrenContainer>{children}</ChildrenContainer>
          </Content>
          <Footer
            style={{
              textAlign: 'left',
              padding: '27px 24px',
              fontSize: 16,
              fontWeight: 300,
              fontFamily: 'HelveticaNeue-Light',
              backgounrColor: '#fff'
            }}
          >
            <span>@ 2019 Travel. All rights reserved</span>
          </Footer>
        </Layout>
      </LayoutWrapper>
    )
  }
}

export default withRouter(AppWithLayout)
