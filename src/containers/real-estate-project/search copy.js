import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Form, Button, Input } from 'antd'
import { get as _get } from 'lodash-es'
import moment from 'moment'
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

        const week = moment(values.DateWeek).week()
        const year = moment(values.DateWeek).year()
        // console.log(year, week, 'year-week')
        let result = {}
        const optionDepartment = _get(values, 'optionDepartment', [])
        if (optionDepartment[0]) {
          result.Department = optionDepartment[0]
        }

        if (optionDepartment[1]) {
          result.Group = optionDepartment[1]
        }
        if (this.props.onSubmit)
          this.props.onSubmit({
            ...result,
            year,
            week
          })
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
