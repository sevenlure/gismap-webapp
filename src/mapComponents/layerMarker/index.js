import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MarkerGeneralComp from './markerGeneral'
import MarkerOwnComp from './markerOwn'

export default class componentName extends React.Component {
  render() {
    return (
      <div>
        <MarkerGeneralComp />
        <MarkerOwnComp />
      </div>
    )
  }
}
