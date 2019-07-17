import React from 'react'
import PropTypes from 'prop-types'
import { Table, Icon } from 'antd'
import { getList } from 'src/api/CosoApi'
import { COLOR } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'

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
    render: () => (
      <div style={{ textAlign: 'center' }}>
        <Icon style={{ color: COLOR.PRIMARY }} type='eye' />
      </div>
    )
  }
]

@withLogicTable({ apiGetList: getList })
class TableListContainer extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    getRef: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired
  }

  componentDidMount() {
    console.log('getRef', 'componentDidMount', this.props.getRef)
    if (this.props.getRef) this.props.getRef(this)
  }

  render() {
    return (
      <Table
        bordered
        columns={columns}
        loading={this.props.isLoading}
        dataSource={this.props.dataSource}
        pagination={this.props.pagination}
      />
    )
  }
}

export default TableListContainer
