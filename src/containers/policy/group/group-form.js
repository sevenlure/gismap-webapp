import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, InputNumber, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import { policyMess } from 'src/config/message'
import { last as _last } from 'lodash-es'
import Button from 'src/components/elements/button'

const errorMessage = policyMess.error

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
    form: PropTypes.any,
    getFieldError: PropTypes.any,
    initialData: PropTypes.object,
    onSubmit: PropTypes.func
  }

  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        const data = {
          ...values,
          IsShow: _last(values.IsShow) ? _last(values.IsShow) : false
        }
        if (this.props.onSubmit) {
          this.props.onSubmit(data)
        }
        // console.log('data: ', data)
      }
    })
  }

  componentDidMount = () => {
    this.props.form.resetFields()
    const { setFieldsValue } = this.props.form
    const { initialData } = this.props
    // console.log(initialData, 'initialData')
    setFieldsValue({
      ...initialData,
      IsShow: initialData ? [initialData.IsShow] : []
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <PolyciFormWrapper>
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='ID'>{getFieldDecorator('Key', {})(<Input disabled placeholder='ID' />)}</Form.Item>
          <Form.Item label='Tên nhóm chính sách'>
            {getFieldDecorator('Name', {
              rules: [{ required: true, message: errorMessage.policyGroupName }]
            })(<Input placeholder='Tên nhóm chính sách' />)}
          </Form.Item>
          <Form.Item label='Thứ tự hiển thị'>
            {getFieldDecorator('Order', {
              rules: [{ required: true, message: errorMessage.policyGroupOrder }]
            })(<InputNumber style={{ width: '100%' }} placeholder='Thứ tự hiển thị' />)}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2 }} label='Cho phép hiển thị'>
            {getFieldDecorator('IsShow', {})(
              <Checkbox.Group>
                <Checkbox value={true} />
              </Checkbox.Group>
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              loading={this.state.isLoading}
              size='large'
              style={{ marginRight: 8, width: 120 }}
              type='primary'
              htmlType='submit'
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </PolyciFormWrapper>
    )
  }
}

export default Form.create({})(GroupPolicyForm)
