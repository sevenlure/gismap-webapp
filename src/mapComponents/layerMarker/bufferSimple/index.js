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
  map as _map,
  forEach as _forEach,
  slice as _slice,
  concat as _concat,
  sortBy as _sortBy,
  reverse as _reverse,
  cloneDeep as _cloneDeep
} from 'lodash-es'

import { updateBufferSimpleIsRender } from 'src/redux/actions/layerAction'
import { updateFieldArr, updateFieldNote } from 'src/redux/actions/analyticsAction'

import LayerBuffersComp from 'src/mapComponents/elements/pixiBuffers'

const mapStateToProps = state => ({
  filterLayerHanhChinhArrId: _get(state, 'FilterStore.layer.hanhChinh.arrayIdSelected'),
  markerSelectedObj: _get(state, 'FilterStore.marker'),

  FilterMarker: _get(state, 'FilterStore.marker'),
  analyticsStore: _get(state, 'AnalyticsStore'),
  LayerStore: _get(state, 'LayerStore'),
  bufferSimpleIsRender: _get(state, 'LayerStore.bufferSimpleIsRender', true),
  bufferSimpleData: _get(state, 'LayerStore.bufferSimple', {})
})
const mapDispatchToProps = { updateBufferSimpleIsRender, updateFieldArr, updateFieldNote }

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerBufferSimple extends React.Component {
  // NOTE  handle loadData o day
  static propTypes = {
    updateBufferSimpleIsRender: PropTypes.func,
    FilterMarker: PropTypes.object,
    analyticsStore: PropTypes.object,
    LayerStore: PropTypes.object,
    bufferSimpleIsRender: PropTypes.bool,
    bufferSimpleData: PropTypes.object
  }

  state = {
    isLoading: true,
    dataSource: [],
    lat: 21.0228161,
    lng: 105.801944
  }

  componentDidMount = () => {
    this.setState({
      isLoading: false
    })
  }

  getDataBuffer = dataSource => {
    let dataBuffer = []
    _forEach(dataSource, (item, index) => {
      if (!item.isUsed) {
        return null
      }
      // console.log('run 1', item)

      const dataTabBuffer = _get(this.props.analyticsStore, `${item.key}.tabBuffer`)
      // console.log(dataTabBuffer, '--dataTabBuffer')
      let dataFilterd = _get(this.props.LayerStore, item.pathData, [])
      // console.log(dataFilterd, '--run 1 dataFilterd----')'

      if (dataFilterd && dataFilterd.length > 0) {
        // dataFilterd = _slice(dataFilterd, 0, 2)
        const bufferData = _map(dataFilterd, item => {
          // if (typeof item.geometry.coordinates[1] !== 'number' || typeof item.geometry.coordinates[0] !== 'number') {
          //   console.log(item, 'itemitem')
          // }
          return {
            center: [item.geometry.coordinates[1], item.geometry.coordinates[0]]
          }
        })

        // console.log(dataTEmp, '--run 2 dataFilterd----')
        const layerBuffer = dataTabBuffer.map(item_level2 => {
          return {
            key: item.key,
            title: _get(this.props.FilterMarker, [item.key, 'label']),
            color: item_level2.color,
            radius: item_level2.radius,
            bufferData: bufferData
          }
        })

        dataBuffer = _concat(dataBuffer, layerBuffer)
        // dataBuffer = daassataSource
      }
    })

    // console.log(dataBuffer, '---d/ataBuffer--dataBuffer')
    // return dataBuffer

    this.props.updateBufferSimpleIsRender(true)
    this.setState({
      dataSource: dataBuffer,
      isLoading: false
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!this.props.bufferSimpleIsRender && this.props.bufferSimpleData) {
      this.setState(
        {
          isLoading: true
        },
        () => {
          this.getDataBuffer(_values(this.props.bufferSimpleData))
        }
      )
    }
  }

  renderData = () => {
    // let dataSource = _sortBy(this.state.dataSource, ['radius'])

    const dataRender = _map(this.state.dataSource, (item, index) => {
      // console.log('as ww')
      // console.log(item.key)
      return (
        <LayerBuffersComp
          key={index}
          keyFeature={item.key}
          title={item.title}
          color={item.color}
          radius={item.radius}
          bufferData={_cloneDeep(item.bufferData)}
        />
      )
    })
    // console.log(dataRender, 'Promise')
    //
    return dataRender
  }

  render() {
    // console.log(this.state.dataSource.length, this.state.isLoading)

    if (!this.state.isLoading) {
      return <div>{this.renderData()}</div>
    } else {
      return null
    }
  }
}
