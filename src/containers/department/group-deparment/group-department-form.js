import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, InputNumber } from 'antd'
import SelectDepartment from 'src/components/elements/select-department'
import Button from 'src/components/elements/button'

import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import { departmentMess } from 'src/config/message'
import { get as _get, pick as _pick } from 'lodash-es'
const errorMessage = departmentMess.error

const GroupDepartmentFormWrapper = styled.div`
  flex: 1;
`

const mapStateToProps = state => ({
  token: _get(state, 'AuthStore.token')
})
const mapDispatchToProps = {
  userLogin,
  updateUserInfo
}
@connect(mapStateToProps, mapDispatchToProps)
class GroupDepartmentForm extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    getFieldError: PropTypes.any,
    initialData: PropTypes.object,
    onSubmit: PropTypes.func,
    token: PropTypes.string,
    isEdit: PropTypes.bool
  }

  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        const data = {
          ...values
        }
        if (this.props.onSubmit) {
          this.props.onSubmit(data)
        }
      }
    })
  }

  componentDidMount = () => {
    this.props.form.resetFields()
    const { setFieldsValue } = this.props.form
    const { initialData } = this.props
    // console.log(initialData, 'initialData')
    setFieldsValue({
      ..._pick(initialData, ['Name', 'Department', 'Order'])
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <GroupDepartmentFormWrapper>
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='Phòng ban'>
            {getFieldDecorator('Department', {})(<SelectDepartment disabled placeholder='Nhập trưởng phòng' />)}
          </Form.Item>
          <Form.Item label='Tên nhóm' extra=''>
            {getFieldDecorator('Name', {
              rules: [{ required: true, message: errorMessage.groupName }]
            })(<Input placeholder='Tên chính sách' />)}
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
      </GroupDepartmentFormWrapper>
    )
  }
}

export default Form.create({})(GroupDepartmentForm)
