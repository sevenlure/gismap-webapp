import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout, Menu, Icon, Divider, Button, Drawer, Modal } from 'antd'
import { connect } from 'react-redux'
import { userLogout } from 'src/redux/actions/authAction'
import {
  getListTourPopular,
  getListPromotion,
  getListTypeSeat,
  getListTimeSlot,
  isListTourPopular,
  isLoadedDanhMuc,
  getListDeparture,
  setVisibleRegister,
  setVisibleLogin
} from 'src/redux/actions/generalAction.js'
import { get as _get } from 'lodash-es'
import Router, { withRouter } from 'next/router'
import slug from 'src/routes'
import Login from 'src/containers/login'
import Register from 'src/containers/register'
import windowSize from 'react-window-size'
import AvatarUser from 'src/containers/auth/avatar-user'

const { Header, Content, Footer } = Layout
// const { SubMenu } = Menu

const LayoutWrapper = styled.div`
  .ant-menu-root {
    ${props => (props.windowWidth < 980 ? 'display: block;' : '')}
    ${props => (props.windowWidth < 980 ? 'align-items: center;' : '')}
  }

  .menu-lg {
    ${props => (props.windowWidth < 980 ? 'display: none;' : '')}
  }

  .menu-mobile {
    font-family: myFont-Medium;
    ${props => (props.windowWidth < 980 ? '' : 'display: none;')}
  }

  .ant-layout-header {
    padding: 0 24px 0 24px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.08);
  }

  .ant-menu-item button span {
    font-size: 1rem;
    font-family: myFont-Medium;
  }

  .ant-menu-submenu-selected {
    background: #52c41a;
  }
  .ant-menu-submenu-open {
    color: #fff !important;
  }
  .ant-menu-horizontal {
    line-height: 67px;
    font-family: myFont-Medium;
  }

  .ant-drawer-body {
    padding: 0;
  }
`

const ChildrenContainer = styled.div`
  background: #f2f3f7;
  display: flex;
  flex: 1 1 0%;
  margin-top: 70px;
  min-height: 80vh;
  > * {
    width: 100%;
  }
`

