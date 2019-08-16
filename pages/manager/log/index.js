import React from 'react'
import PropTypes from 'prop-types'
import TableListContainer from 'src/containers/log/tableListContainer'
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
    this.props.setBreadCrumb(breadcrumb[slug.manager.log.list])
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
        <Link href={slug.manager.log.create}>
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
