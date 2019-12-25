import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import { get, debounce, isEqual } from 'lodash-es'
import { updateTabFilter } from 'src/redux/actions/analyticsAction'

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

function findObject(obj, id) {
  for (let k in obj) {
    if (k === id) return obj[id]
  }
  let result
  for (let k in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(k) && typeof obj[k].children1 === 'object') {
      result = findObject(obj[k].children1, id)
      if (result) {
        return result
      }
    }
  }
}

Object.size = function(obj) {
  var size = 0,
    key
  for (key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) size++
  }
  return size
}

function DeleteObjectChildren(obj) {
  for (let k in obj) {
    if (obj[k].type === 'group' && Object.size(obj[k].children1) === 0) {
      delete obj[k]
    } else {
      DeleteObjectChildren(obj[k].children1)
    }
  }
}

const mapStateToProps = state => ({
  AnalyticsStore: get(state, 'AnalyticsStore')
})
const mapDispatchToProps = { updateTabFilter }

@connect(mapStateToProps, mapDispatchToProps)
export default class DemoQueryBuilder extends Component {
  static propTypes = {
    AnalyticsStore: PropTypes.object.isRequired,
    updateTabFilter: PropTypes.func.isRequired,
    getRef: PropTypes.func
  }

  constructor(props) {
    super(props)
    const { AnalyticsStore, updateTabFilter } = props
    const targetKey = get(AnalyticsStore, '__target.key')

    const fieldArr = get(AnalyticsStore, `${targetKey}.fieldArr`, [])
    const fields = this.convertFieldsToConfig(fieldArr)
    const payload = get(AnalyticsStore, `${targetKey}.tabFilter`, initValue)

    // console.log('payload', payload)
    this.state = {
      tree: checkTree(loadTree(payload), { ...loadedConfig, fields }),
      config: { ...loadedConfig, fields }
    }
    // console.log('fields', fields)
  }

  componentDidMount() {
    this.props.getRef(this)
  }

  convertFieldsToConfig = fieldArr => {
    const fieldsTamp = fieldArr.reduce((acc, cur) => {
      let type = 'text'
      let operators = ['equal', 'not_equal', 'like', 'not_like']
      if (cur.type === Number) {
        type = 'number'
        operators = ['equal', 'not_equal', 'less', 'less_or_equal', 'greater', 'greater_or_equal']
      }
      acc[cur.key] = {
        ...cur,
        type,
        operators,
        valueSources: ['value'],
        cbHandleDropIntoRule: this.cbHandleDropIntoRule
      }
      return acc
    }, {})

    return fieldsTamp
  }

  cbHandleDropIntoRule = (task, dataId) => {
    // console.log('cbHandleDropIntoRule', cbHandleDropIntoRule)
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
          value: [''],
          valueSrc: ['value'],
          valueType: ['text']
        }
      }
    }
    this.immutableTree = loadTree(jsonTree)
    this.updateResult()
  }

  addTheLastRule = task => {
    const jsonTree = getTree(this.state.tree)
    jsonTree.children1[uuid()] = {
      type: 'rule',
      properties: {
        field: task.key,
        operator: 'equal',
        value: [''],
        valueSrc: ['value'],
        valueType: ['text']
      }
    }

    this.immutableTree = loadTree(jsonTree)

    this.updateResult()
  }
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

  renderBuilder = props => (
    <Wrapper className='query-builder-container'>
      <div className='query-builder qb-lite' style={{ marginBottom: 0 }}>
        <Builder {...props} />
      </div>
    </Wrapper>
  )

  onChange = (immutableTree, config) => {
    this.immutableTree = immutableTree
    this.config = config
    let jsonTree = getTree(immutableTree)
    DeleteObjectChildren(jsonTree.children1)

    if (Object.size(jsonTree.children1) === 1) {
      for (let k in jsonTree.children1) {
        if (!jsonTree.children1[k].properties.field) {
          delete jsonTree.children1[k]
        }
      }
    }

    this.immutableTree = loadTree(jsonTree)
    this.jsonTree = jsonTree

    this.updateResult()
  }

  updateResult = throttle(() => {
    const { AnalyticsStore, updateTabFilter } = this.props
    const targetKey = get(AnalyticsStore, '__target.key')
    setTimeout(() => {
      updateTabFilter(targetKey, this.jsonTree)
    }, 300)
    this.setState({ tree: this.immutableTree, config: this.config })
  }, 150)

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
