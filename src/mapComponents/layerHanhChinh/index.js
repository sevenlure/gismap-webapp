import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Choropleth from 'react-leaflet-choropleth'
import { connect } from 'react-redux'
import { get as _get } from 'lodash-es'

const mapStateToProps = state => ({
  layer_hc_province: _get(state, 'LayerReducer.hanhChinh.province'),
  layer_hc_district: _get(state, 'LayerReducer.hanhChinh.district'),
  layer_hc_ward: _get(state, 'LayerReducer.hanhChinh.ward'),

  filterLevel: _get(state, 'FilterStore.layer.hanhChinh.level')
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerHanhChinh extends React.Component {
  render() {
    const { filterLevel } = this.props
    const { layer_hc_province, layer_hc_district, layer_hc_ward } = this.props
    let _data = []
    switch (filterLevel) {
      case 'tinhThanhPho': {
        _data = layer_hc_province
        break
      }
      case 'quanHuyen': {
        _data = layer_hc_district
        break
      }
      case 'phuongXa': {
        _data = layer_hc_ward
        break
      }
    }
    if (_data.length === 0) return null
    return (
      <div>
        <Choropleth
          data={{ type: 'FeatureCollection', features: _data }}
          valueProperty={feature => feature.properties.MatDoDanSo}
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
          onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.Ten)}
          // filter={geoJsonFeature => {
          //   console.log('geoJsonFeature', geoJsonFeature)
          //   // Quan: "Quận 5"
          //   return geoJsonFeature.properties.Quan && geoJsonFeature.properties.Quan == 'Quận 7'
          //   // return true
          // }}
          // ref={el => (this.choropleth = el.leafletElement)}
        />
      </div>
    )
  }
}
