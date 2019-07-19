import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout, Menu, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { userLogout } from 'src/redux/actions/authAction'
import {
  clearUserInfo,
  getDanhMucProvie,
  getDanhMucCoSoCapPhep,
  getDanhMucCoQuanThamQuyenQuanLy,
  getDanhMucDacTrungNuocThai,
  getDanhMucKhuCongNghiep,
  getDanhMucNganhNghe,
  getDanhMucNguonTiepNhan,
  getDanhMucTinhTrangHoatDong,
  setDanhMucIsLoaded,
  setDanhMucIsLoading
} from 'src/redux/actions/generalAction.js'
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

const ChildrenContainer = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex: 1 1 0%;
  padding: 16px;
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
    menuSelected: _get(state, 'GeneralStore.menuSelected')
  }),
  {
    userLogout,
    clearUserInfo,
    getDanhMucProvie,
    getDanhMucCoSoCapPhep,
    getDanhMucCoQuanThamQuyenQuanLy,
    getDanhMucDacTrungNuocThai,
    getDanhMucKhuCongNghiep,
    getDanhMucNganhNghe,
    getDanhMucNguonTiepNhan,
    getDanhMucTinhTrangHoatDong,
    setDanhMucIsLoaded,
    setDanhMucIsLoading
  }
)
@hocProtectLogin
class AppWithLayout extends React.PureComponent {
  static propTypes = {
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    children: PropTypes.node,
    clearUserInfo: PropTypes.func,
    getDanhMucCoQuanThamQuyenQuanLy: PropTypes.func,
    getDanhMucCoSoCapPhep: PropTypes.func,
    getDanhMucDacTrungNuocThai: PropTypes.func,
    getDanhMucKhuCongNghiep: PropTypes.func,
    getDanhMucNganhNghe: PropTypes.func,
    getDanhMucNguonTiepNhan: PropTypes.func,
    getDanhMucProvie: PropTypes.func,
    getDanhMucTinhTrangHoatDong: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    pathname: PropTypes.string,
    setDanhMucIsLoaded: PropTypes.func,
    setDanhMucIsLoading: PropTypes.func,
    userLogout: PropTypes.func
  }

  componentDidMount = () => {
    // console.log('UNSAFE_componentWillMount')
    this.props.setDanhMucIsLoading()
    Promise.all([
      this.props.getDanhMucProvie(),
      this.props.getDanhMucCoSoCapPhep(),
      this.props.getDanhMucCoQuanThamQuyenQuanLy(),
      this.props.getDanhMucDacTrungNuocThai(),
      this.props.getDanhMucKhuCongNghiep(),
      this.props.getDanhMucNganhNghe(),
      this.props.getDanhMucNguonTiepNhan(),
      this.props.getDanhMucTinhTrangHoatDong()
    ]).then(() => {
      this.props.setDanhMucIsLoaded()
    })
  }
  hanldeChangeMenu = ({ key }) => {
    if (key === slug.coso.base) Router.push(slug.basic)
    else Router.push(key)
  }

  getPathForMenu(path) {
    let result = ''

    let tampArr = path.split('/')

    if (path.includes('ttmoitruong')) {
      result = '/' + tampArr[1] + '/' + tampArr[2]
    } else result = '/' + tampArr[1]

    return result
  }

  render() {
    let pathMenu = ''
    if (this.props.pathname === slug.coso.list) pathMenu = slug.coso.base
    else pathMenu = this.getPathForMenu(this.props.pathname)

    console.log('pathMenu', pathMenu)

    const { children, FirstName, LastName } = this.props
    return (
      <LayoutWrapper>
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
            <Menu
              theme='dark'
              mode='horizontal'
              defaultSelectedKeys={[slug.basic]}
              selectedKeys={[pathMenu]}
              onClick={this.hanldeChangeMenu}
            >
              <Menu.Item key={slug.coso.base}>Thông tin Cơ sở</Menu.Item>
              <SubMenu key={slug.ttmoitruong.base} title='Thông tin Môi trường'>
                <Menu.Item key={slug.ttmoitruong.menu1.base}>Option 5</Menu.Item>
                <Menu.Item key={slug.ttmoitruong.menu2.base}>Option 6</Menu.Item>
              </SubMenu>
              <Menu.Item key={slug.bcgiamsatmoitruong.base}>Báo cáo giám sát môi trường</Menu.Item>
              <Menu.Item key='/4'>Báo cáo quản lý chất thải rắn</Menu.Item>
              <Menu.Item key='/5'>Thanh tra/Kiểm tra</Menu.Item>
              <Menu.Item key='/6'>Thu phí</Menu.Item>

              <Menu.Item key={slug.manager.base}>Quản lý</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 32px', heigth: '1', marginTop: 86 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Báo cáo đánh giá tác động môi trường</Breadcrumb.Item>
            </Breadcrumb>
            <ChildrenContainer>{children}</ChildrenContainer>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Waste Source Management System ©2019 Created by VietAn-Software
          </Footer>
        </Layout>
      </LayoutWrapper>
    )
  }
}

export default AppWithLayout
