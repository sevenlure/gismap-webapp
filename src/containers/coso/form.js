import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Row, Col, Input, DatePicker, Radio, InputNumber } from 'antd'
import Area from 'src/components/elements/area'
import SelectNganhNghe from 'src/components/elements/select-nganh-nghe'
import SelectQuanHuyen from 'src/components/elements/select-quan-huyen'
import SelectCoQuanCapPhep from 'src/components/elements/select-co-quan-cap-phep'
import SelectKhuCumCongNghiep from 'src/components/elements/select-khu-cong-nghiep'
import SelectThamQuyenQuanLy from 'src/components/elements/select-tham-quyen-quan-ly'
import SelectTinhTrangHoatDong from 'src/components/elements/select-tinh-trang-hoat-dong'
import { get, pick } from 'lodash-es'
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
  'Ten',
  'TenChiNhanh',
  'SoGiayPhep_DKKD',
  'MaChiNhanh',
  'NganhNghe',
  'DiaChi',
  'DiaChiChiTiet',
  'DienThoai',
  'Fax',
  'KinhDo',
  'ViDo',
  'CoQuanCapPhep',
  'NgayCapPhep',
  'KhuCumCongNghiep',
  'CoQuanThamQuyenQuanLy',
  'TinhTrangHoatDong',
  'CongSuatSanXuat',
  'DienTich',
  'ThuocDoiTuongDiDoi',
  'ThuocDoiTuongDiDoi_Date',
  'ThuocDoiTuongONhiemMoiTruong',
  'ThuocDoiTuongONhiemMoiTruong_Date',
  'ThuocDoiTuongONhiemMoiTruongNghiemTrong',
  'ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date',
  'CanBoPhuTrach',
  'NguoiChiuTrachNhiemPhapLuat'
]

