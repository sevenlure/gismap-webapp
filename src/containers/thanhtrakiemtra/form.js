import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Row, Col, Input, DatePicker } from 'antd'
import { ATTACHMENT_TYPE } from 'shared/constant/attachment'
import UploadAttachment from 'src/containers/attachment/upload'
import SelectCoso from 'src/components/elements/select-coso'
import { pick, get } from 'lodash-es'
import moment from 'moment'
import SelectTinhTrangKiemTra from 'src/components/elements/select-tinh-trang-kiem-tra'

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
  'SoQuyetDinhKiemTra',
  'NgayKiemTra',
  'DonViCapQuyetDinhKiemTra',
  'DonViKiemTra',
  'TinhTrangKiemTra',
  'TapTinDinhKem',
  'TapTinDeleted' // notuse when setData2Form
]

@Form.create()
export default class ThanhTraKiemTraForm extends React.Component {
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
      TinhTrangKiemTra: get(data, 'TinhTrangKiemTra._id')
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
              <Form.Item label='Số quyết định kiểm tra'>
                {getFieldDecorator('SoQuyetDinhKiemTra', {
                  rules: [{ required: true, message: 'Field is required' }]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Ngày kiểm tra'>
                {getFieldDecorator('NgayKiemTra', {
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
              <Form.Item label='Đơn vị cấp quyết định kiểm tra'>
                {getFieldDecorator('DonViCapQuyetDinhKiemTra', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item label='Đơn vị kiểm tra'>{getFieldDecorator('DonViKiemTra', {})(<Input />)}</Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={12}>
              <Form.Item label='Tình trạng kiểm tra'>
                {getFieldDecorator('TinhTrangKiemTra', {})(<SelectTinhTrangKiemTra />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item label='Attachment'>
                {getFieldDecorator('TapTinDinhKem', {})(
                  <UploadAttachment
                    cbDeleteFile={this.handleCacheAttachDeleted}
                    keyUpload={ATTACHMENT_TYPE.THANH_TRA_KIEM_TRA}
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
