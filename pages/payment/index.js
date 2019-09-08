import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'
import { Radio, Input, Icon, Button, Row, Col, Divider, Checkbox } from 'antd'
import icons from 'icons'
import AvatarUser from 'src/containers/auth/avatar-user'

import { get as _get, map as _map } from 'lodash-es'
import DefaultLayout from 'src/layout/default'
import { connect } from 'react-redux'
import ModalChoosePromotion from 'src/containers/payment/modal-choose-promotion'

const PaymentWrapper = styled.div`
  margin: 45px 24px 60px 24px;
  display: flex;
  justify-content: center;

  .page--contant {
    height: fit-content;
    max-width: 565px;
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
          top: 4px;
        }
      }
    }
  }

  .page--contant--payments--item {
    .page--contant--payments--item__description {
      padding-left: 70px;
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
    max-width: 378px;
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
  userInfo: _get(state, 'GeneralStore.userInfo', '')
})

const mapDispatchToProps = {}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class InfoCustomer extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    isAuthenticated: PropTypes.bool,
    userInfo: PropTypes.object
  }

  state = {
    isLoading: false,
    listPayments: [
      {
        id: '1',
        url: '/static/images/bank/ic-momo.png',
        name: 'Thẻ nội địa',
        description: ''
      },
      {
        id: '2',
        url: '/static/images/bank/ic-momo.png',
        name: 'Thẻ quốc tế',
        description: ''
      },
      {
        id: '3',
        url: '/static/images/bank/ic-momo.png',
        name: 'Zalopay',
        description: ''
      },
      {
        id: '4',
        url: '/static/images/bank/ic-momo.png',
        name: 'Viettelpay',
        description: ''
      },
      {
        id: '5',
        url: '/static/images/bank/ic-momo.png',
        name: 'Momo',
        description: ''
      },
      {
        id: '6',
        url: '/static/images/bank/ic-momo.png',
        name: 'Thanh toán bằng tiền mặt',
        description: 'Vé được giữ trong vòng 6 tiếng tính từ thời điểm xác nhận thanh toán'
      }
    ]
  }

  render() {
    return (
      <PaymentWrapper>
        <Row gutter={8}>
          <Col xs={24} sm={14} lg={16} style={{ marginBottom: 24 }}>
            <div className='page--contant'>
              <div className='page--contant--promotion'>
                <div className='page--contant--promotion--title'>
                  <h4>Khuyến mãi</h4>
                </div>
                <div className='page--contant--promotion-input'>
                  <Input prefix={<Icon component={icons.sale} />} placeholder='Nhập mã khuyễn mãi' size='large' />
                  <div className='page--contant--promotion-modal'>
                    <Button
                      size='default'
                      type='default'
                      onClick={() => {
                        this.ModalChoosePromotion.showModal()
                      }}
                    >
                      Chọn mã
                    </Button>
                  </div>
                </div>
              </div>
              <Clearfix height={24} />
              <div className='page--contant--payment-methods'>
                <div className='page--contant--payment--title'>
                  <h4>Phương thức thanh toán</h4>
                </div>
                <div className='page--contant--payments'>
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
                                <img src={item.url} width={26} height={26} />
                                <span style={{ paddingLeft: 12 }}>{item.name}</span>
                              </Radio>
                              <div className='page--contant--payments--item__description'>
                                <span style={{ color: '#9ea7d0' }}>{item.description}</span>
                              </div>
                            </div>
                            <Divider style={{ margin: '10px 0px' }} />
                          </div>
                        )
                      })}
                  </Radio.Group>
                </div>
                <div className='page--contant--rules'>
                  <Checkbox>
                    {`Tôi đồng ý với `}
                    <Link href='#'>
                      <a>điều khoản sử dụng</a>
                    </Link>
                  </Checkbox>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={10} lg={8}>
            <div className='page--contant--right'>
              <div className='page--contant--right--info-booking'>
                <div>
                  <h4>Thông tin vé</h4>
                </div>
                <div>
                  <h4 className='page--contant--right__blue'>
                    05:00 <Icon component={icons.arrowNext} /> 07:00
                  </h4>
                  <strong>Tây Ninh - Quận 10, Hồ Chí Minh</strong>
                  <br />
                  <span>Limousine 9 chỗ</span>
                </div>
                <Clearfix height={30} />
                <div>
                  <h4>Số ghế</h4>
                </div>
                <div>
                  <h4 className='page--contant--right__blue'>A3, B5, G7</h4>
                </div>
                <Clearfix height={30} />
                <div>
                  <h4>Lộ trình</h4>
                </div>
                <div>
                  <span style={{ color: '#9ea7d0' }}>Điểm đón</span>
                  <br />
                  <span>137 Đào Duy Từ, Tây Ninh</span>
                  <Clearfix height={16} />
                  <span style={{ color: '#9ea7d0' }}>Điểm trả</span>
                  <br />
                  <span>137 Đào Duy Từ, Tây Ninh</span>
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
                    <strong>Lan Wangji</strong>
                    <br />
                    <span>033 222 589</span>
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
                    <span>Tổng tiền 3 vé</span>
                  </div>
                  <div>
                    <strong>300,000 đ</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <span>Khuyến mãi</span>
                  </div>
                  <div>
                    <strong>0 đ</strong>
                  </div>
                </div>
                <Clearfix height={16} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>Tổng tiền</strong>
                  </div>
                  <div>
                    <h4 className='page--contant--right__blue'>300,000 đ</h4>
                  </div>
                </div>
                <Clearfix height={24} />
                <Col lg={24}>
                  <Button block type='primary'>
                    Thanh toán vé
                  </Button>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
        {/* <Clearfix width={25} /> */}
        <ModalChoosePromotion getRef={ref => (this.ModalChoosePromotion = ref)} />
      </PaymentWrapper>
    )
  }
}
InfoCustomer.Layout = DefaultLayout
export default InfoCustomer
