import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Divider, Spin } from 'antd'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const WrapperPage = styled.div`
  min-height: calc(100vh - 140px);
  background: #fff;
  display: flex;
  justify-content: center;

  .content {
    margin: 50px 24px;
    max-width: 800px;
    width: 100%;

    .title {
      font-family: myFont-Bold;
      font-size: 1.5rem;
      color: #4c4c4c;
      font-weight: bold;
      margin-bottom: 24px;
    }
    .info--container {
      max-width: 682px;
      width: 100%;
      height: 96px;
      border-radius: 10px;
      border: dashed 1px #e6e6e6;
      background-color: #fff;
      display: flex;
      margin-bottom: 16px;
      .info--container--item {
        flex: 1;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .subtitle {
        }
        .phone {
          font-size: 1.125rem;
          font-weight: bold;
          color: #3880ff;
          font-family: myFont-Bold;
        }
      }
    }

    .map--container {
      max-width: 682px;
      width: 100%;
      height: 400px;
      .gmnoprint,
      .gmnoscreen,
      .gm-style-cc {
        display: none;
      }
    }
  }
`

const center = {
  lat: 10.8020047,
  lng: 106.6391917
}
class ContactPage extends React.Component {
  state = {
    isLoadedMap: false
  }
  render() {
    return (
      <WrapperPage>
        <div className='content'>
          <div className='title'>Liên hệ</div>
          <div className='info--container'>
            <div className='info--container--item'>
              <div className='subtitle'>
                <span>Số điện thoại</span>
              </div>
              <div className='phone'>093 526 8795</div>
            </div>
            <Divider type='vertical' style={{ height: 'auto', margin: '24px 0px' }} />
            <div className='info--container--item'>
              <div className='subtitle'>
                <span>Hỗ trợ kỹ thuật</span>
              </div>
              <div className='phone'>093 526 8795</div>
            </div>
          </div>
          <Spin style={{ maxWidth: 682 }} spinning={!this.state.isLoadedMap}>
            <div className='map--container'>
              <LoadScript
                id='script-loader'
                googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}
                loadingElement={<div></div>}
                onLoad={() => this.setState({ isLoadedMap: true })}
              >
                <GoogleMap
                  zoom={15}
                  center={center}
                  mapContainerStyle={{ height: '100%', width: '100%' }}
                  id='example-map'
                  streetView={false}
                  options={{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                  }}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </Spin>
        </div>
      </WrapperPage>
    )
  }
}

ContactPage.Layout = DefaultLayout
export default ContactPage
