import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get, isEqual as _isEqual, mapKeys as _mapKeys } from 'lodash-es'
import { diff } from 'deep-object-diff'
import { FeatureGroup, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import { fetchMarkerOwnBykey } from 'src/redux/actions/layerAction'
import { updateFieldArr } from 'src/redux/actions/analyticsAction'
import fieldConvert from './fieldConvert'
import PoupContent from '../common/popupContent'

const mapStateToProps = state => ({
  markerSelectedObj: _get(state, 'FilterStore.marker'),
  markerOwnData: _get(state, 'LayerStore.markerOwn'),
  analyticsStore: _get(state, 'AnalyticsStore')
})
const mapDispatchToProps = { fetchMarkerOwnBykey, updateFieldArr }

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerMarker extends React.Component {
  static propTypes = {
    fetchMarkerOwnBykey: PropTypes.func.isRequired,
    markerSelectedObj: PropTypes.object.isRequired,
    markerOwnData: PropTypes.object.isRequired,
    updateFieldArr: PropTypes.func.isRequired
  }

  state = {
    cache: []
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!_isEqual(this.props.markerSelectedObj, nextProps.markerSelectedObj)) {
      const updatedObj = diff(this.props.markerSelectedObj, nextProps.markerSelectedObj)
      _mapKeys(updatedObj, (value, key) => {
        if (value && key.includes('OWN/') && _get(nextProps, `markerOwnData.${key}.list`, []).length == 0) {
          this.props.fetchMarkerOwnBykey(key).then(data => {
            if (!data) return

            const firstProperties = _get(data, '[0].properties')
            console.log('firstProperties', firstProperties)
            if (firstProperties) {
              let fieldArr = []
              _mapKeys(firstProperties, (val, keyField) => {
                if (fieldConvert[keyField]) fieldArr.push(fieldConvert[keyField])
              })
              this.props.updateFieldArr(key, fieldArr)
            }
            // NOTE save data vao state
            const tamp = (
              <FeatureGroup key={key}>
                <MarkerClusterGroup>
                  {data.map(point => {
                    const position = _get(point, 'geometry.coordinates')
                    if (!position) return null
                    const properties = _get(point, 'properties', {})
                    return (
                      <Marker key={point._id} position={[position[1], position[0]]}>
                        <Popup className={'leaflet-custom-popup'}>
                          <PoupContent
                            title={'properties'}
                            // minHeight={100}
                            marketTypeKey={key}
                            properties={properties}
                            dataSourceChart={[
                              {
                                name: 'Thuoc tinh 1',
                                value: 23.989,
                                color: '#50B432'
                              },
                              {
                                name: 'Thuoc tinh 2',
                                value: 13.989,
                                color: '#ED561B'
                              },
                              {
                                name: 'Thuoc tinh 3',
                                value: 31.989,
                                color: '#DDDF00'
                              }
                            ]}
                            dataSourceProperties={[
                              {
                                name: 'Name',
                                value: 'Beja'
                              },
                              {
                                name: 'Persons',
                                value: '35,000'
                              },
                              {
                                name: 'ABC',
                                value: '3,000'
                              }
                            ]}
                          />
                        </Popup>
                      </Marker>
                    )
                  })}
                </MarkerClusterGroup>
              </FeatureGroup>
            )
            this.setState({
              cache: [
                ...this.state.cache,
                {
                  key,
                  data: tamp
                }
              ]
            })
          })
        }
      })
    }
  }

  render() {
    const { markerSelectedObj } = this.props

    return (
      <div>
        {this.state.cache.map(item => {
          if (!markerSelectedObj[item.key]) return null
          return item.data
        })}
      </div>
    )
  }
}
