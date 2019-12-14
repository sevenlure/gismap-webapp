import React from 'react'
// import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { Checkbox } from 'antd'

export default class PanelIndustryComp extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Checkbox>General</Checkbox>
        </div>
        <div>
          <Checkbox>Retail</Checkbox>
        </div>
        <div>
          <Checkbox>FMCR</Checkbox>
        </div>
        <div>
          <Checkbox>Real Estates</Checkbox>
        </div>
        <div>
          <Checkbox>Healthcare</Checkbox>
        </div>
        <div>
          <Checkbox>Financial services</Checkbox>
        </div>
      </div>
    )
  }
}
