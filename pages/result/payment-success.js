import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Result, Button, Icon, Divider, Row, Col } from 'antd'
import icons from 'icons'
import DefaultLayout from 'src/layout/default'
import windowSize from 'react-window-size'
import Clearfix from 'src/components/elements/clearfix'
import ResultSuccess from 'static/images/icon/ic-result-success.svg'
import Router from 'next/router'
import slug from 'src/routes'
import AvatarUser from 'src/containers/auth/avatar-user'
import { get as _get, map as _map, values as _values } from 'lodash-es'
import moment from 'moment'
import { DATETIME_FORMAT_v2, HH_MM } from 'src/config/format'

const ResultPageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ant-result-title {
    line-height: normal;
  }
  .result--containt {
    width: 100%;
    padding: 24px;
    max-width: 496px;
  }
`

const mapStateToProps = state => ({
  paymentInfoTicket: _get(state, 'PaymentStore.paymentInfoTicket', {})
})

const mapDispatchToProps = {}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@windowSize
class PaymentSuccessPage extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    paymentInfoTicket: PropTypes.object
  }

  hanldeToHome = () => {
    // console.log(slug.basic,"slug.base")
    Router.push(slug.basic)
  }

  renderTitle = () => {
    const { paymentInfoTicket } = this.props
    const datePayment = moment(_get(paymentInfoTicket, 'createdAt')).format(DATETIME_FORMAT_v2)
    return (
      <div>
        <h4>Thanh toán thành công</h4>
        <span style={{ fontSize: '1rem', color: '#9ea7d0' }}>{datePayment}</span>
        <Divider />
      </div>
    )
  }
  renderExtra = () => {
    const { paymentInfoTicket } = this.props

    let timeTo, timefrom, dateStart, from, to
    const BookingNow = _get(paymentInfoTicket, 'bookingInfo.BookingNow', null)
    if (BookingNow) {
      timeTo = BookingNow.timeStart
        ? moment(BookingNow.timeStart)
            .startOf('hour')
            .add(2, 'hour')
            .format(HH_MM)
        : ''
      timefrom = BookingNow.timeStart
        ? moment(BookingNow.timeStart)
            .startOf('hour')
            .format(HH_MM)
        : ''
      dateStart = moment(BookingNow.timeStart).format('[Ngày] DD[, Tháng] MM[, Năm] YYYY ')
      from = _get(BookingNow, 'fromDeparture.name', '')
      to = _get(BookingNow, 'toDeparture.name', '')
    }

    const BookingNowPoint = _get(paymentInfoTicket, 'bookingInfo.BookingNowPoint', null)
    let pointFrom, pointTo
    if (BookingNowPoint) {
      pointFrom = BookingNowPoint.from
      pointTo = BookingNowPoint.to
    }

    const BookingNowSeat = _get(paymentInfoTicket, 'bookingInfo.BookingNowSeat', null)
    let strSeat
    if (BookingNowSeat) {
      strSeat = _map(_values(BookingNowSeat), item => {
        return item.name
      }).join(', ')
    }

    const BookingNowInfoCustomer = _get(paymentInfoTicket, 'bookingInfo.BookingNowInfoCustomer', null)
    let nameCustomer, phone
    if (BookingNowInfoCustomer) {
      nameCustomer = BookingNowInfoCustomer.fullName
      phone = BookingNowInfoCustomer.phone
    }

    const paymentInfo = _get(paymentInfoTicket, 'paymentInfo', null)
    let paymenMethodName
    if (paymentInfo) {
      paymenMethodName = _get(paymentInfo, 'name', '')
    }

    return (
      <div>
        <Row type='flex' justify='start'>
          <Col>
            <div style={{ textAlign: 'left' }}>
              <span style={{ color: '#9ea7d0' }}>Thời gian</span>
              <br />
              <h3 style={{ margin: '0px' }}>
                <strong>
                  {timefrom} <Icon component={icons.arrowNext} /> {timeTo}
                </strong>
              </h3>
              <span>{dateStart}</span>
            </div>
          </Col>
        </Row>
        <Clearfix height={20} />
        <Row type='flex' justify='start'>
          <Col>
            <div style={{ textAlign: 'left' }}>
              <span style={{ color: '#9ea7d0' }}>Tuyến xe</span>
              <br />
              <span>{`${from} -> ${to}`}</span>
            </div>
          </Col>
        </Row>
        <Clearfix height={20} />
        <Row type='flex' justify='start'>
          <Col>
            <div style={{ textAlign: 'left' }}>
              <span style={{ color: '#9ea7d0' }}>Đón tại</span>
              <br />
              <span>{pointFrom}</span>
            </div>
          </Col>
        </Row>
        <Clearfix height={20} />
        <Row type='flex' justify='start'>
          <Col>
            <div style={{ textAlign: 'left' }}>
              <span style={{ color: '#9ea7d0' }}>Trả khách tại</span>
              <br />
              <span>{pointTo}</span>
            </div>
          </Col>
        </Row>
        <Clearfix height={20} />
        <Row type='flex' justify='start'>
          <Col>
            <div style={{ textAlign: 'left' }}>
              <span style={{ color: '#9ea7d0' }}>Ghế đã đặt</span>
              <br />
              <h5 style={{ margin: '0px' }}>
                <strong>{strSeat}</strong>
              </h5>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row type='flex' justify='start'>
          <Col>
            <div style={{ display: 'flex' }}>
              <div>
                <AvatarUser disabled={true} />
              </div>
              <div style={{ paddingLeft: 16, textAlign: 'left' }}>
                <strong>{nameCustomer}</strong>
                <br />
                <span>{phone}</span>
              </div>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <strong style={{ fontSize: '0.875rem' }}>Thanh toán bằng {paymenMethodName}</strong>
            </div>
            <div>
              <Icon style={{ fontSize: '1.5rem' }} component={icons.check} />
            </div>
          </Col>
        </Row>
        <Clearfix height={24} />
        <Row>
          <Col>
            <Button type='default' onClick={this.hanldeToHome}>
              Về trang chủ
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return (
      <ResultPageWrapper windowWidth={this.props.windowWidth}>
        <Clearfix height={16} />
        <div className='result--containt'>
          <Result
            title={this.renderTitle()}
            icon={<Icon style={{ fontSize: '3.5rem' }} component={ResultSuccess} />}
            extra={this.renderExtra()}
          />
        </div>
      </ResultPageWrapper>
    )
  }
}

PaymentSuccessPage.Layout = DefaultLayout
export default PaymentSuccessPage
