import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Icon, Button, message } from 'antd'
import MobileSvg from 'static/images/icon/ic-mobile.svg'
import PassSvg from 'static/images/icon/ic-pass.svg'
import Clearfix from 'src/components/elements/clearfix'
import authApi from 'src/api/authApi'
import { userLogin } from 'src/redux/actions/authAction'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import { connect } from 'react-redux'
import { get as _get } from 'lodash-es'
import { auth as authMess } from 'src/config/message'

const LoginWrapper = styled.div`
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
  .form--forgot-pasword {
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
  .ant-form-item {
    margin-bottom: 8px;
  }
`
const mapStateToProps = state => ({
  isAuthenticated: _get(state, 'AuthStore.isAuthenticated')
})
const mapDispatchToProps = {
  userLogin,
  updateUserInfo
}
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Login extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    getFieldError: PropTypes.any,
    onCancel: PropTypes.func.isRequired,
    onRegister: PropTypes.func,
    userLogin: PropTypes.func,
    updateUserInfo: PropTypes.func,
    onForgotPass: PropTypes.func
  }

  state = {
    modal: null,
    isLoading: false
  }

  componentDidMount = () => {}
  componentWillUnmount = () => {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        // if (this.props.onSubmit) this.props.onSubmit(values)
        this.setState({
          isLoading: true
        })

        setTimeout(async () => {
          authApi
            .login(values)
            .then(res => {
              // console.log('API', res)
              this.props.userLogin(_get(res, 'data', null))
              const userInfo = _get(res, 'data', null)
              this.props.updateUserInfo(userInfo)
              // message.success(`Welcome ${userInfo.name}`)
              if (this.props.onCancel) this.props.onCancel()
            })
            .catch(ex => {
              // const { response } = e
              console.log('catch', ex)
              if (ex.response.data.code === 'Unauthorized') {
                message.error(authMess.loginFail)
              }
            })
            .finally(() => {
              this.setState({
                isLoading: false
              })
            })
        }, 500)
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
          <Button style={{ width: 88 }} onClick={this.props.onCancel} size='large' type='default'>
            Đóng
          </Button>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
            })(
              <Input
                size='large'
                maxLength={13}
                prefix={<Icon component={MobileSvg} />}
                placeholder='Số điện thoại *'
              />
            )}
          </Form.Item>
          <div>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Vui lòng nhâp mật khẩu!' }]
            })(
              <Input.Password
                size='large'
                maxLength={32}
                prefix={<Icon component={PassSvg} />}
                placeholder='Mật khẩu *'
              />
            )}
          </div>
          <Clearfix height={16} />
          <div className='form--forgot-pasword'>
            <strong>
              <a onClick={this.props.onForgotPass}> Quên mật khẩu?</a>
            </strong>
          </div>
          <Clearfix height={30} />
          <div className='form--button'>
            <Button
              disabled={!getFieldValue('password')}
              type='primary'
              htmlType='submit'
              block={true}
              size='large'
              loading={this.state.isLoading}
            >
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
