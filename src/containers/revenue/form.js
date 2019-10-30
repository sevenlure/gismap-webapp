import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Input, Button, InputNumber, DatePicker } from 'antd'
import { DATE_FORMAT } from 'src/config/format.js'
import { connect } from 'react-redux'
import { userLogin } from 'src/redux/actions/authAction'
import { updateUserInfo } from 'src/redux/actions/generalAction.js'
import { revenueMess } from 'src/config/message'
import { pick as _pick } from 'lodash-es'
import moment from 'moment'

const errorMessage = revenueMess.form

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

  state = {
    isDisable: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        values = {
          ...values,
          DateRevenue: moment(values.DateRevenue).format('YYYY/MM/DD')
        }
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
    // console.log(initialData, 'initialData')
    const data = {
      ..._pick(initialData, ['Name', 'Revenue', 'DateRevenue']),
      DateRevenue: initialData.DateRevenue ? moment(initialData.DateRevenue) : null
    }

    setFieldsValue({
      ...data
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <PolyciFormWrapper>
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <Form.Item label='Họ tên'>
            {getFieldDecorator('Name', {})(<Input disabled={true} placeholder='Họ tên' />)}
          </Form.Item>
          <Form.Item label='Doanh thu'>
            {getFieldDecorator('Revenue', {
              rules: [{ required: true, message: errorMessage.revenue }]
            })(
              <InputNumber
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%' }}
                size='large'
                placeholder='Doanh thu *'
              />
            )}
          </Form.Item>
          <Form.Item label='Ngày tính doanh thu'>
            {getFieldDecorator('DateRevenue', {
              rules: [{ required: true, message: errorMessage.dateRevenue }]
            })(<DatePicker size='large' placeholder='Ngày tính doanh thu *' format={DATE_FORMAT} />)}
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
