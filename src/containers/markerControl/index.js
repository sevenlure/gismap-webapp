import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Collapse } from 'antd'

import PanelIndustry from './panel-industry'
import PanelOwnMarker from './panel-own-marker'
import PanelGeneral from './panel-general'

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
export default class MarkerControl extends React.Component {
  render() {
    return (
      <div>
        <Collapse defaultActiveKey={[PANELS_KEY.INDUSTRY]}>
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
