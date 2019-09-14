import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import slug from 'src/routes'

import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'
import { Form, Radio, Input, Icon, Button, Row, Col, Divider, Checkbox } from 'antd'
import icons from 'icons'
import AvatarUser from 'src/containers/auth/avatar-user'

import { get as _get, map as _map, values as _values, isNumber as _isNumber, find as _find } from 'lodash-es'
import DefaultLayout from 'src/layout/default'
import { connect } from 'react-redux'
import { setPaymentInfoTicket, clearBookingNowInfoCustomer } from 'src/redux/actions/paymentAction'
import { HH_MM } from 'src/config/format'
import moment from 'moment'
import { getFormatNumber } from 'src/config/format'
import ModalChoosePromotion from 'src/containers/payment/modal-choose-promotion'
import paymentApi from 'src/api/paymentApi'
import windowSize from 'react-window-size'

const PaymentWrapper = styled.div`
  margin: 45px 24px 60px 24px;
  display: flex;
  justify-content: center;

  .page--contant {
    height: fit-content;
    max-width: ${props => (props.isViewMobile ? '' : '565px')};
    width: 100%;
    padding: 24px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.16);

    .page--contant--promotion {
      .page--contant--promotion-input {
        position: relative;
        .page--contant--promotion-modal {
          position: absolute;
          right: 5px;
          top: 8px;
        }
      }
    }
  }

  .page--contant--payments--item {
    .page--contant--payments--item__description {
      padding-left: 88px;
      line-height: normal;
    }
    .ant-radio {
      margin-right: 12px;
    }
  }
  .page--contant--rules {
    span {
      font-size: 0.875rem;
      font-family: myFont-Bold;
    }
  }

  .page--contant--right {
    display: flex;
    flex-direction: column;
    max-width: ${props => (props.isViewMobile ? '' : '378px')};
    width: 100%;
    .page--contant--right__blue {
      color: #3880ff;
    }
    .page--contant--right--info-booking {
      width: 100%;
      padding: 24px;
      background: white;
      border-radius: 4px;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.16);
    }
    .page--contant--right--info-customer {
      width: 100%;
      padding: 24px;
      background: white;
      border-radius: 4px;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.16);
    }
    .page--contant--right--info-payment {
      width: 100%;
      padding: 24px;
      background: white;
      border-radius: 4px;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.16);
    }
  }
`

const mapStateToProps = state => ({
  isAuthenticated: _get(state, 'AuthStore.isAuthenticated'),
  userInfo: _get(state, 'GeneralStore.userInfo', ''),
  BookingNow: _get(state, 'BookingStore.BookingNow', null),
  BookingNowSeat: _get(state, 'BookingStore.BookingNowSeat', null),
  BookingNowPoint: _get(state, 'BookingStore.BookingNowPoint', null),
  BookingNowInfoCustomer: _get(state, 'BookingStore.BookingNowInfoCustomer', null)
})

