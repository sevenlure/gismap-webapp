import React from 'react'
import PropTypes from 'prop-types'
import { Table, Icon, Popconfirm, message } from 'antd'
import { COLOR, ICON_SIZE } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'
import { deleteById, getList } from 'src/api/ttmoitruong/tacdongmoitruongApi'
import Link from 'next/link'
import slug from 'src/routes'
import { DATETIME_FORMAT } from 'src/config/format'
import moment from 'moment'
import { get } from 'lodash'

@withLogicTable({ apiGetList: getList })
class TableListContainer extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    getRef: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
    reloadTable: PropTypes.func.isRequired
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
      render: (text, record) => (
        <Link href={slug.coso.edit} as={`${slug.coso.base}/${record._id}`}>
          <a style={{ color: COLOR.TITLE, textDecoration: 'underline' }}>{text}</a>
        </Link>
      )
    },
    {
      title: 'Số quyết định phê duyệt',
      dataIndex: 'TacDongMoiTruong.SoQuyenDinhPheDuyet',
      key: 'SoQuyenDinhPheDuyet'
    },

    {
      title: 'Cơ quan cấp',
      dataIndex: 'CoQuanCapPhep.Name',
      key: 'CoQuanCapPhep'
    },
    {
      title: 'Ngày phê duyệt',
      dataIndex: 'TacDongMoiTruong.NgayPheDuyet',
      key: 'NgayPheDuyet',
      render: field => {
        if (field) return moment(field).format(DATETIME_FORMAT)
        else return ''
      }
    },

    {
      title: 'Xác nhận hoàn thành',
      dataIndex: 'TacDongMoiTruong.XacNhanHoanThanh',
      key: 'XacNhanHoanThanh',
      render: field => (field ? 'Có' : 'Không')
    },
    {
      title: 'Số luợng tập tin',
      dataIndex: 'TacDongMoiTruong.TapTinDinhKem',
      key: 'TapTinDinhKem',
      render: field => (field ? field.length : 0)
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
              this.handleDelete(get(record, 'TacDongMoiTruong._id'))
            }}
          >
            <Icon style={{ color: COLOR.RED, fontSize: ICON_SIZE.LARGE }} type='delete' />
          </Popconfirm>
        </div>
      )
    }
  ]

  render() {
    return (
      <Table
        rowKey='_id'
        bordered
        columns={this.columns}
        loading={this.props.isLoading}
        dataSource={this.props.dataSource}
        pagination={this.props.pagination}
      />
    )
  }
}

export default TableListContainer
