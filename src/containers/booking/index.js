import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Select, Input, Divider, Icon, Timeline, Button } from 'antd'
import IconSvg from 'icons'

import FromSelectIconSvg from 'static/images/icon/ic-arrow-map-from-select.svg'
import ToSelectIconSvg from 'static/images/icon/ic-arrow-map-to-select.svg'
import Clearfix from 'src/components/elements/clearfix'

const { Option } = Select

const BookingContainer = styled.div`
  flex: 1;
  display: flex;

  .left-booking {
    width: 472px;
    height: 1024px;
    box-shadow: 1px 0 0 0 #e6e6e6;
    background-color: #fff;
    .left-booking--content {
      padding: 24px;
      .left-booking--content__border{
        padding: 30px 0px 30px 20px;
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
        padding: 24px;
        display: flex;
        justify-content: space-between;
      }
      .right-booking--content--body {
        padding: 24px;
      }
    }
  }
`

class Booking extends React.Component {
  static propTypes = {}

  render() {
    console.log('11')
    return (
      <BookingContainer>
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

                  <Timeline.Item dot={<Icon style={{ fontSize: '1.5rem' }} component={ToSelectIconSvg} />} color='red'>
                    <span style={{ fontSize: '1.25rem' }}>Hồ Chí Minh</span>
                  </Timeline.Item>
                </Timeline>
              </div>
            </div>
            <Clearfix height={45} />
            <div className='left-booking--content--time-slot'>
              <h3 className='left-booking--content__title'>Khung giờ</h3>
              <div>
                <Button style={{ marginRight: '12px' }} type='default' shape='round' size='large'>
                  Tất cả
                </Button>
                <Button type='default' shape='round' size='large'>
                  0:00 - 6:00
                </Button>
              </div>
            </div>
            {/* <div className='left-booking--content--day'>
              <h3 className='left-booking--content__title'>Thời gian khởi hành</h3>
            </div>
            <div className='left-booking--content--seat-type'>
              <h3 className='left-booking--content__title'>Loại ghế</h3>
            </div> */}
          </div>
        </div>
        <div className='right-booking'>
          <div className='right-booking--content'>
            <div className='right-booking--content--header'>
              <Select size='large' defaultValue='timeRunAsc' style={{ width: 208 }}>
                <Option value='timeRunAsc'>Giờ chạy tăng dần</Option>
                <Option value='timeRunDesc'>Giờ chạy giảm dần</Option>
              </Select>
              <Input
                style={{ width: 320 }}
                size='large'
                placeholder='Nhập từ khóa cần tìm kiếm...'
                prefix={<Icon component={IconSvg.search} />}
              />
            </div>
            <Divider style={{ margin: 0 }} />
            <div className='right-booking--content--body'>
              <h3>Body</h3>
            </div>
          </div>
        </div>
      </BookingContainer>
    )
  }
}

export default Booking
