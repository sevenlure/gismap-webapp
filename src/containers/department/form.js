import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Button, InputNumber } from 'antd'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import { departmentMess } from 'src/config/message'
import { pick as _pick } from 'lodash-es'
import SelectDepartment from 'src/components/elements/select-user-by-department'

const errorMessage = departmentMess.error

const PolyciFormWrapper = styled.div`
  flex: 1;
`
const mapDispatchToProps = {
  userLogin,
  updateUserInfo
}
@connect(
  () => ({}),
  mapDispatchToProps
)
class GroupPolicyForm extends React.Component {
  static propTypes = {
    Departmentkey: PropTypes.string,
    form: PropTypes.any,
    getFieldError: PropTypes.any,
    initialData: PropTypes.object,
    onSubmit: PropTypes.func,
    isEdit: PropTypes.bool
  }

  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        if (this.props.onSubmit) {
          this.props.onSubmit({ ...values })
        }
        // console.log('data: ', data)
      }
    })
  }

  componentDidMount = () => {
    this.props.form.resetFields()
    const { setFieldsValue } = this.props.form
    const { initialData } = this.props
    // console.log(_pick(initialData, ['Name', 'HeadPerson', 'Order']), 'initialData')
    setFieldsValue({
      ..._pick(initialData, ['Name', 'HeadPerson', 'Order'])
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <PolyciFormWrapper>
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='Tên phòng ban'>
            {getFieldDecorator('Name', {
              rules: [{ required: true, message: errorMessage.name }]
            })(<Input placeholder='Tên nhóm chính sách' />)}
          </Form.Item>
          <Form.Item label='Trưởng phòng'>
            {getFieldDecorator('HeadPerson', {})(
              <SelectDepartment Departmentkey={this.props.Departmentkey} placeholder='Nhập trưởng phòng' />
            )}
          </Form.Item>
          <Form.Item label='Thứ tự hiển thị'>
            {getFieldDecorator('Order', {
              rules: [{ required: true, message: errorMessage.order }]
            })(<InputNumber style={{ width: '100%' }} placeholder='Thứ tự hiển thị' />)}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              loading={this.state.isLoading}
              size='large'
              style={{ marginRight: 8, width: 120 }}
              type='primary'
              htmlType='submit'
            >
              {this.props.isEdit ? 'Cập nhật' : 'Lưu'}
            </Button>
          </div>
        </Form>
      </PolyciFormWrapper>
    )
  }
}

export default Form.create({})(GroupPolicyForm)
