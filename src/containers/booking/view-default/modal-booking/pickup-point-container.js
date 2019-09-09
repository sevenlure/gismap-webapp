import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Radio, Input, Select } from 'antd'
// import IconSvg from 'icons'
import Clearfix from 'src/components/elements/clearfix'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { get as _get, set as _set, isEmpty as _isEmpty } from 'lodash-es'
import { setBookingNowPoint, clearBookingNowPoint } from 'src/redux/actions/BookingAction'

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

  static defaultProps = {
    busPickup: [],
    busDes: []
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
    console.log('radio checked', e.target.value)
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

  componentDidMount = () => {
    this.props.clearBookingNowPoint()
  }
  render() {
    // console.log(this.state.dataPoint, 'dataPoint')
    const { busPickup, busDes } = this.props

    return (
      <Wrapper windowWidth={this.props.windowWidth}>
        <div className='pickup-container'>
          <div className='title'>Chọn điểm đón</div>
          <Radio.Group onChange={this.onChangePickupPoint} value={this.state.pickupPointVal}>
            <Radio style={radioStyle} value={1}>
              <Select
                onChange={value => this.hanldeOnChangeData('from', value)}
                value={
                  this.state.pickupPointVal === 1 && this.state.dataPoint.from ? this.state.dataPoint.from : undefined
                }
                disabled={this.state.pickupPointVal === 1 ? false : true}
                size='large'
                placeholder='Chọn bến đón'
                style={{ width: 200 }}
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
                style={{ width: 200 }}
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
                value={this.state.desPointVal === 1 && this.state.dataPoint.to ? this.state.dataPoint.to : undefined}
                disabled={this.state.desPointVal === 1 ? false : true}
                size='large'
                placeholder='Xuống ở bến'
                style={{ width: 200 }}
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
                style={{ width: 200 }}
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
