import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Typography } from 'antd'
import windowSize from 'react-window-size'
import { get as _get } from 'lodash-es'

import LayoutDashboard from 'src/layout/dashboard'
import MarkerControl from 'src/containers/markerControl'
import { fetchMarkerGeneralCount } from 'src/redux/actions/layerAction'

const WrapperIndex = styled.div``

const mapStateToProps = state => ({
  markerGeneralCountIsLoaded: _get(state, 'LayerStore.markerGeneralCountIsLoaded')
})
const mapDispatchToProps = { fetchMarkerGeneralCount }

@connect(mapStateToProps, mapDispatchToProps)
@windowSize
class MakerPage extends React.Component {
  static propTypes = {
    fetchMarkerGeneralCount: PropTypes.func.isRequired,
    markerGeneralCountIsLoaded: PropTypes.bool.isRequired,
    windowWidth: PropTypes.number
  }

  state = {}
  componentDidMount = () => {
    const { markerGeneralCountIsLoaded, fetchMarkerGeneralCount } = this.props
    if (!markerGeneralCountIsLoaded) {
      fetchMarkerGeneralCount()
    }
  }

  render() {
    return (
      <WrapperIndex windowWidth={this.props.windowWidth}>
        <div style={{ padding: 4, paddingLeft: 8 }}>
          <Typography.Title level={3}>Marker Control</Typography.Title>
        </div>
        <div>
          <MarkerControl />
        </div>
      </WrapperIndex>
    )
  }
}

MakerPage.Layout = LayoutDashboard

export default MakerPage
