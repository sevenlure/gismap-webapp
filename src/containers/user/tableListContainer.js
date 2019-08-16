import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, message } from 'antd'
import Icon from 'src/components/elements/icon-with-tooltip'
import { COLOR, ICON_SIZE } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'
import { deleteById, getList } from 'src/api/userApi'
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
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email'
    },
    {
      title: 'Tên',
      dataIndex: 'FirstName',
      key: 'Name',
      render: (text, record) => record.FirstName + ' ' + record.LastName
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
      render: (text, record) => {
        const isAdmin = record.isAdmin
        const color = isAdmin ? COLOR.DISABLED : COLOR.RED
        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Popconfirm
              title='Bạn chắc chắc muốn xoá?'
              placement='left'
              disabled={isAdmin}
              onConfirm={() => {
                this.handleDelete(get(record, '_id'))
              }}
            >
              <Icon title='Xóa' style={{ color, fontSize: ICON_SIZE.LARGE }} type='delete' />
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  render() {
    return (
      <Table
        rowKey={record => {
          return record.Email
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
