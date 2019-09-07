import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Radio, Input, Select } from 'antd'
// import IconSvg from 'icons'
import Clearfix from 'src/components/elements/clearfix'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { get as _get } from 'lodash-es'

const { Option } = Select

const Wrapper = styled.div`
  ${props => (props.windowWidth < 900 ? 'display: flex;' : '')}
  ${props => (props.windowWidth < 900 ? 'justify-content: space-between;' : '')}

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
  marginBottom: 16
}

const mapStateToProps = state => ({
  busPickup: _get(state, 'BookingStore.BookingNow.busPickup'),
  busDes: _get(state, 'BookingStore.BookingNow.busDes')
})

const mapDispatchToProps = {}

// MARK  this.ModalBooking nắm ref của modal-booking
@connect(
  mapStateToProps,
  mapDispatchToProps
)
@windowSize
export default class PickupPointContainer extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    busPickup: PropTypes.array,
    busDes: PropTypes.array
  }

  static defaultProps = {
    busPickup: [],
    busDes: []
  }

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
    const { busPickup, busDes } = this.props

    return (
      <Wrapper windowWidth={this.props.windowWidth}>
        <div className='pickup-container'>
          <div className='title'>Chọn điểm đón</div>
          <Radio.Group onChange={this.onChangePickupPoint} value={this.state.pickupPointVal}>
            <Radio style={radioStyle} value={1}>
              <Select size='large' placeholder='Chọn bến đón' style={{ width: 200 }}>
                {busPickup.map((item, index) => {
                  return (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  )
                })}
              </Select>
            </Radio>
            <Radio style={radioStyle} value={2}>
              <Input size='large' placeholder='Vị trí cần đón...' style={{ width: 200 }} />
            </Radio>
          </Radio.Group>
        </div>
        <Clearfix height={16} />
        <div className='des-container'>
          <div className='title'>Chọn điểm trả</div>
          <Radio.Group onChange={this.onChangeDesPoint} value={this.state.desPointVal}>
            <Radio style={radioStyle} value={1}>
              <Select size='large' placeholder='Xuống ở bến' style={{ width: 200 }}>
                {busDes.map((item, index) => {
                  return (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  )
                })}
              </Select>
            </Radio>
            <Radio style={radioStyle} value={2}>
              <Input size='large' placeholder='Xuống tận nhà...' style={{ width: 200 }} />
            </Radio>
          </Radio.Group>
        </div>
      </Wrapper>
    )
  }
}
