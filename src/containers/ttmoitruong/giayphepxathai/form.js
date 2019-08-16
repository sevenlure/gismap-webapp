import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ATTACHMENT_TYPE } from 'shared/constant/attachment'
import { Form, Row, Col, Input, DatePicker, InputNumber } from 'antd'
import SelectCoso from 'src/components/elements/select-coso'
import UploadAttachment from 'src/containers/attachment/upload'
import SelectCoQuanCapPhep from 'src/components/elements/select-co-quan-cap-phep'
import SelectDacTrungNuocThai from 'src/components/elements/select-dac-trung-nuoc-thai'
import SelectNguonTiepNhan from 'src/components/elements/select-nguon-tiep-nhan'
import { get, pick, map } from 'lodash-es'
import moment from 'moment'

const ContainerCustomRow = styled.div`
  .ant-col.ant-form-item-label,
  .has-error {
    line-height: 20px;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }
`
const keyFieldOfForm = [
  'Coso',
  'SoGiayPhep',
  'CoQuanCapPhep',
  'NgayCapPhep',
  'CongSuatThietKe',
  'LuuLuongCapPhep',
  'DacTrungNuocThai',
  'TieuChuanApDung',
  'NguonTiepNhan',
  'TapTinDinhKem',
  'TapTinDeleted' // notuse when setData2Form
]

@Form.create()
export default class KehoachbaovemoitruongForm extends React.Component {
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
      ...data,
      // Coso: get(data, 'Coso._id'), // MARK  Coso can _id va Name 
      CoQuanCapPhep: get(data, 'CoQuanCapPhep._id'),
      DacTrungNuocThai: get(data, 'DacTrungNuocThai._id'),
      NguonTiepNhan: get(data, 'NguonTiepNhan._id')
    }
    const NgayCapPhep = get(data, 'NgayCapPhep')
    if (NgayCapPhep) result.NgayCapPhep = moment(NgayCapPhep)
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
              ...values,
              TapTinDinhKem: map(values.TapTinDinhKem, '_id'),
              TapTinDeleted: this.state.attachDeleted
            }
          })
        }
        resolve({ err, values })
      })
    })
  }

  handleCacheAttachDeleted = _id => {
    this.setState({
      attachDeleted: [...this.state.attachDeleted, _id]
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
            <Col xs={24}>
              <Form.Item label='Số giấy phép'>
                {getFieldDecorator('SoGiayPhep', {
                  rules: [{ required: true, message: 'Field is required' }]
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Cơ quan cấp phép'>
                {getFieldDecorator('CoQuanCapPhep', {})(<SelectCoQuanCapPhep />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Ngày cấp phép'>
                {getFieldDecorator('NgayCapPhep', {
                  getValueFromEvent: val => {
                    if (!val) return null
                    else return val.toDate()
                  },
                  getValueProps: val => {
                    if (!val) return null
                    else return { value: moment(val) }
                  }
                })(<DatePicker style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Công suất thiết kế HTXL NT'>
                {getFieldDecorator('CongSuatThietKe', {})(<InputNumber style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Lưu lượng cấp phép'>
                {getFieldDecorator('LuuLuongCapPhep', {})(<InputNumber style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Đặc trưng nước thải'>
                {getFieldDecorator('DacTrungNuocThai', {})(<SelectDacTrungNuocThai />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Tiêu chuẩn áp dụng'>{getFieldDecorator('TieuChuanApDung', {})(<Input />)}</Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Nguồn tiếp nhận'>
                {getFieldDecorator('NguonTiepNhan', {})(<SelectNguonTiepNhan />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item label='Attachment'>
                {getFieldDecorator('TapTinDinhKem', {})(
                  <UploadAttachment
                    cbDeleteFile={this.handleCacheAttachDeleted}
                    keyUpload={ATTACHMENT_TYPE.GIAY_PHEP_XA_THAI}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </ContainerCustomRow>
      </Form>
    )
  }
}
