import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Row, Card } from 'antd'

import { getFormatNumber } from 'src/config/format'

import Clearfix from 'src/components/elements/clearfix'
import { map as _map, get as _get } from 'lodash-es'
import moment from 'moment'
import { HH_MM } from 'src/config/format'
import ModalBooking from './modal-booking'
import { connect } from 'react-redux'
import { setBookingNow, clearBookingNowSeat } from 'src/redux/actions/BookingAction'

const BookingContentDefaultWrapper = styled.div`
  .right-booking--content-body {
    .list--content--card {
      max-width: 360px;
      border-radius: 10px;
      .ant-card-body {
        padding: 20px;
      }
      .list--content--card--row {
        // padding-left: 20px;
      }
      .list--content--card--price {
        // padding-left: 20px;
        font-size: 1.5rem;
        font-family: myFont-Medium;
      }
    }
  }
`

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
          {this.props.dataSearch &&
            _map(this.props.dataSearch, (item, index) => {
              const timefrom = item.timeStart
                ? moment(item.timeStart)
                    .startOf('hour')
                    .format(HH_MM)
                : ''
              const timeTo = item.timeStart
                ? moment(item.timeStart)
                    .startOf('hour')
                    .add(2, 'hour')
                    .format(HH_MM)
                : ''

              const fullSeat = item.seatBooked === item.seat ? true : false

              const styleStatus = {
                backgroundColor: fullSeat ? 'rgba(255, 123, 102, 0.1)' : 'white'
              }

              return (
                <Row key={index} gutter={8} style={{ flex: 1, marginBottom: '20px' }}>
                  <Card
                    style={{ ...styleStatus }}
                    key={item.id}
                    className='list--content--card'
                    bordered
                    // cover={<img width={370} height={180} alt='' src={`${process.env.HOST_MEDIA}${item.image}`} />}
                  >
                    <div>
                      <div className='list--content--card--row'>
                        <strong>{`${_get(item, 'fromDeparture.name', '')} -> ${_get(
                          item,
                          'toDeparture.name',
                          ''
                        )}`}</strong>
                      </div>
                      <Clearfix height={7} />
                      <div className='list--content--card--row'>
                        <strong>Thời gian: </strong> <span>{`${timefrom} - ${timeTo}`}</span>
                      </div>
                      <Clearfix height={7} />
                      <div className='list--content--card--row'>
                        <strong>Loại xe: </strong> <span> {`${item.title}`}</span>
                      </div>
                      <Clearfix height={7} />
                      <div className='list--content--card--row'>
                        <strong>Số ghế: </strong>
                        {!fullSeat && <strong style={{ color: '#ff7b66' }}>{`${item.seatBooked}/${item.seat}`}</strong>}
                        {fullSeat && <span>{'Hết chỗ'}</span>}
                      </div>
                      <Clearfix height={10} />
                      <div className='list--content--card--price'>{getFormatNumber(item.price)} đ</div>
                      <Clearfix height={10} />
                      {!fullSeat && (
                        <div>
                          <Button
                            type='primary'
                            onClick={() => {
                              console.log('this.props.BookingNow', this.props.BookingNow)
                              if (this.props.BookingNow && this.props.BookingNow.id !== item.id) {
                                this.props.clearBookingNowSeat()
                                this.ModalBooking.resetData()
                              }
                              this.props.setBookingNow(item)
                              this.ModalBooking.showModal()
                            }}
                          >
                            Đặt vé
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </Row>
              )
            })}
        </div>

        <ModalBooking getRef={ref => (this.ModalBooking = ref)} />
      </BookingContentDefaultWrapper>
    )
  }
}

export default BookingContentLaptop
