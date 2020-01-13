import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tag, Modal, Radio, Tabs } from 'antd'
import { connect } from 'react-redux'
import { get } from 'lodash-es'

// import TabInfo from './tabInfo/index2'
import TabInfo from './tabinfo'
import TabFilter from './tabfilter'
import TabBuffer from './tabBuffer'
import { updateTabInfo, updateCountApply, updateTabFilter, updateTabBuffer } from 'src/redux/actions/analyticsAction'
import { updateBuffer2LayerStore } from 'src/redux/actions/layerAction.js'

const { TabPane } = Tabs

const TAB_KEY = {
  TAB_INFO: 'TAB_INFO',
  TAB_FILTER: 'TAB_FILTER',
  TAB_CALC: 'TAB_CALC',
  TAB_BUFFER: 'TAB_BUFFER',
  TAB_MAP: 'TAB_MAP'
}

const ModalWrapperContainer = styled.div`
  .ant-modal-close-x {
    color: white;
  }
  .ant-modal-header {
    background: linear-gradient(to right, #3880ff, #5f98fd);
    .ant-modal-title {
      color: white;
    }
  }
  .ant-radio-group {
    display: flex;
    .ant-radio-button-wrapper {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }
`

const mapStateToProps = state => ({
  AnalyticsStore: get(state, 'AnalyticsStore')
})
const mapDispatchToProps = {
  updateTabInfo,
  updateCountApply,
  updateTabFilter,
  updateTabBuffer,
  updateBuffer2LayerStore
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ModalTag extends React.Component {
  static propTypes = {
    getRef: PropTypes.func.isRequired,
    updateTabInfo: PropTypes.func.isRequired,
    AnalyticsStore: PropTypes.object.isRequired,
    updateCountApply: PropTypes.func.isRequired,
    updateTabFilter: PropTypes.func.isRequired,
    updateTabBuffer: PropTypes.func.isRequired,
    updateBuffer2LayerStore: PropTypes.func.isRequired
  }

  state = { isVisible: false, tabKeyActive: TAB_KEY.TAB_INFO }

  componentDidMount = () => {
    if (this.props.getRef) this.props.getRef(this)
  }
  openModal = () => {
    this.setState({ isVisible: true })
  }

  render() {
    const { AnalyticsStore } = this.props
    const { __target } = AnalyticsStore

    return (
      <div>
        <ModalWrapperContainer id='ModalWrapperContainer'></ModalWrapperContainer>
        <Modal
          destroyOnClose={true}
          width={window.outerWidth * 0.6}
          getContainer={document.getElementById('ModalWrapperContainer')}
          title={__target ? __target.label : 'UNKNOWN'}
          visible={this.state.isVisible}
          onCancel={() => {
            this.setState({ isVisible: false, tabKeyActive: TAB_KEY.TAB_INFO })
          }}
          okText='Apply'
          onOk={() => {
            const key = __target ? __target.key : 'UNKNOWN'
            // this.props.updateCountApply(key)
            switch (this.state.tabKeyActive) {
              case TAB_KEY.TAB_INFO: {
                this.props.updateTabInfo(key, this.TabInfo.getDataTabInfo())
                break
              }
              case TAB_KEY.TAB_FILTER: {
                this.props.updateTabFilter(key, this.TabFilter.getDataTabFilter())
                break
              }
              case TAB_KEY.TAB_BUFFER: {
                const result = this.TabBuffer.getDataTabBuffer()
                console.log('---dataBuffer--', result)

                if (result) {
                  if (!get(result, 'success', true)) {
                    return
                  }
                  const dataBuffer = result.data
                  this.props.updateTabBuffer(key, dataBuffer)
                  this.props.updateBuffer2LayerStore(key, dataBuffer)
                }
                break
              }
            }
            this.setState({ isVisible: false, tabKeyActive: TAB_KEY.TAB_INFO })
          }}
        >
          <div>
            <Radio.Group
              defaultValue={TAB_KEY.TAB_INFO}
              buttonStyle='solid'
              onChange={e => this.setState({ tabKeyActive: e.target.value })}
            >
              <Radio.Button value={TAB_KEY.TAB_INFO}>Info Tool</Radio.Button>
              <Radio.Button value={TAB_KEY.TAB_FILTER}>Filter</Radio.Button>
              <Radio.Button value={TAB_KEY.TAB_CALC}>Calc</Radio.Button>
              <Radio.Button value={TAB_KEY.TAB_BUFFER}>Buffer</Radio.Button>
              <Radio.Button value={TAB_KEY.TAB_MAP}>Map</Radio.Button>
            </Radio.Group>
            <Tabs
              ref={ref => (this.Tabs = ref)}
              defaultActiveKey={TAB_KEY.TAB_INFO}
              activeKey={this.state.tabKeyActive}
              renderTabBar={() => <div />}
            >
              <TabPane tab='Tab 1' key={TAB_KEY.TAB_INFO}>
                <TabInfo getRef={ref => (this.TabInfo = ref)} />
              </TabPane>
              <TabPane tab='Tab 2' key={TAB_KEY.TAB_FILTER}>
                <TabFilter getRef={ref => (this.TabFilter = ref)} />
              </TabPane>
              <TabPane tab='Tab 3' key={TAB_KEY.TAB_CALC}>
                Tab Calc
              </TabPane>
              <TabPane tab='Tab 3' key={TAB_KEY.TAB_BUFFER}>
                <TabBuffer getRef={ref => (this.TabBuffer = ref)} />
              </TabPane>
              <TabPane tab='Tab 4' key={TAB_KEY.TAB_MAP}>
                Tab Map
              </TabPane>
            </Tabs>
          </div>
        </Modal>
      </div>
    )
  }
}
