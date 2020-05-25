import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { Checkbox, Icon } from 'antd'
import { get } from 'lodash-es'

import { _keyObjArr as _keyObjGeneralArr } from 'src/constant/layer/general'
import { updateMarkerWithKey } from 'src/redux/actions/filterAction'

const GENERAL_KEY = {
  ACADEMIES: 'GENERAL/ACADEMIES',
  ACCOMMODATION: 'GENERAL/ACCOMMODATION',
  AUTOMOTIVE: 'GENERAL/AUTOMOTIVE',
  BARS_AND_RESTAURANTS: 'GENERAL/BARS_AND_RESTAURANTS',
  FASHION: 'GENERAL/FASHION',
  GENERAL_SERVICES: 'GENERAL/GENERAL_SERVICES',
  HEALTH_BEAUTY: 'GENERAL/HEALTH_BEAUTY',
  HOME_OFFICE: 'GENERAL/HOME_OFFICE',
  LEISURE: 'GENERAL/LEISURE',
  SERVICES: 'GENERAL/SERVICES',
  SHOPPING_CENTRES: 'GENERAL/SHOPPING_CENTRES',
  UNCATEGORIZED_MARKERS: 'GENERAL/UNCATEGORIZED_MARKERS'
}

const mapStateToProps = state => ({
  filterMarker: get(state, 'FilterStore.marker'),
  markerGeneralCountIsLoaded: get(state, 'LayerStore.markerGeneralCountIsLoaded'),
  markerGeneralCount: get(state, 'LayerStore.markerGeneralCount')
})
const mapDispatchToProps = { updateMarkerWithKey }

@connect(mapStateToProps, mapDispatchToProps)
export default class PanelGeneralComp extends React.Component {
  static propTypes = {
    updateMarkerWithKey: PropTypes.func.isRequired,
    filterMarker: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>
        {_keyObjGeneralArr.map(item => (
          <div key={item.key}>
            <CheckboxGeneral targetKey={item.key} label={item.name}></CheckboxGeneral>
          </div>
        ))}
      </div>
    )
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class CheckboxGeneral extends React.Component {
  static propTypes = {
    updateMarkerWithKey: PropTypes.func.isRequired,
    targetKey: PropTypes.string.isRequired,
    filterMarker: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    markerGeneralCountIsLoaded: PropTypes.bool.isRequired,
    markerGeneralCount: PropTypes.object.isRequired
  }

  onChangeMarker = e => {
    const { GENERAL_KEY, label, checked } = e.target
    if (checked) {
      this.props.updateMarkerWithKey(GENERAL_KEY, {
        key: GENERAL_KEY,
        label
      })
    } else this.props.updateMarkerWithKey(GENERAL_KEY, checked)
  }

  render() {
    const { targetKey, filterMarker, label, markerGeneralCountIsLoaded, markerGeneralCount } = this.props
    return (
      <Checkbox
        defaultChecked={filterMarker[targetKey] ? true : false}
        GENERAL_KEY={targetKey}
        label={label}
        // checked={filterMarker[targetKey] ? true : false}
        onChange={this.onChangeMarker}
      >
        {label}
        {/* <span style={{ marginLeft: 4, color: '#bfbfbf' }}>
          {markerGeneralCountIsLoaded ? `(${get(markerGeneralCount, targetKey, 0)})` : <Icon type='loading' />}
        </span> */}
      </Checkbox>
    )
  }
}
