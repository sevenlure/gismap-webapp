import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Row, Col, Input, InputNumber } from 'antd'
import SelectCoso from 'src/components/elements/select-coso'
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
const keyFieldOfForm = ['Coso', 'Nam', 'LoaiChatThai', 'KhoiLuong', 'DonViThuGom_VanChuyenXuLy']

@Form.create()
export default class BaoCaoQuanLyChatThaiRanForm extends React.Component {
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
                {getFieldDecorator('Nam', {})(<InputNumber min={1970} max={2100} style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Loại chất thải'>{getFieldDecorator('LoaiChatThai', {})(<Input />)}</Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Khối luợng'>
                {getFieldDecorator('KhoiLuong', {})(<InputNumber min={0} style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Đơn vị thu gom, vận chuyển xử lý'>
                {getFieldDecorator('DonViThuGom_VanChuyenXuLy', {})(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </ContainerCustomRow>
      </Form>
    )
  }
}
