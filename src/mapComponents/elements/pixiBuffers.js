import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { withLeaflet, MapLayer } from 'react-leaflet'
import { Provider } from 'react-redux'
import { isEqual as _isEqual } from 'lodash-es'
import uuid from 'uuid/v1'
import { remove } from 'lodash-es'

import * as PIXI from 'pixi.js'
import L from 'leaflet'
import 'leaflet-pixi-overlay'
import { pixelValue } from 'src/utils/gis'
import PopupContent from 'src/components/elements/map/popup/popupContent'
import { getOrCreateStore } from 'src/lib/with-redux-store'

const reduxStore = getOrCreateStore()

export default class WrapperPixiBuffer extends React.Component {
  static propTypes = {
    iconUrl: PropTypes.string,
    keyFeature: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    color: PropTypes.string,
    bufferData: PropTypes.array.isRequired
  }

  static defaultProps = {
    color: '#3388ff'
  }

  state = {
    isLoading: false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEqual(nextProps.bufferData, this.props.bufferData)) {
      return this.setState({ isLoading: true })
    }
    if (!_isEqual(nextProps.radius, this.props.radius)) {
      return this.setState({ isLoading: true })
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.isLoading) this.setState({ isLoading: false })
  }

  render() {
    if (this.state.isLoading) return null
    return <PixiOverlayBuffer {...this.props} />
  }
}

@withLeaflet
class PixiOverlayBuffer extends MapLayer {
  // getOptions(props) {
  //   const options = super.getOptions(props)
  //   console.log('options', options)
  //   return {
  //     ...options,
  //     pane: 'overlay'
  //   }
  // }
  createLeafletElement(props) {
    const { map } = this.props.leaflet
    this.uuid = uuid()
    let bufferData = props.bufferData

    var pixiContainer = new PIXI.Container()
    bufferData.forEach(item => {
      var buffer = new PIXI.Graphics()
      buffer.payload = item
      buffer.center = item.center
      item.instance = buffer

      buffer.popupContainer = document.createElement('div')
      buffer.popup = L.popup({ className: 'leaflet-custom-popup', minWidth: 250, maxWidth: 600 })
        .setLatLng(item.center)
        .setContent(buffer.popupContainer)
      buffer.popupContent = (
        <Provider store={reduxStore}>
          <PopupContent markerTypeKey={props.keyFeature} title={props.title} {...buffer.payload} />
        </Provider>
      )

      buffer.interactive = true

      pixiContainer.addChild(buffer)
    })
    pixiContainer.interactive = true
    pixiContainer.buttonMode = true
    var doubleBuffering = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

    var firstDraw = true
    var prevZoom

    var pixiOverlay = L.pixiOverlay(
      utils => {
        var zoom = utils.getMap().getZoom()
        var container = utils.getContainer()
        var renderer = utils.getRenderer()
        var project = utils.latLngToLayerPoint

        window.utils = utils
        window.map = map
        var scale = utils.getScale()

        if (firstDraw) {
          // utils.getMap().on('click', function(e) {
          //   // not really nice but much better than before
          //   // good starting point for improvements
          //   var interaction = utils.getRenderer().plugins.interaction
          //   var pointerEvent = e.originalEvent
          //   var pixiPoint = new PIXI.Point()
          //   // get global click position in pixiPoint:
          //   interaction.mapPositionToPoint(pixiPoint, pointerEvent.clientX, pointerEvent.clientY)
          //   // get what is below the click if any:
          //   var target = interaction.hitTest(pixiPoint, container)
          //   if (target && target.popup) {
          //     // target.popup.setLatLng()
          //     target.popup.setLatLng(map.mouseEventToLatLng(pointerEvent)).openOn(map)
          //     ReactDOM.render(
          //       <Provider store={reduxStore}>
          //         <PopupContent markerTypeKey={props.keyFeature} title={props.title} {...target.payload} />
          //       </Provider>,
          //       target.popupContainer
          //     )
          //   }
          // })
          map.pixiBufferContainer.push({
            id: this.uuid,
            container,
            interaction: utils.getRenderer().plugins.interaction
          })

          bufferData.forEach(item => {
            var projectedCenter = project(item.center)
            const buffer = item.instance
            buffer.x = projectedCenter.x
            buffer.y = projectedCenter.y
            buffer.clear()
            // buffer.lineStyle(3 / scale, PIXI.utils.string2hex(props.color), 1)
            buffer.lineStyle(0.1 / scale, PIXI.utils.string2hex(props.color), 1)
            buffer.beginFill(PIXI.utils.string2hex(props.color), 0.35)

            const pixel = pixelValue(buffer.center[0], props.radius / scale, zoom)
            buffer.drawCircle(0, 0, pixel)
            buffer.endFill()
          })
        }

        if (firstDraw || prevZoom !== zoom) {
          // bufferData.forEach(item => {
          //   const buffer = item.instance
          // })
        }

        firstDraw = false
        prevZoom = zoom
        renderer.render(container)
      },
      pixiContainer,
      {
        doubleBuffering: doubleBuffering,
        autoPreventDefault: false,
        pane: 'bufferPane'
      }
    )
    return pixiOverlay
  }

  componentWillUnmount() {
    const { map } = this.props.leaflet
    super.componentWillUnmount()
    remove(map.pixiBufferContainer, item => item.id === this.uuid)
  }
}
