import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Form, Input, Icon, Button } from 'antd'
import PersonalSvg from 'static/images/icon/ic-personal.svg'
import EmaillSvg from 'static/images/icon/ic-email.svg'
import MobileSvg from 'static/images/icon/ic-mobile.svg'
import PassSvg from 'static/images/icon/ic-pass.svg'
import AddressSvg from 'static/images/icon/ic-address.svg'
import Clearfix from 'src/components/elements/clearfix'
import Link from 'next/link'

const RegisterWrapper = styled.div`
  flex: 1;
  .ant-form-item-with-help {
    margin-bottom: 0px;
  }
`

class Register extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    getFieldError: PropTypes.any
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
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
    const { getFieldDecorator } = this.props.form
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
          <Row>
            <Col xs={24} sm={{ span: 12, offset: 6 }} lg={{ span: 5, offset: 9 }}>
              <Button type='primary' htmlType='submit' block={true} size='large'>
                Đăng ký
              </Button>
            </Col>
          </Row>
          <Clearfix height={16} />
          <Row>
            <Col xs={24} sm={{ span: 20, offset: 4 }} lg={{ span: 8, offset: 8 }}>
              Bạn đã có tài khoản rồi?
              <Link href='#'>
                <a style={{ fontSize: 18 }}> Đăng nhập</a>
              </Link>
            </Col>
          </Row>
        </Form>
      </RegisterWrapper>
    )
  }
}

export default Form.create({})(Register)
