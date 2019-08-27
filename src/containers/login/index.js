import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Icon, Button } from 'antd'
import MobileSvg from 'static/images/icon/ic-mobile.svg'
import PassSvg from 'static/images/icon/ic-pass.svg'
import Clearfix from 'src/components/elements/clearfix'
import Link from 'next/link'

const LoginWrapper = styled.div`
  .modal--title {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  flex: 1;
  .ant-form-item-with-help {
    margin-bottom: 0px;
  }
  .form--forget-pasword {
    text-align: right;
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

class Login extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
    getFieldError: PropTypes.any,
    handleCancel: PropTypes.func.isRequired,
    onRegister: PropTypes.func
  }

  state = {
    modal: null
  }

  componentDidMount = () => {}
  componentWillUnmount = () => {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        if (this.props.onSubmit) this.props.onSubmit(values)
      }
    })
  }

  hanldeRegister = e => {
    e.preventDefault()
    if (this.props.onRegister) this.props.onRegister()
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <LoginWrapper>
        <div className='modal--title'>
          <h3 style={{ marginBottom: 0 }}>Đăng nhập</h3>
          <Button style={{ width: 88 }} onClick={this.props.handleCancel} size='large' type='default'>
            Đóng
          </Button>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('phoneNumber', {
              rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
            })(<Input prefix={<Icon component={MobileSvg} />} placeholder='Số điện thoại *' />)}
          </Form.Item>
          
          <div>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Vui lòng nhâp mật khẩu!' }]
            })(<Input.Password prefix={<Icon component={PassSvg} />} placeholder='Mật khẩu *' />)}
          </div>
          <Clearfix height={16} />
          <div className='form--forget-pasword'>
            <strong>
              <a> Quên mật khẩu?</a>
            </strong>
          </div>
          <div className='form--button'>
            <Button disabled={!getFieldValue('password')} type='primary' htmlType='submit' block={true} size='large'>
              Đăng nhập
            </Button>
          </div>
          <Clearfix height={16} />
          <div className='form--register'>
            <span>
              Bạn chưa có tài khoản?
              <a onClick={this.hanldeRegister}> Vui lòng đăng ký.</a>
            </span>
          </div>
        </Form>
      </LoginWrapper>
    )
  }
}

export default Form.create({})(Login)
