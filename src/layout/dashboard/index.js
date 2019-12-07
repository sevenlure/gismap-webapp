import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout, Menu, Icon, Avatar } from 'antd'
import hocProtectLogin from 'src/hoc/is-authenticated'
import { connect } from 'react-redux'
import {
  updateKeyPath,
  updateSubMenu,
  // getDepartment,
  getListUser,
  isLoadedDanhMuc
} from 'src/redux/actions/generalAction'
import { get as _get, last as _last, isEqual as _isEqual } from 'lodash-es'
import { withRouter } from 'next/router'
import windowSize from 'react-window-size'
import Router from 'next/router'
import slug from 'src/routes'
import moment from 'moment'
import HeaderContainer from './header'

const LayoutWrapper = styled.div`
  /* display: flex;
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
  } */
`

@connect(
  state => ({
    isAuthenticated: _get(state, 'AuthStore.isAuthenticated', false),
    token: _get(state, 'AuthStore.token', null)
  }),
  { updateKeyPath, updateSubMenu, getListUser, isLoadedDanhMuc }
)
@hocProtectLogin
@windowSize
class AppWithLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    windowWidth: PropTypes.number,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
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
  }

  componentDidUpdate = prevProps => {
    if (!_isEqual(prevProps.breadcrumb, this.props.breadcrumb)) {
      this.changePageName()
    }
  }

  changePageName = () => {
    const item = _last(this.props.breadcrumb)
    this.setState({
      pageName: item ? item.name : 'Trang chủ'
    })
  }

  render() {
    const { children, windowWidth, isAuthenticated } = this.props
    // NOTE  moible
    return (
      <LayoutWrapper windowWidth={windowWidth}>
        <Head>
          <title>Bất động sản</title>
        </Head>
        <Layout.Header style={{ backgroundColor: 'white', padding: 0, height: 50 }}>
          <HeaderContainer />
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
      </LayoutWrapper>
    )
  }
}

export default withRouter(AppWithLayout)
