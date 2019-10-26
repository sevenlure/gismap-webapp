import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Button, Affix, Row, Col, InputNumber, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { pick as _pick, last as _last } from 'lodash-es'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import AvatarImage from 'src/components/elements/avartar'
import UpdatFile from 'src/components/elements/update-file-2'
import SelectUnitPrice from 'src/components/elements/select-unit-price'
import { realEstateProjectMess } from 'src/config/message'
import SelectStatus from 'src/components/elements/select-status'
import Map from 'src/containers/real-estate-project/component/map.js'

const errorForm = realEstateProjectMess.form

const EditFormWrapper = styled.div`
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
    pickFlieds: [
      'Name',
      'Status',
      'Address',
      'PriceWithUnit',
      'UnitCount',
      'Image',
      'PhapLy',
      'BangGia',
      'CSBH_NhanVien',
      'CSBH_KhachHang',
      'Brochure',
      'IsShow',
      'DinhVi'
    ]
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      console.log('Received values of form: ', values)
      if (!err) {
        // console.log('Received values of form: ', values)
        const data = {
          ...values,
          IsShow: _last(values.IsShow) ? _last(values.IsShow) : false
        }
        if (this.props.onSubmit) {
          this.props.onSubmit({
            ...data
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

    // console.log(_pick(initialValue, this.state.pickFlieds), 'initialData')
    setFieldsValue({
      ..._pick(initialValue, this.state.pickFlieds),
      IsShow: initialValue ? [initialValue.IsShow] : []
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <EditFormWrapper>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Tên dự án'>
                {getFieldDecorator('Name', { rules: [{ required: true, message: errorForm.name }] })(
                  <Input size='large' placeholder='Tên dự án *' />
                )}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label='Tình trạng'>
                {getFieldDecorator('Status', {
                  initialValue: 'Đang triển khai',
                  rules: [{ required: true, message: errorForm.status }]
                })(<SelectStatus placeholder='Tình trạng *' />)}
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item wrapperCol={{ offset: 6 }} label='Hiển thị'>
                {getFieldDecorator('IsShow', {})(
                  <Checkbox.Group>
                    <Checkbox value={true} />
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Địa chỉ'>
                {getFieldDecorator('Address', {
                  rules: [{ required: true, message: errorForm.address }]
                })(<Input size='large' placeholder='Địa chỉ *' />)}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label='Giá sản phẩm'>
                {getFieldDecorator('PriceWithUnit', {
                  rules: [{ required: true, message: errorForm.price }]
                })(<InputNumber style={{ width: '100%' }} size='large' placeholder='Giá sản phẩm *' />)}
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label='Đơn vị'>
                {getFieldDecorator('UnitCount', {
                  initialValue: 'TY'
                })(<SelectUnitPrice />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Hình đại diện'>
                {getFieldDecorator('Image', {
                  rules: [{ required: true, message: errorForm.image }]
                })(<AvatarImage />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Pháp lý dự án'>{getFieldDecorator('PhapLy', {})(<UpdatFile />)}</Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Bảng giá'>{getFieldDecorator('BangGia', {})(<UpdatFile />)}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Chính sách bán hàng cho nhân viên'>
                {getFieldDecorator('CSBH_NhanVien', {})(<UpdatFile />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='Chính sách bán hàng cho khách hàng'>
                {getFieldDecorator('CSBH_KhachHang', {})(<UpdatFile />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Brochure'>{getFieldDecorator('Brochure', {})(<UpdatFile />)}</Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item label='Vị trí tọa độ'>
                {getFieldDecorator('DinhVi', {
                  rules: [{ required: true, message: errorForm.dinhVi }]
                })(<Map />)}
              </Form.Item>
              {/* <Map /> */}
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
      </EditFormWrapper>
    )
  }
}

export default Form.create({})(UserForm)
