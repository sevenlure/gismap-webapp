import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Affix, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { pick as _pick } from 'lodash-es'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import { authMess } from 'src/config/message'
import Button from 'src/components/elements/button'

const userMess = authMess.register

const UserFormWrapper = styled.div`
  flex: 1;
  .form--button {
    stext-align: center;
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
@connect(() => ({}), mapDispatchToProps)
class UserForm extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    getFieldDecorator: PropTypes.any,
    onSubmit: PropTypes.func,
    isEdit: PropTypes.bool
  }

  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)

        if (this.props.onSubmit) {
          this.props.onSubmit({
            ..._pick(values, ['Password'])
          })
        }
      }
    })
  }

  componentDidMount = () => {
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <UserFormWrapper>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item label='Mật khẩu mới'>
                {getFieldDecorator('Password', {
                  rules: [
                    { required: true, message: userMess.password },
                    { min: 8, message: userMess.min },
                    { max: 32, message: userMess.max }
                  ]
                })(<Input.Password size='large' placeholder='Mật khẩu *' />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='Xác nhận mật khẩu'>
                {getFieldDecorator('PasswordConfirm', {
                  rules: [
                    { required: true, message: userMess.passwordConfirm },
                    { min: 8, message: userMess.min },
                    { max: 32, message: userMess.max },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password size='large' placeholder='Mật khẩu *' />)}
              </Form.Item>
            </Col>
          </Row>
          <Affix offsetBottom={20}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                loading={this.state.isLoading}
                size='large'
                style={{ marginRight: 8, width: 120 }}
                type='primary'
                htmlType='submit'
              >
                Cập nhật
              </Button>
            </div>
          </Affix>
        </Form>
      </UserFormWrapper>
    )
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('Password')) {
      callback(userMess.passwordConfirm)
    } else {
      callback()
    }
  }
}

export default Form.create({})(UserForm)
