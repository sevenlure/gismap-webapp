import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Row, Col, Input, DatePicker, Radio } from 'antd'
import SelectCoso from 'src/components/elements/select-coso'
import UploadAttachment from 'src/containers/attachment/upload'
import SelectCoQuanCapPhep from 'src/components/elements/select-co-quan-cap-phep'

const ContainerCustomRow = styled.div`
  .ant-col.ant-form-item-label,
  .has-error {
    line-height: 20px;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }
`

@Form.create()
export default class TacdongmoitruongForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    getRef: PropTypes.func
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  getFormData = () => {
    return new Promise(resolve => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          resolve({ err, values: values })
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
                })(<SelectCoso />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item label='Số quyết định phê duyệt'>
                {getFieldDecorator('SoQuyenDinhPheDuyet', {
                  rules: [{ required: true, message: 'Field is required' }]
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Cơ quan cấp'>
                {getFieldDecorator('CoQuanCapPhep', {})(<SelectCoQuanCapPhep />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Ngày cấp phép'>
                {getFieldDecorator('NgayPheDuyet', {
                  getValueFromEvent: val => {
                    if (!val) return null
                    else return val.toDate()
                  },
                  valuePropName: 'date'
                })(<DatePicker style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Xác nhận hoàn thành'>
                {getFieldDecorator('XacNhanHoanThanh', {
                  initialValue: false
                })(
                  <Radio.Group>
                    <Radio value={true}>Có</Radio>
                    <Radio value={false}>Không</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item label='Attachment'>
                {getFieldDecorator('TapTinDinhKem', {})(<UploadAttachment keyUpload='TacDongMoiTruong' />)}
              </Form.Item>
            </Col>
          </Row>
        </ContainerCustomRow>
      </Form>
    )
  }
}
