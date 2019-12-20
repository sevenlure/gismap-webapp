import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Checkbox, Icon } from 'antd'
import { get } from 'lodash-es'

import { updateMarkerWithKey } from 'src/redux/actions/filterAction'

const OWN_KEY = {
  ALL_CUSTOMERS: 'OWN/ALL_CUSTOMERS',
  HIGH_POTENTIAL: 'OWN/HIGH_POTENTIAL',
  MY_STORES: 'OWN/MY_STORES'
}

const mapStateToProps = state => ({
  filterMarker: get(state, 'FilterStore.marker'),
  markerOwnCountIsLoaded: get(state, 'LayerStore.markerOwnCountIsLoaded'),
  markerOwnCount: get(state, 'LayerStore.markerOwnCount')
})
const mapDispatchToProps = { updateMarkerWithKey }

@connect(mapStateToProps, mapDispatchToProps)
export default class PanelOwnMarkerComp extends React.Component {
  // TODO  Own Marker là Dynamic, sẽ fix lại
  static propTypes = {
    updateMarkerWithKey: PropTypes.func.isRequired,
    filterMarker: PropTypes.object.isRequired
  }

  render() {
    const { filterMarker } = this.props
    return (
      <div>
        <div>
          <CheckboxOwn targetKey={OWN_KEY.ALL_CUSTOMERS} label='All customers'></CheckboxOwn>
        </div>
        <div>
          <CheckboxOwn label='High potential' targetKey={OWN_KEY.HIGH_POTENTIAL}></CheckboxOwn>
        </div>
        <div>
          <CheckboxOwn targetKey={OWN_KEY.MY_STORES} label='My stores'></CheckboxOwn>
        </div>
      </div>
    )
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class CheckboxOwn extends React.Component {
  static propTypes = {
    updateMarkerWithKey: PropTypes.func.isRequired,
    targetKey: PropTypes.string.isRequired,
    filterMarker: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    markerOwnCountIsLoaded: PropTypes.bool.isRequired,
    markerOwnCount: PropTypes.object.isRequired
  }

  onChangeMarker = e => {
    const { OWN_KEY, label, checked } = e.target
    if (checked) {
      this.props.updateMarkerWithKey(OWN_KEY, {
        key: OWN_KEY,
        label
      })
    } else this.props.updateMarkerWithKey(OWN_KEY, checked)
  }

  render() {
    const { targetKey, filterMarker, label, markerOwnCountIsLoaded, markerOwnCount } = this.props
    return (
      <Checkbox
        OWN_KEY={targetKey}
        label={label}
        checked={filterMarker[targetKey] ? true : false}
        onChange={this.onChangeMarker}
      >
        {label}
        <span style={{ marginLeft: 4, color: '#bfbfbf' }}>
          {markerOwnCountIsLoaded ? `(${get(markerOwnCount, targetKey, 0)})` : <Icon type='loading' />}
        </span>
      </Checkbox>
    )
  }
}
