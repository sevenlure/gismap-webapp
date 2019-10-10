import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { connect } from 'react-redux'
import { Row, Col, Radio, Skeleton, Button } from 'antd'
import AvatarUserv2 from 'src/containers/auth/avatar-user-v2.js'
import DefaultLayout from 'src/layout/default'
import Clearfix from 'src/components/elements/clearfix'
import windowSize from 'react-window-size'
import BookingItem from 'src/components/elements/booking-item'
import { connect } from 'react-redux'
import { paymentBooking, paymentBoked } from 'src/api/paymentApi'
import { get as _get, map as _map, values as _values } from 'lodash-es'
import moment from 'moment'
import { HH_MM } from 'src/config/format'
import Router from 'next/router'
import slug from 'src/routes'

moment.updateLocale('en', {
  weekdays: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
})

const ProfilePageWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;

  .page--content {
    max-width: 682px;
    width: 100%;
    margin: 50px 0px;

    .page--content--wrapper-tab {
      border-radius: 20px;
      border: 1px dashed #9ea7d0;
     
      ${props => (props.windowWidth >= 992 ? '  padding: 40px 30px;' : '')}
      ${props => (props.windowWidth >= 576 ? ' padding: 30px 20px;' : '')}
      ${props => (props.windowWidth < 576 ? ' padding: 20px 10px; border:none;' : '')}

      // NOTE  tab
      .page--content--tab {
        flex: 1;
        display: flex;
        justify-content: center;

        // NOTE Customer Radius
        .ant-radio-group {
          display: flex;
          border-radius: 36px;
          border: none;
          background-color: #f2f3f7;

          .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
            color: #fff;
            background: #3880ff;
            outline: none;
          }
          .ant-radio-button-wrapper {
            display: flex;
            min-height:50px;
            justify-content: center;
            align-items: center;
            border-radius: 36px;
            border: none;
            background-color: #f2f3f7;
            ${props => (props.windowWidth >= 576 ? ' padding-left: 83px; padding-right: 83px;' : '')}
            ${props => (props.windowWidth >= 992 ? ' padding-left: 83px; padding-right: 83px;' : '')}
            ${props => (props.windowWidth < 576 ? 'padding-left: 24px; padding-right: 24px;' : '')}
           
          }
        }
      }
      
    }
  }
