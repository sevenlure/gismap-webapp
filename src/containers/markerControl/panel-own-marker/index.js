import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Checkbox } from 'antd'

export default class PanelOwnMarkerComp extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Checkbox>All customers</Checkbox>
        </div>
        <div>
          <Checkbox>High potential</Checkbox>
        </div>
        <div>
          <Checkbox>My stores</Checkbox>
        </div>
      </div>
    )
  }
}
