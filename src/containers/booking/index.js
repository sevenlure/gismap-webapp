import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Select, Input, Divider, Icon, Timeline, Button, Row, Col } from 'antd'
import IconSvg from 'icons'
import windowSize from 'react-window-size'

import FromSelectIconSvg from 'static/images/icon/ic-arrow-map-from-select.svg'
import ToSelectIconSvg from 'static/images/icon/ic-arrow-map-to-select.svg'
import BookingContentDefault from 'src/containers/booking/view-default'
import BookingContentMobile from 'src/containers/booking/view-mobile'

import Clearfix from 'src/components/elements/clearfix'
import { map as _map, set as _set } from 'lodash-es'
import DateStepPicker from 'src/components/elements/date-step-picker'
const { Option } = Select

const BookingContainer = styled.div`
  flex: 1;
  display: flex;

  .left-booking {
    width: 400px;
    // height: 1024px;
    box-shadow: 1px 0 0 0 #e6e6e6;
    background-color: #fff;
    .left-booking--content {
      padding: 24px;
      .select{
        background-color: rgb(56, 128, 255, 0.4);
      }
      .select > span {
        font-weight: 500;
        font-family: HelveticaNeue-Medium;
        color: #3880ff;
      }
      .left-booking--content__border{
        padding: 8px 0px 8px 16px;
        border-radius: 4px;
        border: solid 1px #e6e6e6;
      }
      .left-booking--content__title {
        font-size: 1.125rem;
        padding-bottom:16px;
      }


        .left-booking--content--trip{
            .ant-timeline-item-head-custom{
                top: 15px;
            }
            .ant-timeline-item-content{
                top:0px;
                margin-left: 30px;
            }
            .ant-timeline-item{
                padding: 0 0 1px;
                .ant-timeline-item-tail{
                    border-left: 7px dotted #d2d3db;
                    position: absolute;
                    top: 7px;
                    left: 0px;
                    padding-bottom: 1px;
                }
            }

            .ant-timeline-item-last{
                padding: 0px;  
            }
            .ant-timeline-item-last > .ant-timeline-item-content {
                min-height: 0px;
            }
        }
          
      }
    }
  }

  .right-booking {
    flex: 1;
    background: #f2f3f7;

    .right-booking--content {
      .right-booking--content--header {
        padding: 20px;
        display: flex;
        justify-content: space-between;
      }
      
    }
  }
`

