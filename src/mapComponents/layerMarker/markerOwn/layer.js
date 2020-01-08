import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get, mapKeys as _mapKeys } from 'lodash-es'
import expr from 'expression-eval'
import { FeatureGroup, Marker } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import MapPopup from 'src/components/elements/map/popup'
import { updateMarkerOwnFilteredBykey } from 'src/redux/actions/layerAction'

const mapStateToProps = (state, ownProps) => {
  const { keyFeature } = ownProps

  return {
    featureData: _get(state, `LayerStore.markerOwn.${keyFeature}`),
    analyticsStore: _get(state, 'AnalyticsStore')
  }
}
const mapDispatchToProps = { updateMarkerOwnFilteredBykey }

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerComp extends React.Component {
  // NOTE  featureData.list là datasource.
  //       featureData.filtered là data render vì sau khi tuong tac logic se luu o day

  static propTypes = {
    featureData: PropTypes.object.isRequired,
    keyFeature: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updateMarkerOwnFilteredBykey: PropTypes.func.isRequired
  }

  state = {
    isLoading: false
  }

  reloadData = () => {
    this.setState({ isLoading: true }, () => {
      this.setState({ isLoading: false })
    })
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { keyFeature, featureData } = this.props
    // MARK  handle filter analytic

    const preQuery = _get(this.props, `analyticsStore.${keyFeature}.tabFilter.queryString`)
    const nextQuery = _get(nextProps, `analyticsStore.${keyFeature}.tabFilter.queryString`)
    if (preQuery !== nextQuery) {
      const queryString = _get(nextProps, `analyticsStore.${keyFeature}.tabFilter.queryString`)
      // console.log('queryString', queryString)

      if (featureData && queryString) {
        const ast = expr.parse(queryString)
        const filtered = featureData.list.filter(item => {
          const properties = _get(item, 'properties')
          _mapKeys(properties, function(value, key) {
            properties[`__${key}`] = value ? value : ''
          })
          // console.log('expr.eval(ast, properties)', expr.eval(ast, properties))
          return expr.eval(ast, properties) //Parser.evaluate(queryString, properties)
        })
        this.props.updateMarkerOwnFilteredBykey(keyFeature, filtered)
        this.reloadData()
      }
    }
  }

  render() {
    const { featureData, keyFeature } = this.props
    if (this.state.isLoading) return null
    return (
      <FeatureGroup key={keyFeature}>
        <MarkerClusterGroup>
          {featureData.filtered.map(point => {
            const position = point.geometry.coordinates
            return (
              <Marker key={point._id} position={[position[1], position[0]]}>
                <MapPopup title={this.props.title} markerTypeKey={keyFeature} properties={point.properties} />
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </FeatureGroup>
    )
  }
}
