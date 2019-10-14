import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Divider, Skeleton, Button, Popconfirm } from 'antd'
import userApi from 'src/api/userApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'

const ManagerUserWrapper = styled.div``
const columns = [
  {
    title: 'ID',
    dataIndex: 'UserId'
  },
  {
    title: 'Phòng ban',
    dataIndex: ''
  },
  {
    title: 'Chức vụ',
    dataIndex: ''
  },
  {
    title: 'Nhóm'
  },
  {
    title: 'Họ tên',
    render: (text, row) => {
      const fullName = _get(row, 'LastName', '') + ' ' + _get(row, 'FirstName', '')
      return <span>{fullName}</span>
    }
  },
  {
    title: 'Năm sinh',
    dataIndex: ''
  },
  {
    title: 'Email',
    dataIndex: 'Email'
  },
  {
    title: 'SĐT',
    dataIndex: ''
  },
  {
    title: '',
    width: 70,
    render: (text, record) => {
      return (
        <div>
          <Link href={slug.manager.user.edit} as={`${slug.manager.user.base}/${_get(record, '_id')}`}>
            <a>
              <Icon style={{ cursor: 'pointer' }} theme='twoTone' type='edit' />
            </a>
          </Link>
          <Divider type='vertical' />
          <Popconfirm
            title='Bạn chắc chắc muốn xoá?'
            placement='left'
            okText='Đồng ý'
            cancelText='Hủy'
            onConfirm={() => {
              console.log(_get(record, '_id'))
              // this.handleDelete(get(record, '_id'))
            }}
          >
            <Icon style={{ cursor: 'pointer' }} theme='twoTone' type='delete' />
          </Popconfirm>
        </div>
      )
    }
  }
]

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class ManagerUser extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func
  }
  state = {
    isLoading: true,
    dataSource: []
  }

  componentDidMount = async () => {
    try {
      const pathPage = slug.manager.user.list
      this.props.setBreadCrumb(breadcrumb[pathPage])
      this.props.updateKeyPath([pathPage])
      const res = await userApi.getList({
        page: 1,
        pageSize: 50
      })
      console.log(res, 'res')
      if (res.status === 200) {
        this.setState({
          dataSource: _get(res, 'data.list', [])
        })
      }
    } catch (ex) {
      const { response } = ex
      // console.log('catch', response)
      getInfoErrorfetch(response)
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    return (
      <ManagerUserWrapper>
        <Link href={slug.manager.user.create}>
          <Button type='primary' icon='plus-circle'>
            Tạo mới
          </Button>
        </Link>

        <Clearfix height={8} />
        {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
        {!this.state.isLoading && (
          <Table
            rowKey={'_id'}
            size='small'
            // scroll={{ y: 700 }}
            dataSource={this.state.dataSource}
            columns={columns}
            pagination={{ position: 'bottom' }}
          />
        )}
      </ManagerUserWrapper>
    )
  }
}

ManagerUser.Layout = DefaultLayout
export default ManagerUser
