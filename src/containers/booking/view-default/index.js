import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon, Button, Row, Col } from 'antd'
import ArrowIconSvg from 'static/images/icon/ic-arrow.svg'

import { getFormatNumber } from 'src/config/format'

import Clearfix from 'src/components/elements/clearfix'
import { map as _map, get as _get } from 'lodash-es'
import ModalBooking from './modal-booking'
import moment from 'moment'
import { HH_MM } from 'src/config/format'
import { connect } from 'react-redux'
import { setBookingNow, clearBookingNowSeat } from 'src/redux/actions/BookingAction'
import posed from 'react-pose'

const BookingContentDefaultWrapper = styled.div`
  .right-booking--content-body {
    .right-booking--content-body__tb-header-color {
      color: #9ea7d0;
    }

    .right-booking--content-body--item {
      border-radius: 10px;
      border: solid 1px #e6e6e6;
      background-color: white;
      padding: 16px 8px;
      min-height: 112px;
      margin-bottom: 20px;

      .right-booking--content-body__tb-row-time {
        font-family: myFont-Bold;
        color: #4c4c4c;
        font-size: 1.125rem;
      }
      .right-booking--content-body--item__center {
        min-height: calc(112px - 16px - 16px);
        display: flex;
        align-items: center;
      }
    }
  }
`

const RightItemP = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
})

const mapStateToProps = state => ({
  BookingNow: _get(state, 'BookingStore.BookingNow', {})
  // userInfo: _get(state, 'GeneralStore.userInfo', '')
})

const mapDispatchToProps = {
  setBookingNow,
  clearBookingNowSeat
}

// MARK  this.ModalBooking nắm ref của modal-booking
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class BookingContentLaptop extends React.Component {
  static propTypes = {
    BookingNow: PropTypes.object,
    clearBookingNowSeat: PropTypes.func.isRequired,
    dataSearch: PropTypes.any,
    setBookingNow: PropTypes.func.isRequired
  }

  render() {
    return (
      <BookingContentDefaultWrapper>
        <div className='right-booking--content-body'>
          <Row gutter={24} style={{ flex: 1, padding: '0px 8px' }}>
            <Col span={3}>
              <strong className='right-booking--content-body__tb-header-color'>Thời gian</strong>
            </Col>
            <Col span={6}>
              <strong className='right-booking--content-body__tb-header-color'>Điểm đi - Điểm đến</strong>
            </Col>
            <Col span={4}>
              <strong className='right-booking--content-body__tb-header-color'>Loại xe</strong>
            </Col>
            <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
              <strong className='right-booking--content-body__tb-header-color'>Số ghế trống</strong>
            </Col>
            <Col span={7}>
              <strong className='right-booking--content-body__tb-header-color'>Giá vé</strong>
            </Col>
          </Row>
          <Clearfix height={20} />
          <div>
            {this.props.dataSearch &&
              _map(this.props.dataSearch, (item, index) => {
                // console.log('BookingItem', item)
                const timeTo = item.timeStart
                  ? moment(item.timeStart)
                      .startOf('hour')
                      .add(2, 'hour')
                      .format(HH_MM)
                  : ''
                const timefrom = item.timeStart
                  ? moment(item.timeStart)
                      .startOf('hour')
                      .format(HH_MM)
                  : ''

                const fullSeat = item.seatBooked === item.seat ? true : false

                const styleStatus = {
                  backgroundColor: fullSeat ? 'rgba(255, 123, 102, 0.1)' : 'white'
                }
                return (
                  <RightItemP>
                    <Row
                      key={index}
                      gutter={24}
                      style={{ flex: 1, ...styleStatus }}
                      className='right-booking--content-body--item'
                    >
                      <Col span={3}>
                        <div>
                          <span className='right-booking--content-body__tb-row-time'>{timefrom}</span>
                        </div>
                        <div>
                          <Icon style={{ fontSize: '1.5rem' }} component={ArrowIconSvg} />
                        </div>
                        <div>
                          <span className='right-booking--content-body__tb-row-time'>{timeTo}</span>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div>
                          <span>{_get(item, 'fromDeparture.name', '')}</span>
                        </div>
                        <div>
                          <Icon style={{ fontSize: '1.5rem' }} component={ArrowIconSvg} />
                        </div>
                        <div>
                          <span>{_get(item, 'toDeparture.name', '')}</span>
                        </div>
                      </Col>
                      <Col span={4} className='right-booking--content-body--item__center'>
                        <span>{item.title}</span>
                      </Col>
                      <Col
                        span={4}
                        style={{ justifyContent: 'center' }}
                        className='right-booking--content-body--item__center'
                      >
                        {!fullSeat && <strong style={{ color: '#ff7b66' }}>{`${item.seatBooked}/${item.seat}`}</strong>}
                        {fullSeat && <span>{`Hết chỗ`}</span>}
                      </Col>
                      <Col
                        span={7}
                        className='right-booking--content-body--item__center'
                        style={{ justifyContent: 'space-between' }}
                      >
                        <div>
                          <h3 style={{ fontSize: '1.25rem', margin: '0px' }}>{getFormatNumber(item.price)}</h3>
                        </div>

                        {!fullSeat && (
                          <div>
                            <Button
                              type='primary'
                              onClick={() => {
                                try {
                                  console.log('this.props.BookingNow', this.props.BookingNow)
                                  if (this.props.BookingNow && this.props.BookingNow.id !== item.id) {
                                    this.props.clearBookingNowSeat()
                                    this.ModalBooking.resetData()
                                  }
                                  this.props.setBookingNow(item)
                                  this.ModalBooking.showModal()
                                } catch (e) {
                                  console.log('loi this.ModalBooking.showModal()', e)
                                }
                              }}
                            >
                              Đặt vé
                            </Button>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </RightItemP>
                )
              })}
          </div>
        </div>

        <ModalBooking getRef={ref => (this.ModalBooking = ref)} />
      </BookingContentDefaultWrapper>
    )
  }
}

export default BookingContentLaptop
