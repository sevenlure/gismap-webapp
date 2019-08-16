import React from 'react'
import PropTypes from 'prop-types'
import { Table, Popconfirm, message, Modal, Card, Col, Row, Tree, Descriptions } from 'antd'
import Icon from 'src/components/elements/icon-with-tooltip'
import { COLOR, ICON_SIZE } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'
import { deleteById, getList } from 'src/api/logApi'
import { get, mapKeys, map } from 'lodash-es'

const { TreeNode } = Tree

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

  state = {
    content1: {},
    content2: {}
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  handleDetailLog = record => {
    switch (record.Action) {
      case 'CREATE': {
        this.setState({
          content1: {
            title: 'Dữ liệu thêm vào',
            payload: get(record, 'Diff.new')
          },
          content2: null
        })
        break
      }
      case 'UPDATE': {
        break
      }
      default: {
        break
      }
    }
    console.log('handleDetailLog')
    this.ModalDetail.openModal()
  }

  columns = [
    {
      title: 'Module',
      dataIndex: 'Module',
      key: 'Module'
    },
    {
      title: 'Loại hành động',
      dataIndex: 'Action',
      key: 'Action'
    },
    {
      title: 'Nguời dùng',
      dataIndex: 'ActionBy',
      key: 'ActionBy'
    },
    {
      title: '',
      key: 'action',
      width: 100,
      render: (text, record) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Icon
              title='Xem chi tiết nhật ký'
              style={{ color: COLOR.PRIMARY, fontSize: ICON_SIZE.LARGE, cursor: 'pointer' }}
              type='audit'
              onClick={() => {
                this.handleDetailLog(record)
              }}
            />
          </div>
        )
      }
    }
  ]

  render() {
    return (
      <React.Fragment>
        <Table
          key='table'
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
        <ModalDetail
          getRef={ref => (this.ModalDetail = ref)}
          content1={this.state.content1}
          content2={this.state.content2}
          key='modal'
        />
      </React.Fragment>
    )
  }
}

export default TableListContainer

class ModalDetail extends React.Component {
  state = {
    isVisible: false
  }

  componentDidMount() {
    if (this.props.getRef) this.props.getRef(this)
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  closeModal = () => {
    this.setState({ isVisible: false })
  }

  openModal = () => {
    this.setState({ isVisible: true })
  }

  render() {
    const { content1, content2 } = this.props
    return (
      <div>
        <Modal
          width='75vw'
          title='Basic Modal'
          visible={this.state.isVisible}
          onOk={this.handleOk}
          onCancel={this.closeModal}
        >
          <Row gutter={16}>
            {content1 && (
              <Col span={11}>
                <Card title={content1.title}>
                  <Tree showLine defaultExpandedKeys={['0-0-0']} onSelect={this.onSelect}>
                    {map(content1.payload, (val, key) => {
                      return (
                        <TreeNode
                          // title={`${key}: ${val}`}
                          title={
                            //  <div>{`${key}: ${val}`}</div>
                            <table>
                              <tbody>
                                <tr>
                                  <td>{key}:</td>
                                  <td>{val}</td>
                                </tr>
                              </tbody>
                            </table>
                          }
                          key='key'
                        ></TreeNode>
                      )
                    })}
                    {/* <TreeNode title='parent 1' key='0-0'>
                      <TreeNode title='parent 1-0' key='0-0-0'>
                        <TreeNode title='leaf' key='0-0-0-0' />
                        <TreeNode title='leaf' key='0-0-0-1' />
                        <TreeNode title='leaf' key='0-0-0-2' />
                      </TreeNode>
                      <TreeNode title='parent 1-1' key='0-0-1'>
                        <TreeNode title='leaf' key='0-0-1-0' />
                      </TreeNode>
                      <TreeNode title='parent 1-2' key='0-0-2'>
                        <TreeNode title='leaf' key='0-0-2-0' />
                        <TreeNode title='leaf' key='0-0-2-1' />
                      </TreeNode>
                    </TreeNode> */}
                  </Tree>
                </Card>
              </Col>
            )}

            <Col span={2} />
            <Col span={11}>
              <Card title='Change'>Card content</Card>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}
