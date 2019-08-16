import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Row, Col, Input, Icon } from 'antd'
import { pick } from 'lodash-es'

const ContainerCustomRow = styled.div`
  .ant-col.ant-form-item-label,
  .has-error {
    line-height: 20px;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }
`
const keyFieldOfForm = ['Email', 'FirstName', 'LastName']

@Form.create()
export default class ThuPhiForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    getRef: PropTypes.func,
    isEdit: PropTypes.bool
  }

  state = {
    attachDeleted: []
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  tranformData2Form = data => {
    let result = {
      ...data
      // Coso: get(data, 'Coso._id'), // MARK  Coso can _id va Name
    }
    this.props.form.setFieldsValue(pick(result, keyFieldOfForm))
  }

  getFormData = () => {
    return new Promise(resolve => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          resolve({
            err,
            values: {
              ...values
            }
          })
        }
        resolve({ err, values })
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={{ width: '100%', minHeight: 900 }}>
        <ContainerCustomRow>
          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item label='Email'>
                {getFieldDecorator('Email', {
                  rules: [
                    { required: true, message: 'Field is required' },
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    }
                  ]
                })(<Input disabled={this.props.isEdit} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Tên'>
                {getFieldDecorator('FirstName', {
                  rules: [{ required: true, message: 'Field is required' }]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Họ'>
                {getFieldDecorator('LastName', {
                  rules: [{ required: true, message: 'Field is required' }]
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          {!this.props.isEdit && (
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Mật khẩu'>
                  {getFieldDecorator('Password', {})(
                    <Input.Password prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} />
                  )}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Nhập lại mật khẩu' hasFeedback>
                  {getFieldDecorator('ConfirmPassword', {
                    rules: [
                      { required: true, message: 'Field is required' },
                      {
                        validator: (rule, value, cb) => {
                          const { getFieldValue } = this.props.form
                          if (value !== getFieldValue('Password')) cb('Password nhâp lại không khớp!!!')
                          cb()
                        }
                      }
                    ]
                  })(
                    <Input.Password
                      prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder='Nhập lại mật khẩu'
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          )}
        </ContainerCustomRow>
      </Form>
    )
  }
}
