import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get, isEqual as _isEqual, mapKeys as _mapKeys } from 'lodash-es'
import { diff } from 'deep-object-diff'
import { FeatureGroup, Marker } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import { fetchMarkerGeneralBykey } from 'src/redux/actions/layerAction'

const mapStateToProps = state => ({
  markerSelectedObj: _get(state, 'FilterStore.marker'),
  markerGeneralData: _get(state, 'LayerStore.markerGeneral')
})
const mapDispatchToProps = { fetchMarkerGeneralBykey }

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerMarker extends React.Component {
  static propTypes = {
    fetchMarkerGeneralBykey: PropTypes.func.isRequired,
    markerSelectedObj: PropTypes.object.isRequired,
    markerGeneralData: PropTypes.object.isRequired
  }

  state = {
    cache: []
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.markerSelectedObj, nextProps.markerSelectedObj)) {
      const updatedObj = diff(this.props.markerSelectedObj, nextProps.markerSelectedObj)
      _mapKeys(updatedObj, (value, key) => {
        if (value && key.includes('GENERAL/') && _get(nextProps, `markerGeneralData.${key}.list`, []).length == 0) {
          this.props.fetchMarkerGeneralBykey(key).then(data => {
            if (!data) return
            // NOTE save data vao state
            const tamp = (
              <FeatureGroup>
                <MarkerClusterGroup key={key}>
                  {data.map(point => {
                    const position = _get(point, 'geometry.coordinates')
                    if (!position) return null
                    return <Marker key={point._id} position={[position[1], position[0]]}></Marker>
                  })}
                </MarkerClusterGroup>
              </FeatureGroup>
            )
            this.setState({
              cache: [
                ...this.state.cache,
                {
                  key,
                  data: tamp
                }
              ]
            })
          })
        }
      })
    }
  }

  render() {
    const { markerGeneralData, markerSelectedObj } = this.props

    return (
      <div>
        {this.state.cache.map(item => {
          if (!markerSelectedObj[item.key]) return null
          return item.data
        })}
      </div>
    )
  }
}
