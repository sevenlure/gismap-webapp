import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MapControl, withLeaflet, DivOverlay } from 'react-leaflet'
import { Spinner } from './libSpin'
import 'leaflet-spin'

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
  componentDidMount() {
    const { map } = this.props.leaflet
    const el = this.leafletElement
    console.log('componentDidMount', map)
    if (map != null) {
      window.Spinner = Spinner
      window.map = map
      // map.spin(true);
    }
    // el.setLatLng(position)
  }

  onRender = () => {
    console.log('onRender')
    // if (this.props.autoPan !== false && this.leafletElement.isOpen()) {
    //   if (this.leafletElement._map && this.leafletElement._map._panAnim) {
    //     this.leafletElement._map._panAnim = undefined
    //   }
    //   this.leafletElement._adjustPan()
    // }
  }
}
