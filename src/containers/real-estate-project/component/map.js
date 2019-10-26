import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spin, Menu, Dropdown } from 'antd'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const MapWrapper = styled.div`
  flex: 1;
  .map--container {
    // max-width: 682px;
    width: 100%;
    height: 400px;
  }
`

const center = {
  lat: 10.7553411,
  lng: 106.4150285
}

export default class Map extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any
  }

  state = {
    isLoadedMap: false,
    pointTemp: null,
    point: null,
    locationCenter: center
  }

  changePoint = () => {
    // console.log(this.state.point, 'point')
    this.setState(
      {
        point: this.state.pointTemp
      },
      () => {
        if (this.props.onChange) this.props.onChange(this.state.point)
      }
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.value !== prevProps.value) {
      this.setState({
        point: this.props.value
      })
    }
    if (this.state.point !== prevState.point) {
      this.setState({
        locationCenter: this.state.point
      })
    }
  }

  handleOnRightClickMap = (...args) => {
    console.log('onClick args: ', args)
    this.setState({
      pointTemp: {
        lat: args[0].latLng.lat(),
        lng: args[0].latLng.lng()
      }
    })
  }

  render() {
    // console.log(this.props.value, this.state.point, 'render')

    const zoom = this.state.point ? 12 : 10
    return (
      <MapWrapper>
        <Spin spinning={!this.state.isLoadedMap}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key='0' onClick={this.changePoint}>
                  Cập nhật vị trí
                </Menu.Item>
              </Menu>
            }
            trigger={['contextMenu']}
          >
            <div style={{ userSelect: 'none' }} className='map--container'>
              <LoadScript
                id='script-loader'
                googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}
                loadingElement={<div></div>}
                onLoad={() => this.setState({ isLoadedMap: true })}
              >
                <GoogleMap
                  zoom={zoom}
                  center={this.state.locationCenter}
                  mapContainerStyle={{ height: '100%', width: '100%' }}
                  id='BSD-map'
                  streetView={false}
                  onRightClick={this.handleOnRightClickMap}
                  options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                  }}
                >
                  {this.state.point && <Marker position={this.state.point} />}
                </GoogleMap>
              </LoadScript>
            </div>
          </Dropdown>
        </Spin>
      </MapWrapper>
    )
  }
}
