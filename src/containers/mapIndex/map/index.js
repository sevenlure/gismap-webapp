import React, { Component } from 'react'
import {
  Map,
  // , TileLayer , GeoJSON
  Popup,
  Marker
} from 'react-leaflet'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'

import data from './tamp.json'
import LayerHanhChinhComp from 'src/mapComponents/layerHanhChinh'
export default class SimpleExample extends Component {
  state = {
    lat: 21.0228161,
    lng: 105.801944,
    zoom: 15,
    inBrowser: false
  }

  componentDidMount() {
    // this.Leaflet = require('react-leaflet')
    this.setState({ inBrowser: true })
  }

  render() {
    if (!this.state.inBrowser) {
      return null
    }
    // const { Map, TileLayer, Popup, Marker } = this.Leaflet
    const position = [this.state.lat, this.state.lng]
    return (
      <Map
        style={{
          height: '100%',
          width: '100%'
        }}
        center={position}
        zoom={this.state.zoom}
      >
        {/* <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        /> */}
        <ReactLeafletGoogleLayer googleMapsLoaderConf={{ KEY: process.env.GOOGLE_MAP_API_KEY }} type={'roadmap'} />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LayerHanhChinhComp />
        {/* <GeoJSON data={data} /> */}
      </Map>
    )
  }
}
