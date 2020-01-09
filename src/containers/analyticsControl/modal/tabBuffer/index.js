import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import styled from 'styled-components'
import { Row, Col, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import {
  remove as _remove,
  uniqueId as _uniqueId,
  concat as _concat,
  find as _find,
  get as _get,
  map as _map,
  keyBy as _keyBy
} from 'lodash-es'

import { getColorByIndex } from 'src/utils/color'
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

const mapStateToProps = state => ({
  AnalyticsStore: _get(state, 'AnalyticsStore')
})
const mapDispatchToProps = {}
@connect(mapStateToProps, mapDispatchToProps)
export default class TabBuffer extends React.Component {
  static propTypes = {
    getRef: PropTypes.func.isRequired,
    AnalyticsStore: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    const { AnalyticsStore } = props
    const targetKey = _get(AnalyticsStore, '__target.key')
    let payload = _get(AnalyticsStore, `${targetKey}.tabBuffer`, [])

    this.state = {
      dataSource: payload
    }
  }
  state = {
    dataSource: []
  }
  getDataTabBuffer = () => {
    return this.state.dataSource
  }
  componentDidMount = () => {
    if (this.props.getRef) this.props.getRef(this)
  }

  addBuffer = () => {
    const Item = {
      id: uuid(),
      radius: 500
    }
    this.setState({
      dataSource: _concat(this.state.dataSource, Item)
    })
  }

  hanldeOnChangeBufferItem = (id, values) => {
    let data = _map(this.state.dataSource, item => {
      if (item.id === id) {
        return {
          id,
          ...values
        }
      } else {
        return item
      }
    })

    // _remove(data, item => {
    //   return item.id === id
    // })
    this.setState({
      dataSource: data
    })
  }

  render() {
    return (
      <TabBufferWrapper>
        <Title level={3}>Buffer setting</Title>
        <TaskList>
          {_map(this.state.dataSource, (task, index) => {
            return (
              <ItemChartAttribute
                key={task.id}
                defaultColor={task.color || getColorByIndex(index)}
                defaultRadius={task.radius}
                id={task.id}
                onChange={this.hanldeOnChangeBufferItem}
                close={id => {
                  let data = this.state.dataSource
                  _remove(data, item => {
                    return item.id === id
                  })
                  // console.log(data, '---data---')
                  this.setState({
                    dataSource: data
                  })
                }}
              />
            )
          })}
          {/* {_map(this.state.dataSource, (task, index) => {
            
          })} */}
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
        </TaskList>
      </TabBufferWrapper>
    )
  }
}
