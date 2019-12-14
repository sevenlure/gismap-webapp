import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Typography } from 'antd'
import windowSize from 'react-window-size'

import LayoutDashboard from 'src/layout/dashboard'
import MarkerControl from 'src/containers/markerControl'

const WrapperIndex = styled.div``

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
@windowSize
class MakerPage extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number
  }

  state = {}
  componentDidMount = () => {}

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
