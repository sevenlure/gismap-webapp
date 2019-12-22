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

// import 'antd/dist/antd.css'
import 'assets/styles.css'

const stringify = JSON.stringify

const { queryBuilderFormat, queryString, getTree, checkTree, loadTree, uuid } = Utils
const preStyle = { backgroundColor: 'darkgrey', margin: '10px', padding: '10px' }

const emptyInitValue = { id: uuid(), type: 'group' }
const initValue = loadedInitValue && Object.keys(loadedInitValue).length > 0 ? loadedInitValue : emptyInitValue

export default class DemoQueryBuilder extends Component {
  immutableTree
  config

  state = {
    tree: checkTree(loadTree(initValue), loadedConfig),
    config: loadedConfig
  }

  componentDidUpdate() {
    console.log('this.state.tree', this.state.tree)
  }
  render = () => (
    <div>
      <Query {...loadedConfig} value={this.state.tree} onChange={this.onChange} renderBuilder={this.renderBuilder} />
      {/* <div className='query-builder-result'>{this.renderResult(this.state)}</div> */}
    </div>
  )

  renderBuilder = props => (
    <div className='query-builder-container' style={{ padding: '10px' }}>
      <button
        onClick={() => {
          const jsonTree = getTree(this.state.tree)
          jsonTree.children1[uuid()] = {
            type: 'rule',
            properties: {
              field: 'text',
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
        }}
      >
        ahhahahaha
      </button>
      <div className='query-builder qb-lite'>
        <Builder {...props} />
      </div>
    </div>
  )

  onChange = (immutableTree, config) => {
    this.immutableTree = immutableTree
    this.config = config
    this.updateResult()
    console.log('this.immutableTree', this.immutableTree)
    const jsonTree = getTree(immutableTree) //can be saved to backend
    console.log('jsonTree', jsonTree)
  }

  updateResult = throttle(() => {
    this.setState({ tree: this.immutableTree, config: this.config })
  }, 100)

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
