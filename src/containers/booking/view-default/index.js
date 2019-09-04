import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon, Button, Row, Col } from 'antd'
import ArrowIconSvg from 'static/images/icon/ic-arrow.svg'

import { getFormatNumber } from 'src/config/format'

import Clearfix from 'src/components/elements/clearfix'
import { map as _map } from 'lodash-es'

const BookingContentDefaultWrapper = styled.div`
  .right-booking--content-body {
    padding: 30px;
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

class BookingContentLaptop extends React.Component {
  static propTypes = {
    dataSearch: PropTypes.any
  }

  render() {
    return (
      <BookingContentDefaultWrapper>
        <div className='right-booking--content-body'>
          <Row gutter={8} style={{ flex: 1, padding: '0px 8px' }}>
            <Col span={3}>
              <strong className='right-booking--content-body__tb-header-color'>Thời gian</strong>
            </Col>
            <Col span={6}>
              <strong className='right-booking--content-body__tb-header-color'>Điểm đi - Điểm đến</strong>
            </Col>
            <Col span={5}>
              <strong className='right-booking--content-body__tb-header-color'>Loại xe</strong>
            </Col>
            <Col span={3}>
              <strong className='right-booking--content-body__tb-header-color'>Số ghế trống</strong>
            </Col>
            <Col span={7}>
              <strong className='right-booking--content-body__tb-header-color'>Giá vé</strong>
            </Col>
          </Row>
          <Clearfix height={20} />

          {this.props.dataSearch &&
            _map(this.props.dataSearch, (item, index) => {
              const styleStatus = {
                backgroundColor: item.fullSeat ? 'rgba(255, 123, 102, 0.1)' : 'white'
              }

              return (
                <Row
                  key={index}
                  gutter={8}
                  style={{ flex: 1, ...styleStatus }}
                  className='right-booking--content-body--item'
                >
                  <Col span={3}>
                    <div>
                      <span className='right-booking--content-body__tb-row-time'>{item.fromTime}</span>
                    </div>
                    <div>
                      <Icon style={{ fontSize: '1.5rem' }} component={ArrowIconSvg} />
                    </div>
                    <div>
                      <span className='right-booking--content-body__tb-row-time'>{item.toTime}</span>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <span>{item.from}</span>
                    </div>
                    <div>
                      <Icon style={{ fontSize: '1.5rem' }} component={ArrowIconSvg} />
                    </div>
                    <div>
                      <span>{item.to}</span>
                    </div>
                  </Col>
                  <Col span={5} className='right-booking--content-body--item__center'>
                    <span>{item.typeCar}</span>
                  </Col>
                  <Col
                    span={3}
                    style={{ justifyContent: 'center' }}
                    className='right-booking--content-body--item__center'
                  >
                    {item.fullSeat && <strong style={{ color: '#ff7b66' }}>{item.seat}</strong>}
                    {!item.fullSeat && <span>{item.seat}</span>}
                  </Col>
                  <Col
                    span={7}
                    className='right-booking--content-body--item__center'
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.25rem', margin: '0px' }}>{getFormatNumber(item.price)}</h3>
                    </div>

                    {!item.fullSeat && (
                      <div>
                        <Button type='primary'> Đặt vé</Button>
                      </div>
                    )}
                  </Col>
                </Row>
              )
            })}
        </div>
      </BookingContentDefaultWrapper>
    )
  }
}

export default BookingContentLaptop