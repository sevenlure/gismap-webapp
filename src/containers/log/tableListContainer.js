import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Card, Col, Row, Tree } from 'antd'
import Icon from 'src/components/elements/icon-with-tooltip'
import { COLOR, ICON_SIZE } from 'src/constant/theme'
import withLogicTable from 'src/hoc/tableList'
import { getList } from 'src/api/logApi'
import { get, map, isObject } from 'lodash-es'

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

  transformData(record, path) {
    let result = get(record, path)
    if (get(result, 'Coso.Ten')) result.Coso = get(result, 'Coso.Ten')
    return result
  }

  handleDetailLog = record => {
    switch (record.Action) {
      case 'CREATE': {
        this.setState({
          content1: {
            title: 'Dữ liệu thêm vào',
            payload: this.transformData(record, 'Diff.new')
          },
          content2: null
        })
        break
      }
      case 'UPDATE': {
        this.setState({
          content1: {
            title: 'Dữ liệu cũ',
            payload: this.transformData(record, 'Diff.before')
          },
          content2: {
            title: 'Các thay đổi',
            payload: this.transformData(record, 'Diff.change')
          }
        })
        break
      }
      default: {
        this.setState({
          content1: {
            title: 'Dữ liệu cũ',
            payload: this.transformData(record, 'Diff.before')
          },
          content2: null
        })
        break
      }
    }
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
  static propTypes = {
    content1: PropTypes.object,
    content2: PropTypes.object,
    getRef: PropTypes.func
  }

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
    console.log('content1', content1)
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
                  <DisplayTreeNode payload={content1.payload}></DisplayTreeNode>
                </Card>
              </Col>
            )}

            {content2 && (
              <React.Fragment>
                <Col key='clearfix' span={11}>
                  <Card key='content2' title={content2.title}>
                    <DisplayTreeNode payload={content2.payload}></DisplayTreeNode>
                  </Card>
                </Col>
              </React.Fragment>
            )}
          </Row>
        </Modal>
      </div>
    )
  }
}
class DisplayTreeNode extends React.Component {
  static propTypes = {
    payload: PropTypes.object
  }

  renderVal(val, key) {
    return (
      <TreeNode
        title={
          <table>
            <tbody>
              <tr>
                <td style={{ paddingRight: 8 }}>{key}:</td>
                <td className='text-xuong-hang'>{val}</td>
              </tr>
            </tbody>
          </table>
        }
        key='key'
      ></TreeNode>
    )
  }

  renderObj = (obj, keyObj) => {
    return (
      <TreeNode title={keyObj} key={keyObj}>
        {map(obj, (val, key) => {
          if (isObject(val)) return this.renderObj(val, key)
          else return this.renderVal(val, key)
        })}
      </TreeNode>
    )
  }

  render() {
    const payload = this.props.payload

    console.log('Tree', payload)
    return (
      <Tree
        className='tree-custom-height'
        style={{ height: 'auto' }}
        showLine
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
      >
        {/* {map(payload, (val, key) => {
          return this.renderVal(val, key)
        })} */}
        {map(payload, (val, key) => {
          if (isObject(val)) return this.renderObj(val, key)
          else return this.renderVal(val, key)
        })}
      </Tree>
    )
  }
}
