import React, { Component } from 'react'
import { Query, Builder, BasicConfig, Utils as QbUtils } from 'react-awesome-query-builder'

import 'assets/styles.css'

// You need to provide your own config. See below 'Config format'
const config = {
  ...BasicConfig,
  fields: {
    qty: {
      label: 'Qty',
      type: 'number',
      fieldSettings: {
        min: 0,
        disabled: true
      },
      valueSources: ['value'],
      preferWidgets: ['number']
    },
    price: {
      label: 'Price',
      type: 'number',
      valueSources: ['value'],
      fieldSettings: {
        min: 10,
        max: 100
      },
      preferWidgets: ['slider', 'rangeslider']
    },
    color: {
      label: 'Color',
      type: 'select',
      valueSources: ['value'],
      listValues: {
        yellow: 'Yellow',
        green: 'Green',
        orange: 'Orange'
      }
    },
    is_promotion: {
      label: 'Promo?',
      type: 'boolean',
      operators: ['equal'],
      valueSources: ['value']
    }
  }
}

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: 'group' }

export default class DemoQueryBuilder extends Component {
  state = {
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config
  }

  render = () => (
    <div>
      <Query {...config} value={this.state.tree} onChange={this.onChange} renderBuilder={this.renderBuilder} />
      {/* {this.renderResult(this.state)} */}
    </div>
  )

  renderBuilder = props => (
    <div className='query-builder-container' style={{ padding: '10px' }}>
      <div className='query-builder qb-lite'>
        <Builder {...props} />
      </div>
    </div>
  )

  renderResult = ({ tree: immutableTree, config }) => (
    <div className='query-builder-result'>
      <div>
        Query string: <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre>
      </div>
      <div>
        Mongodb query: <pre>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</pre>
      </div>
      <div>
        SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre>
      </div>
    </div>
  )

  onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    this.setState({ tree: immutableTree, config: config })

    const jsonTree = QbUtils.getTree(immutableTree)
    console.log(jsonTree)
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  }
}
