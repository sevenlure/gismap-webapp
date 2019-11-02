import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import UpdateFile from 'src/components/elements/update-file/index.js'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import { policyMess } from 'src/config/message'
import { get as _get, pick as _pick } from 'lodash-es'
const errorMessage = policyMess.error

const PolyciFormWrapper = styled.div`
  flex: 1;
`

const mapStateToProps = state => ({
  token: _get(state, 'AuthStore.token')
})
const mapDispatchToProps = {
  userLogin,
  updateUserInfo
}
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class InfoPolicyForm extends React.Component {
  static propTypes = {
    form: PropTypes.any,
    getFieldError: PropTypes.any,
    initialData: PropTypes.object,
    onSubmit: PropTypes.func,
    token: PropTypes.string
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
      ..._pick(initialData, ['Name', 'Description', 'LinkFile'])
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <PolyciFormWrapper>
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='Tên chính sách' extra=''>
            {getFieldDecorator('Name', {
              rules: [{ required: true, message: errorMessage.policyName }]
            })(<Input placeholder='Tên chính sách' />)}
          </Form.Item>
          <Form.Item label='Mô tả' extra=''>
            {getFieldDecorator('Description', {})(<Input placeholder='Tên chính sách' />)}
          </Form.Item>
          <Form.Item
            label='Các định dạng có thể tải lên *.png, *.jpeg, *.jpg, *.pdf. Dung lượng không vượt quá 20 MB.'
            extra=''
          >
            {getFieldDecorator('LinkFile', {
              rules: [{ required: true, message: errorMessage.File }]
            })(<UpdateFile />)}
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

export default Form.create({})(InfoPolicyForm)
