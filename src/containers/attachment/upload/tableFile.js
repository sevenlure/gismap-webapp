import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, Icon } from 'antd'
import { COLOR, ICON_SIZE } from 'src/constant/theme'

export default class TableFile extends React.PureComponent {
  static propTypes = {
    cbDeleteFile: PropTypes.func,
    dataSource: PropTypes.array
  }

  render() {
    return (
      <Table
        pagination={false}
        bordered
        rowKey='_id'
        columns={[
          {
            title: 'Tên hồ sơ',
            dataIndex: 'Title',
            key: 'Title',
            render: (text, record) => (
              <a
                href={record.url}
                onClick={e => {
                  e.preventDefault()
                  window.open(record.url)
                }}
                style={{ color: COLOR.TITLE, textDecoration: 'underline' }}
              >
                {text}
              </a>
            )
          },
          {
            title: 'Ghi chú',
            dataIndex: 'GhiChu',
            key: 'GhiChu'
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
                    if (this.props.cbDeleteFile) this.props.cbDeleteFile(record._id)
                  }}
                >
                  <Icon style={{ color: COLOR.RED, fontSize: ICON_SIZE.LARGE }} type='delete' />
                </Popconfirm>
              </div>
            )
          }
        ]}
        dataSource={this.props.dataSource ? this.props.dataSource : []}
      />
    )
  }
}
