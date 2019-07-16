import React from 'react'
import { Table, Divider, Tag, Icon } from 'antd'
import SearchContainer from 'src/containers/searchContainer'
import { getList } from 'src/api/CosoApi'
import { COLOR } from 'src/constant/theme'
import TableListContainer from 'src/containers/coso/tableListContainer'

const columns = [
  {
    title: 'Tên cơ sở',
    dataIndex: 'Ten',
    key: 'Ten',
    render: text => <a href='javascript:;'>{text}</a>
  },
  {
    title: 'SoGiayPhep_DKKD',
    dataIndex: 'SoGiayPhep_DKKD',
    key: 'SoGiayPhep_DKKD'
  },

  {
    title: 'KhuCumCongNghiep',
    dataIndex: 'KhuCumCongNghiep.Name',
    key: 'KhuCumCongNghiep'
  },
  {
    title: 'QuanHuyen',
    dataIndex: 'DiaChi.QuanHuyen.Name',
    key: 'QuanHuyen'
  },
  {
    title: 'PhuongXa',
    dataIndex: 'DiaChi.PhuongXa.Name',
    key: 'PhuongXa'
  },
  {
    title: 'NganhNghe',
    dataIndex: 'NganhNghe.Name',
    key: 'NganhNghe'
  },
  {
    title: 'CoQuanThamQuyenQuanLy',
    dataIndex: 'CoQuanThamQuyenQuanLy.Name',
    key: 'CoQuanThamQuyenQuanLy'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <div style={{ textAlign: 'center' }}>
        <Icon style={{ color: COLOR.PRIMARY }} type='eye' />
      </div>
    )
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]



class Index extends React.Component {
  state = {
    dataSource: []
  }
  // async componentDidMount() {
  //   const response = await getList()
  //   if (response.status === 200) {
  //     const { list, pagination } = response.data
  //     this.setState({
  //       dataSource: list,
  //       pagination: {
  //         ...pagination,
  //         current: pagination.page
  //       }
  //     })
  //   }
  // }
  render() {
    return (
      <div>
        <SearchContainer></SearchContainer>
        {/* <Table bordered columns={columns} dataSource={this.state.dataSource} pagination={{
          ...this.state.pagination,
          onChange: (page, pageSize)=>{
            console.log('page',page)
            console.log('pageSize',pageSize)
          }
        }} /> */}
        <TableListContainer />
      </div>
    )
  }
}
export default Index
