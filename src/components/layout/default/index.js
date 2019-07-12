import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout, Menu, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { userLogout } from 'src/redux/actions/authAction'
import { clearUserInfo } from 'src/redux/actions/generalAction.js'
import { get as _get } from 'lodash'
import Router from 'next/router'
import slug from 'src/routes'
import hocProtectLogin from 'src/hoc/is-authenticated'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

const LayoutWrapper = styled.div`
  .ant-menu-submenu-selected {
    background: #52c41a;
  }
  .ant-menu-submenu-open {
    color: #fff !important;
  }
`

@connect(
  state => ({
    FirstName: _get(state, 'GeneralStore.userInfo.FirstName', ''),
    LastName: _get(state, 'GeneralStore.userInfo.LastName', ''),
    isAuthenticated: _get(state, 'AuthStore.isAuthenticated')
  }),
  {
    userLogout,
    clearUserInfo
  }
)
@hocProtectLogin
class AppWithLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    userLogout: PropTypes.func,
    clearUserInfo: PropTypes.func,
    isAuthenticated: PropTypes.bool
  }

  hanldeChangeMenu = slugValue => {
    Router.replace(slugValue)
  }
  render() {
    const { children, FirstName, LastName } = this.props
    return (
      <LayoutWrapper className='page-wrapper'>
        <Head>
          <title>Quản lý nguồn thải</title>
        </Head>

        <Layout>
          <div
            style={{
              position: 'fixed',
              paddingLeft: '16px',
              background: '#fff',
              width: '100%',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              zIndex: 1
            }}
          >
            <img style={{ width: '30px', height: '30px', marginRight: '8px' }} src='/static/images/logo.png' />
            <h2 style={{ margin: '0px' }}>Quản lý cơ sở dữ liệu Hồ Chí Minh</h2>
            <div style={{ height: 'auto', position: 'fixed', right: '32px' }}>
              <span style={{ paddingRight: '4px' }}>{`${FirstName}.${LastName}`}</span>
              <a
                onClick={() => {
                  Router.replace(slug.login)
                  this.props.userLogout()
                  this.props.clearUserInfo()
                }}
              >
                Thoát
              </a>
            </div>
          </div>
          <Header style={{ height: '46px', position: 'fixed', zIndex: 1, width: '100%', top: '40px' }}>
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
              <Menu.Item key='1' onClick={() => this.hanldeChangeMenu(slug.basic)}>
                Thông tin Cơ sở
              </Menu.Item>
              <SubMenu key='sub2' title='Thông tin Môi trường'>
                <Menu.Item key='sub2_1'>Option 5</Menu.Item>
                <Menu.Item key='sub2_2'>Option 6</Menu.Item>
              </SubMenu>
              <Menu.Item key='3'>Báo cáo giám sát môi trường</Menu.Item>
              <Menu.Item key='4'>Báo cáo quản lý chất thải rắn</Menu.Item>
              <Menu.Item key='5'>Thanh tra/Kiểm tra</Menu.Item>
              <Menu.Item key='6'>Thu phí</Menu.Item>

              <Menu.Item key='7' onClick={() => this.hanldeChangeMenu('/manager')}>
                Quản lý
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 32px', heigth: '1', marginTop: 86 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Báo cáo đánh giá tác động môi trường</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', display: 'flex', flex: 1, padding: '16px 16px', minHeight: '75vh' }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </LayoutWrapper>
    )
  }
}

export default AppWithLayout
