import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, message } from 'antd'
import Icon from 'src/components/elements/icon-with-tooltip'
import { COLOR, ICON_SIZE } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'
import { deleteById, getList } from 'src/api/ttmoitruong/giayphepxathaiApi'
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
          href={slug.ttmoitruong.giayphepxathai.edit}
          as={`${slug.ttmoitruong.giayphepxathai.base}/${get(record, 'GiayPhepXaThai._id')}`}
        >
          <a style={{ color: COLOR.TITLE, textDecoration: 'underline' }}>{text}</a>
        </Link>
      )
    },
    {
      title: 'Số giấy phép',
      dataIndex: 'GiayPhepXaThai.SoGiayPhep',
      key: 'SoGiayPhep'
    },

    {
      title: 'Cơ quan cấp phép',
      dataIndex: 'GiayPhepXaThai.CoQuanCapPhep.Name',
      key: 'CoQuanCapPhep'
    },
    {
      title: 'Công suất thiết kế',
      dataIndex: 'GiayPhepXaThai.CongSuatThietKe',
      key: 'CongSuatThietKe'
    },
    {
      title: 'Lưu lượng cấp phép',
      dataIndex: 'GiayPhepXaThai.LuuLuongCapPhep',
      key: 'LuuLuongCapPhep'
    },
    {
      title: 'Đặc trưng nước thải',
      dataIndex: 'GiayPhepXaThai.DacTrungNuocThai.Name',
      key: 'DacTrungNuocThai'
    },
    {
      title: 'Số lượng tập tin',
      dataIndex: 'GiayPhepXaThai.TapTinDinhKem',
      key: 'TapTinDinhKem',
      render: field => (field ? field.length : 0)
    },
    {
      title: 'Cập nhật bởi',
      dataIndex: 'GiayPhepXaThai.UpdatedBy',
      key: 'UpdatedBy'
    },
    {
      title: '',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Popconfirm
            title='Bạn chắc chắc muốn xoá?'
            placement='left'
            onConfirm={() => {
              this.handleDelete(get(record, 'GiayPhepXaThai._id'))
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
          return record.GiayPhepXaThai._id
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
