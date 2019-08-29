import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Router, { withRouter } from 'next/router'
import slug from 'src/routes'
import Clearfix from 'src/components/elements/clearfix'
import DefaultLayout from 'src/layout/default'
import { Form, Input, Icon, Button } from 'antd'
import { get as _get } from 'lodash-es'
import PassSvg from 'static/images/icon/ic-pass.svg'
import { changePassword } from 'src/api/authApi'
import queryString from 'query-string'

const ForgetPasswordNewWrapper = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: center;

  .forget-password-new---contant {
    max-width: 968px;
    width: 100%;
    background: white;
    padding: 50px 70px;

    .forget-password-new---contant--title h3 {
      margin-bottom: 8px;
    }
    .forget-password-new---contant--button {
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
class ForgetPasswordNewPage extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    onSuccess: PropTypes.func
  }

  state = {
    isLoading: false,
    phone: '',
    secret: ''
  }
  componentDidMount = () => {
    const parsed = queryString.parse(location.search)

    // console.log(parsed)
    this.setState({
      phone: parsed.phone,
      secret: parsed.secret
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          isLoading: true
        })
        // console.log('Received values of form: ', values)
        const res = await changePassword({
          newPassword: values.newPassword,
          phone: _get(this.state, 'phone', ''),
          secret: _get(this.state, 'secret', '')
        })

        if (res.status) {
          this.setState({
            isLoading: false
          })
          Router.push(slug.result.success + '?title=Thành công&message=Bạn đã đặt lại mật khẩu mới thành công')
        } else {
          this.setState({
            isLoading: false
          })
          Router.push(slug.result.error + '?title=Thất bại&message=Vui lòng đổi lại mật khẩu')
        }
      }
    })
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Mật khẩu xác nhận chưa giống mật khẩu!')
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <ForgetPasswordNewWrapper>
        <Form onSubmit={this.handleSubmit} className='forget-password-new---contant'>
          <div className='forget-password-new---contant--title'>
            <h3>Lấy lại mật khẩu</h3>
          </div>
          <Clearfix height={30} />
          <Form.Item className='forget-password---contant--input'>
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]
            })(<Input.Password prefix={<Icon component={PassSvg} />} placeholder='Mật khẩu mới *' />)}
          </Form.Item>
          <Form.Item className='forget-password---contant--input'>
            {getFieldDecorator('newPasswordConfirm', {
              rules: [
                { required: true, message: 'Vui lòng nhập mật khẩu xác nhận!' },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password prefix={<Icon component={PassSvg} />} placeholder='Nhập lại mật khẩu mới *' />)}
          </Form.Item>
          <Clearfix height={16} />
          <div className='forget-password-new---contant--button'>
            <Button
              disabled={!getFieldValue('newPasswordConfirm')}
              type='primary'
              htmlType='submit'
              block={true}
              size='large'
              loading={this.state.isLoading}
            >
              Xác nhận
            </Button>
          </div>
        </Form>
      </ForgetPasswordNewWrapper>
    )
  }
}

ForgetPasswordNewPage.Layout = DefaultLayout
export default Form.create({})(ForgetPasswordNewPage)
