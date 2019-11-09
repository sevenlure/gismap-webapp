import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import {
  Table,
  Icon,
  Divider,
  Skeleton,
  Popconfirm,
  Modal,
  message,
  Button,
  Tooltip
  // , Checkbox,
} from 'antd'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes'
import Clearfix from 'src/components/elements/clearfix'
import windowSize from 'react-window-size'
import DepartmentEdit from 'src/containers/department/edit'
import DepartmentCreate from 'src/containers/department/create'
import GroupDepartmentEdit from 'src/containers/department/group-deparment/group-department-edit'
import GroupDepartmentCreate from 'src/containers/department/group-deparment/group-department-create'
import { getAll, DeleteDepartment } from 'src/api/DepartmentApi'
import { DeleteGroup } from 'src/api/GroupApi'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'

const ManagerPolicyWrapper = styled.div``

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath,
  updateBackgroundColor
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@windowSize
class ManagerManagerList extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    windowWidth: PropTypes.number,
    updateBackgroundColor: PropTypes.func
  }
  state = {
    isLoading: true,
    dataSource: [],
    isEditDeparment: false,
    isCreateDepartment: false,
    DepartmentData: null,
    isEditGroup: false,
    GroupData: {},
    isAddGroup: false,
    DepartmentKey: null
  }

  getColumnDeparment = () => {
    return [
      {
        title: 'Phòng ban',
        dataIndex: 'Name'
      },
      {
        title: 'Thứ tự hiển thị',
        dataIndex: 'Order',
        align: 'center'
      },
      {
        title: 'Trưởng phòng',
        render: (text, record) => {
          return <div>{_get(record, 'HeadPerson.FullName', '')}</div>
        }
      },
      {
        title: '',
        width: 100,
        render: (text, record) => {
          const Type = _get(record, 'Type', '')
          if (Type !== 'SALE') {
            return (
              <div>
                <Tooltip title='Chỉnh sửa'>
                  <Icon
                    onClick={() => {
                      this.setState({
                        isEditDeparment: true,
                        GroupPolicyData: record
                      })
                    }}
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    theme='twoTone'
                    twoToneColor='#F2C94C'
                    type='edit'
                  />
                </Tooltip>
              </div>
            )
          }
          return (
            <div>
              <Tooltip title='Chỉnh sửa'>
                <Icon
                  onClick={() => {
                    this.setState({
                      isEditDeparment: true,
                      GroupPolicyData: record
                    })
                  }}
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                  theme='twoTone'
                  twoToneColor='#F2C94C'
                  type='edit'
                />
              </Tooltip>

              <Divider type='vertical' />
              <Popconfirm
                title='Bạn chắc chắc muốn xoá?'
                placement='left'
                okText='Đồng ý'
                cancelText='Hủy'
                onConfirm={() => {
                  this.handleDeleteDepartment(_get(record, '_id'))
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
              {/* <Divider type='vertical' />
              <Icon
               
                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                theme='twoTone' twoToneColor='#F2C94C'
                type='plus-circle'
              /> */}
            </div>
          )
        }
      }
    ]
  }

  getColumnGroup = () => {
    return [
      {
        title: 'Nhóm',
        dataIndex: 'Name'
      },
      {
        title: 'Thứ tự hiển thị',
        dataIndex: 'Order'
      },
      {
        title: '',
        width: 70,
        render: (text, record) => {
          return (
            <div>
              <Icon
                onClick={() => {
                  this.setState({
                    isEditGroup: true,
                    GroupData: record,
                    DepartmentKey: _get(record, 'Department._id', null)
                  })
                }}
                style={{ cursor: 'pointer' }}
                theme='twoTone'
                twoToneColor='#F2C94C'
                type='edit'
              />
              <Divider type='vertical' />
              <Popconfirm
                title='Bạn chắc chắc muốn xoá?'
                placement='left'
                okText='Đồng ý'
                cancelText='Hủy'
                onConfirm={() => {
                  this.handleDeleteGroup(_get(record, '_id'))
                }}
              >
                <Icon style={{ cursor: 'pointer' }} twoToneColor='red' theme='twoTone' type='delete' />
              </Popconfirm>
            </div>
          )
        }
      }
    ]
  }

  getInitialValue = async () => {
    try {
      const res = await getAll()
      if (res.status === 200) {
        this.setState({
          dataSource: _get(res, 'data', [])
        })
      }
    } catch (ex) {
      const { response } = ex
      // console.log('catch', response)
      getInfoErrorfetch(response)
    } finally {
      this.setState({
        isLoading: false,
        isEditGroup: false,
        isAddGroup: false,
        isEditDeparment: false,
        isCreateDepartment: false
      })
    }
  }

  componentDidMount = () => {
    const pathPage = slug.manager.department.list
    this.props.updateBackgroundColor('#fff')
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
    this.getInitialValue()
  }

  renderChildren = record => {
    const parentID = _get(record, '_id')
    const dataSource = _get(record, 'GroupList')
    const type = _get(record, 'Type')

    if (type !== 'SALE') {
      return null
    }
    // console.log(parentID, dataSource && dataSource.length > 0, 'dataSource')
    return (
      <div>
        <Button
          onClick={() => {
            this.setState({
              isAddGroup: true,
              DepartmentKey: parentID
            })
          }}
          type='primary'
          icon='plus-circle'
        >
          Tạo nhóm
        </Button>
        <Clearfix height={16} />
        {dataSource && dataSource.length > 0 ? (
          <Table rowKey='_id' size='small' pagination={false} dataSource={dataSource} columns={this.getColumnGroup()} />
        ) : (
          <h4 style={{ textAlign: 'center' }}>Không có dữ liệu</h4>
        )}
      </div>
    )
  }

  render() {
    return (
      <ManagerPolicyWrapper>
        {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
        {!this.state.isLoading && (
          <div>
            <Button
              onClick={() => {
                this.setState({
                  isCreateDepartment: true
                })
              }}
              type='primary'
              icon='plus-circle'
            >
              Tạo mới
            </Button>

            <Clearfix height={8} />
            <Table
              rowKey={'_id'}
              size='small'
              dataSource={this.state.dataSource}
              expandedRowRender={record => this.renderChildren(record)}
              columns={this.getColumnDeparment()}
              pagination={{ position: 'bottom' }}
            />
          </div>
        )}
        <Modal
          visible={this.state.isEditDeparment || this.state.isCreateDepartment}
          footer={null}
          centered
          closeIcon={<span />}
          closable={false}
        >
          {this.state.isEditDeparment && (
            <DepartmentEdit
              onCancel={this.hanldleOnCancel}
              onSuccess={this.hanldleOnSuccess}
              dataSource={this.state.GroupPolicyData}
            />
          )}
          {this.state.isCreateDepartment && (
            <DepartmentCreate onCancel={this.hanldleOnCancel} onSuccess={this.hanldleOnSuccess} />
          )}
        </Modal>

        <Modal
          // width='70%'
          visible={this.state.isEditGroup || this.state.isAddGroup}
          footer={null}
          centered
          closeIcon={<span />}
          closable={false}
        >
          {/* // NOTE edit */}
          {this.state.isEditGroup && this.state.GroupData && (
            <GroupDepartmentEdit
              onCancel={this.hanldleOnCancelGroupDepartment}
              onSuccess={this.hanldleOnSuccess}
              initialData={{
                ...this.state.GroupData,
                Department: this.state.DepartmentKey
              }}
            />
          )}
          {/* // NOTE them */}
          {this.state.isAddGroup && (
            <GroupDepartmentCreate
              DepartmentKey={this.state.DepartmentKey}
              onCancel={this.hanldleOnCancelGroupDepartment}
              onSuccess={this.hanldleOnSuccess}
            />
          )}
        </Modal>
      </ManagerPolicyWrapper>
    )
  }

  hanldleOnCancel = () => {
    this.setState({
      isEditDeparment: false,
      isCreateDepartment: false
    })
  }
  hanldleOnCancelGroupDepartment = () => {
    this.setState({
      isEditGroup: false,
      isAddGroup: false
    })
  }
  handleDeleteDepartment = async key => {
    // console.log(key)
    try {
      const res = await DeleteDepartment(key)
      if (res.status === 200) {
        message.success('Xóa thành công!')
        this.getInitialValue()
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

  handleDeleteGroup = async key => {
    // console.log(key)
    try {
      const res = await DeleteGroup(key)
      if (res.status === 200) {
        message.success('Xóa thành công!')
        this.getInitialValue()
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

  hanldleOnSuccess = () => {
    this.setState({
      isLoading: true
    })
    this.getInitialValue()
    this.setState({
      isLoading: false
    })
  }
}

ManagerManagerList.Layout = DefaultLayout
export default ManagerManagerList
