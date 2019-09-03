import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Row, Card } from 'antd'

import { getFormatNumber } from 'src/config/format'

import Clearfix from 'src/components/elements/clearfix'
import { map as _map } from 'lodash-es'

const BookingContentDefaultWrapper = styled.div`
  .right-booking--content-body {
    padding: 30px;
    // .right-booking--content-body__tb-header-color {
    //   color: #9ea7d0;
    // }

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

class BookingContentLaptop extends React.Component {
  static propTypes = {
    dataSearch: PropTypes.any
  }

  render() {
    return (
      <BookingContentDefaultWrapper>
        <div className='right-booking--content-body'>
          {this.props.dataSearch &&
            _map(this.props.dataSearch, (item, index) => {
              const styleStatus = {
                backgroundColor: item.fullSeat ? 'rgba(255, 123, 102, 0.1)' : 'white'
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
                        <span> {`${item.from} - ${item.to}`}</span>
                      </div>
                      <Clearfix height={7} />
                      <div className='list--content--card--row'>
                        <strong>Thời gian: </strong> <span> {`${item.fromTime} - ${item.toTime}`}</span>
                      </div>
                      <Clearfix height={7} />
                      <div className='list--content--card--row'>
                        <strong>Loại xe: </strong> <span> {`${item.typeCar}`}</span>
                      </div>
                      <Clearfix height={7} />
                      <div className='list--content--card--row'>
                        <strong>Số ghế: </strong>
                        {item.fullSeat && <strong style={{ color: '#ff7b66' }}>{item.seat}</strong>}
                        {!item.fullSeat && <span>{item.seat}</span>}
                      </div>
                      <Clearfix height={10} />
                      <div className='list--content--card--price'>{getFormatNumber(item.price)} đ</div>
                      <Clearfix height={10} />
                      {!item.fullSeat && (
                        <div>
                          <Button type='primary'> Đặt vé</Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </Row>
              )
            })}
        </div>
      </BookingContentDefaultWrapper>
    )
  }
}

export default BookingContentLaptop
