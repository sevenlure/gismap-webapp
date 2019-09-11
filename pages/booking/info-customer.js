import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Clearfix from 'src/components/elements/clearfix'
import { Form, Input, Icon, Button, Row, Col } from 'antd'
import { get as _get } from 'lodash-es'
import PersonalSvg from 'static/images/icon/ic-personal.svg'
import EmaillSvg from 'static/images/icon/ic-email.svg'
import MobileSvg from 'static/images/icon/ic-mobile.svg'
import AddressSvg from 'static/images/icon/ic-address.svg'
import DefaultLayout from 'src/layout/default'
import { auth as authMess } from 'src/config/message'
import { connect } from 'react-redux'
import { setBookingNowInfoCustomer, clearBookingNowInfoCustomer } from 'src/redux/actions/BookingAction'
import { setVisibleRegister, setVisibleLogin } from 'src/redux/actions/generalAction.js'
import Router from 'next/router'
import slug from 'src/routes'
import windowSize from 'react-window-size'

const registerMess = authMess.register

const InfoCustomerWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${props => (props.windowWidth >= 576 ? 'margin: 20px;' : '')}
  ${props => (props.windowWidth >= 992 ? 'margin: 45px;' : '')}
  ${props => (props.windowWidth < 576 ? 'margin: 8px;' : '')}

  .page--contant {
    max-width: 968px;
    width: 100%;
    background: white;
    ${props => (props.windowWidth >= 576 ? 'padding: 30px 50px;' : '')}
    ${props => (props.windowWidth >= 992 ? 'padding: 50px 70px;' : '')}
    ${props => (props.windowWidth < 576 ? 'padding: 8px;' : '')}

    .page--contant--title h3 {
      margin-bottom: 8px;
    }
    .page--contant--button {
      text-align: right;
      height: 40px;
      button {
        max-width: 134px;
        height: 100%;
      }
    }
  }
`

const mapStateToProps = state => ({
  isAuthenticated: _get(state, 'AuthStore.isAuthenticated'),
  userInfo: _get(state, 'GeneralStore.userInfo', '')
})

const mapDispatchToProps = {
  setBookingNowInfoCustomer,
  clearBookingNowInfoCustomer,
  setVisibleRegister,
  setVisibleLogin
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@windowSize
class InfoCustomer extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    form: PropTypes.any,
    isAuthenticated: PropTypes.bool,
    userInfo: PropTypes.object,
    clearBookingNowInfoCustomer: PropTypes.func,
    setBookingNowInfoCustomer: PropTypes.func,
    setVisibleRegister: PropTypes.func,
    setVisibleLogin: PropTypes.func
  }

  state = {
    isLoading: false
  }

  hasErrors = fieldsError => {
    // console.log(fieldsError, 'fieldsError')
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        this.props.setBookingNowInfoCustomer({
          ...values
        })
        Router.push(slug.payment.base)
      }
    })
  }
  componentDidMount = () => {
    this.props.clearBookingNowInfoCustomer()
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldValue } = this.props.form

    // console.log(this.props, 'render')
    const title = this.props.isAuthenticated ? 'Xác nhận thông tin khách hàng' : 'Vui lòng nhập thông tin khách hàng'
    const { userInfo } = this.props

    return (
      <InfoCustomerWrapper windowWidth={this.props.windowWidth}>
        <Form onSubmit={this.handleSubmit} className='page--contant'>
          <div className='page--contant--title'>
            <h3>{title}</h3>
          </div>
          <div className='page--contant--description'>{/* <span>Vui lòng nhập thông tin khách hàng</span> */}</div>
          <Clearfix height={30} />
          <Form.Item>
            {getFieldDecorator('fullName', {
              initialValue: _get(userInfo, 'name'),
              rules: [
                {
                  validator: (rule, value, callback) => {
                    const mess = registerMess.fullname
                    if (!value) return callback(mess)
                    /* eslint-disable */
                    const isValidPattern = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>.?๐฿]{5,30}$/.test(value)
                    /* eslint-enable */

                    if (!isValidPattern) return callback(mess)

                    const tamp = value.split(' ')
                    if (tamp.length < 2) return callback(mess)

                    if (!tamp[1]) return callback(mess)

                    callback()
                  }
                }
              ]
            })(
              <Input size='large' maxLength={30} prefix={<Icon component={PersonalSvg} />} placeholder='Họ và tên *' />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              initialValue: _get(userInfo, 'phone'),
              rules: [
                { required: true, message: registerMess.phoneRequired },
                {
                  pattern: /^[0-9]*$/,
                  message: registerMess.phoneOnlyNumber
                },
                { min: 10, max: 13, message: registerMess.phoneLen }
              ]
            })(
              <Input
                size='large'
                maxLength={13}
                autoComplete='new-password'
                prefix={<Icon component={MobileSvg} />}
                placeholder='Số điện thoại *'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              initialValue: _get(userInfo, 'email')
            })(<Input size='large' prefix={<Icon component={EmaillSvg} />} placeholder='Email' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('address', {
              initialValue: _get(userInfo, 'address'),
              rules: [
                {
                  min: 10,
                  max: 200,
                  message: registerMess.addressLen
                }
              ]
            })(
              <Input
                size='large'
                maxLength={200}
                prefix={<Icon component={AddressSvg} />}
                placeholder='Địa chỉ sinh sống'
              />
            )}
          </Form.Item>
          <Clearfix height={16} />
          <div className='page--contant--button'>
            <Button
              disabled={!getFieldValue('fullName') || this.hasErrors(getFieldsError())}
              type='primary'
              htmlType='submit'
              block={true}
              size='large'
              loading={this.state.isLoading}
            >
              Tiếp tục
            </Button>
          </div>
          {!this.props.isAuthenticated && (
            <div>
              <Clearfix height={30} />
              <div>
                <h4>Hoặc đăng nhập để bỏ qua phần này</h4>
              </div>
              <div>
                <Row gutter={8}>
                  <Col xs={12} sm={6} lg={4}>
                    <Button onClick={() => this.props.setVisibleLogin(true)} type='primary' block={true} size='large'>
                      <span>Đăng nhập</span>
                    </Button>
                  </Col>
                  <Col xs={12} sm={6} lg={4}>
                    <Button
                      onClick={() => this.props.setVisibleRegister(true)}
                      type='default'
                      block={true}
                      size='large'
                    >
                      <span>Đăng ký</span>
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Form>
      </InfoCustomerWrapper>
    )
  }
}
InfoCustomer.Layout = DefaultLayout
export default Form.create({})(InfoCustomer)
