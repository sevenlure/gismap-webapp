import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Icon, Button, Modal } from 'antd'
import PersonalSvg from 'static/images/icon/ic-personal.svg'
import EmaillSvg from 'static/images/icon/ic-email.svg'
import MobileSvg from 'static/images/icon/ic-mobile.svg'
import PassSvg from 'static/images/icon/ic-pass.svg'
import AddressSvg from 'static/images/icon/ic-address.svg'
import Clearfix from 'src/components/elements/clearfix'
import Link from 'next/link'

// import InputOTP from 'src/components/elements/input-OTP'
import OtpConfirm from 'src/containers/otp-confirm'

// let modal = Modal.success()

const RegisterWrapper = styled.div`
  flex: 1;
  .ant-form-item-with-help {
    margin-bottom: 0px;
  }
  .form--button {
    text-align: center;
    height: 50px;
    button {
      max-width: 250px;
      height: 100%;
    }
  }
  .form--register {
    text-align: center;
    span {
      font-size: 1.125rem;
    }
    a {
      font-family: myFont-Bold;
      text-decoration: underline;
    }
  }
`

class Register extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    onSuccess: PropTypes.func,
    getFieldError: PropTypes.any
  }

  state = {
    modal: null
  }

  componentDidMount = () => {}
  componentWillUnmount = () => {}

  hanldeOnSuccess = status => {
    this.state.modal.destroy()
    if (this.props.onSuccess) this.props.onSuccess(status)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const res = {
          success: true,
          data: {
            otp: true
          }
        }
        if (res.success) {
          this.setState({
            modal: Modal.success({
              icon: 'false',
              title: <h2 style={{ textAlign: 'center' }}>Nhập mã xác thực</h2>,
              width: 'fit-content',
              centered: true,
              style: {},
              content: <OtpConfirm onSuccess={this.hanldeOnSuccess} />,
              okType: 'default',
              okText: 'Đóng'
            })
          })
        }
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu xác nhận chưa giống mật khẩu!')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <RegisterWrapper>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('fullName', {
              rules: [{ required: true, message: 'Vui lòng nhập họ và tên!' }]
            })(<Input prefix={<Icon component={PersonalSvg} />} placeholder='Họ và tên *' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phoneNumber', {
              rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
            })(
              <Input prefix={<Icon component={MobileSvg} />} placeholder='Số điện thoại *' style={{ width: '100%' }} />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Chưa đúng định dạng email!'
                }
              ]
            })(<Input prefix={<Icon component={EmaillSvg} />} placeholder='Email' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('address', {})(
              <Input prefix={<Icon component={AddressSvg} />} placeholder='Địa chỉ sinh sống' />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Vui lòng nhâp mật khẩu!' }]
            })(<Input.Password prefix={<Icon component={PassSvg} />} placeholder='Mật khẩu *' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: 'Vui lòng nhập mật khẩu xác nhận!' },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password prefix={<Icon component={PassSvg} />} placeholder='Nhập lại mật khẩu *' />)}
          </Form.Item>
          <div className='form--button'>
            <Button disabled={!getFieldValue('confirm')} type='primary' htmlType='submit' block={true} size='large'>
              Đăng ký
            </Button>
          </div>
          <Clearfix height={16} />
          <div className='form--register' style={{}}>
            <span>
              Bạn đã có tài khoản rồi?
              <Link href='#'>
                <a> Đăng nhập</a>
              </Link>
            </span>
          </div>
        </Form>
      </RegisterWrapper>
    )
  }
}

export default Form.create({})(Register)
