import React from 'react'
import { Button } from 'antd'
import Link from 'next/link'
import SelectQuanHuyen from 'src/components/elements/select-quan-huyen'
import SelectCoQuanCapPhep from 'src/components/elements/select-co-quan-cap-phep'
import SelectKhuCongNghiep from 'src/components/elements/select-khu-cong-nghiep'
import SelectCoQuanThamQuyenQuanLy from 'src/components/elements/select-tham-quyen-quan-ly'
import SearchContainer from 'src/containers/searchContainer'

class Index extends React.Component {
  render() {
    return (
      <div>
        <SearchContainer></SearchContainer>
      </div>
    )
  }
}
export default Index
