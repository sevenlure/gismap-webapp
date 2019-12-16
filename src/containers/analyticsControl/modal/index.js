import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Tag, Modal, Radio, Tabs } from 'antd'

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

export default class ModalTag extends React.Component {
  state = { isVisible: false }

  componentDidMount = () => {
    if (this.props.getRef) this.props.getRef(this)
  }
  openModal = () => {
    this.setState({ isVisible: true })
  }
  render() {
    return (
      <div>
        <ModalWrapperContainer id='ModalWrapperContainer'></ModalWrapperContainer>
        <Modal
          width={window.outerWidth * 0.6}
          getContainer={document.getElementById('ModalWrapperContainer')}
          title='MY STORES'
          visible={this.state.isVisible}
          onCancel={() => {
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
                Content of Tab Info
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
