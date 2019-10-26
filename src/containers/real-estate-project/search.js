import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Form, Input, Button } from 'antd'
import {} from 'lodash-es'
import SelectStatus from 'src/components/elements/select-status'

const RealEstateProjectSearchWrapper = styled.div`
  .button--search {
    padding-left: 8px;
    padding-top: 8px;
  }
`

class RealEstateProjectSearch extends React.Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func,
    form: PropTypes.any,
    onSubmit: PropTypes.func
  }
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        // console.log('validateFields', values)
        let data = {}
        if (values.Search) {
          data.Search = values.Search
        }
        if (values.Status) {
          data.Status = values.Status
        }
        if (this.props.onSubmit) this.props.onSubmit(data)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    return (
      <RealEstateProjectSearchWrapper>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={11}>
              <Form.Item label='Tên dự án'>
                {getFieldDecorator('Search', {})(<Input size='large' placeholder='Tên dự án' />)}
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label='Tên dự án'>
                {getFieldDecorator('Status', {
                  initialValue: ''
                })(<SelectStatus />)}
              </Form.Item>
            </Col>

            <Col span={2}>
              <div className='button--search'>
                <Button type='primary' shape='circle' icon='search' size='small' htmlType='submit' />
              </div>
            </Col>
          </Row>
        </Form>
      </RealEstateProjectSearchWrapper>
    )
  }
}

export default Form.create({})(RealEstateProjectSearch)
