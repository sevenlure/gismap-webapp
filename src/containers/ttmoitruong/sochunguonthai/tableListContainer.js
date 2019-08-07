import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, message } from 'antd'
import Icon from 'src/components/elements/icon-with-tooltip'
import { COLOR, ICON_SIZE } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'
import { deleteById, getList } from 'src/api/ttmoitruong/sochunguonthaiApi'
import Link from 'next/link'
import slug from 'src/routes'
import { get } from 'lodash-es'
import moment from 'moment'
import { DATE_FORMAT } from 'src/config/format'

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
          href={slug.ttmoitruong.sochunguonthai.edit}
          as={`${slug.ttmoitruong.sochunguonthai.base}/${get(record, 'SoChuNguonThai._id')}`}
        >
          <a style={{ color: COLOR.TITLE, textDecoration: 'underline' }}>{text}</a>
        </Link>
      )
    },
    {
      title: 'Số quyết định',
      dataIndex: 'SoChuNguonThai.SoQuyetDinh',
      key: 'SoQuyetDinh'
    },

    {
      title: 'Ngày phê duyệt',
      dataIndex: 'SoChuNguonThai.NgayPheDuyet',
      key: 'NgayPheDuyet',
      render: field => {
        if (field) return moment(field).format(DATE_FORMAT)
        else return ''
      }
    },
    {
      title: 'Cơ quan cấp',
      dataIndex: 'SoChuNguonThai.CoQuanCap.Name',
      key: 'CoQuanCap'
    },
    {
      title: 'Số luợng tập tin',
      dataIndex: 'SoChuNguonThai.TapTinDinhKem',
      key: 'TapTinDinhKem',
      render: field => (field ? field.length : 0)
    },
    {
      title: 'Cập nhật bởi',
      dataIndex: 'SoChuNguonThai.UpdatedBy',
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
              this.handleDelete(get(record, 'SoChuNguonThai._id'))
            }}
          >
            <Icon title={'Xóa'} style={{ color: COLOR.RED, fontSize: ICON_SIZE.LARGE }} type='delete' />
          </Popconfirm>
        </div>
      )
    }
  ]

  render() {
    return (
      <Table
        rowKey={record => {
          return record.SoChuNguonThai._id
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
