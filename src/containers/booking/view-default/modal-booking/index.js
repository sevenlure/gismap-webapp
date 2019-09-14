import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Modal, Divider } from 'antd'
import PickupPointContainer from './pickup-point-container'
import ChooseSeatContainer from './choose-seat.container'
import { connect } from 'react-redux'
import { get as _get, map as _map, values as _values, isEmpty as _isEmpty } from 'lodash-es'
import moment from 'moment'
import { HH_MM } from 'src/config/format'
import { formatCurrency } from 'utils/format'
import Router from 'next/router'
import slug from 'src/routes'

const BodyWrapper = styled.div`
  flex: 1;
  .modal--title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .content-booking {
    display: flex;
    ${props => (props.windowWidth < 900 ? 'flex-direction: column;' : '')}

    .pickup-point-container {
      width: ${props => (props.windowWidth < 900 ? '100%;' : '250px;')};
      margin-right: 5%;
    }

    .choose-seat-container {
      width: 100%;
    }
  }

  .footer-booking {
    display: flex;
    justify-content: space-between;

    .footer-booking-left {
      width: 40%;
    }
    .footer-booking-right {
      display: flex;
      justify-content: flex-end;
    }
  }
`

const mapStateToProps = state => ({
  BookingNow: _get(state, 'BookingStore.BookingNow'),
  BookingNowSeat: _get(state, 'BookingStore.BookingNowSeat'),
  BookingNowPoint: _get(state, 'BookingStore.BookingNowPoint')
})

const mapDispatchToProps = {}

// MARK  this.ModalBooking nắm ref của modal-booking
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class ModalBooking extends React.Component {
  static propTypes = {
    BookingNow: PropTypes.object,
    BookingNowSeat: PropTypes.object,
    BookingNowPoint: PropTypes.object,
    getRef: PropTypes.func,
    windowWidth: PropTypes.number
  }

  state = {
    isOpenModal: false,
    isErrorBookingNowPoint: false
  }

  componentDidMount() {
    const { getRef } = this.props
    if (getRef) getRef(this)
  }

  resetData = () => {
    if (this.PickupPointContainer && this.PickupPointContainer.resetData) this.PickupPointContainer.resetData()
  }

  showModal = () => {
    this.setState({
      isOpenModal: true
    })
  }

  closeModal = () => {
    this.setState({
      isOpenModal: false
    })
  }

  hanldeConfirmTicket = () => {
    const { BookingNowPoint } = this.props
    this.setState({
      isErrorBookingNowPoint: false
    })
    if (_isEmpty(BookingNowPoint.from) || _isEmpty(BookingNowPoint.to)) {
      this.setState({
        isErrorBookingNowPoint: true
      })
    } else {
      Router.push(slug.booking.infoCustomer)
    }
  }

  render() {
    // console.log('run 1', this.props.windowWidth)
    // console.log(this.state.isErrorBookingNowPoint, 'isErrorBookingNowPoint')
    const { BookingNow, BookingNowSeat } = this.props

    if (!BookingNow) return null

    const { timeStart, title } = BookingNow
    const timefrom = timeStart
      ? moment(timeStart)
          .startOf('hour')
          .format(HH_MM)
      : ''
    const timeTo = timeStart
      ? moment(timeStart)
          .startOf('hour')
          .add(2, 'hour')
          .format(HH_MM)
      : ''
    const fromDepartureName = _get(BookingNow, 'fromDeparture.name', '')
    const toDepartureName = _get(BookingNow, 'toDeparture.name', '')

    let colored = ''
    let nameSoVe = '- - -'
    let tongTien = '- - -'

    const isConfirmOrderTicket = _values(BookingNowSeat).some(x => x != null)

    if (isConfirmOrderTicket) {
      let tamp = []
      _map(BookingNowSeat, item => {
        if (item && item.name) tamp.push(item.name)
      })
      nameSoVe = tamp.join(', ')

      let tampPrice = 0
      _map(BookingNowSeat, item => {
        if (item && item.price) tampPrice += item.price
      })
      tongTien = formatCurrency(tampPrice) + ' đ'

      colored = '#3880ff'
    }

    return (
      <div>
        <Modal
          width='100%'
          style={{
            padding: this.props.windowWidth > 900 ? '30px 40px' : '16px 24px',
            maxWidth: 992
          }}
          bodyStyle={{
            padding: '30px 5%'
          }}
          visible={this.state.isOpenModal}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          centered
          closable={false}
          footer={null}
        >
          <BodyWrapper windowWidth={this.props.windowWidth}>
            <div className='modal--title'>
              <div>
                <h4>{`${timefrom} -> ${timeTo}`}</h4>
                <strong>
                  {fromDepartureName} {'->'} {toDepartureName}
                </strong>
                <div>
                  <span>{title}</span>
                </div>
              </div>
              <Button style={{ width: 88 }} onClick={this.closeModal} size='large' type='default'>
                Đóng
              </Button>
            </div>
            <Divider type='horizontal' style={{ margin: '16px 0px' }} />
            <div className='content-booking'>
              <div className='pickup-point-container'>
                {(!this.state.isErrorBookingNowPoint || this.state.isErrorBookingNowPoint) && (
                  <PickupPointContainer
                    getRef={ref => (this.PickupPointContainer = ref)}
                    isErrorBookingNowPoint={this.state.isErrorBookingNowPoint}
                  />
                )}
              </div>
              <div className='choose-seat-container'>
                <ChooseSeatContainer />
              </div>
            </div>
            <Divider dashed type='horizontal' style={{ margin: '16px 0px' }} />
            <div className='footer-booking'>
              <div className='footer-booking-left'>
                <span>Vé đã chọn</span>
                <div>
                  <h3 style={{ color: colored }}>{nameSoVe}</h3>
                </div>
              </div>
              <div className='footer-booking-right'>
                <div style={{ width: 120, textAlign: 'right' }}>
                  <span>Tổng tiền</span>
                  <div>
                    <h3 style={{ color: colored }}>{tongTien}</h3>
                  </div>
                </div>
                <Button
                  onClick={this.hanldeConfirmTicket}
                  disabled={!isConfirmOrderTicket}
                  style={{ marginLeft: 30, height: 50, width: 214 }}
                  type='primary'
                >
                  Xác nhận đặt vé
                </Button>
              </div>
            </div>
          </BodyWrapper>
        </Modal>
      </div>
    )
  }
}

export default ModalBooking
