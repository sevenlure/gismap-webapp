import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Form, DatePicker, Button, Input } from 'antd'
import {} from 'lodash-es'
import SelectUser from 'src/components/elements/select-user-all'
import moment from 'moment'
const { WeekPicker } = DatePicker

const TripSearchWrapper = styled.div`
  .button--search {
    padding-left: 8px;
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
            ApproveBy: values.ApproveBy ? values.ApproveBy : undefined
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
      <TripSearchWrapper>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={10}>
              <Form.Item label='Đăng ký'>
                {getFieldDecorator('OpenBy', {})(<SelectUser size='default' placeholder='Người đăng ký' />)}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label='Đăng duyệt'>
                {getFieldDecorator('ApproveBy', {})(<SelectUser size='default' placeholder='Người đăng duyệt' />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={10}>
              <Form.Item label='Dự án'>{getFieldDecorator('Search', {})(<Input size='default' />)}</Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label='Tuần'>
                {getFieldDecorator('DateWeek', {})(
                  <WeekPicker style={{ width: '100%' }} size='default' placeholder='Select week' />
                )}
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
      </TripSearchWrapper>
    )
  }
}

export default Form.create({})(TripSearch)
