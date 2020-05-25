import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import styled from 'styled-components'
import { Row, Col, Icon, Button, Form } from 'antd'
import { connect } from 'react-redux'
import {
  remove as _remove,
  uniqueId as _uniqueId,
  concat as _concat,
  find as _find,
  get as _get,
  map as _map,
  keyBy as _keyBy,
  maxBy as _maxBy,
  values as _values,
  cloneDeep as _cloneDeep
} from 'lodash-es'

import { getColorBufferByIndex } from 'src/utils/color'
import ItemChartAttribute from './itemBufferAttribute'

const TabBufferWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  background-color: white;
  flex: 1;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
`

const Title = styled.h3`
  padding: 8px;
`

const MAX_BUFFER = 4

const mapStateToProps = state => ({
  AnalyticsStore: _get(state, 'AnalyticsStore')
})
const mapDispatchToProps = {}
@connect(mapStateToProps, mapDispatchToProps)
class TabBuffer extends React.Component {
  static propTypes = {
    getRef: PropTypes.func.isRequired,
    AnalyticsStore: PropTypes.object.isRequired,
    form: PropTypes.any
  }
  constructor(props) {
    super(props)
  }
  state = {
    dataSource: [],
    radiusMax: 0,
    isLoading: false,
    dataResult: null
  }
  getDataTabBuffer = () => {
    let dataResult = this.state.dataResult
    // console.log('getDataTabBuffer', dataResult)

    if (_get(dataResult, 'success', false)) {
      dataResult.data = _map(dataResult.data, (item, index) => {
        // console.log('-------item----')
        // console.log(item)
        const _temp = { ...item }
        if (index > 0) {
          _temp.radiusFrom = dataResult.data[index - 1].radius
          _temp.radiusTo = item.radius
        }
        return _temp
      })
      return dataResult
    } else {
      return dataResult
    }
  }
  componentDidMount = () => {
    if (this.props.getRef) this.props.getRef(this)
    const { AnalyticsStore } = this.props
    const targetKey = _get(AnalyticsStore, '__target.key')
    let payload = _get(AnalyticsStore, `${targetKey}.tabBuffer`, [])

    this.setState({
      dataSource: payload
    })

    this.updateDataResult(true, payload)
    if (payload.length === 0) {
      this.addBuffer()
    } else {
      this.setState({
        radiusMax: this.getRadiusMax()
      })
    }
  }

  getRadiusMax = () => {
    if (!this.state.dataSource && this.state.dataSource.length === 0) {
      return
    }
    const itemMax = _maxBy(this.state.dataSource, item => {
      return item.radius
    })
    if (itemMax) {
      return itemMax.radius
    }
  }

  addBuffer = () => {
    const index = this.state.dataSource ? this.state.dataSource.length : 0
    const radiusMax = this.getRadiusMax()
    const radiusDefault = radiusMax > 0 ? radiusMax + 500 : 500
    const Item = {
      id: uuid(),
      color: getColorBufferByIndex(index),
      radius: radiusDefault
    }
    this.setState({
      dataSource: _concat(this.state.dataSource, Item),
      radiusMax: radiusDefault
    })
  }

  hanldeOnChangeBufferItem = values => {
    let data = _map(this.state.dataSource, item => {
      // console.log(values, 'hanldeOnChangeBufferItem')
      // MARK cập nhật số radius lớn nhất của buffer
      if (this.state.radiusMax < values.radius) {
        this.setState({
          radiusMax: values.radius
        })
      }
      if (item.id === values.id) {
        // console.log('hanldeOnChangeBufferItem', values)
        return {
          ...values
        }
      } else {
        return item
      }
    })

    this.setState({
      dataSource: data,
      isLoading: false
    })
  }

  checkRadius = (rule, value, callback) => {
    if (value.radius < value.radiusMin) {
      callback(`Không được nhỏ hơn ${value.radiusMin}`)
    }
    return callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    // const dataSource = _keyBy(this.state.dataSource, 'id')
    // console.log(this.state.dataResult, '---dataResult--')
    return (
      <TabBufferWrapper>
        <Title level={3}>Buffer setting</Title>

        <Form>
          <TaskList>
            {!this.state.isLoading && (
              <div>
                {_map(this.state.dataSource, (task, index) => {
                  const valueMin = index > 0 ? this.state.dataSource[index - 1].radius + 1 : 0
                  // console.log(valueMin, 'valueMin', index)
                  return (
                    <Form.Item key={task.id}>
                      {getFieldDecorator(task.id, {
                        initialValue: task,
                        rules: [{ required: true, message: 'Vui lòng nhập số' }, { validator: this.checkRadius }]
                      })(
                        <ItemChartAttribute
                          index={index}
                          radiusMin={valueMin}
                          defaultColor={task.color}
                          defaultRadius={task.radius}
                          id={task.id}
                          onChange={this.hanldeOnChangeBufferItem}
                          close={id => {
                            let data = _cloneDeep(this.state.dataSource)
                            _remove(data, item => {
                              return item.id === id
                            })
                            // console.log(data, '---data---')
                            this.setState({
                              dataSource: data
                            })
                          }}
                        />
                      )}
                    </Form.Item>
                  )
                })}
              </div>
            )}
            {this.state.dataSource.length < MAX_BUFFER && (
              <Row lign='middle' type='flex' justify='space-between' style={{ justifyContent: 'flex-end' }}>
                <Col>
                  <Button type='link' onClick={this.addBuffer}>
                    Add new ring
                    <Icon
                      type='plus-circle'
                      style={{ fontSize: 18 }}
                      theme='twoTone'
                      // onClick={this.props.close(this.props.task.id)}
                    />
                  </Button>
                </Col>
              </Row>
            )}
          </TaskList>
        </Form>
      </TabBufferWrapper>
    )
  }

  updateDataResult = (success, data) => {
    // console.log('updateDataResult', success, data)
    this.setState({
      dataResult: {
        success: success,
        data: data
      }
    })
  }
  componentDidUpdate = (prevProps, prevState) => {
    // console.log('---componentDidUpdate---')
    // console.log(prevState.dataSource, this.state.dataSource)
    // console.log(this.state.dataSource.length, prevState.dataSource.length, "----")
    if (prevState.dataSource !== this.state.dataSource) {
      // console.log(this.state.dataSource.length, prevState.dataSource.length)
      const {
        form: { validateFields }
      } = this.props
      validateFields((errors, values) => {
        if (!errors) {
          // console.log('Received values of form: ', _values(values))
          // console.log('getDataTabBuffer', this.state.dataSource)
          this.updateDataResult(true, _values(values))
          // this.setState({
          //   dataResult: {
          //     success: true,
          //     data: _values(values)
          //   }
          // })
        } else {
          this.updateDataResult(false, [])

          // this.setState({
          //   dataResult: {
          //     success: false
          //   }
          // })
        }
      })
    }
  }
}
export default Form.create({})(TabBuffer)
