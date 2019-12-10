import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Tabs, Radio } from 'antd'
import LayoutDashboard from 'src/layout/dashboard'
import windowSize from 'react-window-size'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import dynamic from 'next/dynamic'
import TabLayer from 'src/containers/tabIndex/tabLayout/index.js'
// import MapComp from 'src/containers/mapIndex/map'

const MapComp = dynamic(() => import('../src/containers/mapIndex/map/index'), { ssr: false })
// import DashBoard from 'src/containers/dashboard'

const { TabPane } = Tabs

const TAB_KEY = {
  LAYER: 'LAYER',
  ANALYSIS: 'ANALYSIS'
}

const WrapperIndex = styled.div`
  display: flex;
  height: 100vh;
  color: white;
  .left-content {
    height: 100%;
    width: 300px;
    /* background-color: #444345; */
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
  }
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
    const pathPage = slug.basic
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
        <div className='left-content'>
          {/* <ButtonGroup style={{ display: 'flex' }}>
            <Button
              onClick={this.setTabActive.bind(this, TAB_KEY.LAYER)}
              type={this.state.tabKey === TAB_KEY.LAYER ? 'primary' : 'default'}
              size='large'
              style={{
                flex: 1,
                border: 'none',
                color: 'white',
                // background: this.state.tabKey === TAB_KEY.LAYER ? '#595959' : '#8c8c8c'
              }}
            >
              Layers
            </Button>
            <Button
              onClick={this.setTabActive.bind(this, TAB_KEY.ANALYSIS)}
              size='large'
              type={this.state.tabKey === TAB_KEY.ANALYSIS ? 'primary' : 'default'}
              style={{
                flex: 1,
                border: 'none',
                color: 'white',
                // background: this.state.tabKey === TAB_KEY.ANALYSIS ? '#595959' : '#8c8c8c'
              }}
            >
              Analysis
            </Button>
          </ButtonGroup>
        */}
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

          <div></div>
        </div>
        <div className='map-content'>
          <MapComp />
        </div>
      </WrapperIndex>
    )
  }
}

Index.Layout = LayoutDashboard

export default Index
