import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Affix, Row, Col, DatePicker } from 'antd'
import Button from 'src/components/elements/button'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { get as _get, pick as _pick } from 'lodash-es'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import SelectDepartmentToGroup from 'src/components/elements/select-department-group'
import Avartar from 'src/components/elements/avartar'
import { authMess } from 'src/config/message'
import { DATE_FORMAT } from 'src/config/format.js'
import momnent from 'moment'
const userMess = authMess.register

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
    getFieldDecorator: PropTypes.any,
    onSubmit: PropTypes.func,
    initialValue: PropTypes.object,
    isEdit: PropTypes.bool
  }

  state = {
    pickFlieds: ['Email', 'FullName', 'Birthday', 'PosittionName', 'Avatar', 'Phone']
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)

        const optionDepartment = _get(values, 'optionDepartment', [])
        let result = {}
        if (optionDepartment[0]) {
          result.Department = optionDepartment[0] ? optionDepartment[0] : null
          result.Group = optionDepartment[1] ? optionDepartment[1] : null
        }
        console.log(result, 'result')

        if (this.props.onSubmit) {
          this.props.onSubmit({
            ...values,
            ...result
          })
        }
      }
    })
  }

  componentDidMount = () => {
    this.props.form.resetFields()
    const { setFieldsValue } = this.props.form
    const { initialValue } = this.props

    if (!initialValue) {
      return
    }
    let optionDepartment = []

    if (_get(initialValue, 'Department._id', null)) {
      optionDepartment.push(_get(initialValue, 'Department._id', null))
    }
    if (_get(initialValue, 'Group._id', null)) {
      optionDepartment.push(_get(initialValue, 'Group._id', null))
    }
    const data = {
      ..._pick(initialValue, this.state.pickFlieds),
      Birthday: initialValue.Birthday ? momnent(initialValue.Birthday) : null,
      optionDepartment: optionDepartment
    }
    // console.log(data, 'initialData')
    setFieldsValue({
      ...data
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <UserFormWrapper>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Tên nhân sự'>
                {getFieldDecorator('FullName', { rules: [{ required: true, message: userMess.fullName }] })(
                  <Input size='large' placeholder='Tên nhân sự *' />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Email'>
                {getFieldDecorator('Email', {
                  rules: [{ required: true, message: userMess.email }, { type: 'email', message: userMess.emailFormat }]
                })(<Input size='large' placeholder='Email *' />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Số điện thoại'>
                {getFieldDecorator('Phone', {
                  rules: [
                    { required: true, message: userMess.phone },
                    { min: 10, max: 13, message: userMess.phoneLenght }
                  ]
                })(<Input size='large' placeholder='Số điện thoại *' />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Năm sinh'>
                {getFieldDecorator('Birthday', {
                  // initialValue: moment()
                })(<DatePicker size='large' placeholder='Năm sinh' format={DATE_FORMAT} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Chức vụ'>
                {getFieldDecorator('PosittionName', {})(<Input size='large' maxLength={30} placeholder='Chức vụ *' />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Phòng ban'>
                {getFieldDecorator('optionDepartment', {
                  rules: [{ required: true, message: userMess.department }]
                })(<SelectDepartmentToGroup placeholder='Phòng ban *' />)}
              </Form.Item>
            </Col>
          </Row>
          {!this.props.isEdit && (
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label='Mật khẩu'>
                  {getFieldDecorator('Password', {
                    rules: [
                      { required: true, message: userMess.password },
                      { min: 8, message: userMess.min },
                      { max: 32, message: userMess.max }
                    ]
                  })(<Input.Password size='large' placeholder='Mật khẩu *' />)}
                </Form.Item>
              </Col>
              <Col span={12}>
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
          )}
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Hình đại diện'>{getFieldDecorator('Avatar', {})(<Avartar />)}</Form.Item>
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
                {this.props.isEdit ? 'Cập nhật' : 'Tạo mới'}
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
