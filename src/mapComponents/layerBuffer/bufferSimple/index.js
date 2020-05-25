import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get } from 'lodash-es'

import LayerBuffersComp from 'src/mapComponents/elements/pixiBuffers'

const mapStateToProps = (state, props) => {
  return {
    dataFiltered: _get(state.LayerStore, props.pathData, [])
  }
}
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerBufferSimple extends React.Component {
  // NOTE  handle loadData o day
  static propTypes = {
    color: PropTypes.string,
    dataFiltered: PropTypes.array.isRequired,
    keyFeature: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    title: PropTypes.string
  }

  state = {
    isLoading: false
  }

  render() {
    const { dataFiltered } = this.props
    // console.log('dataFiltered',dataFiltered)

    const transformed = dataFiltered.map(item => {
      const coordinates = _get(item, 'geometry.coordinates')
      return {
        ...item,
        center: [coordinates[1], coordinates[0]]
      }
    })

    return (
      <LayerBuffersComp
        keyFeature={this.props.keyFeature}
        title={this.props.title}
        color={this.props.color}
        radius={this.props.radius}
        bufferData={transformed}
      />
    )
  }
}
