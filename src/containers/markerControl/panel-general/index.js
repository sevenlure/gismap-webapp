import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { Checkbox, Icon } from 'antd'
import { get } from 'lodash-es'

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
    filterMarker: PropTypes.object.isRequired,
    markerGeneralCount: PropTypes.object.isRequired
  }

  onChangeMarker = e => {
    const { GENERAL_KEY, checked } = e.target
    this.props.updateMarkerWithKey(GENERAL_KEY, checked)
  }
  render() {
    const { filterMarker, markerGeneralCount } = this.props

    return (
      <div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.ACADEMIES} label='Academies'></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.ACCOMMODATION} label='Accommodation'></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.AUTOMOTIVE} label='Automotive'></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.BARS_AND_RESTAURANTS} label='Bars and restaurants'></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.FASHION} label='Fashion'></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.GENERAL_SERVICES} label='General services'></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.HEALTH_BEAUTY} label={'Health & Beauty'}></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.HOME_OFFICE} label={'Home & Office'}></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.LEISURE} label={'Leisure'}></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.SERVICES} label={'Services'}></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral targetKey={GENERAL_KEY.SHOPPING_CENTRES} label={'Shopping Centres'}></CheckboxGeneral>
        </div>
        <div>
          <CheckboxGeneral
            targetKey={GENERAL_KEY.UNCATEGORIZED_MARKERS}
            label={'Uncategorized markers'}
          ></CheckboxGeneral>
        </div>
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
    console.log('CheckboxGeneral', this.props)
    const { GENERAL_KEY, checked } = e.target
    this.props.updateMarkerWithKey(GENERAL_KEY, checked)
  }

  render() {
    const { targetKey, filterMarker, label, markerGeneralCountIsLoaded, markerGeneralCount } = this.props
    return (
      <Checkbox GENERAL_KEY={targetKey} checked={filterMarker[targetKey]} onChange={this.onChangeMarker}>
        {label}
        <span style={{ marginLeft: 4, color: '#bfbfbf' }}>
          {markerGeneralCountIsLoaded ? `(${get(markerGeneralCount, targetKey, 0)})` : <Icon type='loading' />}
        </span>
      </Checkbox>
    )
  }
}