@windowSize
class Booking extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number
  }
  state = {
    dataTimeSlot: [
      {
        id: 1,
        name: 'Tất cả'
      },
      {
        id: 2,
        name: '0:00 - 6:00'
      },
      {
        id: 3,
        name: '6:00 - 12:00'
      },
      {
        id: 4,
        name: '12:00 - 18:00'
      },
      {
        id: 5,
        name: '18:00 - 00:00'
      }
    ],
    dataSeatType: [
      {
        id: 1,
        name: 'Tất cả'
      },
      {
        id: 2,
        name: ' Ghế thường'
      },
      {
        id: 3,
        name: 'Ghế giường nằm'
      }
    ],
    datafilter: {
      timeSlotId: 1,
      seatType: 1
    },
    dataSearch: [
      {
        fromTime: '05:00',
        toTime: '07:00',
        from: 'Tây Ninh',
        to: 'Quận 10, Hồ Chí Minh',
        typeCar: 'Limousine 9 chỗ',
        seat: '3/9',
        price: 65000,
        fullSeat: false
      },
      {
        fromTime: '05:00',
        toTime: '07:00',
        from: 'Tây Ninh',
        to: 'Quận 10, Hồ Chí Minh',
        typeCar: 'Limousine 9 chỗ',
        seat: '1/9',
        price: 100000,
        fullSeat: false
      },
      {
        fromTime: '05:00',
        toTime: '07:00',
        from: 'Tây Ninh',
        to: 'Quận 10, Hồ Chí Minh',
        typeCar: 'Ghế ngồi 16 chỗ',
        seat: 'Hết chỗ',
        price: 100000,
        fullSeat: true
      },
      {
        fromTime: '05:00',
        toTime: '07:00',
        from: 'Tây Ninh',
        to: 'Quận 10, Hồ Chí Minh',
        typeCar: 'Limousine 9 chỗ',
        seat: '4/9',
        price: 100000,
        fullSeat: false
      }
    ]
  }

  onChangeFilter(type, value) {
    let tempData = this.state.datafilter
    _set(tempData, type, value)
    this.setState({
      datafilter: {
        ...tempData
      }
    })
  }

  render() {
    let isVisibleFilter = true
    let isViewDefault = true
    if (this.props.windowWidth < 1024) {
      isVisibleFilter = false
    }
    if (this.props.windowWidth < 576) {
      isViewDefault = false
    }
    return (
      <BookingContainer>
        {isVisibleFilter && (
          <div className='left-booking'>
            <div className='left-booking--content'>
              <div className='left-booking--content--trip'>
                <h3 className='left-booking--content__title'>Tuyến đi</h3>
                <div className='left-booking--content__border'>
                  <Timeline>
                    <Timeline.Item
                      dot={<Icon style={{ fontSize: '1.5rem' }} component={FromSelectIconSvg} />}
                      color='red'
                    >
                      <div>
                        <span style={{ fontSize: '1.25rem' }}>Tây Ninh</span>
                      </div>
                      <Divider style={{ margin: '20px 0px 20px 0px' }} />
                    </Timeline.Item>
                    <Timeline.Item
                      dot={<Icon style={{ fontSize: '1.5rem' }} component={ToSelectIconSvg} />}
                      color='red'
                    >
                      <span style={{ fontSize: '1.25rem' }}>Hồ Chí Minh</span>
                    </Timeline.Item>
                  </Timeline>
                </div>
              </div>
              <Clearfix height={45} />
              <div className='left-booking--content--date--picker'>
                <h3 className='left-booking--content__title'>Thời gian khởi hành</h3>
                <div>
                  <DateStepPicker />
                </div>
              </div>
              <Clearfix height={45} />
              <div className='left-booking--content--time-slot'>
                <h3 className='left-booking--content__title'>Khung giờ</h3>
                <div>
                  {_map(this.state.dataTimeSlot, item => {
                    return (
                      <Button
                        key={item.id}
                        style={{ padding: '0px 10px', margin: '0px 12px 12px 0px' }}
                        type='default'
                        shape='round'
                        className={item.id === this.state.datafilter.timeSlotId ? 'select' : ''}
                        onClick={() => this.onChangeFilter('timeSlotId', item.id)}
                      >
                        {item.name}
                      </Button>
                    )
                  })}
                </div>
              </div>
              <Clearfix height={45} />
              <div className='left-booking--content--seat-type'>
                <h3 className='left-booking--content__title'>Loại ghế</h3>
                <div>
                  {_map(this.state.dataSeatType, item => {
                    return (
                      <Button
                        key={item.id}
                        style={{ padding: '0px 10px', margin: '0px 12px 12px 0px' }}
                        type='default'
                        shape='round'
                        className={item.id === this.state.datafilter.seatType ? 'select' : ''}
                        onClick={() => this.onChangeFilter('seatType', item.id)}
                      >
                        {item.name}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='right-booking'>
          <div className='right-booking--content'>
            <div className='right-booking--content--header'>
              <Row gutter={8} style={{ flex: 1 }}>
                {!isVisibleFilter && (
                  <Col xs={8} sm={4}>
                    <Button size='large' type='primary' style={{ width: '100%' }} icon='filter'>
                      Bộ lọc
                    </Button>
                  </Col>
                )}
                <Col xs={16} sm={20} lg={10} style={{ marginBottom: '8px' }}>
                  <Select size='large' defaultValue='timeRunAsc' style={{ width: '100%' }}>
                    <Option value='timeRunAsc'>Giờ chạy tăng dần</Option>
                    <Option value='timeRunDesc'>Giờ chạy giảm dần</Option>
                  </Select>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  lg={14}
                  // style={{ height: '100%' }
                >
                  <Input
                    style={{ width: '100%' }}
                    size='large'
                    placeholder='Nhập từ khóa cần tìm kiếm...'
                    prefix={<Icon component={IconSvg.search} />}
                  />
                </Col>
              </Row>
            </div>
            <Divider style={{ margin: 0 }} />
            {isViewDefault && <BookingContentDefault dataSearch={this.state.dataSearch} />}
            {!isViewDefault && <BookingContentMobile dataSearch={this.state.dataSearch} />}
          </div>
        </div>
      </BookingContainer>
    )
  }
}

export default Booking
