import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Form, DatePicker, Button, Input } from 'antd'
import {} from 'lodash-es'
import SelectUser from 'src/components/elements/select-user-all'
import SelectStatus from 'src/components/elements/select-status-trip'
import moment from 'moment'
const { WeekPicker } = DatePicker

const TripSearchWrapper = styled.div`
  .button--search {
    // padding-left: 8px;
    padding-top: 4px;
  }
`

class TripSearch extends React.Component {
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

        // console.log(year, week, 'year-week')
        if (this.props.onSubmit)
          this.props.onSubmit({
            Search: values.Search ? values.Search : undefined,
            CreatedAt: values.DateWeek ? moment(values.DateWeek).format('WW-GGGG') : undefined,
            OpenBy: values.OpenBy ? values.OpenBy : undefined,
            ApproveBy: values.ApproveBy ? values.ApproveBy : undefined,
            Status: values.Status ? values.Status : undefined
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <TripSearchWrapper>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={8}>
              <Form.Item label=''>
                {getFieldDecorator('Search', {})(<Input size='default' placeholder='Dự án' />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=''>
                {getFieldDecorator('DateWeek', {})(
                  <WeekPicker style={{ width: '100%' }} size='default' placeholder='Chọn tuần' />
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label=''>
                {getFieldDecorator('Status', {
                  // initialValue: null
                })(<SelectStatus style={{ width: '100%' }} size='default' placeholder='Trạng thái' />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={8}>
              <Form.Item label=''>
                {getFieldDecorator('OpenBy', {})(<SelectUser size='default' placeholder='Người đăng ký' />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=''>
                {getFieldDecorator('ApproveBy', {})(<SelectUser size='default' placeholder='Người đăng duyệt' />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <div className='button--search'>
                <Button type='primary' icon='search' size='default' htmlType='submit'>
                  Tìm kiếm
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </TripSearchWrapper>
    )
  }
}

export default Form.create({})(TripSearch)
