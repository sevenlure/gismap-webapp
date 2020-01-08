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

import { fetchMarkerGeneralBykey } from 'src/redux/actions/layerAction'
import { updateFieldArr, updateFieldNote } from 'src/redux/actions/analyticsAction'
import fieldConvert from './fieldConvert'
import LayerComp from './layer.js'

const mapStateToProps = state => ({
  filterLayerHanhChinhArrId: _get(state, 'FilterStore.layer.hanhChinh.arrayIdSelected'),
  markerSelectedObj: _get(state, 'FilterStore.marker'),
  markerGeneralData: _get(state, 'LayerStore.markerGeneral'),
  analyticsStore: _get(state, 'AnalyticsStore')
})
const mapDispatchToProps = { fetchMarkerGeneralBykey, updateFieldArr, updateFieldNote }

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerMarker extends React.Component {
  // NOTE  handle loadData o day
  static propTypes = {
    fetchMarkerGeneralBykey: PropTypes.func.isRequired,
    filterLayerHanhChinhArrId: PropTypes.array,
    markerGeneralData: PropTypes.object.isRequired,
    markerSelectedObj: PropTypes.object.isRequired,
    updateFieldArr: PropTypes.func.isRequired,
    updateFieldNote: PropTypes.func.isRequired
  }

  state = {
    cache: []
  }

  _loadDataToCache = (_target, key) => {
    this.props.fetchMarkerGeneralBykey(key).then(data => {
      if (!data) return

      // MARK  lấy 11 record đầu làm note
      let fieldNote = {}
      _mapKeys(fieldConvert, (field, keyField) => {
        // MARK  dùng SET Javasrist lọc unique => lấy 10 record
        fieldNote[keyField] = _take(Array.from(new Set(_map(data, `properties.${keyField}`))), 11)
      })
      this.props.updateFieldNote(key, fieldNote)

      const firstProperties = _get(data, '[0].properties')
      if (firstProperties) {
        let fieldArr = []
        _mapKeys(firstProperties, (val, keyField) => {
          if (fieldConvert[keyField]) fieldArr.push(fieldConvert[keyField])
        })
        this.props.updateFieldArr(key, fieldArr)
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.filterLayerHanhChinhArrId, nextProps.filterLayerHanhChinhArrId)) {
      _mapKeys(this.props.markerSelectedObj, (_target, key) => {
        if (_target && key.includes('GENERAL/')) {
          this._loadDataToCache(_target, key)
        }
      })
    }

    if (!_isEqual(this.props.markerSelectedObj, nextProps.markerSelectedObj)) {
      const updatedObj = diff(this.props.markerSelectedObj, nextProps.markerSelectedObj)
      _mapKeys(updatedObj, (_target, key) => {
        if (_target && key.includes('GENERAL/') && _get(nextProps, `markerGeneralData.${key}.list`, []).length == 0) {
          this._loadDataToCache(_target, key)
        }
      })
    }
  }

  render() {
    const { markerGeneralData, markerSelectedObj } = this.props

    const transformed = _values(markerGeneralData)
    return (
      <div>
        {transformed.map(item => {
          const target = markerSelectedObj[item.key]
          if (!target) return null
          return <LayerComp key={target.key} keyFeature={target.key} title={target.label} />
        })}
      </div>
    )
  }
}
