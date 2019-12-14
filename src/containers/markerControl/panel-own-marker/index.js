import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Checkbox } from 'antd'
import { get } from 'lodash-es'

import { updateMarkerWithKey } from 'src/redux/actions/filterAction'

const OWN_KEY = {
  ALL_CUSTOMERS: 'OWN/ALL_CUSTOMERS',
  HIGH_POTENTIAL: 'OWN/HIGH_POTENTIAL',
  MY_STORES: 'OWN/MY_STORES'
}

const mapStateToProps = state => ({
  filterMarker: get(state, 'FilterStore.marker')
})
const mapDispatchToProps = { updateMarkerWithKey }

@connect(mapStateToProps, mapDispatchToProps)
export default class PanelOwnMarkerComp extends React.Component {
  // TODO  Own Marker là Dynamic, sẽ fix lại
  static propTypes = {
    updateMarkerWithKey: PropTypes.func.isRequired,
    filterMarker: PropTypes.object.isRequired
  }

  onChangeMarker = e => {
    const { OWN_KEY, checked } = e.target
    this.props.updateMarkerWithKey(OWN_KEY, checked)
  }

  render() {
    const { filterMarker } = this.props
    return (
      <div>
        <div>
          <Checkbox
            OWN_KEY={OWN_KEY.ALL_CUSTOMERS}
            checked={filterMarker[OWN_KEY.ALL_CUSTOMERS]}
            onChange={this.onChangeMarker}
          >
            All customers
          </Checkbox>
        </div>
        <div>
          <Checkbox
            OWN_KEY={OWN_KEY.HIGH_POTENTIAL}
            checked={filterMarker[OWN_KEY.HIGH_POTENTIAL]}
            onChange={this.onChangeMarker}
          >
            High potential
          </Checkbox>
        </div>
        <div>
          <Checkbox
            OWN_KEY={OWN_KEY.MY_STORES}
            checked={filterMarker[OWN_KEY.MY_STORES]}
            onChange={this.onChangeMarker}
          >
            My stores
          </Checkbox>
        </div>
      </div>
    )
  }
}
