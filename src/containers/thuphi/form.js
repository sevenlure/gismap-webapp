import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Row, Col, InputNumber, Select } from 'antd'
import SelectCoso from 'src/components/elements/select-coso'
import InputCurrency from 'src/components/elements/input-currency'
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
const keyFieldOfForm = ['Coso', 'Nam', 'Quy', 'SoTienDaNop', 'TongSoTien']

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
              <Form.Item label='Cơ sở'>
                {getFieldDecorator('Coso', {
                  rules: [{ required: true, message: 'Field is required' }]
                })(<SelectCoso isDisabled={this.props.isEdit} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Năm'>
                {getFieldDecorator('Nam', {
                  rules: [{ required: true, message: 'Field is required' }]
                })(<InputNumber min={1970} style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Quý'>
                {getFieldDecorator('Quy', {
                  rules: [{ required: true, message: 'Field is required' }]
                })(
                  <Select>
                    <Select.Option value='I'>I</Select.Option>
                    <Select.Option value='II'>II</Select.Option>
                    <Select.Option value='III'>III</Select.Option>
                    <Select.Option value='IV'>IV</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Số tiền đã nộp'>
                {getFieldDecorator('SoTienDaNop', {})(<InputCurrency min={0} style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Tổng số tiền'>
                {getFieldDecorator('TongSoTien', {})(<InputCurrency min={0} style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
          </Row>
        </ContainerCustomRow>
      </Form>
    )
  }
}
