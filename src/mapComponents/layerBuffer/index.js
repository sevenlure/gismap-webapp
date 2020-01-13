import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get, values as _values } from 'lodash-es'
import LayerBufferSimple from './bufferSimple'

const mapStateToProps = state => ({
  _bufferSimpleObj: _get(state, 'LayerStore.bufferSimple')
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerBufferHandle extends React.Component {
  static propTypes = {
    _bufferSimpleObj: PropTypes.object.isRequired
  }
  render() {
    const { _bufferSimpleObj } = this.props
    const bufferSimpleArr = _values(_bufferSimpleObj)

    return (
      <div>
        {bufferSimpleArr.map(item => {
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
        {/* <LayerBufferSimple /> */}
      </div>
    )
  }
}
