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
import { registerUser } from 'src/api/authApi'
import otpApi from 'src/api/otpApi'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
// import { get as _get } from 'lodash-es'

// import InputOTP from 'src/components/elements/input-OTP'
import OtpConfirm from 'src/containers/otp-confirm'

// let modal = Modal.success()

const RegisterWrapper = styled.div`
  .modal--title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
  .ant-form-item {
    margin-bottom: 4px;
  }
`
const mapDispatchToProps = {
  userLogin,
  updateUserInfo
}
@connect(
  () => ({}),
  mapDispatchToProps
)
class Register extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    onSuccess: PropTypes.func,
    getFieldError: PropTypes.any,
    handleCancel: PropTypes.func.isRequired,
    onLogin: PropTypes.func,
    userLogin: PropTypes.func,
    updateUserInfo: PropTypes.func,
    isClearData: PropTypes.bool
  }

  state = {
    otp: '',
    messageErrorOtp: ''
  }

  hanldeOnSuccess = async otp => {
    if (this.props.onSuccess) {
      const { getFieldValue } = this.props.form
      try {
        const res = await registerUser({
          email: getFieldValue('email'),
          name: getFieldValue('fullName'),
          phone: getFieldValue('phone'),
          address: getFieldValue('address'),
          password: getFieldValue('password'),
          otp: otp
        })
        if (res.status === 200) {
          Modal.destroyAll()
          this.props.userLogin({
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDY1NTdmYzg0YmEzYTFmMTlhNDU2MDYiLCJlbWFpbCI6InNldmVubHVyZTE5OTNAZ21haWwuY29tIiwibmFtZSI6Ik1haSBUaHXhuq1uIFRo4bqjbyBNYWkiLCJwaG9uZSI6IjA3NzY5MDUwOTIiLCJhZGRyZXNzIjoixJBvw6BuIFbEg24gQsahIFAuMTYsIFE0LCBUUC5IQ00iLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTI3VDE2OjE5OjA4LjE3MloiLCJ1cGRhdGVkQXQiOiIyMDE5LTA4LTMxVDE0OjQ3OjE2LjE3NFoiLCJpZCI6MCwiX192IjowLCJpYXQiOjE1NjcyNjMxNjIsImV4cCI6MTU2NzI3MDM2Mn0.fzzJmd5ZJwVfP7V4nheo7jDLwhawUa212kChghaBspY'
          })
          this.props.updateUserInfo(res.data)
          this.props.onSuccess(true)
          this.setState({
            messageErrorOtp: null
          })
        }
      } catch (ex) {
        // console.log(ex.response.data.code, 'ex')
        if (ex.response.data.code === 'Unauthorized') {
          this.setState(
            {
              messageErrorOtp: ex.response.data.message
            },
            () => {
              Modal.destroyAll()
              this.getModal()
            }
          )
        }
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        const res = await otpApi.register(values.phone)
        // console.log(res, 'handleSubmit')
        if (res.status) {
          this.getModal()
        }
      }
    })
  }

  getModal = () => {
    this.setState({
      messageErrorOtp: null
    })
    return Modal.success({
      title: <h2 style={{ textAlign: 'center' }}>Nhập mã xác thực</h2>,
      width: 'fit-content',
      centered: true,
      style: {
        padding: 24
      },
      autoFocusButton: 'cancel',
      icon: <span />,
      content: <OtpConfirm messageError={this.state.messageErrorOtp} onSuccess={this.hanldeOnSuccess} />,
      okType: 'default',
      okText: 'Đóng',
      maskClosable: true
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

  componentDidUpdate = prevprops => {
    if (this.props.isClearData !== prevprops.isClearData && prevprops.isClearData) {
      this.props.form.resetFields()
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <RegisterWrapper>
        <div className='modal--title'>
          <h3 style={{ marginBottom: 0 }}>Đăng ký tài khoản</h3>
          <Button style={{ width: 88 }} onClick={this.props.handleCancel} size='large' type='default'>
            Đóng
          </Button>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('fullName', {
              rules: [
                { required: true, message: 'Vui lòng nhập họ và tên! ' },
                {
                  pattern: /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>.?๐฿]{5,30}$/,
                  message: 'Họ và tên không đuợc chứa ký tự đặc biệt và có độ dài từ 5 đến 30! '
                },
                {
                  validator: (rule, value, callback) => {
                    const mess = 'Họ tên phải có ít nhất 2 từ! '
                    if (value) {
                      const tamp = value.split(' ')
                      if (tamp.length < 2) callback(mess)
                      if (!tamp[1]) callback(mess)
                    }
                    callback()
                  }
                }
              ]
            })(<Input prefix={<Icon component={PersonalSvg} />} placeholder='Họ và tên *' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                {
                  pattern: /^[0-9]*$/,
                  message: 'Chỉ đuợc nhập số!'
                },
                { min: 10, max: 13, message: 'Số điện thoại độ dài từ 10 đến 13 số!' }
              ]
            })(<Input prefix={<Icon component={MobileSvg} />} placeholder='Số điện thoại *' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Email là thông tin bắt buộc!'
                },
                {
                  // type: 'email',
                  pattern: /^.{5,}@.{2,}\..{2,}/,
                  message: 'Chưa đúng định dạng email!'
                }
              ]
            })(<Input prefix={<Icon component={EmaillSvg} />} placeholder='Email' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('address', {
              rules: [
                {
                  min: 10,
                  max: 200,
                  message: 'Địa chỉ có độ dài từ 10 đến 200!'
                }
              ]
            })(<Input prefix={<Icon component={AddressSvg} />} placeholder='Địa chỉ sinh sống' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Vui lòng nhâp mật khẩu!' },
                { min: 8, message: 'Độ dài tối thiểu 8 ký tự' },
                { max: 32, message: 'Độ dài tối đa 32 ký tự' }
              ]
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
          <div className='form--register'>
            <span>
              Bạn đã có tài khoản rồi?
              <a onClick={this.props.onLogin}> Đăng nhập</a>
            </span>
          </div>
        </Form>
      </RegisterWrapper>
    )
  }
}

export default Form.create({})(Register)
