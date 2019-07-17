import React from 'react'
import SearchContainer from 'src/containers/searchContainer'
import TableListContainer from 'src/containers/coso/tableListContainer'
import { get, pick, pickBy, identity } from 'lodash'

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
        <SearchContainer onClickButtonSearch={this.onClickSearch}></SearchContainer>
        <TableListContainer getRef={ref => (this.TableList = ref)} />
      </div>
    )
  }
}
export default Index
