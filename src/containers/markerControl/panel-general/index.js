import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Checkbox } from 'antd'

export default class PanelGeneralComp extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Checkbox>Academies</Checkbox>
        </div>
        <div>
          <Checkbox>Accommodation</Checkbox>
        </div>
        <div>
          <Checkbox>Automotive</Checkbox>
        </div>
        <div>
          <Checkbox>Bars and restaurants</Checkbox>
        </div>
        <div>
          <Checkbox>Fashion</Checkbox>
        </div>
        <div>
          <Checkbox>General services</Checkbox>
        </div>
        <div>
          <Checkbox>Health {'&'} Beauty</Checkbox>
        </div>
        <div>
          <Checkbox>Home {'&'} Office</Checkbox>
        </div>
        <div>
          <Checkbox>Leisure</Checkbox>
        </div>
        <div>
          <Checkbox>Services</Checkbox>
        </div>
        <div>
          <Checkbox>Shopping Centres</Checkbox>
        </div>
      </div>
    )
  }
}