`
const keyDefault = 'ticektBooking'
const mapStateToProps = state => ({
  userInfo: _get(state, 'GeneralStore.userInfo', null)
})

@connect(
  mapStateToProps,
  {}
)
@windowSize
class ProfilePage extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    userInfo: PropTypes.object
  }

  state = {
    keyTab: keyDefault,
    isLoading: false,
    isHaveData: false,
    dataList: []
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
      isHaveData: false
    })
    let dataList = await this.fetchData(keyDefault)
    console.log(dataList, 'dataList')
    if (dataList && dataList.length > 0) {
      this.setState({
        keyTab: keyDefault,
        isLoading: false,
        dataList: dataList,
        isHaveData: dataList && dataList.length > 0 ? true : false
      })
    } else {
      dataList = await this.fetchData('ticketBooked')
      this.setState({
        keyTab: 'ticketBooked',
        isLoading: false,
        dataList: dataList,
        isHaveData: dataList && dataList.length > 0 ? true : false
      })
    }
  }

  hanldeOnChange = async e => {
    this.setState({
      isLoading: true,
      isHaveData: false
    })
    const key = e.target.value

    const dataList = await this.fetchData(key)
    setTimeout(() => {
      this.setState({
        keyTab: key,
        isLoading: false,
        dataList: dataList,
        isHaveData: dataList && dataList.length > 0 ? true : false
      })
    }, 500)
  }

  fetchData = async key => {
    const { userInfo } = this.props
    const token = _get(userInfo, 'phone', null)
    try {
      if (key === 'ticektBooking') {
        if (token) {
          const res = await paymentBooking({ token })
          if (res.status === 200) {
            // console.log(res.data, 'Data')
            return res.data
          }
        }
      } else {
        if (token) {
          const res = await paymentBoked({ token })
          if (res.status === 200) {
            // console.log(res.data, 'Data')
            return res.data
          }
        }
      }
    } catch (ex) {
      console.log(key, ex)
      return []
    }
  }

  render() {
    const backgroundColor = this.state.keyTab === keyDefault ? '#f2f3f7' : '#fff'
    const messageNotHave =
      this.state.keyTab === keyDefault
        ? 'Quý khách đang không có vé chưa hoàn thành.'
        : 'Bạn chưa đặt vé, hãy thử trải nghiệm.'

    console.log(this.state.keyTab, 'backgroundColor')
    return (
      <ProfilePageWrapper windowWidth={this.props.windowWidth}>
        <div className='page--content'>
          <AvatarUserv2 />
          <Clearfix height={30} />
          <Row className='page--content--wrapper-tab'>
            <Col>
              <div className='page--content--tab'>
                <Row type={'flex'}>
                  <Radio.Group
                    defaultValue={this.state.keyTab}
                    value={this.state.keyTab}
                    onChange={this.hanldeOnChange}
                    size='large'
                    buttonStyle='solid'
                  >
                    <Col>
                      <Radio.Button value='ticketBooked'>Vé đã đặt</Radio.Button>
                    </Col>
                    <Col>
                      <Radio.Button value='ticektBooking'>Vé đang đặt</Radio.Button>
                    </Col>
                  </Radio.Group>
                </Row>
              </div>
            </Col>
            <Clearfix height={30} />
            {this.state.isLoading && (
              <div>
                <Skeleton active />
                <Clearfix height={20} />
                <Skeleton active />
              </div>
            )}

            {!this.state.isLoading && this.state.isHaveData && (
              <div>
                {_map(this.state.dataList, (item, index) => {
                  const { bookingInfo } = item
                  let timeTo, timeFrom, from, to, typeCar, dateStart
                  if (bookingInfo.BookingNow) {
                    const BookingNow = bookingInfo.BookingNow
                    timeTo = BookingNow.timeStart
                      ? moment(BookingNow.timeStart)
                          .startOf('hour')
                          .add(2, 'hour')
                          .format(HH_MM)
                      : ''
                    timeFrom = BookingNow.timeStart
                      ? moment(BookingNow.timeStart)
                          .startOf('hour')
                          .format(HH_MM)
                      : ''
                    from = _get(BookingNow, 'fromDeparture.name', '')
                    to = _get(BookingNow, 'toDeparture.name', '')
                    typeCar = _get(BookingNow, 'title', '')
                    dateStart = BookingNow.timeStart
                      ? moment(BookingNow.timeStart).format('dddd [, Ngày] DD/MM/YYYY')
                      : ''
                  } else {
                    return null
                  }
                  let strSeat
                  if (bookingInfo.BookingNowSeat) {
                    const BookingNowSeat = bookingInfo.BookingNowSeat
                    strSeat = _map(_values(BookingNowSeat), item => {
                      return item.name
                    }).join(', ')
                  }
                  return (
                    <Col key={index}>
                      <BookingItem
                        timeFrom={timeFrom}
                        timeTo={timeTo}
                        from={from}
                        to={to}
                        typeCar={typeCar}
                        seat={strSeat}
                        dateStart={dateStart}
                        backgroundColor={backgroundColor}
                      />
                      <Clearfix height={20} />
                    </Col>
                  )
                })}
              </div>
            )}
            {!this.state.isLoading && !this.state.isHaveData && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                  <span>{messageNotHave}</span>
                </div>
                <Clearfix height={20} />
                <div>
                  <Button
                    type='default'
                    size='large'
                    onClick={() => {
                      Router.push(slug.booking.base)
                    }}
                  >
                    Đặt vé ngay
                  </Button>
                </div>
              </div>
            )}
          </Row>
        </div>
      </ProfilePageWrapper>
    )
  }
}

ProfilePage.Layout = DefaultLayout
export default ProfilePage