@Form.create()
export default class CosoForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    getRef: PropTypes.func
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  tranformData = dataForm => {
    const result = {
      ...dataForm,
      DiaChi: {
        ...dataForm.DiaChi,
        ChiTiet: dataForm.DiaChiChiTiet
      }
    }
    if (dataForm.ThuocDoiTuongDiDoi) {
      result.ThuocDoiTuongDiDoi_Date = result.ThuocDoiTuongDiDoi_Date.toDate()
    }

    if (dataForm.ThuocDoiTuongONhiemMoiTruong) {
      result.ThuocDoiTuongONhiemMoiTruong_Date = result.ThuocDoiTuongONhiemMoiTruong_Date.toDate()
    }

    if (dataForm.ThuocDoiTuongONhiemMoiTruongNghiemTrong) {
      result.ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date = result.ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date.toDate()
    }

    return result
  }

  tranformData2Form = data => {
    let result = {
      ...data,
      NganhNghe: get(data, 'NganhNghe._id'),
      TinhTrangHoatDong: get(data, 'TinhTrangHoatDong._id'),
      CoQuanCapPhep: get(data, 'CoQuanCapPhep._id'),
      KhuCumCongNghiep: get(data, 'KhuCumCongNghiep._id'),
      CoQuanThamQuyenQuanLy: get(data, 'CoQuanThamQuyenQuanLy._id'),
      DiaChi: get(data, 'DiaChi'),
      DiaChiChiTiet: get(data, 'DiaChi.ChiTiet'),
      // MARK  conver all Date field will below
      NgayCapPhep: undefined,
      ThuocDoiTuongDiDoi_Date: undefined,
      ThuocDoiTuongONhiemMoiTruong_Date: undefined,
      ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date: undefined
    }
    const NgayCapPhep = get(data, 'NgayCapPhep')
    if (NgayCapPhep) result.NgayCapPhep = moment(NgayCapPhep)

    const ThuocDoiTuongDiDoi_Date = get(data, 'ThuocDoiTuongDiDoi_Date')
    if (ThuocDoiTuongDiDoi_Date) {
      result.ThuocDoiTuongDiDoi_Date = moment(ThuocDoiTuongDiDoi_Date)
    }

    const ThuocDoiTuongONhiemMoiTruong_Date = get(data, 'ThuocDoiTuongONhiemMoiTruong_Date')
    if (ThuocDoiTuongONhiemMoiTruong_Date) {
      result.ThuocDoiTuongONhiemMoiTruong_Date = moment(ThuocDoiTuongONhiemMoiTruong_Date)
    }

    const ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date = get(data, 'ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date')
    if (ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date) {
      result.ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date = moment(ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date)
    }

    this.props.form.setFieldsValue(pick(result, keyFieldOfForm))
  }

  getFormData = () => {
    return new Promise(resolve => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          resolve({ err, values: this.tranformData(values) })
        }
        resolve({ err, values })
      })
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form

    return (
      <Form style={{ width: '100%' }}>
        <ContainerCustomRow>
          <Area title='Thông tin chung'>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Tên cơ sở'>
                  {getFieldDecorator('Ten', {
                    rules: [
                      { required: true, message: 'Field is required' },
                      { min: 6, message: 'Field must be at least 6 characters' }
                    ]
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Tên chi nhánh'>{getFieldDecorator('TenChiNhanh', {})(<Input />)}</Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Giấy ĐKKD/GP Đầu tư'>
                  {getFieldDecorator('SoGiayPhep_DKKD', { rules: [{ required: true, message: 'Field is required' }] })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Mã hiệu chi nhánh'>{getFieldDecorator('MaChiNhanh', {})(<Input />)}</Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item label='Mã cơ sở'>
                  <Input
                    disabled={true}
                    value={
                      getFieldValue('DiaChi')
                        ? getFieldValue('SoGiayPhep_DKKD') + `.${get(getFieldValue('DiaChi'), 'QuanHuyen.KeyExtra')}`
                        : getFieldValue('SoGiayPhep_DKKD')
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Ngành Nghề'>
                  {getFieldDecorator('NganhNghe', { rules: [{ required: true, message: 'Field is required' }] })(
                    <SelectNganhNghe />
                  )}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Quận Huyện/Phuờng Xã'>
                  {getFieldDecorator('DiaChi', { rules: [{ required: true, message: 'Field is required' }] })(
                    <SelectQuanHuyen />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item label='Địa chỉ'>
                  {getFieldDecorator('DiaChiChiTiet', { rules: [{ required: true, message: 'Field is required' }] })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Điện thoại'>
                  {getFieldDecorator('DienThoai', {})(<InputNumber style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Fax'>
                  {getFieldDecorator('Fax', {})(<InputNumber style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Kinh độ'>
                  {getFieldDecorator('KinhDo', {})(<InputNumber min={0} max={360} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Vĩ độ'>
                  {getFieldDecorator('ViDo', {})(<InputNumber min={-180} max={180} style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Area>
          <Area title='Giấy ĐKKD/GP Đầu tư'>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Cơ quan cấp phép'>
                  {getFieldDecorator('CoQuanCapPhep', {
                    rules: [{ required: true, message: 'Field is required' }]
                  })(<SelectCoQuanCapPhep />)}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Ngày cấp phép'>
                  {getFieldDecorator('NgayCapPhep', {})(<DatePicker style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Khu/Cụm Công Nghiệp'>
                  {getFieldDecorator('KhuCumCongNghiep', {})(<SelectKhuCumCongNghiep />)}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Cơ quan thẩm quyền quản lý'>
                  {getFieldDecorator('CoQuanThamQuyenQuanLy', {
                    rules: [{ required: true, message: 'Field is required' }]
                  })(<SelectThamQuyenQuanLy />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item label='Tình trạng hoạt động'>
                  {getFieldDecorator('TinhTrangHoatDong', {
                    rules: [{ required: true, message: 'Field is required' }]
                  })(<SelectTinhTrangHoatDong />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Công suất sản phẩm'>{getFieldDecorator('CongSuatSanXuat', {})(<Input />)}</Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Diện tích (m²)'>
                  {getFieldDecorator('DienTich', {})(<InputNumber style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={6}>
                <Form.Item label='Thuộc đối tuợng di dời'>
                  {getFieldDecorator('ThuocDoiTuongDiDoi', {
                    initialValue: false
                  })(
                    <Radio.Group>
                      <Radio value={true}>Có</Radio>
                      <Radio value={false}>Không</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item style={{ display: getFieldValue('ThuocDoiTuongDiDoi') ? '' : 'none' }}>
                  {getFieldDecorator('ThuocDoiTuongDiDoi_Date', {
                    rules: [{ required: getFieldValue('ThuocDoiTuongDiDoi'), message: 'Field is required' }]
                  })(<DatePicker style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col xs={6}>
                <Form.Item label='Thuộc đối tượng ô nhiễm môi trường'>
                  {getFieldDecorator('ThuocDoiTuongONhiemMoiTruong', {
                    initialValue: false
                  })(
                    <Radio.Group>
                      <Radio value={true}>Có</Radio>
                      <Radio value={false}>Không</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item style={{ display: getFieldValue('ThuocDoiTuongONhiemMoiTruong') ? '' : 'none' }}>
                  {getFieldDecorator('ThuocDoiTuongONhiemMoiTruong_Date', {
                    rules: [{ required: getFieldValue('ThuocDoiTuongONhiemMoiTruong'), message: 'Field is required' }]
                  })(<DatePicker style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col xs={6}>
                <Form.Item label='Thuộc đối tượng ô nhiễm môi trường nghiêm trọng'>
                  {getFieldDecorator('ThuocDoiTuongONhiemMoiTruongNghiemTrong', {
                    initialValue: false
                  })(
                    <Radio.Group>
                      <Radio value={true}>Có</Radio>
                      <Radio value={false}>Không</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item style={{ display: getFieldValue('ThuocDoiTuongONhiemMoiTruongNghiemTrong') ? '' : 'none' }}>
                  {getFieldDecorator('ThuocDoiTuongONhiemMoiTruongNghiemTrong_Date', {
                    rules: [
                      {
                        required: getFieldValue('ThuocDoiTuongONhiemMoiTruongNghiemTrong'),
                        message: 'Field is required'
                      }
                    ]
                  })(<DatePicker style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Area>
          <Area title='Cán bộ phụ trách'>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item label='Họ và tên'>{getFieldDecorator('CanBoPhuTrach.Ten', {})(<Input />)}</Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Điện thoại'>{getFieldDecorator('CanBoPhuTrach.DienThoai', {})(<Input />)}</Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Email'>
                  {getFieldDecorator('CanBoPhuTrach.Email', {
                    rules: [{ type: 'email', message: 'Field is not a valid email' }]
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          </Area>
          <Area title='Người chịu trách nhiệm pháp luật'>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item label='Họ và tên'>
                  {getFieldDecorator('NguoiChiuTrachNhiemPhapLuat.Ten', {})(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={12}>
                <Form.Item label='Điện thoại'>
                  {getFieldDecorator('NguoiChiuTrachNhiemPhapLuat.DienThoai', {})(<Input />)}
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label='Email'>
                  {getFieldDecorator('NguoiChiuTrachNhiemPhapLuat.Email', {
                    rules: [{ type: 'email', message: 'Field is not a valid email' }]
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
          </Area>
        </ContainerCustomRow>
      </Form>
    )
  }
}
