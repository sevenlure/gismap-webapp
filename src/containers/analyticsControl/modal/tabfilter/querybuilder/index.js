import React, { Component } from 'react'
import {
  Query,
  Builder,
  BasicConfig,
  Utils,
  ImmutableTree,
  Config,
  BuilderProps,
  JsonTree
} from 'react-awesome-query-builder'
import { throttle } from 'lodash-es'
import loadedConfig from './config'
import loadedInitValue from './init_value'
import PlaceHolderDrop from '../placeHolderDrop'
import { connect } from 'react-redux'
import { pull as _pull, get, debounce } from 'lodash-es'

// import 'antd/dist/antd.css'
import 'assets/styles.css'
import styled from 'styled-components'

const stringify = JSON.stringify

const Wrapper = styled.div`
  .group--actions.group--actions--tr {
    display: none !important;
  }
`

const { queryBuilderFormat, queryString, getTree, checkTree, loadTree, uuid } = Utils
const preStyle = { backgroundColor: 'darkgrey', margin: '10px', padding: '10px' }

const emptyInitValue = { id: uuid(), type: 'group' }
const initValue = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue : emptyInitValue

const mapStateToProps = state => ({
  AnalyticsStore: get(state, 'AnalyticsStore')
})
const mapDispatchToProps = {}

function findObject(obj, id) {
  for (let k in obj) {
    if (k === id) return obj[id]
  }
  let result
  for (let k in obj) {
    if (obj.hasOwnProperty(k) && typeof obj[k].children1 === 'object') {
      result = findObject(obj[k].children1, id)
      if (result) {
        return result
      }
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class DemoQueryBuilder extends Component {
  immutableTree
  config
  constructor(props) {
    super(props)
    const { AnalyticsStore } = props
    const targetKey = get(AnalyticsStore, '__target.key')

    const fieldArr = get(AnalyticsStore, `${targetKey}.fieldArr`, [])
    const fields = this.convertFieldsToConfig(fieldArr)

    this.state = {
      tree: checkTree(loadTree(initValue), loadedConfig),
      config: { ...loadedConfig, fields }
    }
    console.log('fields', fields)
  }

  componentDidMount() {
    this.props.getRef(this)
  }

  convertFieldsToConfig = fieldArr => {
    const fieldsTamp = fieldArr.reduce((acc, cur) => {
      let type = 'text'
      if (cur.type === Number) type = 'number'
      acc[cur.key] = {
        ...cur,
        type,
        operators: ['equal', 'not_equal'],
        valueSources: ['value'],
        cbHandleDropIntoRule: (task, dataId) => {
          console.log('cbHandleDropIntoRule', task)
          const jsonTree = getTree(this.state.tree)
          const objFinded = findObject(jsonTree.children1, dataId)
          const cache = {
            ...objFinded
          }
          objFinded.type = 'group'
          objFinded.properties = {
            conjunction: 'AND'
          }
          objFinded.children1 = {
            [uuid()]: cache,
            [uuid()]: {
              type: 'rule',
              properties: {
                field: task.key,
                operator: 'equal',
                value: ['p'],
                valueSrc: ['value'],
                valueType: ['text']
              }
            }
          }
          console.log('jsonTree', jsonTree)
          const tamp = loadTree(jsonTree)
          this.setState({
            tree: tamp
          })
          console.log('objFinded', objFinded, 'dataId', dataId)
        }
      }
      return acc
    }, {})

    return fieldsTamp
  }

  // cbHandleDropIntoRule = (task, dataId) => {
  //   console.log('cbHandleDropIntoRule', cbHandleDropIntoRule)
  // }

  render = () => (
    <div>
      <Query
        {...this.state.config}
        value={this.state.tree}
        onChange={this.onChange}
        renderBuilder={this.renderBuilder}
        cbHandleDropIntoRule={this.cbHandleDropIntoRule}
      />
      {/* <div className='query-builder-result'>{this.renderResult(this.state)}</div> */}
      <PlaceHolderDrop cbHandleDrop={this.addTheLastRule} />
    </div>
  )

  addTheLastRule = task => {
    console.log('addTheLastRule', task)
    const jsonTree = getTree(this.state.tree)
    jsonTree.children1[uuid()] = {
      type: 'rule',
      properties: {
        field: task.key,
        operator: 'equal',
        value: ['p'],
        valueSrc: ['value'],
        valueType: ['text']
      }
    }
    const tamp = loadTree(jsonTree)
    this.setState({
      tree: tamp
    })
  }

  renderBuilder = props => (
    <Wrapper className='query-builder-container'>
      <div className='query-builder qb-lite'>
        <Builder {...props} />
      </div>
    </Wrapper>
  )

  onChange = (immutableTree, config) => {
    this.immutableTree = immutableTree
    this.config = config
    this.updateResult()
    // console.log('this.immutableTree', this.immutableTree)
    const jsonTree = getTree(immutableTree) //can be saved to backend
    // console.log('jsonTree', jsonTree)
  }

  updateResult = throttle(() => {
    this.setState({ tree: this.immutableTree, config: this.config })
  }, 300)

  renderResult = ({ tree, config }) => (
    <div>
      <br />
      <div>
        stringFormat:
        <pre style={preStyle}>{stringify(queryString(this.immutableTree, config), undefined, 2)}</pre>
      </div>
      <hr />
      <div>
        humanStringFormat:
        <pre style={preStyle}>{stringify(queryString(this.immutableTree, config, true), undefined, 2)}</pre>
      </div>
      <hr />

      <div>
        Tree:
        <pre style={preStyle}>{stringify(getTree(this.immutableTree), undefined, 2)}</pre>
      </div>
      {/* <hr/>
        <div>
          queryBuilderFormat: 
            <pre style={preStyle}>
              {stringify(queryBuilderFormat(this.immutableTree, config), undefined, 2)}
            </pre>
        </div> */}
    </div>
  )
}
