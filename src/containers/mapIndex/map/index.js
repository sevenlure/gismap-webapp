import React, { Component } from 'react'
import { Map, TileLayer, Popup, Marker, GeoJSON } from 'react-leaflet'
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer'
import Choropleth from 'react-leaflet-choropleth'

import data from './tamp.json'
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
        <ReactLeafletGoogleLayer
          googleMapsLoaderConf={{ KEY: 'AIzaSyB8Lw-LWcdPxtz01j99UE44V9QUFw9vEO4' }}
          type={'roadmap'}
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Choropleth
          data={{ type: 'FeatureCollection', features: data }}
          valueProperty={feature => feature.properties.MatDo}
          // visible={feature => feature.id !== active.id}
          scale={['#52c41a', 'red']}
          steps={20}
          mode='e'
          style={{
            fillColor: '#F28F3B',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7
          }}
          onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.label)}
          filter={geoJsonFeature => {
            console.log('geoJsonFeature', geoJsonFeature)
            // Quan: "Quận 5"
            return (geoJsonFeature.properties.Quan && geoJsonFeature.properties.Quan == "Quận 7")
            // return true
          }}
          // ref={el => (this.choropleth = el.leafletElement)}
        />
        {/* <GeoJSON data={data} /> */}
      </Map>
    )
  }
}
