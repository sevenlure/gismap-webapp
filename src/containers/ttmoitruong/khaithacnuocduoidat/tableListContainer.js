import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, message } from 'antd'
import Icon from 'src/components/elements/icon-with-tooltip'
import { COLOR, ICON_SIZE } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'
import { deleteById, getList } from 'src/api/ttmoitruong/khaithacnuocduoidatApi'
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
          href={slug.ttmoitruong.khaithacnuocduoidat.edit}
          as={`${slug.ttmoitruong.khaithacnuocduoidat.base}/${get(record, 'KhaiThacNuocDuoiDat._id')}`}
        >
          <a style={{ color: COLOR.TITLE, textDecoration: 'underline' }}>{text}</a>
        </Link>
      )
    },
    {
      title: 'Số giấy phép',
      dataIndex: 'KhaiThacNuocDuoiDat.SoGiayPhep',
      key: 'SoGiayPhep'
    },

    {
      title: 'Cơ quan cấp phép',
      dataIndex: 'KhaiThacNuocDuoiDat.CoQuanCapPhep.Name',
      key: 'CoQuanCapPhep'
    },
    {
      title: 'Số Giếng',
      dataIndex: 'KhaiThacNuocDuoiDat.SoGieng',
      key: 'SoGieng'
    },
    {
      title: 'Lưu lượng',
      dataIndex: 'KhaiThacNuocDuoiDat.LuuLuong',
      key: 'LuuLuong'
    },
    {
      title: 'Năm bắt đầu khai thác',
      dataIndex: 'KhaiThacNuocDuoiDat.NamBatDauKhaiThac',
      key: 'NamBatDauKhaiThac'
    },
    {
      title: 'Số lượng tập tin',
      dataIndex: 'KhaiThacNuocDuoiDat.TapTinDinhKem',
      key: 'TapTinDinhKem',
      render: field => (field ? field.length : 0)
    },
    {
      title: 'Cập nhật bởi',
      dataIndex: 'KhaiThacNuocDuoiDat.UpdatedBy',
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
              this.handleDelete(get(record, 'KhaiThacNuocDuoiDat._id'))
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
          return record.KhaiThacNuocDuoiDat._id
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
