import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Table, Icon, Divider, Skeleton, Popconfirm, Modal, Checkbox, message } from 'antd'
import { get as _get } from 'lodash-es'
import { connect } from 'react-redux'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes'
import Clearfix from 'src/components/elements/clearfix'
import windowSize from 'react-window-size'
import GroupPolicyEdit from 'src/containers/policy/group/group-edit.js'
import InfoPolicyEdit from 'src/containers/policy/info/info-edit.js'
import InfoPolicyCreate from 'src/containers/policy/info/info-create.js'
import { deleteInfoPolicy, getAll } from 'src/api/PolicyApi.js'
import { getInfoErrorfetch } from 'src/constant/funcAixos.js'

const ManagerPolicyWrapper = styled.div``

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@windowSize
class ManagerPolicyList extends React.Component {
  static propTypes = {
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    windowWidth: PropTypes.number
  }
  state = {
    isLoading: true,
    dataSource: [],
    isEditGroupPolicy: false,
    GroupPolicyData: null,
    isInfoPolicy: false,
    InfoPolicyData: {},
    isAddInfoPolicy: false,
    PolicyInfoGroupKey: null
  }

  getColumnGroupPolicy = () => {
    return [
      {
        title: 'ID',
        dataIndex: 'Key'
      },
      {
        title: 'Tên nhóm chính sách',
        dataIndex: 'Name'
      },
      {
        title: 'Thứ tự hiển thị',
        dataIndex: 'Order',
        align: 'center'
      },
      {
        title: 'Cho phép hiển thị',
        dataIndex: 'IsShow',
        align: 'center',
        render: value => {
          return <Checkbox checked={value} />
        }
      },
      {
        title: '',
        width: 100,
        render: (text, record) => {
          return (
            <div>
              <Icon
                onClick={() => {
                  this.setState({
                    isEditGroupPolicy: true,
                    GroupPolicyData: record
                  })
                }}
                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                theme='twoTone'
                type='edit'
              />
              <Divider type='vertical' />
              <Icon
                onClick={() => {
                  this.setState({
                    isAddInfoPolicy: true,
                    PolicyInfoGroupKey: _get(record, '_id', null)
                  })
                }}
                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                theme='twoTone'
                type='plus-circle'
              />
            </div>
          )
        }
      }
    ]
  }

  getColumnChildrenPolicy = () => {
    return [
      {
        title: 'Tên chính sách',
        dataIndex: 'Name'
      },
      {
        title: 'Mô tả',
        dataIndex: 'Description'
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
                    isInfoPolicy: true,
                    InfoPolicyData: record
                  })
                }}
                style={{ cursor: 'pointer' }}
                theme='twoTone'
                type='edit'
              />
              <Divider type='vertical' />
              <Popconfirm
                title='Bạn chắc chắc muốn xoá?'
                placement='left'
                okText='Đồng ý'
                cancelText='Hủy'
                onConfirm={() => {
                  this.handleDeleteInfoPolicy(_get(record, '_id'))
                }}
              >
                <Icon style={{ cursor: 'pointer' }} theme='twoTone' type='delete' />
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
        isInfoPolicy: false,
        isAddInfoPolicy: false,
        isEditGroupPolicy: false
      })
    }
  }

  componentDidMount = () => {
    const pathPage = slug.manager.policy.list
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
    this.getInitialValue()
  }

  renderChildren = dataSource => {
    // console.log(dataSource, 'dataSource')
    if (dataSource && dataSource.length > 0) {
      return (
        <div>
          <Clearfix height={16} />
          <Table
            rowKey='_id'
            size='small'
            pagination={false}
            dataSource={dataSource}
            columns={this.getColumnChildrenPolicy()}
          />
        </div>
      )
    }
    return <h4>Không có dữ liệu</h4>
  }

  render() {
    return (
      <ManagerPolicyWrapper>
        {this.state.isLoading && <Skeleton paragraph={{ rows: 7 }} />}
        {!this.state.isLoading && (
          <div>
            <Table
              rowKey={'_id'}
              size='small'
              // scroll={{ y: 700 }}
              dataSource={this.state.dataSource}
              expandedRowRender={record => this.renderChildren(record.PolicyInfoList)}
              columns={this.getColumnGroupPolicy()}
              pagination={{ position: 'bottom' }}
            />
          </div>
        )}
        {this.state.GroupPolicyData && (
          <Modal visible={this.state.isEditGroupPolicy} footer={null} centered closeIcon={<span />} closable={false}>
            <GroupPolicyEdit
              onCancel={this.hanldleOnCancel}
              onSuccess={this.hanldleOnSuccess}
              dataSource={this.state.GroupPolicyData}
            />
          </Modal>
        )}
        <Modal
          width='70%'
          visible={this.state.isInfoPolicy || this.state.isAddInfoPolicy}
          footer={null}
          centered
          closeIcon={<span />}
          closable={false}
        >
          {/* // NOTE edit */}
          {this.state.isInfoPolicy && this.state.InfoPolicyData && (
            <InfoPolicyEdit
              onCancel={this.hanldleOnCancelInfoPolicy}
              onSuccess={this.hanldleOnSuccess}
              dataSource={this.state.InfoPolicyData}
            />
          )}
          {/* // NOTE them */}
          {this.state.isAddInfoPolicy && (
            <InfoPolicyCreate
              PolicyInfoGroupKey={this.state.PolicyInfoGroupKey}
              onCancel={this.hanldleOnCancelInfoPolicy}
              onSuccess={this.hanldleOnSuccess}
            />
          )}
        </Modal>
      </ManagerPolicyWrapper>
    )
  }

  hanldleOnCancel = () => {
    this.setState({
      isEditGroupPolicy: false
    })
  }
  hanldleOnCancelInfoPolicy = () => {
    this.setState({
      isInfoPolicy: false,
      isAddInfoPolicy: false
    })
  }
  handleDeleteInfoPolicy = async key => {
    // console.log(key)
    try {
      const res = await deleteInfoPolicy(key)
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
    // this.hanldleOnCancelInfoPolicy()
    // this.hanldleOnCancel()
    this.setState({
      isLoading: false
    })
  }
}

ManagerPolicyList.Layout = DefaultLayout
export default ManagerPolicyList
