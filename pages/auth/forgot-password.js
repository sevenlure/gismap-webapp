import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import Clearfix from 'src/components/elements/clearfix'
import DefaultLayout from 'src/layout/default'
import { Form, Input, Icon, Button, Modal } from 'antd'
import MobileSvg from 'static/images/icon/ic-mobile.svg'
import OtpConfirm from 'src/containers/otp-confirm'
import slug from 'src/routes'
import { fotgotPassword } from 'src/api/otpApi'
import { authFotgotPassword } from 'src/api/authApi'

const ForgetPasswordWrapper = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: center;

  .forgot-password---contant {
    max-width: 968px;
    width: 100%;
    background: white;
    padding: 50px 70px;

    .forgot-password---contant--title h3 {
      margin-bottom: 8px;
    }
    .forgot-password---contant--button {
      text-align: right;
      height: 40px;
      button {
        max-width: 134px;
        height: 100%;
      }
    }
  }
`
@withRouter
class ForgetPasswordPage extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    onSuccess: PropTypes.func
  }

  state = {
    isLoading: false
  }

  hanldeOnSuccess = async otp => {
    this.state.modal.destroy()

    this.setState({
      isLoading: false
    })
    const { getFieldValue } = this.props.form
    const res = await authFotgotPassword({
      otp,
      phone: getFieldValue('phone')
    })
    if (res.status === 200) {
      const param = `?secret=${res.data.secret}&phone=${getFieldValue('phone')}`
      Router.push(`${slug.auth.forgot_PasswordNew}${param}`)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        const res = await fotgotPassword(values.phone)
        // console.log(res, 'fotgotPassword')
        if (res.status === 200 && res.data) {
          this.setState({
            modal: Modal.success({
              title: <h2 style={{ textAlign: 'center' }}>Nhập mã xác thực</h2>,
              width: 'fit-content',
              icon: 'false',
              centered: true,
              style: {
                padding: 24
              },
              content: <OtpConfirm onSuccess={this.hanldeOnSuccess} />,
              okText: 'Đóng',
              maskClosable: true
            })
          })
        }
        this.setState({
          isLoading: false
        })
      }
    })
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <ForgetPasswordWrapper>
        <Form onSubmit={this.handleSubmit} className='forgot-password---contant'>
          <div className='forgot-password---contant--title'>
            <h3>Quên mật khẩu</h3>
          </div>
          <div className='forgot-password---contant--description'>
            <span>
              Vui lòng nhập số điện thoại đã đăng ký tài khoản để hoàn thành <br /> thao tác lấy lại mật khẩu.
            </span>
          </div>
          <Clearfix height={30} />
          <Form.Item className='forgot-password---contant--input'>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
            })(<Input prefix={<Icon component={MobileSvg} />} placeholder='Số điện thoại *' />)}
          </Form.Item>
          <Clearfix height={16} />
          <div className='forgot-password---contant--button'>
            <Button
              disabled={!getFieldValue('phone')}
              type='primary'
              htmlType='submit'
              block={true}
              size='large'
              loading={this.state.isLoading}
            >
              Tiếp tục
            </Button>
          </div>
        </Form>
      </ForgetPasswordWrapper>
    )
  }
}

ForgetPasswordPage.Layout = DefaultLayout
export default Form.create({})(ForgetPasswordPage)
