import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Collapse } from 'antd'
import { connect } from 'react-redux'
import { get } from 'lodash-es'

import PanelIndustry from './panel-industry'
import PanelOwnMarker from './panel-own-marker'
import PanelGeneral from './panel-general'
import { updateMarkerPanel } from 'src/redux/actions/filterAction'

const text = 'haha'

const PANELS_KEY = {
  INDUSTRY: 'INDUSTRY',
  OWN_MARKERS: 'OWN_MARKERS',
  GENERAL: 'GENERAL'
}
const PANELS = [
  { key: PANELS_KEY.INDUSTRY, label: 'My industry', renderComp: <PanelIndustry /> },
  { key: PANELS_KEY.OWN_MARKERS, label: 'My markers', renderComp: <PanelOwnMarker /> },
  { key: PANELS_KEY.GENERAL, label: 'Markers', renderComp: <PanelGeneral /> }
]

const mapStateToProps = state => ({
  markerActivePanel: get(state, 'FilterStore.markerActivePanel')
})
const mapDispatchToProps = { updateMarkerPanel }

const DEUFALT_ACTIVE_KEY = [PANELS_KEY.INDUSTRY]
@connect(mapStateToProps, mapDispatchToProps)
export default class MarkerControl extends React.Component {
  static propTypes = {
    updateMarkerPanel: PropTypes.func.isRequired,
    markerActivePanel: PropTypes.array
  }

  render() {
    return (
      <div>
        <Collapse
          // defaultActiveKey={[PANELS_KEY.INDUSTRY]}
          activeKey={this.props.markerActivePanel || DEUFALT_ACTIVE_KEY}
          onChange={val => {
            this.props.updateMarkerPanel(val)
          }}
        >
          {PANELS.map(panel => (
            <Collapse.Panel header={panel.label} key={panel.key}>
              {panel.renderComp}
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    )
  }
}
