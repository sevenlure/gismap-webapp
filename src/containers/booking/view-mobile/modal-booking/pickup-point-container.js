import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Radio, Input, Select } from 'antd'
import IconSvg from 'icons'
import Clearfix from 'src/components/elements/clearfix'
import windowSize from 'react-window-size'

const { Option } = Select

const Wrapper = styled.div`
  .title {
    font-family: myFont-Bold;
    font-size: 1.125rem;
    margin-bottom: 16px;
  }

  .pickup-container {
  }

  .des-container {
  }

  .ant-radio.ant-radio-checked {
    height: 22px;
    width: 22px;
    background: url(/static/images/icon/ic-choice-on.svg) no-repeat;
    .ant-radio-inner {
      opacity: 0;
    }
  }

  .ant-radio {
    height: 22px;
    width: 22px;
    background: url(/static/images/icon/ic-choice-off.svg) no-repeat;
    .ant-radio-inner {
      opacity: 0;
    }
  }
`
const radioStyle = {
  // display: 'block',
  // height: '30px',
  // lineHeight: '30px'
  marginBottom: 16
}

@windowSize
export default class PickupPointContainer extends React.Component {
  state = {
    pickupPointVal: 1,
    desPointVal: 1
  }

  onChangePickupPoint = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      pickupPointVal: e.target.value
    })
  }

  onChangeDesPoint = e => {
    console.log('radio checked', e.target.value)
    this.setState({
      desPointVal: e.target.value
    })
  }

  render() {
    return (
      <Wrapper windowWidth={this.props.windowWidth}>
        <div className='pickup-container'>
          <div className='title'>Chọn điểm đón</div>
          <Radio.Group onChange={this.onChangePickupPoint} value={this.state.pickupPointVal}>
            <Radio style={radioStyle} value={1}>
              <Select size='large' placeholder='Chọn bến đón' style={{ width: 250 }}>
                <Option value='137'>137 Đào duy Từ…</Option>
              </Select>
            </Radio>
            <Radio style={radioStyle} value={2}>
              <Input size='large' placeholder='Vị trí cần đón...' />
            </Radio>
          </Radio.Group>
        </div>
        <Clearfix height={16} />
        <div className='des-container'>
          <div className='title'>Chọn điểm trả</div>
          <Radio.Group onChange={this.onChangeDesPoint} value={this.state.desPointVal}>
            <Radio style={radioStyle} value={1}>
              <Select size='large' placeholder='Xuống ở bến' style={{ width: 250 }}>
                <Option value='137'>137 Đào duy Từ…</Option>
              </Select>
            </Radio>
            <Radio style={radioStyle} value={2}>
              <Input size='large' placeholder='Xuống tận nhà...' />
            </Radio>
          </Radio.Group>
        </div>
      </Wrapper>
    )
  }
}
