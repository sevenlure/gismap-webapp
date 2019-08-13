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
  getDanhMucTinhTrangKiemTra,
  setDanhMucIsLoaded,
  setDanhMucIsLoading
} from 'src/redux/actions/generalAction.js'
import { get as _get } from 'lodash-es'
import Router, { withRouter } from 'next/router'
import slug from 'src/routes'
import hocProtectLogin from 'src/hoc/is-authenticated'
import posed from 'react-pose'
import { isEqual as _isEqual } from 'lodash-es'
import Link from 'next/link'

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
    menuSelected: _get(state, 'GeneralStore.menuSelected'),
    breadcrumbArr: _get(state, 'GeneralStore.breadcrumb')
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
    getDanhMucTinhTrangKiemTra,
    setDanhMucIsLoaded,
    setDanhMucIsLoading
  }
)
@hocProtectLogin
class AppWithLayout extends React.Component {
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
    getDanhMucTinhTrangKiemTra: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    router: PropTypes.any,
    setDanhMucIsLoaded: PropTypes.func,
    setDanhMucIsLoading: PropTypes.func,
    userLogout: PropTypes.func,
    breadcrumbArr: PropTypes.array.isRequired
  }

  componentDidMount = () => {
    console.log('componentDidMount Layout')
    this.props.setDanhMucIsLoading()
    Promise.all([
      this.props.getDanhMucProvie(),
      this.props.getDanhMucCoSoCapPhep(),
      this.props.getDanhMucCoQuanThamQuyenQuanLy(),
      this.props.getDanhMucDacTrungNuocThai(),
      this.props.getDanhMucKhuCongNghiep(),
      this.props.getDanhMucNganhNghe(),
      this.props.getDanhMucNguonTiepNhan(),
      this.props.getDanhMucTinhTrangHoatDong(),
      this.props.getDanhMucTinhTrangKiemTra()
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
    const pathname = this.props.router.pathname
    if (pathname === slug.coso.list) pathMenu = slug.coso.base
    else pathMenu = this.getPathForMenu(pathname)

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
                <Menu.Item key={slug.ttmoitruong.tacdongmoitruong.list}>Báo cáo đánh giá tác động môi trường</Menu.Item>
                <Menu.Item key={slug.ttmoitruong.kehoachbaovemoitruong.list}>Kế hoạch bảo vệ môi truờng</Menu.Item>
                <Menu.Item key={slug.ttmoitruong.giayphepxathai.list}>Giấy phép xả thải</Menu.Item>
                <Menu.Item key={slug.ttmoitruong.khaithacnuocduoidat.list}>
                  Hiện trạng khai thác nuớc duới đất
                </Menu.Item>
                <Menu.Item key={slug.ttmoitruong.khaithacnuocmat.list}>Hiện trạng khai thác nuớc mặt</Menu.Item>
                <Menu.Item key={slug.ttmoitruong.htxulynuocthai.list}>Hệ thống xử lý nuớc thải</Menu.Item>
                <Menu.Item key={slug.ttmoitruong.htxulykhithai.list}>Hệ thống xử lý khí thải</Menu.Item>
                <Menu.Item key={slug.ttmoitruong.sochunguonthai.list}>Sổ chủ nguồn thải</Menu.Item>
              </SubMenu>
              <Menu.Item key={slug.baocaogiamsatmoitruong.base}>Báo cáo giám sát môi trường</Menu.Item>
              <Menu.Item key={slug.baocaoquanlychatthairan.base}>Báo cáo quản lý chất thải rắn</Menu.Item>
              <Menu.Item key={slug.thanhtrakiemtra.base}>Thanh tra/Kiểm tra</Menu.Item>
              <Menu.Item key='/6'>Thu phí</Menu.Item>

              <Menu.Item key={slug.manager.base}>Quản lý</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 32px', heigth: '1', marginTop: 86 }}>
            <BoxAnimateBreadcrumb breadcrumbArr={this.props.breadcrumbArr} />

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

export default withRouter(AppWithLayout)

const Box = posed.div({
  enter: { x: 0, opacity: 1, transition: { duration: 200 } },
  exit: { x: -100, opacity: 0, transition: { duration: 200 } }
})

const LastBread = styled.span`
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 1.17em;
`
class BoxAnimateBreadcrumb extends React.Component {
  static propTypes = {
    breadcrumbArr: PropTypes.array.isRequired
  }

  state = {
    focus: 'enter',
    dataBreadcrumbArr: []
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   const isDiff = !_isEqual(this.props.breadcrumbArr, nextProps.breadcrumbArr)
  //   if (isDiff) {
  //     this.setState({ focus: 'exit' }, () => {
  //       setTimeout(() => {
  //         this.setState({ focus: 'enter', dataBreadcrumbArr: nextProps.breadcrumbArr })
  //       }, 400)
  //     })
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isDiff = !_isEqual(prevState.dataBreadcrumbArr, nextProps.breadcrumbArr)
    if (isDiff) {
      return { focus: 'exit' }
    } else return null
  }

  // eslint-disable-next-line
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.focus === 'exit') {
      setTimeout(() => {
        this.setState({ focus: 'enter', dataBreadcrumbArr: this.props.breadcrumbArr })
      }, 400)
    }
  }

  render() {
    return (
      <Box pose={this.state.focus}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {this.state.dataBreadcrumbArr.map((item, index) => {
            const isLast = index === this.state.dataBreadcrumbArr.length - 1
            if (!isLast)
              return (
                <Breadcrumb.Item key={index}>
                  <Link href={item.slug}>
                    <a>{item.name}</a>
                  </Link>
                </Breadcrumb.Item>
              )
            else
              return (
                <Breadcrumb.Item key={index}>
                  <LastBread>{item.name}</LastBread>
                </Breadcrumb.Item>
              )
          })}
        </Breadcrumb>
      </Box>
    )
  }
}
