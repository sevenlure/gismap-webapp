import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, message } from 'antd'
import Icon from 'src/components/elements/icon-with-tooltip'
import { COLOR, ICON_SIZE } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'
import { deleteById, getList } from 'src/api/CosoApi'
import Link from 'next/link'
import slug from 'src/routes'

@withLogicTable({ apiGetList: getList })
class TableListContainer extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    getRef: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
    reloadTable: PropTypes.func.isRequired,
    columnStt: PropTypes.object
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  handleDelete(_id) {
    deleteById(_id)
      .then(() => {
        message.success('Xoá thành công!')
        this.props.reloadTable()
      })
      .catch(() => {})
  }

  columns = [
    {
      title: 'Tên cơ sở',
      dataIndex: 'Ten',
      key: 'Ten',
      width: '25%',
      render: (text, record) => (
        <Link href={slug.coso.edit} as={`${slug.coso.base}/${record._id}`}>
          <a style={{ color: COLOR.TITLE, textDecoration: 'underline' }}>{text}</a>
        </Link>
      )
    },
    {
      title: 'ĐKKD/GP',
      dataIndex: 'SoGiayPhep_DKKD',
      key: 'SoGiayPhep_DKKD'
    },

    {
      title: 'Khu/Cụm Công Nghiệp',
      dataIndex: 'KhuCumCongNghiep.Name',
      key: 'KhuCumCongNghiep'
    },
    {
      title: 'Quận Huyện',
      dataIndex: 'DiaChi.QuanHuyen.Name',
      key: 'QuanHuyen'
    },
    {
      title: 'Phuờng Xã',
      dataIndex: 'DiaChi.PhuongXa.Name',
      key: 'PhuongXa'
    },
    {
      title: 'Ngành Nghề',
      dataIndex: 'NganhNghe.Name',
      key: 'NganhNghe',
      width: '15%'
    },
    {
      title: 'Thẩm Quyền Quản lý',
      dataIndex: 'CoQuanThamQuyenQuanLy.Name',
      key: 'CoQuanThamQuyenQuanLy'
    },
    {
      title: 'Cập nhật bởi',
      dataIndex: 'UpdatedBy',
      key: 'UpdatedBy'
    },
    {
      title: '',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Icon style={{ color: COLOR.PRIMARY, fontSize: ICON_SIZE.LARGE }} type='eye' />
          <Popconfirm
            title='Bạn chắc chắc muốn xoá?'
            placement='left'
            onConfirm={() => {
              this.handleDelete(record._id)
            }}
          >
            <Icon title='Xóa' style={{ color: COLOR.RED, fontSize: ICON_SIZE.LARGE }} type='delete' />
          </Popconfirm>
        </div>
      )
    }
  ]

  render() {
    return (
      <Table
        rowKey='_id'
        size='middle'
        className='fontSize12'
        scroll={{ x: 900 }}
        bordered
        columns={[this.props.columnStt, ...this.columns]}
        loading={this.props.isLoading}
        dataSource={this.props.dataSource}
        pagination={this.props.pagination}
      />
    )
  }
}

export default TableListContainer
