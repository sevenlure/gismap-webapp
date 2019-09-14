import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Result, Button, Divider, Icon } from 'antd'
import icons from 'icons'
import DefaultLayout from 'src/layout/default'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import Clearfix from 'src/components/elements/clearfix'
import ResultSuccess from 'static/images/icon/ic-result-error.svg'
import Router from 'next/router'
import slug from 'src/routes'
import moment from 'moment'
import { get as _get } from 'lodash-es'
import { DATETIME_FORMAT_v2, HH_MM } from 'src/config/format'

const ResultPageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
class ResultPage extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    paymentInfoTicket: PropTypes.object
  }
  hanldeToHome = () => {
    // console.log(slug.basic,"slug.base")
    Router.push(slug.basic)
  }

  hanldeAgain = () =>{
    Router.push(slug.booking.base)
  }
  renderTitle = () => {
    const { paymentInfoTicket } = this.props
    const datePayment = moment(_get(paymentInfoTicket, 'createdAt')).format(DATETIME_FORMAT_v2)
    return (
      <div>
        <h4>Thanh toán thất bại</h4>
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
      dateStart = moment(BookingNow.timeStart).format('[Ngày,] DD [Tháng,] MM [Năm] YYYY, ')
      from = _get(BookingNow, 'fromDeparture.name', '')
      to = _get(BookingNow, 'toDeparture.name', '')
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
        <Clearfix height={24} />
        <Row gutter={8}>
          <Col xs={12} sm={12} lg={12}>
            <Button style={{ width: '100%' }} type='default' onClick={this.hanldeToHome}>
              Về trang chủ
            </Button>
          </Col>
          <Col xs={12} sm={12} lg={12}>
            <Button style={{ width: '100%' }} type='danger' onClick={this.hanldeAgain}>
              Thử lại
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return (
      <ResultPageWrapper windowWidth={this.props.windowWidth}>
        <Clearfix height={60} />
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

ResultPage.Layout = DefaultLayout
export default ResultPage
