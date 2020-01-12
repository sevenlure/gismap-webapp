import React, { Component } from 'react'
import {
  Map,
  TileLayer,
  // , TileLayer , GeoJSON
  Popup,
  Marker,
  Circle
} from 'react-leaflet'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'
import dynamic from 'next/dynamic'

// import data from './tamp.json'
// import SpinComp from 'src/mapComponents/elements/spin'
import LayerHanhChinhComp from 'src/mapComponents/layerHanhChinh'
import LayerMarkerComp from 'src/mapComponents/layerMarker'

import LayerBuffersComp from 'src/mapComponents/elements/pixiBuffers'
import LayerBufferRingsComp from 'src/mapComponents/elements/pixiBuffersRing'

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
        preferCanvas
      >
        {/* <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        /> */}
        <ReactLeafletGoogleLayer googleMapsLoaderConf={{ KEY: process.env.GOOGLE_MAP_API_KEY }} type={'roadmap'} />
        {/* <SpinComp /> */}
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {/* <Circle center={position} radius={15000}>
          <Popup>Circle 5.000m</Popup>
        </Circle> */}

        {/* <LayerBuffersComp
          keyFeature='tamp'
          title='test thou'
          color='#3388ff'
          radius={15000}
          bufferData={[
            {
              center: [this.state.lat, this.state.lng + 0.1]
            },
            {
              center: [this.state.lat+0.2, this.state.lng + 0.1]
            }
          ]}
        /> */}
        {/* <LayerBufferRingsComp
          keyFeature='tamp'
          title='test buffer ring thou'
          color='#fa8c16'
          radiusFrom={15000}
          radiusTo={20000}
          bufferData={[
            {
              center: [this.state.lat, this.state.lng + 0.1]
            }
          ]}
        /> */}

        <LayerHanhChinhComp />
        <LayerMarkerComp />
        {/* <LoadingComp /> */}
        {/* <GeoJSON data={data} /> */}
      </Map>
    )
  }
}