const mapDispatchToProps = {
  setPaymentInfoTicket,
  clearBookingNowInfoCustomer
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@withRouter
@windowSize
class InfoCustomer extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    isAuthenticated: PropTypes.bool,
    userInfo: PropTypes.object,
    BookingNow: PropTypes.object,
    BookingNowSeat: PropTypes.object,
    BookingNowPoint: PropTypes.object,
    BookingNowInfoCustomer: PropTypes.object,
    setPaymentInfoTicket: PropTypes.func,
    clearBookingNowInfoCustomer: PropTypes.func
  }

  state = {
    isLoading: false,
    PromotionInfo: null,
    isAgree: false,
    listPayments: [
      {
        id: '1',
        url: '/static/images/bank/ic-napas.jpg',
        name: 'Thẻ nội địa',
        description: '',
        type: 'noiDia'
      },
      {
        id: '2',
        url: '/static/images/bank/ic-mastercard.png',
        name: 'Thẻ quốc tế',
        description: '',
        type: 'quocTe'
      },
      {
        id: '3',
        url: '/static/images/bank/ic-zalo.png',
        name: 'Zalopay',
        description: '',
        type: 'zalo'
      },
      {
        id: '4',
        url: '/static/images/bank/ic-viettelPay.png',
        name: 'Viettelpay',
        description: '',
        type: 'viettel'
      },
      {
        id: '5',
        url: '/static/images/bank/ic-momo.png',
        name: 'Momo',
        description: '',
        type: 'momo'
      },
      {
        id: '6',
        url: '/static/images/bank/ic-method1.png',
        name: 'Thanh toán bằng tiền mặt',
        description: 'Vé được giữ trong vòng 6 tiếng tính từ thời điểm xác nhận thanh toán',
        type: 'money'
      }
    ]
  }

  handleOnChange = item => {
    if (item) {
      this.setState(
        {
          PromotionInfo: item
        },
        () => {
          this.ModalChoosePromotion.closeModal()
        }
      )
    }
  }

  handleSubmit = ({
    BookingNow,
    BookingNowSeat,
    BookingNowPoint,
    BookingNowInfoCustomer,
    promotionCode,
    pricePromotion,
    totalPrice
  }) => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.clearBookingNowInfoCustomer()
        // console.log('Received values of form: ', values, BookingNow,BookingNowSeat, BookingNowPoint, BookingNowInfoCustomer,promotionCode,pricePromotion, totalPrice)
        const itemMethodPayment = _find(this.state.listPayments, item => {
          return item.id === values.paymentCode
        })
        const dataFetch = {
          tour: _get(BookingNow, 'id', ''),
          bookingInfo: {
            BookingNowSeat,
            BookingNowPoint,
            BookingNowInfoCustomer,
            BookingNow
          },
          promotionCode,
          paymentInfo: {
            type: _get(itemMethodPayment, 'type', ''),
            name: _get(itemMethodPayment, 'name', ''),
            pricePromotion,
            totalPrice
          }
        }
        // console.log(dataFetch, 'dataFetch')
        try {
          const res = await paymentApi.payTicket(dataFetch)
          if (res.status) {
            // console.log(res, '---')
            this.props.setPaymentInfoTicket(res.data)
            Router.push(slug.result.paymentSucces)
          }
        } catch (e) {
          // console.log(e)
          this.props.setPaymentInfoTicket(dataFetch)
          Router.push(slug.result.paymentFailt)
        }
      }
    })
  }

  render() {
    // md: '768px',
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { BookingNow, BookingNowSeat, BookingNowPoint, BookingNowInfoCustomer, windowWidth } = this.props
    const { PromotionInfo } = this.state
    const promotionCode = _get(PromotionInfo, 'code', '')
    const isViewMobile = windowWidth < 768 ? true : false

    let timeTo, timefrom, typeCar
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
      typeCar = BookingNow.title
    }
    let strSeat, numberSeat, priceTicket, totalPrice
    let pricePromotion = 0
    if (BookingNowSeat) {
      numberSeat = _values(BookingNowSeat) ? _values(BookingNowSeat).length : 0
      priceTicket = 0
      strSeat = _map(_values(BookingNowSeat), item => {
        priceTicket += _isNumber(item.price) ? item.price : 0
        return item.name
      }).join(', ')

      if (PromotionInfo) {
        pricePromotion = priceTicket * (_get(PromotionInfo, 'discount', 100) / 100)
      }
      totalPrice = priceTicket - pricePromotion
    }

    let pointFrom, pointTo
    if (BookingNowPoint) {
      pointFrom = BookingNowPoint.from
      pointTo = BookingNowPoint.to
    }
    let nameCustomer, phone
    if (BookingNowInfoCustomer) {
      nameCustomer = BookingNowInfoCustomer.fullName
      phone = BookingNowInfoCustomer.phone
    }
    console.log('isViewMobile', isViewMobile)

    return (
      <PaymentWrapper isViewMobile>
        <Form>
          <Row gutter={8}>
            {!isViewMobile && [
              <Col key='left' xs={24} sm={14} lg={16} style={{ marginBottom: 24, paddingRight: 20 }}>
                <div className='page--contant'>
                  <div className='page--contant--promotion'>
                    <div className='page--contant--promotion--title'>
                      <h4>Khuyến mãi</h4>
                    </div>
                    <div className='page--contant--promotion-input'>
                      <Input
                        value={promotionCode}
                        style={{ height: 50, fontSize: '1rem' }}
                        prefix={<Icon component={icons.sale} />}
                        placeholder='Nhập mã khuyễn mãi'
                        size='large'
                      />
                      <div className='page--contant--promotion-modal'>
                        <Button
                          size='default'
                          type='default'
                          onClick={() => {
                            this.ModalChoosePromotion.showModal()
                          }}
                        >
                          <strong>Chọn mã</strong>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Clearfix height={24} />
                  <div className='page--contant--payment-methods'>
                    <div className='page--contant--payment--title'>
                      <h4>Phương thức thanh toán</h4>
                    </div>
                    <div className='page--contant--payments' style={{ marginTop: 16 }}>
                      <Form.Item>
                        {getFieldDecorator('paymentCode', {
                          rules: [{ required: true, message: 'Vui lòng chọn phương thức thanh toán ' }]
                        })(
                          <Radio.Group
                            style={{ width: '100%' }}
                            //   onChange={this.onChangeDesPoint} value={this.state.desPointVal}
                          >
                            {this.state.listPayments &&
                              _map(this.state.listPayments, item => {
                                return (
                                  <div key={item.id} className='page--contant--payments--item'>
                                    <div style={{ marginBottom: '8px' }}>
                                      <Radio value={item.id}>
                                        <img src={item.url} width={32} height={32} />
                                        <span style={{ paddingLeft: 12 }}>{item.name}</span>
                                      </Radio>
                                      <div className='page--contant--payments--item__description'>
                                        <span style={{ color: '#9ea7d0' }}>{item.description}</span>
                                      </div>
                                    </div>
                                    <Divider style={{ margin: '12px 0px 8px' }} />
                                  </div>
                                )
                              })}
                          </Radio.Group>
                        )}
                      </Form.Item>
                    </div>
                    <div className='page--contant--rules'>
                      <Checkbox
                        onChange={() => {
                          this.setState({
                            isAgree: !this.state.isAgree
                          })
                        }}
                        style={{ paddingLeft: '12px' }}
                      >
                        <span> {`Tôi đồng ý với `}</span>
                        <Link href='#'>
                          <a>điều khoản sử dụng</a>
                        </Link>
                      </Checkbox>
                    </div>
                  </div>
                </div>
              </Col>,
              <Col key='right' xs={24} sm={10} lg={8}>
                <div className='page--contant--right'>
                  <div className='page--contant--right--info-booking'>
                    <div>
                      <h4>Thông tin vé</h4>
                    </div>
                    <div>
                      <h4 className='page--contant--right__blue'>
                        {timefrom} <Icon component={icons.arrowNext} /> {timeTo}
                      </h4>
                      <strong>
                        {`${_get(BookingNow, 'fromDeparture.name', '')} -> ${_get(BookingNow, 'toDeparture.name', '')}`}
                      </strong>
                      <br />
                      <span>{typeCar}</span>
                    </div>
                    <Clearfix height={30} />
                    <div>
                      <h4>Số ghế</h4>
                    </div>
                    <div>
                      <h4 className='page--contant--right__blue'>{strSeat}</h4>
                    </div>
                    <Clearfix height={30} />
                    <div>
                      <h4>Lộ trình</h4>
                    </div>
                    <div>
                      <span style={{ color: '#9ea7d0' }}>Điểm đón</span>
                      <br />
                      <span>{pointFrom}</span>
                      <Clearfix height={16} />
                      <span style={{ color: '#9ea7d0' }}>Điểm xuống trả</span>
                      <br />
                      <span>{pointTo}</span>
                    </div>
                  </div>
                  <Clearfix height={20} />
                  <div className='page--contant--right--info-customer'>
                    <div>
                      <h4>Thông tin người đặt</h4>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div>
                        <AvatarUser disabled={true} />
                      </div>
                      <div style={{ paddingLeft: 16 }}>
                        <strong>{nameCustomer}</strong>
                        <br />
                        <span>{phone}</span>
                      </div>
                    </div>
                  </div>
                  <Clearfix height={20} />
                  <div className='page--contant--right--info-payment'>
                    <div>
                      <h4>Thanh toán</h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <span>Tổng tiền {numberSeat} vé</span>
                      </div>
                      <div>
                        <strong>{getFormatNumber(priceTicket)} đ</strong>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <span>Khuyến mãi</span>
                      </div>
                      <div>
                        <strong>{getFormatNumber(pricePromotion)} đ</strong>
                      </div>
                    </div>
                    <Clearfix height={16} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <strong>Tổng tiền</strong>
                      </div>
                      <div>
                        <h4 className='page--contant--right__blue'>{getFormatNumber(totalPrice)} đ</h4>
                      </div>
                    </div>
                    <Clearfix height={24} />
                    <Col lg={24}>
                      <Button
                        onClick={e => {
                          // e.preventDefault()
                          // console.log(BookingNow, 'BookingNow')
                          this.handleSubmit({
                            BookingNow,
                            BookingNowSeat,
                            BookingNowPoint,
                            BookingNowInfoCustomer,
                            promotionCode,
                            pricePromotion,
                            totalPrice
                          })
                        }}
                        disabled={!this.state.isAgree}
                        block
                        type='primary'
                      >
                        Thanh toán vé
                      </Button>
                    </Col>
                  </div>
                </div>
              </Col>
            ]}

            {isViewMobile && [
              <Col key='bot-mobile' xs={24}>
                <div className='page--contant--right'>
                  <div className='page--contant--right--info-booking'>
                    <div>
                      <h4>Thông tin vé</h4>
                    </div>
                    <div>
                      <h4 className='page--contant--right__blue'>
                        {timefrom} <Icon component={icons.arrowNext} /> {timeTo}
                      </h4>
                      <strong>
                        {`${_get(BookingNow, 'fromDeparture.name', '')} -> ${_get(BookingNow, 'toDeparture.name', '')}`}
                      </strong>
                      <br />
                      <span>{typeCar}</span>
                    </div>
                    <Clearfix height={30} />
                    <div>
                      <h4>Số ghế</h4>
                    </div>
                    <div>
                      <h4 className='page--contant--right__blue'>{strSeat}</h4>
                    </div>
                    <Clearfix height={30} />
                    <div>
                      <h4>Lộ trình</h4>
                    </div>
                    <div>
                      <span style={{ color: '#9ea7d0' }}>Điểm đón</span>
                      <br />
                      <span>{pointFrom}</span>
                      <Clearfix height={16} />
                      <span style={{ color: '#9ea7d0' }}>Điểm xuống trả</span>
                      <br />
                      <span>{pointTo}</span>
                    </div>
                  </div>
                  <Clearfix height={20} />
                  <div className='page--contant--right--info-customer'>
                    <div>
                      <h4>Thông tin người đặt</h4>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div>
                        <AvatarUser disabled={true} />
                      </div>
                      <div style={{ paddingLeft: 16 }}>
                        <strong>{nameCustomer}</strong>
                        <br />
                        <span>{phone}</span>
                      </div>
                    </div>
                  </div>
                  <Clearfix height={20} />
                  <div className='page--contant'>
                    <div className='page--contant--promotion'>
                      <div className='page--contant--promotion--title'>
                        <h4>Khuyến mãi</h4>
                      </div>
                      <div className='page--contant--promotion-input'>
                        <Input
                          value={promotionCode}
                          style={{ height: 50, fontSize: '1rem' }}
                          prefix={<Icon component={icons.sale} />}
                          placeholder='Nhập mã khuyễn mãi'
                          size='large'
                        />
                        <div className='page--contant--promotion-modal'>
                          <Button
                            size='default'
                            type='default'
                            onClick={() => {
                              this.ModalChoosePromotion.showModal()
                            }}
                          >
                            <strong>Chọn mã</strong>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Clearfix height={24} />
                    <div className='page--contant--payment-methods'>
                      <div className='page--contant--payment--title'>
                        <h4>Phương thức thanh toán</h4>
                      </div>
                      <div className='page--contant--payments' style={{ marginTop: 16 }}>
                        <Form.Item>
                          {getFieldDecorator('paymentCode', {
                            rules: [{ required: true, message: 'Vui lòng chọn phương thức thanh toán ' }]
                          })(
                            <Radio.Group
                              style={{ width: '100%' }}
                              //   onChange={this.onChangeDesPoint} value={this.state.desPointVal}
                            >
                              {this.state.listPayments &&
                                _map(this.state.listPayments, item => {
                                  return (
                                    <div key={item.id} className='page--contant--payments--item'>
                                      <div style={{ marginBottom: '8px' }}>
                                        <Radio value={item.id}>
                                          <img src={item.url} width={32} height={32} />
                                          <span style={{ paddingLeft: 12 }}>{item.name}</span>
                                        </Radio>
                                        <div className='page--contant--payments--item__description'>
                                          <span style={{ color: '#9ea7d0' }}>{item.description}</span>
                                        </div>
                                      </div>
                                      <Divider style={{ margin: '12px 0px 8px' }} />
                                    </div>
                                  )
                                })}
                            </Radio.Group>
                          )}
                        </Form.Item>
                      </div>
                      <div className='page--contant--rules'>
                        <Checkbox
                          onChange={() => {
                            this.setState({
                              isAgree: !this.state.isAgree
                            })
                          }}
                          style={{ paddingLeft: '12px' }}
                        >
                          <span> {`Tôi đồng ý với `}</span>
                          <Link href='#'>
                            <a>điều khoản sử dụng</a>
                          </Link>
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                  <Clearfix height={20} />
                  <div className='page--contant--right--info-payment'>
                    <div>
                      <h4>Thanh toán</h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <span>Tổng tiền {numberSeat} vé</span>
                      </div>
                      <div>
                        <strong>{getFormatNumber(priceTicket)} đ</strong>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <span>Khuyến mãi</span>
                      </div>
                      <div>
                        <strong>{getFormatNumber(pricePromotion)} đ</strong>
                      </div>
                    </div>
                    <Clearfix height={16} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <strong>Tổng tiền</strong>
                      </div>
                      <div>
                        <h4 className='page--contant--right__blue'>{getFormatNumber(totalPrice)} đ</h4>
                      </div>
                    </div>
                    <Clearfix height={24} />
                    <Col lg={24}>
                      <Button
                        onClick={e => {
                          // e.preventDefault()
                          // console.log(BookingNow, 'BookingNow')
                          this.handleSubmit({
                            BookingNow,
                            BookingNowSeat,
                            BookingNowPoint,
                            BookingNowInfoCustomer,
                            BookingNowPoint,
                            BookingNowInfoCustomer,
                            promotionCode,
                            pricePromotion,
                            totalPrice
                          })
                        }}
                        disabled={!this.state.isAgree}
                        block
                        type='primary'
                      >
                        Thanh toán vé
                      </Button>
                    </Col>
                  </div>
                </div>
              </Col>,
              <Col key='top-mobile' xs={24} style={{ marginBottom: 24, paddingRight: 20 }}></Col>
            ]}
          </Row>
        </Form>
        {/* <Clearfix width={25} /> */}
        <ModalChoosePromotion onChange={this.handleOnChange} getRef={ref => (this.ModalChoosePromotion = ref)} />
      </PaymentWrapper>
    )
  }
}
InfoCustomer.Layout = DefaultLayout

export default Form.create({})(InfoCustomer)
