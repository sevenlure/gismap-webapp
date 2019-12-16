import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tag } from 'antd'

import ModalComp from './modal'

const Wrapper = styled.div`
  margin-left: 8px;
  .ant-tag {
    cursor: pointer;
  }
`

export default class AnalyticsControl extends React.Component {
  showModal = () => {
    if (this.ModalComp) this.ModalComp.openModal()
  }
  render() {
    return (
      <Wrapper style={{ marginLeft: 8 }}>
        <div>
          <Tag onClick={this.showModal}>Quận Cầu Giấy</Tag>
        </div>
        <div>
          <Tag onClick={this.showModal}>Real Estate</Tag>
        </div>
        <div>
          <Tag onClick={this.showModal}>My stores</Tag>
        </div>
        <div>
          <Tag onClick={this.showModal}>Shopping centers</Tag>
        </div>
        <ModalComp getRef={ref => (this.ModalComp = ref)} />
      </Wrapper>
    )
  }
}
