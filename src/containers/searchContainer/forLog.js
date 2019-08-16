import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Select } from 'antd'
import SelectUser from 'src/components/elements/select-user'
import { MODULE_LIST } from 'shared/constant/log'
import { throttle } from 'lodash-es'

const ContainerCustomRow = styled.div`
  display: flex;
  .ant-col.ant-form-item-label {
    line-height: 20px;
  }
  .ant-form-item {
    margin-bottom: 6px;
  }
`

class SearchContainer extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onClickButtonSearch: PropTypes.func
  }

  hanldeSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.onClickButtonSearch(values)
      }
    })
  }

  //onSubmit={this.hanldeSubmit}
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={{ width: '100%' }}>
        <ContainerCustomRow style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Row gutter={12}>
              <Col xs={24} sm={12} lg={8}>
                <Form.Item label='Module'>
                  {getFieldDecorator('Module', {})(
                    <Select>
                      {MODULE_LIST.map(item => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} lg={8}>
                <Form.Item label='Action'>
                  {getFieldDecorator('Action', {})(
                    <Select>
                      <Select.Option key='CREATE' value='CREATE'>
                        Tạo mới
                      </Select.Option>
                      <Select.Option key='UPDATE' value='UPDATE'>
                        Cập nhật
                      </Select.Option>
                      <Select.Option key='DELETE' value='DELETE'>
                        Xoá
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Form.Item label='Nguời dùng'>{getFieldDecorator('ActionBy', {})(<SelectUser />)}</Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ width: 120, marginLeft: 12 }}>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item colon={false} label={<span>&nbsp;</span>}>
                  <Button
                    type='primary'
                    block
                    icon='search'
                    htmlType='submit'
                    onClick={throttle(this.hanldeSubmit, 1000)}
                  >
                    Tìm Kiếm
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </ContainerCustomRow>
      </Form>
    )
  }
}

export default Form.create()(SearchContainer)
