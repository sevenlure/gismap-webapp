import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Button, Affix } from 'antd'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import { auth as authMess } from 'src/config/message'

const registerMess = authMess.register

const UserFormWrapper = styled.div`
  flex: 1;
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
    // margin-bottom: 8px;
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
class UserForm extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    getFieldError: PropTypes.any,
    onSuccess: PropTypes.func,
    userLogin: PropTypes.func,
    updateUserInfo: PropTypes.func,
    isClearData: PropTypes.bool
  }

  state = {
    otp: '',
    messageErrorOtp: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    // const { form } = this.props
    // if (value && value !== form.getFieldValue('password')) {
    //   callback(registerMess.comparePassword)
    // } else {
    //   callback()
    // }
  }

  componentDidMount() {}

  componentDidUpdate = prevprops => {
    if (this.props.isClearData !== prevprops.isClearData && prevprops.isClearData) {
      this.props.form.resetFields()
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <UserFormWrapper>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('fullName', {
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
              <Input
                size='large'
                maxLength={30}
                //   prefix={<Icon component={PersonalSvg} />}
                placeholder='Họ và tên *'
              />
            )}
          </Form.Item>
          <Affix offsetBottom={20}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                loading={this.state.isLoading}
                size='large'
                style={{ marginRight: 8, width: 120 }}
                type='primary'
                onClick={() => {
                  this.setState(
                    {
                      isLoading: true
                    },
                    () => {
                      this.handleSubmit()
                    }
                  )
                }}
              >
                Tạo mới
              </Button>
            </div>
          </Affix>
        </Form>
      </UserFormWrapper>
    )
  }
}

export default Form.create({})(UserForm)
