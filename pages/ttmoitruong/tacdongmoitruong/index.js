import React from 'react'
import SearchContainer from 'src/containers/searchContainer'
import TableListContainer from 'src/containers/ttmoitruong/tacdongmoitruong/tableListContainer'
import { get, pick, pickBy, identity } from 'lodash'
import Link from 'next/link'
import { Icon } from 'antd'
import Clearfix from 'src/components/elements/clearfix'
import slug from 'src/routes'

class Index extends React.Component {
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
        <Link href={slug.ttmoitruong.tacdongmoitruong.create}>
          <a style={{ fontSize: 20 }}>
            <Icon type='plus-circle' /> Thêm mới
          </a>
        </Link>
        <Clearfix height={8} />
        <SearchContainer onClickButtonSearch={this.onClickSearch}></SearchContainer>
        <TableListContainer getRef={ref => (this.TableList = ref)} />
      </div>
    )
  }
}
export default Index
