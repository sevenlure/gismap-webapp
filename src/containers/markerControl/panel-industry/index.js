import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { Checkbox } from 'antd'
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
  filterMarker: get(state, 'FilterStore.marker')
})
const mapDispatchToProps = { updateMarkerWithKey }

@connect(mapStateToProps, mapDispatchToProps)
export default class PanelIndustryComp extends React.Component {
  static propTypes = {
    updateMarkerWithKey: PropTypes.func.isRequired,
    filterMarker: PropTypes.object.isRequired
  }

  onChangeMarker = e => {
    const { INDUSTRY_KEY, checked } = e.target
    this.props.updateMarkerWithKey(INDUSTRY_KEY, checked)
  }

  render() {
    const { filterMarker } = this.props
    return (
      <div>
        <div>
          <Checkbox
            INDUSTRY_KEY={INDUSTRY_KEY.GENERAL}
            checked={filterMarker[INDUSTRY_KEY.GENERAL]}
            onChange={this.onChangeMarker}
          >
            General
          </Checkbox>
        </div>
        <div>
          <Checkbox
            INDUSTRY_KEY={INDUSTRY_KEY.RETAIL}
            checked={filterMarker[INDUSTRY_KEY.RETAIL]}
            onChange={this.onChangeMarker}
          >
            Retail
          </Checkbox>
        </div>
        <div>
          <Checkbox
            INDUSTRY_KEY={INDUSTRY_KEY.FMCR}
            checked={filterMarker[INDUSTRY_KEY.FMCR]}
            onChange={this.onChangeMarker}
          >
            FMCR
          </Checkbox>
        </div>
        <div>
          <Checkbox
            INDUSTRY_KEY={INDUSTRY_KEY.REAL_ESTATES}
            checked={filterMarker[INDUSTRY_KEY.REAL_ESTATES]}
            onChange={this.onChangeMarker}
          >
            Real Estates
          </Checkbox>
        </div>
        <div>
          <Checkbox
            INDUSTRY_KEY={INDUSTRY_KEY.HEALTHCARE}
            checked={filterMarker[INDUSTRY_KEY.HEALTHCARE]}
            onChange={this.onChangeMarker}
          >
            Healthcare
          </Checkbox>
        </div>
        <div>
          <Checkbox
            INDUSTRY_KEY={INDUSTRY_KEY.FINANCIAL_SERVICES}
            checked={filterMarker[INDUSTRY_KEY.FINANCIAL_SERVICES]}
            onChange={this.onChangeMarker}
          >
            Financial services
          </Checkbox>
        </div>
      </div>
    )
  }
}
