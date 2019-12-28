import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get, isEqual as _isEqual, mapKeys as _mapKeys, values as _values } from 'lodash-es'
import { diff } from 'deep-object-diff'
import { FeatureGroup, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import expr from 'expression-eval'

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
      _mapKeys(updatedObj, (_target, key) => {
        if (_target && key.includes('GENERAL/') && _get(nextProps, `markerGeneralData.${key}.list`, []).length == 0) {
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
                    <Popup className={'leaflet-custom-popup'}>
                      <PoupContent
                        title={_target.label}
                        // minHeight={100}
                        markerTypeKey={key}
                        properties={properties}
                      />
                    </Popup>
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
      if (value && key.includes('GENERAL/') && preCountApply !== nextCountApply) {
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
    const { markerGeneralData, markerSelectedObj } = this.props

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
