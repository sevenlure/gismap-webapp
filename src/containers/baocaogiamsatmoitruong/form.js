import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ATTACHMENT_TYPE } from 'shared/constant/attachment'
import { Form, Row, Col, Input, DatePicker, InputNumber, Select } from 'antd'
import SelectCoso from 'src/components/elements/select-coso'
import UploadAttachment from 'src/containers/attachment/upload'
import SelectCoQuanCapPhep from 'src/components/elements/select-co-quan-cap-phep'
import { get, pick, map } from 'lodash-es'
import moment from 'moment'
import { THUOC_DOI_TUONG_THU_PHI } from 'shared/constant/baocaogiamsatmoitruong'
import Area, { SubTitle } from 'src/components/elements/area'
import Clearfix from 'src/components/elements/clearfix'

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
  'ThuocDoiTuongThuPhi',
  'NhuCauSuDungNuocTrungBinh.TheoThuyCuc',
  'NhuCauSuDungNuocTrungBinh.TheoKhaiThacNuocNgam',
  'LuuLuongNuocThaiPhatSinh.NuocThai.TheoHoSoMoiTruong',
  'LuuLuongNuocThaiPhatSinh.NuocThai.TheoThucTeDongHoDo',
  'LuuLuongNuocThaiPhatSinh.NuocThai.TongLuongNuocThaiPhatSinhTrongQuy',
  'LuuLuongNuocThaiPhatSinh.NuocThai.LoaiChatThai',
  'LuuLuongNuocThaiPhatSinh.NuocThai.HamLuongNuocThai',
  'LuuLuongNuocThaiPhatSinh.CTR.KhoiLuong',
  'LuuLuongNuocThaiPhatSinh.CTR.DonViThuGom_VanChuyenXuLy',
  'TapTinDinhKem',
  'TapTinDeleted' // notuse when setData2Form
]

@Form.create()
export default class BaoCaoGiamSatMoiTruongForm extends React.Component {
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
              <Form.Item label='Thuộc đối tượng thu phí'>
                {getFieldDecorator('ThuocDoiTuongThuPhi', {})(
                  <Select>
                    <Select.Option value={THUOC_DOI_TUONG_THU_PHI.BIEN_DOI}>
                      Thu phí biến đổi (Trên 5m³/ngày)
                    </Select.Option>
                    <Select.Option value={THUOC_DOI_TUONG_THU_PHI.CO_DINH}>
                      Thu phí cố định (Dưới 5m³/ngày)
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Clearfix height={8} />
          <Area title='Nhu cầu sử dụng nước trung bình (m³/ngày)'>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Theo thủy cục'>
                  {getFieldDecorator('NhuCauSuDungNuocTrungBinh.TheoThuyCuc', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Theo khai thác nước ngầm'>
                  {getFieldDecorator('NhuCauSuDungNuocTrungBinh.TheoKhaiThacNuocNgam', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Area>
          <Area title=' Lưu lượng nước thải phát sinh trung bình (m³/ngày)'>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Theo hồ sơ môi trường'>
                  {getFieldDecorator('LuuLuongNuocThaiPhatSinh.NuocThai.TheoHoSoMoiTruong', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Theo thực tế đồng hồ đo hoặc bảng theo dõi'>
                  {getFieldDecorator('LuuLuongNuocThaiPhatSinh.NuocThai.TheoThucTeDongHoDo', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Tổng lượng nước thải phát sinh trong quý'>
                  {getFieldDecorator('LuuLuongNuocThaiPhatSinh.NuocThai.TongLuongNuocThaiPhatSinhTrongQuy', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Loại chất thải'>
                  {getFieldDecorator('LuuLuongNuocThaiPhatSinh.NuocThai.LoaiChatThai', {})(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Hàm lượng nước thải'>
                  {getFieldDecorator('LuuLuongNuocThaiPhatSinh.NuocThai.HamLuongNuocThai', {})(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Khối lượng'>
                  {getFieldDecorator('LuuLuongNuocThaiPhatSinh.CTR.KhoiLuong', {})(
                    <InputNumber min={0} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Đơn vị thu gom, vận chuyển xử lý'>
                  {getFieldDecorator('LuuLuongNuocThaiPhatSinh.CTR.DonViThuGom_VanChuyenXuLy', {})(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          </Area>

          <Row gutter={12}>
            <Col xs={24}>
              <Form.Item label='Attachment'>
                {getFieldDecorator('TapTinDinhKem', {})(
                  <UploadAttachment
                    cbDeleteFile={this.handleCacheAttachDeleted}
                    keyUpload={ATTACHMENT_TYPE.BAO_CAO_GIAM_SAT_MOI_TRUONG}
                    fieldsExtra={[
                      {
                        key: 'BaoCaoGiamSat',
                        label: 'Báo cáo giám sát',
                        layout: {
                          labelCol: {
                            xs: { span: 6 }
                          },
                          wrapperCol: {
                            xs: { span: 18 }
                          }
                        }
                      },
                      {
                        key: 'KQPT_MauNuocThai',
                        label: 'Kết quả phân tích mẫu nước thải',
                        layout: {
                          labelCol: {
                            xs: { span: 8 }
                          },
                          wrapperCol: {
                            xs: { span: 16 }
                          }
                        }
                      },
                      {
                        key: 'KQPT_MauKhiThai',
                        label: 'Kết quả phân tích mẫu khi thải',
                        layout: {
                          labelCol: {
                            xs: { span: 8 }
                          },
                          wrapperCol: {
                            xs: { span: 16 }
                          }
                        }
                      },
                      {
                        key: 'HopDongVanChuyen',
                        label: 'Hợp đồng vận chuyển CTR',
                        layout: {
                          labelCol: {
                            xs: { span: 8 }
                          },
                          wrapperCol: {
                            xs: { span: 16 }
                          }
                        }
                      }
                    ]}
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
