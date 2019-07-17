import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Input } from 'antd'
import SelectQuanHuyen from 'src/components/elements/select-quan-huyen'
import SelectNganhNghe from 'src/components/elements/select-nganh-nghe'
import SelectKhuCongNghiep from 'src/components/elements/select-khu-cong-nghiep'
import SelectCoQuanThamQuyenQuanLy from 'src/components/elements/select-tham-quyen-quan-ly'
import { throttle } from 'lodash'

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
              <Col xs={6}>
                <Form.Item label='Quận Huyện/Phuờng Xã'>
                  {getFieldDecorator('DiaChi', {})(<SelectQuanHuyen />)}
                </Form.Item>
              </Col>
              <Col xs={6}>
                <Form.Item label='Ngành Nghề'>{getFieldDecorator('NganhNghe', {})(<SelectNganhNghe />)}</Form.Item>
              </Col>
              <Col xs={6}>
                <Form.Item label='Trong KCN/Ngoài KCN'>
                  {getFieldDecorator('KhuCumCongNghiep', {})(<SelectKhuCongNghiep />)}
                </Form.Item>
              </Col>
              <Col xs={6}>
                <Form.Item label='Thẩm quyền quản lý'>
                  {getFieldDecorator('CoQuanThamQuyenQuanLy', {})(<SelectCoQuanThamQuyenQuanLy />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item label='Cơ sở'>{getFieldDecorator('search', {})(<Input />)}</Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ width: 120, marginLeft: 12 }}>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item colon={false} label=' '>
                  <Button type='primary' block icon='download'>
                    Xuất Excel
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item colon={false} label=' '>
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
