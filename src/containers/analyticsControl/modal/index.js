import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tag, Modal, Radio, Tabs } from 'antd'
import { connect } from 'react-redux'
import { get } from 'lodash-es'

// import TabInfo from './tabInfo/index2'
import TabInfo from './tabinfo'
import { updateTabInfo, updateCountApply } from 'src/redux/actions/analyticsAction'

const { TabPane } = Tabs

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
const mapDispatchToProps = { updateTabInfo, updateCountApply }

@connect(mapStateToProps, mapDispatchToProps)
export default class ModalTag extends React.Component {
  static propTypes = {
    getRef: PropTypes.func.isRequired,
    updateTabInfo: PropTypes.func.isRequired,
    AnalyticsStore: PropTypes.object.isRequired,
    updateCountApply: PropTypes.func.isRequired
  }

  state = { isVisible: false }

  componentDidMount = () => {
    if (this.props.getRef) this.props.getRef(this)
  }
  openModal = () => {
    // NOTE  check trong store đã có data chưa, có thì phải set cho Tab
    // const { AnalyticsStore } = this.props
    // const targetKey = get(AnalyticsStore, '__target.key')
    // console.log('AnalyticsStore[targetKey]', AnalyticsStore[targetKey])
    // if (targetKey && AnalyticsStore[targetKey]) this.TabInfo.setData(AnalyticsStore[targetKey])

    this.setState({ isVisible: true })
  }
  handleTabInfoUpdate = val => {
    const { AnalyticsStore } = this.props
    this.props.updateTabInfo(AnalyticsStore.__target.key, val)
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
            this.setState({ isVisible: false })
          }}
          okText='Apply'
          onOk={() => {
            this.props.updateCountApply(__target ? __target.key : 'UNKNOWN')
            this.setState({ isVisible: false })
          }}
        >
          <div>
            <Radio.Group defaultValue='a' buttonStyle='solid'>
              <Radio.Button value='a'>Info Tool</Radio.Button>
              <Radio.Button value='b'>Filter</Radio.Button>
              <Radio.Button value='c'>Calc</Radio.Button>
              <Radio.Button value='d'>Buffer</Radio.Button>
              <Radio.Button value='e'>Map</Radio.Button>
            </Radio.Group>
            <Tabs defaultActiveKey='1' renderTabBar={() => <div />}>
              <TabPane tab='Tab 1' key='1'>
                <TabInfo cbTabInfoVal={this.handleTabInfoUpdate} getRef={ref => (this.TabInfo = ref)} />
              </TabPane>
              <TabPane tab='Tab 2' key='2'>
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab='Tab 3' key='3'>
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        </Modal>
      </div>
    )
  }
}
