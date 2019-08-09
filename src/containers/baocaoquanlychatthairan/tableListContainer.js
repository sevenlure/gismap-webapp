import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, message } from 'antd'
import Icon from 'src/components/elements/icon-with-tooltip'
import { COLOR, ICON_SIZE } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'
import { deleteById, getList } from 'src/api/baocaoquanlychatthairanApi'
import Link from 'next/link'
import slug from 'src/routes'
import { get } from 'lodash-es'

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
        <Link
          href={slug.baocaoquanlychatthairan.edit}
          as={`${slug.baocaoquanlychatthairan.base}/${get(record, 'BaoCaoQuanLyChatThaiRan._id')}`}
        >
          <a style={{ color: COLOR.TITLE, textDecoration: 'underline' }}>{text}</a>
        </Link>
      )
    },
    {
      title: 'Năm',
      dataIndex: 'BaoCaoQuanLyChatThaiRan.Nam',
      key: 'Nam'
    },
    {
      title: 'Loại chất thải',
      dataIndex: 'BaoCaoQuanLyChatThaiRan.LoaiChatThai',
      key: 'LoaiChatThai'
    },
    {
      title: 'Khối luợng',
      dataIndex: 'BaoCaoQuanLyChatThaiRan.KhoiLuong',
      key: 'KhoiLuong'
    },
    {
      title: 'Đơn vị thu gom, vận chuyển xử lý',
      dataIndex: 'BaoCaoQuanLyChatThaiRan.DonViThuGom_VanChuyenXuLy',
      key: 'DonViThuGom_VanChuyenXuLy'
    },
    {
      title: 'Cập nhật bởi',
      dataIndex: 'BaoCaoQuanLyChatThaiRan.UpdatedBy',
      key: 'UpdatedBy'
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Popconfirm
            title='Bạn chắc chắc muốn xoá?'
            placement='left'
            onConfirm={() => {
              this.handleDelete(get(record, 'BaoCaoQuanLyChatThaiRan._id'))
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
        rowKey={record => {
          return record.BaoCaoQuanLyChatThaiRan._id
        }}
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