@connect(
  state => ({
    isAuthenticated: _get(state, 'AuthStore.isAuthenticated'),
    name: _get(state, 'GeneralStore.userInfo.name', ''),
    // menuSelected: _get(state, 'GeneralStore.menuSelected'),
    isRegister: _get(state, 'GeneralStore.isRegister'),
    isLogin: _get(state, 'GeneralStore.isLogin')
  }),
  {
    userLogout,
    getListTourPopular,
    getListPromotion,
    getListTypeSeat,
    getListTimeSlot,
    getListDeparture,
    isListTourPopular,
    isLoadedDanhMuc,
    setVisibleRegister,
    setVisibleLogin
  }
)
// @hocProtectLogin
@windowSize
class AppWithLayout extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    clearUserInfo: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    router: PropTypes.any,
    userLogout: PropTypes.func,
    getListTourPopular: PropTypes.func,
    getListPromotion: PropTypes.func,
    getListDeparture: PropTypes.func,
    isListTourPopular: PropTypes.func,
    isLoadedDanhMuc: PropTypes.func,
    getListTypeSeat: PropTypes.func,
    getListTimeSlot: PropTypes.func,
    setVisibleRegister: PropTypes.func,
    setVisibleLogin: PropTypes.func,
    windowWidth: PropTypes.number,
    isRegister: PropTypes.bool,
    isLogin: PropTypes.bool
  }

  state = {
    isOnDrawer: false
  }

  componentDidMount = async () => {
    // console.log('componentDidMount Layout')
    this.props.isLoadedDanhMuc(false)
    this.props.isListTourPopular(false)
    await Promise.all([
      this.props.getListTourPopular(),
      this.props.getListTypeSeat(),
      this.props.getListTimeSlot(),
      this.props.getListDeparture(),
      this.props.getListPromotion()
    ])
      .then(() => {
        this.props.isLoadedDanhMuc(true)
        this.props.isListTourPopular(true)
      })
      .catch(e => {
        console.log(e, 'e')
      })
    try {
      /* eslint-disable */
      new SimpleBar(document.body)
      /* eslint-enable */
    } catch (e) {
      console.log('error SimpleBar', e)
    }
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

  hanldeLogin = () => {
    this.props.setVisibleLogin(true)
    this.props.setVisibleRegister(false)
    // this.setState({
    //   isRegister: false,
    //   isLogin: true
    // })
  }

  hanldeRegister = () => {
    console.log('hanldeRegister')
    this.props.setVisibleLogin(false)
    this.props.setVisibleRegister(true)
    // this.setState({
    //   isRegister: true,
    //   isLogin: false
    // })
  }

  getStyleReponsive = () => {
    const { windowWidth } = this.props
    let style
    if (windowWidth >= 992) {
      style = {
        // width: '70vw',
        bodyStyle: {
          padding: '30px 70px'
        }
      }
    } else if (windowWidth >= 576) {
      style = {
        // width: '70vw',
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
    if (this.state.isOnDrawer && nextProps.windowWidth > 980) {
      this.setState({ isOnDrawer: false })
    }
  }

  handleOnSucces = status => {
    this.props.setVisibleRegister(false)
    // this.setState({
    //   isRegister: false
    // })
    if (status) {
      Router.replace(slug.result.base)
    } else {
      Router.replace(slug.result.registerError)
    }
  }

  handleOnSubmitLogin = value => {
    // console.log('value --- ', value)
    const res = {
      success: true,
      data: {
        ...value
      }
    }
    if (res.success) {
      this.props.setVisibleLogin(false)
      // this.setState({
      //   isLogin: false
      // })
    }
  }

  handleOnRegister = () => {
    this.hanldeRegister()
  }
  handleOnForgetPass = () => {
    // console.log('handleOnForgetPass')
    this.props.setVisibleLogin(false)
    // this.setState({
    //   isLogin: false
    // })
    Router.push(slug.auth.forgot_password)
  }

  render() {
    // console.log(this.props.isRegister, 'isRegister')
    let pathMenu = ''
    const pathname = this.props.router.pathname
    pathMenu = this.getPathForMenu(pathname)

    const { children, windowWidth, isAuthenticated, name } = this.props
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
              zIndex: 11,
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
                fontSize: '1rem',
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
              <Menu.Item style={{ padding: 0, float: 'left' }} key='blankIcon'>
                <Icon
                  className='menu-mobile'
                  type='unordered-list'
                  style={{ fontSize: '1.5rem', color: '#1890ff' }}
                  onClick={() => {
                    this.setState({
                      isOnDrawer: true
                    })
                  }}
                />
              </Menu.Item>
              <Menu.Item className='menu-lg' key={slug.basic}>
                Tìm vé xe
              </Menu.Item>
              <Menu.Item className='menu-lg' key={slug.promotion.base}>
                Khuyến mãi
              </Menu.Item>
              <Menu.Item className='menu-lg' key={slug.booking.base}>
                Lịch trình - Giá vé
              </Menu.Item>
              <Menu.Item className='menu-lg' key={slug.about.base}>
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
              {!isAuthenticated && [
                <Menu.Item key='blankLogin' onClick={this.hanldeLogin}>
                  Đăng nhập
                </Menu.Item>,
                <Menu.Item style={{ padding: 0 }} key='blankRegister'>
                  <Button style={{ padding: '0 25px' }} size='large' onClick={this.hanldeRegister} type='primary'>
                    Đăng ký
                  </Button>
                </Menu.Item>
              ]}
              {isAuthenticated && [
                <Menu.Item
                  style={{
                    padding: 0,
                    marginRight: 16,
                    marginLeft: 20,
                    borderBottom: 'none',
                    cursor: 'inherit',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: 100
                  }}
                  key='blankName'
                >
                  <strong style={{ color: '#4c4c4c' }}>{name}</strong>
                </Menu.Item>,
                <Menu.Item style={{ padding: 0 }} key='blankUser'>
                  <AvatarUser />
                </Menu.Item>
              ]}
            </Menu>
            <Modal
              visible={this.props.isRegister}
              footer={null}
              centered
              closeIcon={<span />}
              onCancel={
                () => this.props.setVisibleRegister(false)
                // this.setState({ isRegister: false })
              }
              // wrapClassName='register--modal'
              closable={false}
              {...this.getStyleReponsive()}
              width='100%'
              style={{
                padding: windowWidth > 576 ? 24 : 12,
                maxWidth: 680
              }}
            >
              <Register
                onSuccess={this.handleOnSucces}
                isClearData={this.props.isRegister}
                onLogin={this.hanldeLogin}
                handleCancel={() => {
                  this.props.setVisibleRegister(false)
                  // this.setState({
                  //   isRegister: false
                  // })
                }}
              />
            </Modal>
            <Modal
              visible={this.props.isLogin}
              footer={null}
              centered
              closeIcon={<span />}
              onCancel={
                () => this.props.setVisibleLogin(false)
                // this.setState({ isLogin: false })
              }
              // wrapClassName='register--modal'
              closable={false}
              {...this.getStyleReponsive()}
              width='100%'
              style={{
                padding: windowWidth > 576 ? 24 : 12,
                maxWidth: 680
              }}
            >
              <Login
                onRegister={this.handleOnRegister}
                onForgotPass={this.handleOnForgetPass}
                onCancel={() => {
                  this.props.setVisibleLogin(false)
                  // this.setState({
                  //   isLogin: false
                  // })
                }}
              />
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
                  fontSize: '1rem',
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
                <Menu.Item className='menu-mobile' key={slug.booking.base}>
                  Lịch trình - Giá vé
                </Menu.Item>
                <Menu.Item className='menu-mobile' key={slug.about.base}>
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
              fontSize: '1rem',
              fontWeight: 300,
              fontFamily: 'HelveticaNeue-Light',
              backgounrColor: '#fff',
              zIndex: 9,
              backgroundColor: '#fff',
              boxShadow: '0 -1px 4px 0 rgba(0, 0, 0, 0.1)'
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
