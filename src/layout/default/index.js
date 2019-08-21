import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import {
  Layout,
  Menu,
  // , Breadcrumb, Avatar, Dropdown, Icon
  Divider,
  Button
} from 'antd'
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
    windowWidth: PropTypes.any,
    router: PropTypes.any
  }

  state = {
    isRegister: false
  }

  componentDidMount = () => {
    console.log('componentDidMount Layout')
    Promise.all([]).then(() => {})
  }
  hanldeChangeMenu = ({ key }) => {
    if (!key) return
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

  render() {
    let pathMenu = ''
    const pathname = this.props.router.pathname
    pathMenu = this.getPathForMenu(pathname)

    // console.log('pathMenu', pathMenu)

    const { children } = this.props
    return (
      <LayoutWrapper>
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
              <Menu.Item key={slug.basic}>Tìm vé xe</Menu.Item>
              <Menu.Item key={slug.promotion.base}>Khuyến mãi</Menu.Item>
              <Menu.Item key={slug.infoTour.base}>Lịch trình - Giá vé</Menu.Item>
              <Menu.Item key={slug.introduce.base}>Giới thiệu</Menu.Item>
              <Menu.Item key={slug.contact.base}>Liên hệ</Menu.Item>
              <Divider
                type='vertical'
                style={{
                  height: 28,
                  color: 'rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.08)'
                }}
              />
              <Menu.Item key={slug.login}>Đăng nhập</Menu.Item>
              <Button onClick={this.hanldeRegister} type='primary'>
                Đăng ký
              </Button>
            </Menu>
            <Modal
              title='Đăng ký tài khoản'
              visible={this.state.isRegister}
              footer={null}
              // closeIcon={<Button>Đóng</Button>}
              destroyOnClose={true}
              // onOk={this.handleOk}
              onCancel={() => {
                this.setState({
                  isRegister: false
                })
              }}
              {...this.getStyleReponsive()}
            >
              <Register />
            </Modal>
          </Header>
          <Content>
            {/* <BoxAnimateBreadcrumb breadcrumbArr={this.props.breadcrumbArr} /> */}

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
