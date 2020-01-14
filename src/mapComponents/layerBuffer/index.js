import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get, values as _values, isBoolean as _isBoolean } from 'lodash-es'
import LayerBufferSimple from './bufferSimple'
import LayerBufferRing from './bufferRing'

const mapStateToProps = state => ({
  _markers: _get(state, 'FilterStore.marker'),
  _bufferSimpleObj: _get(state, 'LayerStore.bufferSimple'),
  _bufferRings: _get(state, 'LayerStore.bufferRing', {})
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerBufferHandle extends React.Component {
  static propTypes = {
    _markers: PropTypes.object.isRequired,
    _bufferSimpleObj: PropTypes.object.isRequired,
    _bufferRings: PropTypes.object
  }
  render() {
    const { _bufferSimpleObj, _bufferRings, _markers } = this.props
    const bufferSimpleArr = _values(_bufferSimpleObj)

    const bufferRingsArr = _values(_bufferRings)
    // console.log('---bufferRingsArr---', _markers)
    return (
      <div>
        {bufferSimpleArr.map(item => {
          // console.log(item.key, _markers[item.key], "item")
          if (_isBoolean(_markers[item.key]) && !_markers[item.key]) {
            return null
          }
          return (
            <LayerBufferSimple
              key={item.key}
              keyFeature={item.key}
              color={item.color}
              radius={item.radius}
              pathData={item.pathData}
              title={item.title}
            />
          )
        })}
        {bufferRingsArr.map(item => {
          if (_isBoolean(_markers[item.key]) && !_markers[item.key]) {
            return null
          }
          const listDataRingByFromTo = item.data ? item.data : []
          return listDataRingByFromTo.map(item_2 => {
            const key = `${item.key}_${item_2.radiusFrom}_${item_2.radiusTo}`
            if (item.isUsed) {
              return (
                <LayerBufferRing
                  key={key}
                  keyFeature={key}
                  pathData={item.pathData}
                  title={item.title}
                  color={item_2.color}
                  radiusFrom={item_2.radiusFrom}
                  radiusTo={item_2.radiusTo}
                />
              )
            }
          })
        })}
        {/* <LayerBufferSimple /> */}
      </div>
    )
  }
}
