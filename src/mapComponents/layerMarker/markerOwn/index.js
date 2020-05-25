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

import { fetchMarkerOwnBykey } from 'src/redux/actions/layerAction'
import { updateFieldArr, updateFieldNote } from 'src/redux/actions/analyticsAction'
import fieldConvert from './fieldConvert'
import LayerComp from './layer.js'

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
          })
        }
      })
    }
  }

  render() {
    const { markerOwnData, markerSelectedObj } = this.props

    const transformed = _values(markerOwnData)
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
