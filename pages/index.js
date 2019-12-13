import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  // Tabs,
  Typography
} from 'antd'
import LayoutDashboard from 'src/layout/dashboard'
import windowSize from 'react-window-size'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
// import dynamic from 'next/dynamic'
import TabLayer from 'src/containers/tabIndex/tabLayout/index.js'
// import MapComp from 'src/containers/mapIndex/map'

// const MapComp = dynamic(() => import('../src/containers/mapIndex/map/index'), { ssr: false })
// import DashBoard from 'src/containers/dashboard'

// const { TabPane } = Tabs

const TAB_KEY = {
  LAYER: 'LAYER',
  ANALYSIS: 'ANALYSIS'
}

/* background-color: #444345; */
const WrapperIndex = styled.div`
  /* display: flex;
  height: 100%;
  color: white;
  .left-content {
    height: 100%;
    width: 300px;
  }
  .map-content {
    flex: 1;
  }

  .ant-radio-group {
    display: flex;
    text-align: center;
    label {
      flex: 1;
      border-radius: 0px;
    }
  } */
`

const mapStateToProps = () => ({})
const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath,
  updateBackgroundColor
}

@connect(mapStateToProps, mapDispatchToProps)
@windowSize
class Index extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    updateBackgroundColor: PropTypes.func
  }

  state = {
    querySearch: null,
    tabKey: TAB_KEY.LAYER
  }
  componentDidMount = () => {
    const pathPage = slug.home
    this.props.updateBackgroundColor('none')
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
  }

  setTabActive = e => {
    this.setState({
      tabKey: e.target.value
    })
  }

  render() {
    return (
      <WrapperIndex windowWidth={this.props.windowWidth}>
        <div style={{ padding: 4 }}>
          <Typography.Title level={3}>Layer Control</Typography.Title>
        </div>
        <div>
          <TabLayer />
        </div>
        {/* <div className='left-content'>
          <Radio.Group defaultValue={TAB_KEY.LAYER} buttonStyle='solid' onChange={this.setTabActive.bind(this)}>
            <Radio.Button value={TAB_KEY.LAYER}>Layers</Radio.Button>
            <Radio.Button value={TAB_KEY.ANALYSIS}>Analysis</Radio.Button>
          </Radio.Group>
          <Tabs
            activeKey={this.state.tabKey}
            renderTabBar={() => {
              return <div />
            }}
          >
            <TabPane key={TAB_KEY.LAYER}>
              <TabLayer />
            </TabPane>
            <TabPane key={TAB_KEY.ANALYSIS}>This is Component Tool Box Analysis</TabPane>
          </Tabs>
        </div> */}
      </WrapperIndex>
    )
  }
}

Index.Layout = LayoutDashboard

export default Index
