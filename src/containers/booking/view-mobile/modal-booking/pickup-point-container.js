import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Radio, Input, Select } from 'antd'
// import IconSvg from 'icons'
import Clearfix from 'src/components/elements/clearfix'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { get as _get, isEmpty as _isEmpty, set as _set } from 'lodash-es'
import { setBookingNowPoint, clearBookingNowPoint } from 'src/redux/actions/BookingAction'

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
`
const radioStyle = {
  // display: 'block',
  // height: '30px',
  // lineHeight: '30px'
  marginBottom: 16
}

const mapStateToProps = state => ({
  busPickup: _get(state, 'BookingStore.BookingNow.busPickup'),
  busDes: _get(state, 'BookingStore.BookingNow.busDes'),
  BookingNowPoint: _get(state, 'BookingStore.BookingNowPoint')
})

const mapDispatchToProps = {
  setBookingNowPoint,
  clearBookingNowPoint
}

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
    busDes: PropTypes.array,
    BookingNowPoint: PropTypes.object,
    setBookingNowPoint: PropTypes.func,
    clearBookingNowPoint: PropTypes.func,
    isErrorBookingNowPoint: PropTypes.bool
  }
  state = {
    pickupPointVal: 1,
    desPointVal: 1,
    dataPoint: {
      from: null,
      to: null
    }
  }

  onChangePickupPoint = e => {
    this.setState({
      pickupPointVal: e.target.value
    })
    this.hanldeOnChangeData('from', null)
  }

  onChangeDesPoint = e => {
    this.setState({
      desPointVal: e.target.value
    })
    this.hanldeOnChangeData('to', null)
  }

  hanldeOnChangeData = (type, value) => {
    let dataTemp = this.state.dataPoint
    _set(dataTemp, type, value)
    this.setState(
      {
        dataPoint: dataTemp
      },
      () => {
        this.props.setBookingNowPoint(this.state.dataPoint)
      }
    )
  }

  render() {
    const { busPickup, busDes } = this.props

    return (
      <Wrapper windowWidth={this.props.windowWidth}>
        <div className='pickup-container'>
          <div className='title'>Chọn điểm đón</div>
          <Radio.Group onChange={this.onChangePickupPoint} value={this.state.pickupPointVal}>
            <Radio style={radioStyle} value={1}>
              <Select
                onChange={value => this.hanldeOnChangeData('from', value)}
                value={this.state.pickupPointVal === 1 && this.state.dataPoint.from ? this.state.dataPoint.from : ''}
                size='large'
                placeholder='Chọn bến đón'
                style={{ width: 250 }}
              >
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
              <Input
                onChange={e => {
                  const value = e.target.value
                  this.hanldeOnChangeData('from', value)
                }}
                disabled={this.state.pickupPointVal === 2 ? false : true}
                size='large'
                placeholder='Vị trí cần đón...'
              />
            </Radio>
          </Radio.Group>
          {this.props.isErrorBookingNowPoint && _isEmpty(this.props.BookingNowPoint.from) && (
            <div className='.has-error'>
              <div className='ant-form-explain' style={{ color: 'red' }}>
                Vui lòng nhập điểm đón!
              </div>
            </div>
          )}
        </div>
        <Clearfix height={16} />
        <div className='des-container'>
          <div className='title'>Chọn điểm trả</div>
          <Radio.Group onChange={this.onChangeDesPoint} value={this.state.desPointVal}>
            <Radio style={radioStyle} value={1}>
              <Select
                onChange={value => this.hanldeOnChangeData('to', value)}
                value={this.state.desPointVal === 1 && this.state.dataPoint.to ? this.state.dataPoint.to : ''}
                size='large'
                placeholder='Xuống ở bến'
                style={{ width: 250 }}
              >
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
              <Input
                onChange={e => {
                  const value = e.target.value
                  this.hanldeOnChangeData('to', value)
                }}
                disabled={this.state.desPointVal === 2 ? false : true}
                size='large'
                placeholder='Xuống tận nhà...'
              />
            </Radio>
          </Radio.Group>
          {this.props.isErrorBookingNowPoint && _isEmpty(this.props.BookingNowPoint.to) && (
            <div className='.has-error'>
              <div className='ant-form-explain' style={{ color: 'red' }}>
                Vui lòng nhập điểm trả!
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    )
  }
}
