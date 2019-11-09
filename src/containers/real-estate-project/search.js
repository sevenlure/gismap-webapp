import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Form, Input } from 'antd'
import Button from 'src/components/elements/button'
// import { get as _get } from 'lodash-es'
// import moment from 'moment'
import SelectStatus from 'src/components/elements/select-status'

const RealEstateProjectSearchWrapper = styled.div`
  .button--search {
    padding-left: 8px;
    padding-top: 4px;
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
            <Col span={10}>
              <Form.Item label='Tên dự án'>
                {getFieldDecorator('Search', {})(<Input size='default' placeholder='Tên dự án' />)}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label='Tình trạng'>
                {getFieldDecorator('Status', {})(<SelectStatus size='default' />)}
              </Form.Item>
            </Col>
            <Col span={2}>
              <div className='button--search'>
                <Button type='primary' icon='search' size='default' htmlType='submit'>
                  Tìm kiếm
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </RealEstateProjectSearchWrapper>
    )
  }
}

export default Form.create({})(RealEstateProjectSearch)
