import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Row, Col, Icon, message } from 'antd'
import { postChangePassword } from 'src/api/userApi'

const formItemLayout = {
  labelCol: {
    xs: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 16 }
  },
  labelAlign: 'left'
}

@Form.create()
export default class ModalChangePassword extends React.Component {
  static propTypes = {
    form: PropTypes.any.isRequired,
    getRef: PropTypes.func
  }
  state = {
    isVisible: false
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  closeModal = () => {
    this.setState({ isVisible: false })
  }

  openModal = () => {
    this.setState({ isVisible: true })
  }

  handleOk = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const { OldPassword, NewPassword } = values
        postChangePassword(OldPassword, NewPassword)
          .then(() => {
            message.success('Cập nhật thành công')
            this.setState({ isVisible: false })
            this.props.form.resetFields()
          })
          .catch(() => {})
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title='Đổi mật khẩu'
        visible={this.state.isVisible}
        okText='Xác nhận'
        cancelText='Huỷ'
        onCancel={this.closeModal}
        onOk={this.handleOk}
      >
        <Form {...formItemLayout} style={{ width: '100%' }}>
          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item label='Mật khẩu cũ'>
                {getFieldDecorator('OldPassword', {
                  rules: [{ required: true, message: 'Field is required' }]
                })(
                  <Input.Password
                    size='large'
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='Mật khẩu cũ'
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item label='Mật khẩu mới'>
                {getFieldDecorator('NewPassword', {
                  rules: [
                    { required: true, message: 'Field is required' },
                    { min: 6, message: 'Field must be at least 6 characters' }
                  ]
                })(
                  <Input.Password
                    size='large'
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='Mật khẩu mới'
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item label='Nhập lại mật khẩu'>
                {getFieldDecorator('ConfirmPassword', {
                  rules: [
                    { required: true, message: 'Field is required' },
                    {
                      validator: (rule, value, cb) => {
                        const { getFieldValue } = this.props.form
                        if (value !== getFieldValue('NewPassword')) cb('Password nhâp lại không khớp!!!')
                        cb()
                      }
                    }
                  ]
                })(
                  <Input.Password
                    size='large'
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='Nhập lại mật khẩu'
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}
