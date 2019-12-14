import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import {
  Layout,
  // , Menu, Icon,Row
  Avatar,
  Button
} from 'antd'
// import moment from 'moment'
import Router from 'next/router'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import windowSize from 'react-window-size'
import dynamic from 'next/dynamic'

import {
  updateKeyPath,
  updateSubMenu,
  // getDepartment,
  // getListUser,
  isLoadedDanhMuc
} from 'src/redux/actions/generalAction'
import { hanhchinhUpdate } from 'src/redux/actions/layerAction'
import { getAllHanhChinh } from 'src/api/layerApi'
import { get as _get, last as _last, isEqual as _isEqual } from 'lodash-es'
import slug from 'src/routes'
import hocProtectLogin from 'src/hoc/is-authenticated'
import HeaderContainer from './header'
import IconSvg from 'icons'

const MapComp = dynamic(() => import('src/containers/mapIndex/map/index'), { ssr: false })
// import MapComp from 'src/containers/mapIndex/map/index'

const WIDTH_EXPANDED = 'calc((100vw - 346px)*2/5)'

const LayoutWrapper = styled.div``
const ContentWrapper = styled.div`
  display: flex;
  height: calc(100vh - 50px);
  .icon-bar {
    width: 46px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, #3880ff, #5f98fd);
    button {
      display: flex;
      justify-content: center;
    }
    .top {
      .icon-bar-item {
        width: 40px;
        height: 40px;
        margin-top: 12px;
        zoom: 0.9;
      }
    }
    .bottom {
      display: flex;
      flex-direction: column-reverse;
      .icon-bar-item {
        width: 40px;
        height: 40px;
        margin-bottom: 12px;
        zoom: 0.9;
      }
    }
  }
  .page-content {
    width: 300px;
    border-top: 1px solid #e8e8e8;
    border-radius: 2px 2px 0 0;
    /* box-shadow: 7px 0px 5px 0px rgba(0, 0, 0, 0.15), 7px 0px 5px 0px rgba(0, 0, 0, 0.12); */
    box-shadow: 6px 6px 5px 0px rgba(0, 0, 0, 0.45);
    z-index: 999;
    overflow-y: auto;
  }
  .map-content {
    flex: 1;
    width: calc(100vw - 346px);
    min-height: calc(100vh - 50px);
  }
  .dashboard-content {
    position: absolute;
    .dashboard-content-tab {
      z-index: 9999;
      width: 200px;
      height: 100%;
      background: white;
      position: fixed;
      right: 0px;
      transition: width 0.3s;
    }
    .dashboard-content-button-container {
      z-index: 999999999;
      position: absolute;
      left: -30px;
      top: 50%;
      .button-expand {
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        /* border-bottom-left-radius: 60px;
        border-bottom-right-radius: 60px; */
        width: 40px;
        height: 20px;
        /* width: 100px;
        height: 50px; */
        display: flex;
        justify-content: center;
      }
    }
  }
`

@connect(
  state => ({
    isAuthenticated: _get(state, 'AuthStore.isAuthenticated', false),
    token: _get(state, 'AuthStore.token', null)
  }),
  { updateKeyPath, updateSubMenu, isLoadedDanhMuc, hanhchinhUpdate }
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
    backgroundColor: PropTypes.string,
    hanhchinhUpdate: PropTypes.func
  }

  state = {
    isLoaded: false,
    collapsed: false,
    broken: false,
    pageName: '',
    mount: false,
    isExpand: false
  }

  onCollapse = collapsed => {
    // console.log(collapsed)
    this.setState({ collapsed })
  }

  componentDidMount = async () => {
    // fetch data hanh chinh
    console.log('fetch data hanh chinh')
    getAllHanhChinh()
      .then(response => {
        const { data } = response
        this.props.hanhchinhUpdate(data)
      })
      .catch(err => {
        console.log('err', err)
      })
    const { isAuthenticated } = this.props
    if (!isAuthenticated) {
      Router.push(slug.login)
    } else {
      // this.changePageName()
    }
    this.MapComp = require('../../containers/mapIndex/map/index')
    console.log('this.MapComp', this.MapComp)
    this.setState({ mount: true })

    // import MapComp from 'src/containers/mapIndex/map/index'
  }

  componentDidUpdate = prevProps => {
    // if (!_isEqual(prevProps.breadcrumb, this.props.breadcrumb)) {
    //   this.changePageName()
    // }
  }

  // changePageName = () => {
  //   const item = _last(this.props.breadcrumb)
  //   this.setState({
  //     pageName: item ? item.name : 'Trang chủ'
  //   })
  // }

  changePage = slugPage => {
    Router.push(slugPage)
  }

  render() {
    const { children, windowWidth } = this.props
    // NOTE  moible
    return (
      <LayoutWrapper windowWidth={windowWidth}>
        <Head>
          <title>Location Analytics</title>
        </Head>
        <Layout.Header style={{ backgroundColor: 'white', padding: 0, height: 50 }}>
          <HeaderContainer />
        </Layout.Header>
        <Layout.Content>
          <ContentWrapper>
            <div className='icon-bar'>
              <div className='top'>
                <div className='icon-bar-item'>
                  <Button shape='circle' size='large' onClick={this.changePage.bind(this, slug.layer)}>
                    <IconSvg.layers style={{ fontSize: 28 }} />
                  </Button>
                </div>
                <div className='icon-bar-item'>
                  <Button
                    style={{ paddingLeft: 4 }}
                    shape='circle'
                    size='large'
                    onClick={this.changePage.bind(this, slug.marker)}
                  >
                    <IconSvg.markerFind style={{ fontSize: 28 }} />
                  </Button>
                </div>
                <div className='icon-bar-item'>
                  <Button shape='circle' size='large'>
                    <IconSvg.folder style={{ fontSize: 28 }} />
                  </Button>
                </div>
                <div className='icon-bar-item'>
                  <Button shape='circle' size='large' onClick={this.changePage.bind(this, slug.analytics)}>
                    <IconSvg.analytics style={{ fontSize: 28 }} />
                  </Button>
                </div>
              </div>
              <div className='bottom'>
                <div className='icon-bar-item'>
                  <Avatar src={'/static/images/avatar_default.png'} size='large' />
                </div>
                <div className='icon-bar-item'>
                  <Button shape='circle' style={{ fontSize: 24, color: '#1185E0' }} icon='question' size='large' />
                </div>
                <div className='icon-bar-item'>
                  <Button shape='circle' size='large'>
                    <IconSvg.notification style={{ fontSize: 28 }} />
                  </Button>
                </div>
              </div>
            </div>
            <div className='page-content'> {children}</div>
            <div className='map-content'>
              {/* <MapComp /> */}
              {this.state.mount && <MapComp />}
              {/* <this.MapComp /> */}
            </div>
            <div className='dashboard-content'>
              <div className='dashboard-content-tab' style={{ width: this.state.isExpand ? WIDTH_EXPANDED : 0 }}>
                <div className='dashboard-content-button-container'>
                  <div style={{ transform: 'rotate(90deg)' }}>
                    <Button
                      type='primary'
                      className='button-expand'
                      icon='down'
                      onClick={() => {
                        this.setState({ isExpand: !this.state.isExpand })
                      }}
                    ></Button>
                  </div>
                </div>
                <div style={{ minWidth: 200 }}>day la dashboard</div>
              </div>
            </div>
          </ContentWrapper>
        </Layout.Content>
      </LayoutWrapper>
    )
  }
}

export default withRouter(AppWithLayout)
