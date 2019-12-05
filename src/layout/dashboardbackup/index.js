import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import { Layout, Menu, Icon, Avatar } from 'antd'
import hocProtectLogin from 'src/hoc/is-authenticated'
import { connect } from 'react-redux'
import {
  // updateKeyPath,
  // updateSubMenu,
  // getDepartment,
  // getListUser,
  isLoadedDanhMuc
} from 'src/redux/actions/generalAction'
// import pathLogo from 'icons/index.js'
import { get as _get, last as _last, isEqual as _isEqual } from 'lodash-es'
import { withRouter } from 'next/router'
import windowSize from 'react-window-size'
// import AvatarUser from 'src/containers/auth/avatar-user'
import Router from 'next/router'
import slug from 'src/routes'
import moment from 'moment'

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
          <title>Bất động sản</title>
        </Head>
      </LayoutWrapper>
    )
  }
}

export default withRouter(AppWithLayout)
