import React from 'react'
import PropTypes from 'prop-types'
import TableListContainer from 'src/containers/user/tableListContainer'
import { get, pick, pickBy, identity, throttle } from 'lodash-es'
import Link from 'next/link'
import { Icon, Form, Row, Col, Button, Input } from 'antd'
import Clearfix from 'src/components/elements/clearfix'
import { setBreadCrumb } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes'
import { connect } from 'react-redux'
import DefaultLayout from 'src/layout/default'
import styled from 'styled-components'

@connect(
  null,
  {
    setBreadCrumb
  }
)
class Index extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.any
  }

  componentDidMount() {
    this.props.setBreadCrumb(breadcrumb[slug.manager.user.list])
  }

  onClickSearch = values => {
    const onChangeSearch = get(this.TableList, 'props.onChangeSearch')
    if (onChangeSearch) {
      let querySearch = pick(values, ['Coso', 'KhuCumCongNghiep', 'NganhNghe', 'CoQuanThamQuyenQuanLy', 'search'])
      querySearch = pickBy(querySearch, identity)
      onChangeSearch({
        ...querySearch,
        ['DiaChi.ValueSelected']: get(values, 'DiaChi.ValueSelected')
      })
    }
  }

  render() {
    return (
      <div>
        <Link href={slug.manager.user.create}>
          <a style={{ fontSize: 20 }}>
            <Icon type='plus-circle' /> Thêm mới
          </a>
        </Link>
        <Clearfix height={8} />
        {/* <SearchContainer onClickButtonSearch={this.onClickSearch}></SearchContainer> */}
        <TableListContainer getRef={ref => (this.TableList = ref)} />
      </div>
    )
  }
}
Index.Layout = DefaultLayout
export default Index

const ContainerCustomRow = styled.div`
  display: flex;
  .ant-col.ant-form-item-label {
    line-height: 20px;
  }
  .ant-form-item {
    margin-bottom: 6px;
  }
`

@Form.create()
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

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form style={{ width: '100%' }}>
        <ContainerCustomRow style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Row gutter={12}>
              <Col xs={24}>
                <Form.Item label='Search'>{getFieldDecorator('search', {})(<Input />)}</Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ width: 120, marginLeft: 12 }}>
            {/* <Row gutter={12}>
              <Col xs={24}>
                <Form.Item colon={false} label={<span>&nbsp;</span>}>
                  <Button type='primary' block icon='download'>
                    Xuất Excel
                  </Button>
                </Form.Item>
              </Col>
            </Row> */}
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
