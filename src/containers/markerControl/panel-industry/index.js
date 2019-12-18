import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { Checkbox, Icon } from 'antd'
import { get } from 'lodash-es'

import { updateMarkerWithKey } from 'src/redux/actions/filterAction'

const INDUSTRY_KEY = {
  GENERAL: 'INDUSTRY/GENERAL',
  RETAIL: 'INDUSTRY/RETAIL',
  FMCR: 'INDUSTRY/FMCR',
  REAL_ESTATES: 'INDUSTRY/REAL_ESTATES',
  HEALTHCARE: 'INDUSTRY/HEALTHCARE',
  FINANCIAL_SERVICES: 'INDUSTRY/FINANCIAL_SERVICES'
}

const mapStateToProps = state => ({
  filterMarker: get(state, 'FilterStore.marker'),
  markerGeneralCountIsLoaded: get(state, 'LayerStore.markerGeneralCountIsLoaded'),
  markerGeneralCount: get(state, 'LayerStore.markerGeneralCount')
})
const mapDispatchToProps = { updateMarkerWithKey }

@connect(mapStateToProps, mapDispatchToProps)
export default class PanelIndustryComp extends React.Component {
  static propTypes = {
    updateMarkerWithKey: PropTypes.func.isRequired,
    filterMarker: PropTypes.object.isRequired
  }

  render() {
    const { filterMarker } = this.props
    return (
      <div>
        <div>
          <CheckboxIndustry targetKey={INDUSTRY_KEY.GENERAL} label='General'></CheckboxIndustry>
        </div>
        <div>
          <CheckboxIndustry targetKey={INDUSTRY_KEY.RETAIL} label='Retail'></CheckboxIndustry>
        </div>
        <div>
          <CheckboxIndustry targetKey={INDUSTRY_KEY.FMCR} label='FMCR'></CheckboxIndustry>
        </div>
        <div>
          <CheckboxIndustry targetKey={INDUSTRY_KEY.REAL_ESTATES} label='Real Estates'></CheckboxIndustry>
        </div>
        <div>
          <CheckboxIndustry targetKey={INDUSTRY_KEY.HEALTHCARE} label='Healthcare'></CheckboxIndustry>
        </div>
        <div>
          <CheckboxIndustry targetKey={INDUSTRY_KEY.FINANCIAL_SERVICES} label='Financial services'></CheckboxIndustry>
        </div>
      </div>
    )
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class CheckboxIndustry extends React.Component {
  static propTypes = {
    updateMarkerWithKey: PropTypes.func.isRequired,
    targetKey: PropTypes.string.isRequired,
    filterMarker: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    markerGeneralCountIsLoaded: PropTypes.bool.isRequired,
    markerGeneralCount: PropTypes.object.isRequired
  }

  onChangeMarker = e => {
    const { INDUSTRY_KEY, label, checked } = e.target
    if (checked) {
      this.props.updateMarkerWithKey(INDUSTRY_KEY, {
        key: INDUSTRY_KEY,
        label
      })
    } else this.props.updateMarkerWithKey(INDUSTRY_KEY, checked)
  }

  render() {
    const { targetKey, filterMarker, label, markerGeneralCountIsLoaded, markerGeneralCount } = this.props
    return (
      <Checkbox
        INDUSTRY_KEY={targetKey}
        label={label}
        checked={filterMarker[targetKey] ? true : false}
        onChange={this.onChangeMarker}
      >
        {label}
        <span style={{ marginLeft: 4, color: '#bfbfbf' }}>
          {markerGeneralCountIsLoaded ? `(${get(markerGeneralCount, targetKey, 0)})` : <Icon type='loading' />}
        </span>
      </Checkbox>
    )
  }
}
