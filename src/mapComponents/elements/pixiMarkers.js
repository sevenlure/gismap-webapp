import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { withLeaflet, MapLayer } from 'react-leaflet'
import { Provider } from 'react-redux'
import uuid from 'uuid/v1'
import { remove } from 'lodash-es'

import { get as _get } from 'lodash-es'
import * as PIXI from 'pixi.js'
import L from 'leaflet'
import 'leaflet-pixi-overlay'
import PopupContent from 'src/components/elements/map/popup/popupContent'
import { getOrCreateStore } from 'src/lib/with-redux-store'

const reduxStore = getOrCreateStore()

export default class WrapperPixi extends React.Component {
  static propTypes = {
    iconUrl: PropTypes.string.isRequired,
    keyFeature: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }
  state = {
    texture: null
  }
  componentDidMount = () => {
    var loader = new PIXI.Loader()
    loader.add(this.props.keyFeature, this.props.iconUrl)
    loader.load((loader, resources) => {
      // var markerTexture = resources.marker.texture
      this.setState({ texture: resources[this.props.keyFeature].texture })
    })
  }
  render() {
    if (!this.state.texture) return null
    return <PixiOverlay {...this.props} texture={this.state.texture} />
  }
}

@withLeaflet
class PixiOverlay extends MapLayer {
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

    let markerData = props.markersData.map(item => {
      const coordinates = item.geometry.coordinates
      return {
        toado: [coordinates[1], coordinates[0]],
        properties: item.properties,
        title: props.title
      }
    })

    var markerTexture = props.texture //resources.marker.texture
    // map.setView([21.0238365, 105.801956], 14)

    var pixiContainer = new PIXI.Container()
    markerData.forEach(item => {
      var marker = new PIXI.Sprite(markerTexture)
      marker.height = 5
      marker.width = 5
      const markerLatLng = item.toado
      marker.payload = item
      item.instance = marker

      marker.popupContainer = document.createElement('div')
      marker.popup = L.popup({ className: 'leaflet-custom-popup', minWidth: 250, maxWidth: 600 })
        .setLatLng(markerLatLng)
        .setContent(marker.popupContainer)
      marker.popupContent = (
        <Provider store={reduxStore}>
          <PopupContent markerTypeKey={props.keyFeature} {...marker.payload} />
        </Provider>
      )

      marker.interactive = true
      pixiContainer.addChild(marker)
    })
    pixiContainer.interactive = true
    pixiContainer.buttonMode = true
    var doubleBuffering = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

    let frame = null
    var firstDraw = true
    var prevZoom

    var pixiOverlay = L.pixiOverlay(
      utils => {
        var zoom = utils.getMap().getZoom()
        var container = utils.getContainer()
        var renderer = utils.getRenderer()
        var project = utils.latLngToLayerPoint
        var scale = utils.getScale()
        const scaleExpected = 0.13 / scale
        // console.log('scale', scale)

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
          //     target.popup.openOn(map)
          //     setTimeout(() => {
          //       ReactDOM.render(
          //         <Provider store={reduxStore}>
          //           <PopupContent markerTypeKey={props.keyFeature} {...target.payload} />
          //         </Provider>,
          //         target.popupContainer
          //       )
          //     }, 100)
          //   }
          // })
          map.pixiMarkerContainer.push({
            id: this.uuid,
            container,
            interaction: utils.getRenderer().plugins.interaction
          })

          markerData.forEach(item => {
            var markerCoords = project(item.toado)
            const marker = item.instance
            marker.x = markerCoords.x
            marker.y = markerCoords.y
            // marker.anchor.set(0.5, 0)
            // marker.anchor.set(0.5, 1)
            marker.anchor.set(0.5, 0.5) //Setting the anchor to 0.5,0.5 means the texture's origin is centered
            marker.scale.set(scaleExpected)
            marker.currentScale = scaleExpected
          })
        }

        if (firstDraw || prevZoom !== zoom) {
          markerData.forEach(item => {
            const marker = item.instance
            marker.currentScale = marker.scale.x
            marker.targetScale = scaleExpected
          })
        }

        var duration = 100
        var start
        function animate(timestamp) {
          var progress
          if (start === null) start = timestamp
          progress = timestamp - start
          var lambda = progress / duration
          if (lambda > 1) lambda = 1
          lambda = lambda * (0.4 + lambda * (2.2 + lambda * -1.6))
          markerData.forEach(item => {
            const marker = item.instance
            marker.scale.set(marker.currentScale + lambda * (marker.targetScale - marker.currentScale))
          })

          renderer.render(container)
          if (progress < duration) {
            frame = requestAnimationFrame(animate)
          }
        }

        if (!firstDraw && prevZoom !== zoom) {
          start = null
          frame = requestAnimationFrame(animate)
        }

        firstDraw = false
        prevZoom = zoom
        renderer.render(container)
      },
      pixiContainer,
      {
        doubleBuffering: doubleBuffering,
        autoPreventDefault: false,
        pane: 'markerPane'
      }
    )
    return pixiOverlay
    //pixiOverlay.addTo(map)
  }

  componentWillUnmount() {
    const { map } = this.props.leaflet
    super.componentWillUnmount()
    remove(map.pixiMarkerContainer, item => item.id === this.uuid)
  }
}
