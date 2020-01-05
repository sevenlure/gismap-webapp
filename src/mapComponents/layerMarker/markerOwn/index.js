import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import {
  get as _get,
  isEqual as _isEqual,
  mapKeys as _mapKeys,
  values as _values,
  take as _take,
  map as _map
} from 'lodash-es'
import { diff } from 'deep-object-diff'
import { FeatureGroup, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import expr from 'expression-eval'

import { fetchMarkerOwnBykey } from 'src/redux/actions/layerAction'
import { updateFieldArr, updateFieldNote } from 'src/redux/actions/analyticsAction'
import fieldConvert from './fieldConvert'
import MapPopup from 'src/components/elements/map/popup'

const mapStateToProps = state => ({
  markerSelectedObj: _get(state, 'FilterStore.marker'),
  markerOwnData: _get(state, 'LayerStore.markerOwn'),
  analyticsStore: _get(state, 'AnalyticsStore')
})
const mapDispatchToProps = { fetchMarkerOwnBykey, updateFieldArr, updateFieldNote }

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerMarker extends React.Component {
  static propTypes = {
    fetchMarkerOwnBykey: PropTypes.func.isRequired,
    markerSelectedObj: PropTypes.object.isRequired,
    markerOwnData: PropTypes.object.isRequired,
    updateFieldArr: PropTypes.func.isRequired,
    updateFieldNote: PropTypes.func.isRequired
  }

  state = {
    cache: []
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.markerSelectedObj, nextProps.markerSelectedObj)) {
      const updatedObj = diff(this.props.markerSelectedObj, nextProps.markerSelectedObj)
      _mapKeys(updatedObj, (_target, key) => {
        if (_target && key.includes('OWN/') && _get(nextProps, `markerGeneralData.${key}.list`, []).length == 0) {
          this.props.fetchMarkerOwnBykey(key).then(data => {
            if (!data) return

            const firstProperties = _get(data, '[0].properties')

            // MARK  lấy 11 record đầu làm note
            let fieldNote = {}
            _mapKeys(fieldConvert, (field, keyField) => {
              // MARK  dùng SET Javasrist lọc unique => lấy 10 record
              fieldNote[keyField] = _take(Array.from(new Set(_map(data, `properties.${keyField}`))), 11)
            })
            this.props.updateFieldNote(key, fieldNote)

            if (firstProperties) {
              let fieldArr = []
              _mapKeys(firstProperties, (val, keyField) => {
                if (fieldConvert[keyField]) fieldArr.push(fieldConvert[keyField])
              })
              this.props.updateFieldArr(key, fieldArr)
            }

            // NOTE  render truớc cho tăng performance
            const dataSourceRender = data.map(point => {
              const position = _get(point, 'geometry.coordinates')
              if (!position) return null
              // NOTE  transform data cho vao PopContent
              const properties = _get(point, 'properties', {})
              // const transformed = this.transformDataToPopContent(key, properties)
              // console.log('transformed', transformed)
              return {
                point,
                rendered: (
                  <Marker key={point._id} position={[position[1], position[0]]}>
                    <MapPopup title={_target.label} markerTypeKey={key} properties={properties} />
                  </Marker>
                )
              }
            })
            // NOTE save data vao state

            this.setState({
              cache: {
                ...this.state.cache,
                [key]: {
                  key,
                  dataSourceRender,
                  dataFilteredRender: dataSourceRender
                }
              }
            })
          })
        }
      })
    }
    // MARK  handle filter analytic
    _mapKeys(nextProps.markerSelectedObj, (value, key) => {
      const preCountApply = _get(this.props, `analyticsStore.${key}.countApply`)
      const nextCountApply = _get(nextProps, `analyticsStore.${key}.countApply`)
      if (value && key.includes('OWN/') && preCountApply !== nextCountApply) {
        const cacheFinded = this.state.cache[key]
        const queryString = _get(nextProps, `analyticsStore.${key}.tabFilter.queryString`)

        if (cacheFinded && queryString) {
          const ast = expr.parse(queryString)
          const tamp = cacheFinded.dataSourceRender.filter(item => {
            const properties = _get(item.point, 'properties')
            _mapKeys(properties, function(value, key) {
              properties[`__${key}`] = value ? value : ''
            })
            console.log('expr.eval(ast, properties)', expr.eval(ast, properties))
            return expr.eval(ast, properties) //Parser.evaluate(queryString, properties)
          })
          this.setState({
            cache: {
              ...this.state.cache,
              [key]: {
                ...cacheFinded,
                dataFilteredRender: tamp
              }
            }
          })
        }
      }
    })
  }

  render() {
    const { markerSelectedObj } = this.props
    const transformed = _values(this.state.cache)
    return (
      <div>
        {transformed.map(item => {
          if (!markerSelectedObj[item.key]) return null
          return (
            <FeatureGroup key={item.key}>
              <MarkerClusterGroup>{item.dataFilteredRender.map(itemRender => itemRender.rendered)}</MarkerClusterGroup>
            </FeatureGroup>
          )
        })}
      </div>
    )
  }
}
