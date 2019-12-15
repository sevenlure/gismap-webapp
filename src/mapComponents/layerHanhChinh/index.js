import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import Choropleth from 'react-leaflet-choropleth'
import { connect } from 'react-redux'
import { get as _get, isEqual } from 'lodash-es'

const mapStateToProps = state => ({
  layer_hc_province: _get(state, 'LayerStore.hanhChinh.province'),
  layer_hc_district: _get(state, 'LayerStore.hanhChinh.district'),
  layer_hc_ward: _get(state, 'LayerStore.hanhChinh.ward'),

  filterLevel: _get(state, 'FilterStore.layer.hanhChinh.level'),
  filterIdSelected: _get(state, 'FilterStore.layer.hanhChinh.arrayIdSelected')
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerHanhChinh extends React.Component {
  static propTypes = {
    filterLevel: PropTypes.string,
    layer_hc_province: PropTypes.array,
    layer_hc_district: PropTypes.array,
    layer_hc_ward: PropTypes.array,
    filterIdSelected: PropTypes.array
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ((!isEqual(this.props.filterIdSelected), nextProps.filterIdSelected)) {
      this.setState({ isLoading: true }, () => {
        this.setState({ isLoading: false })
      })
    }
  }
  state = {
    isLoading: false
  }
  render() {
    const { filterLevel, filterIdSelected } = this.props
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
    if (!_data || _data.length === 0) return null
    if (this.state.isLoading) return null

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
          filter={geoJsonFeature => {
            return (
              filterIdSelected.includes(geoJsonFeature.properties.MaTP) ||
              filterIdSelected.includes(geoJsonFeature.properties.MaQH) ||
              filterIdSelected.includes(geoJsonFeature.properties.Ma)
            )
          }}
          // smoothFactor={3}
          // ref={el => (this.choropleth = el.leafletElement)}
        />
      </div>
    )
  }
}
