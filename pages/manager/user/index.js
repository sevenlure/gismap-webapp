import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Divider, Skeleton, Button, Popconfirm, message, Avatar } from 'antd'
import userApi from 'src/api/userApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get, sortBy as _sortBy } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'
import { getFilePrivate } from 'src/api/updateFileApi.js'

// import { DateTime } from 'luxon'
// import { DATE_FORMAT_LUXON } from 'src/config/format.js'

const RealEstateProjectWrapper = styled.div``

const mapStateToProps = state => ({
  token: _get(state, 'AuthStore.token')
})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class RealEstateProject extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    token: PropTypes.string
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
        const listData = _sortBy(_get(res, 'data.list', []), item => {
          return _get(item, 'Department.Name', '')
        })

        this.setState({
          dataSource: listData
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
        title: '',
        dataIndex: '',
        render: (value, record) => {
          const url = _get(record, 'Avatar', null)
          if (url) {
            const objImage = getFilePrivate(url, this.props.token)
            return (
              <div>
                <Avatar src={objImage.URL} />
              </div>
            )
          } else {
            return null
          }
        }
      },
      {
        title: 'Họ tên',
        dataIndex: 'FullName'
      },
      {
        title: 'Phòng ban',
        dataIndex: 'Department.Name',
        sorter: (a, b) => a.Department.Name.length - b.Department.Name.length,
        sortDirections: ['descend', 'ascend']
      },
      {
        title: 'Nhóm',
        dataIndex: 'Group.Name'
      },
      {
        title: 'Chức vụ',
        dataIndex: 'PosittionName'
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
                <Icon
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                  twoToneColor='red'
                  theme='twoTone'
                  type='delete'
                />
              </Popconfirm>
            </div>
          )
        }
      }
    ]
  }

  render() {
    return (
      <RealEstateProjectWrapper>
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
      </RealEstateProjectWrapper>
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

RealEstateProject.Layout = DefaultLayout
export default RealEstateProject
