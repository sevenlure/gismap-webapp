import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Divider, Skeleton, Popconfirm, message, Avatar, Input, Modal, Tooltip } from 'antd'
import userApi from 'src/api/userApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'
import { get as _get, sortBy as _sortBy } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import Link from 'next/link'
import Clearfix from 'src/components/elements/clearfix'
import { getFilePublic } from 'src/api/updateFileApi.js'
import ChangePassword from 'src/containers/change-password/index'
import Button from 'src/components/elements/button'

// import { DateTime } from 'luxon'
// import { DATE_FORMAT_LUXON } from 'src/config/format.js'

const RealEstateProjectWrapper = styled.div``

const mapStateToProps = state => ({
  token: _get(state, 'AuthStore.token')
})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath,
  updateBackgroundColor
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class RealEstateProject extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    updateBackgroundColor: PropTypes.func,
    token: PropTypes.string
  }
  state = {
    isLoading: true,
    dataSource: [],
    searchText: '',
    isChangePassWord: false,
    initialData: {}
  }

  getDataSource = async () => {
    try {
      const res = await userApi.getAll()
      if (res.status === 200) {
        const listData = _sortBy(_get(res, 'data', []), item => {
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
    this.props.updateBackgroundColor('#fff')
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
            const objImage = getFilePublic(url)
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
        title: 'Mã NV',
        dataIndex: 'MaNV'
      },
      {
        title: 'Họ tên',
        dataIndex: 'FullName',
        filterIcon: filtered => <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node
              }}
              placeholder={`Search Họ tên`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type='primary'
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon='search'
              size='small'
              style={{ marginRight: 8 }}
            >
              Tìm kiếm
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size='small' style={{ width: 90 }}>
              Hủy
            </Button>
          </div>
        ),
        onFilter: (value, record) => {
          // console.log(record, value, 'record')
          const name = _get(record, 'SearchName', '')
          return name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        }
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
        width: '15%',
        render: (text, record) => {
          return (
            <div>
              <Tooltip title='Đổi mật khẩu'>
                <Icon
                  onClick={() => {
                    this.setState({
                      isChangePassWord: true,
                      initialData: record
                    })
                  }}
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                  type='lock'
                  twoToneColor='#F2C94C'
                  theme='twoTone'
                />
              </Tooltip>

              <Divider type='vertical' />
              <Link href={slug.manager.user.edit} as={`${slug.manager.user.base}/${_get(record, '_id')}`}>
                <a>
                  <Tooltip title='Chỉnh sửa'>
                    <Icon
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                      theme='twoTone'
                      twoToneColor='#F2C94C'
                      type='edit'
                    />
                  </Tooltip>
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
                <Tooltip title='Xóa'>
                  <Icon
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    twoToneColor='red'
                    theme='twoTone'
                    type='delete'
                  />
                </Tooltip>
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
        <Modal
          // width='70%'
          visible={this.state.isChangePassWord}
          footer={null}
          centered
          closeIcon={<span />}
          closable={false}
        >
          {/* // NOTE edit */}
          <ChangePassword
            rule={this.state.rule}
            isUser={true}
            onCancel={this.hanldleOnCancel}
            onSuccess={this.hanldleOnCancel}
            initialData={this.state.initialData}
          />
        </Modal>
      </RealEstateProjectWrapper>
    )
  }

  hanldleOnCancel = () => {
    this.setState({
      isChangePassWord: false,
      initialData: {}
    })
  }
  handleReset = clearFilters => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm()
    this.setState({ searchText: selectedKeys[0] })
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
