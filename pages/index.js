import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBreadCrumb } from 'src/redux/actions/generalAction'
import { get, pick, pickBy, identity } from 'lodash-es'
import Link from 'next/link'
import { Icon } from 'antd'
import Clearfix from 'src/components/elements/clearfix'
import slug, { breadcrumb } from 'src/routes'
import DefaultLayout from 'src/layout/default'

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
    this.props.setBreadCrumb(breadcrumb[slug.coso.list])
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
        <div>
          <img height={500} width={1440} src="/static/images/unsplash.svg" />
        </div>
        <Link href={slug.coso.create}>
          <a style={{ fontSize: 20 }}>
            <Icon type='plus-circle' /> Thêm mới
          </a>
        </Link>
        <Clearfix height={8} />
      </div>
    )
  }
}

Index.Layout = DefaultLayout
export default Index
