import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Divider, Skeleton, Button, Popconfirm, message } from 'antd'
import userApi from 'src/api/userApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'
// import { DateTime } from 'luxon'
// import { DATE_FORMAT_LUXON } from 'src/config/format.js'

const ManagerUserWrapper = styled.div``

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

  getDataSource = async () => {
    try {
      const res = await userApi.getList({
        page: 1,
        pageSize: 50
      })
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

  componentDidMount = async () => {
    const pathPage = slug.manager.user.list
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
    this.getDataSource()
  }

  getColumn = () => {
    return [
      {
        title: 'Phòng ban',
        dataIndex: 'Department.Name'
      },
      {
        title: 'Chức vụ',
        dataIndex: 'PosittionName'
      },
      {
        title: 'Nhóm'
      },
      {
        title: 'Họ tên',
        dataIndex: 'FullName'
      },
      // {
      //   title: 'Năm sinh',
      //   dataIndex: 'Birthday',
      //   render: text => {
      //     // console.log(typeof text, DateTime.fromISO(text).toFormat(DATE_FORMAT_LUXON))
      //     if (typeof text === 'string') {
      //       return <div>{DateTime.fromISO(text).toFormat(DATE_FORMAT_LUXON)}</div>
      //     } else {
      //       return null
      //     }
      //   }
      // },
      {
        title: 'Email',
        dataIndex: 'Email'
      },
      {
        title: 'SĐT',
        dataIndex: 'Phone'
      },
      {
        title: '',
        width: 100,
        render: (text, record) => {
          return (
            <div>
              <Link href={slug.manager.user.edit} as={`${slug.manager.user.base}/${_get(record, '_id')}`}>
                <a>
                  <Icon style={{ cursor: 'pointer', fontSize: '1.5rem' }} theme='twoTone' type='edit' />
                </a>
              </Link>
              <Divider type='vertical' />
              <Popconfirm
                title='Bạn chắc chắc muốn xoá?'
                placement='left'
                okText='Đồng ý'
                cancelText='Hủy'
                onConfirm={() => {
                  this.handleDelete(_get(record, '_id'))
                }}
              >
                <Icon style={{ cursor: 'pointer', fontSize: '1.5rem' }} theme='twoTone' type='delete' />
              </Popconfirm>
            </div>
          )
        }
      }
    ]
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
            columns={this.getColumn()}
            pagination={{ position: 'bottom' }}
          />
        )}
      </ManagerUserWrapper>
    )
  }

  handleDelete = async key => {
    // console.log(key)
    try {
      const res = await userApi.deleteById(key)
      if (res.status === 200) {
        message.success('Xóa thành công!')
        this.getDataSource()
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
}

ManagerUser.Layout = DefaultLayout
export default ManagerUser
