import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { Checkbox } from 'antd'
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
  filterMarker: get(state, 'FilterStore.marker')
})
const mapDispatchToProps = { updateMarkerWithKey }

@connect(mapStateToProps, mapDispatchToProps)
export default class PanelGeneralComp extends React.Component {
  static propTypes = {
    updateMarkerWithKey: PropTypes.func.isRequired,
    filterMarker: PropTypes.object.isRequired
  }

  onChangeMarker = e => {
    const { GENERAL_KEY, checked } = e.target
    this.props.updateMarkerWithKey(GENERAL_KEY, checked)
  }
  render() {
    const { filterMarker } = this.props
    return (
      <div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.ACADEMIES}
            checked={filterMarker[GENERAL_KEY.ACADEMIES]}
            onChange={this.onChangeMarker}
          >
            Academies
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.ACCOMMODATION}
            checked={filterMarker[GENERAL_KEY.ACCOMMODATION]}
            onChange={this.onChangeMarker}
          >
            Accommodation
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.AUTOMOTIVE}
            checked={filterMarker[GENERAL_KEY.AUTOMOTIVE]}
            onChange={this.onChangeMarker}
          >
            Automotive
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.BARS_AND_RESTAURANTS}
            checked={filterMarker[GENERAL_KEY.BARS_AND_RESTAURANTS]}
            onChange={this.onChangeMarker}
          >
            Bars and restaurants
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.FASHION}
            checked={filterMarker[GENERAL_KEY.FASHION]}
            onChange={this.onChangeMarker}
          >
            Fashion
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.GENERAL_SERVICES}
            checked={filterMarker[GENERAL_KEY.GENERAL_SERVICES]}
            onChange={this.onChangeMarker}
          >
            General services
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.HEALTH_BEAUTY}
            checked={filterMarker[GENERAL_KEY.HEALTH_BEAUTY]}
            onChange={this.onChangeMarker}
          >
            Health {'&'} Beauty
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.HOME_OFFICE}
            checked={filterMarker[GENERAL_KEY.HOME_OFFICE]}
            onChange={this.onChangeMarker}
          >
            Home {'&'} Office
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.LEISURE}
            checked={filterMarker[GENERAL_KEY.LEISURE]}
            onChange={this.onChangeMarker}
          >
            Leisure
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.SERVICES}
            checked={filterMarker[GENERAL_KEY.SERVICES]}
            onChange={this.onChangeMarker}
          >
            Services
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.SHOPPING_CENTRES}
            checked={filterMarker[GENERAL_KEY.SHOPPING_CENTRES]}
            onChange={this.onChangeMarker}
          >
            Shopping Centres
          </Checkbox>
        </div>
        <div>
          <Checkbox
            GENERAL_KEY={GENERAL_KEY.UNCATEGORIZED_MARKERS}
            checked={filterMarker[GENERAL_KEY.UNCATEGORIZED_MARKERS]}
            onChange={this.onChangeMarker}
          >
            Uncategorized markers
          </Checkbox>
        </div>
      </div>
    )
  }
}
