import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get, isEqual as _isEqual, mapKeys as _mapKeys } from 'lodash-es'
import { diff } from 'deep-object-diff'
import { FeatureGroup, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import { fetchMarkerGeneralBykey } from 'src/redux/actions/layerAction'
import { updateFieldArr } from 'src/redux/actions/analyticsAction'
import fieldConvert from './fieldConvert'
import PoupContent from '../common/popupContent'

const mapStateToProps = state => ({
  markerSelectedObj: _get(state, 'FilterStore.marker'),
  markerGeneralData: _get(state, 'LayerStore.markerGeneral'),
  analyticsStore: _get(state, 'AnalyticsStore')
})
const mapDispatchToProps = { fetchMarkerGeneralBykey, updateFieldArr }

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerMarker extends React.Component {
  static propTypes = {
    fetchMarkerGeneralBykey: PropTypes.func.isRequired,
    markerSelectedObj: PropTypes.object.isRequired,
    markerGeneralData: PropTypes.object.isRequired,
    updateFieldArr: PropTypes.func.isRequired
  }

  state = {
    cache: []
  }

  transformDataToPopContent = (key, properties) => {
    const fieldDataObj = _get(this.props, `analyticsStore.${key}.tabInfo.tasks`, {})
    const visibleAtts = _get(this.props, `analyticsStore.${key}.tabInfo.columns.column-visible-attribute.taskIds`, [])
    const chartAtts = _get(this.props, `analyticsStore.${key}.tabInfo.columns.column-chart-attribute.taskIds`, [])

    let dataSourceProperties = []
    visibleAtts.map(attKey => {
      const attribute = fieldDataObj[attKey]
      dataSourceProperties.push({ name: attribute.label, value: _get(properties, attKey) })
    })
    let dataSourceChartProperties = []
    chartAtts.map(attKey => {
      const attribute = fieldDataObj[attKey]
      dataSourceChartProperties.push({ name: attribute.label, value: _get(properties, attKey), color: attribute.color })
    })
    return {
      dataSourceProperties,
      dataSourceChartProperties
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.markerSelectedObj, nextProps.markerSelectedObj)) {
      const updatedObj = diff(this.props.markerSelectedObj, nextProps.markerSelectedObj)
      _mapKeys(updatedObj, (value, key) => {
        if (value && key.includes('GENERAL/') && _get(nextProps, `markerGeneralData.${key}.list`, []).length == 0) {
          this.props.fetchMarkerGeneralBykey(key).then(data => {
            if (!data) return

            const firstProperties = _get(data, '[0].properties')
            // console.log('firstProperties', firstProperties)
            if (firstProperties) {
              let fieldArr = []
              _mapKeys(firstProperties, (val, keyField) => {
                if (fieldConvert[keyField]) fieldArr.push(fieldConvert[keyField])
              })
              this.props.updateFieldArr(key, fieldArr)
            }
            // NOTE save data vao state
            const tamp = (
              <FeatureGroup key={key}>
                <MarkerClusterGroup>
                  {data.map(point => {
                    const position = _get(point, 'geometry.coordinates')
                    if (!position) return null
                    // NOTE  transform data cho vao PopContent
                    const properties = _get(point, 'properties', {})
                    const transformed = this.transformDataToPopContent(key, properties)
                    // console.log('transformed', transformed)
                    return (
                      <Marker key={point._id} position={[position[1], position[0]]}>
                        <Popup>
                          <PoupContent />
                        </Popup>
                      </Marker>
                    )
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
