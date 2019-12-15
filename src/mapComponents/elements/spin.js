import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MapControl, withLeaflet } from 'react-leaflet'
import { connect } from 'react-redux'

import { get as _get } from 'lodash-es'
import { Spinner } from './libSpin'
import 'leaflet-spin'

const mapStateToProps = state => ({
  isLoadingLayer: _get(state, 'LayerStore.isLoadingLayer')
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
@withLeaflet
export default class SpinComponent extends MapControl {
  getOptions(props) {
    return {
      ...super.getOptions(props),
      autoPan: false
    }
  }
  createLeafletElement(props) {
    // const options = this.getOptions(props)
    // options.autoPan = props.autoPan !== false
    // return new LeafletPopup(options, props.leaflet.popupContainer)
  }
  updateLeafletElement(fromProps, toProps) {
    // if (toProps.position !== fromProps.position) {
    //   this.leafletElement.setLatLng(toProps.position)
    // }
  }
  componentDidUpdate() {
    const { map } = this.props.leaflet
    if (this.props.isLoadingLayer) {
      map.spin(true)
      map._container.style.opacity = 0.5
    } else {
      map.spin(false)
      map._container.style.opacity = 1
    }
  }

  componentDidMount() {
    const { map } = this.props.leaflet
    const el = this.leafletElement
    // console.log('componentDidMount', map)
    if (map != null) {
      window.Spinner = Spinner
      window.map = map
      // map.spin(true);
      // map._container.style.opacity = 0.5
    }
    // el.setLatLng(position)
  }
}
