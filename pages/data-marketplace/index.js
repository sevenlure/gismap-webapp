import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Typography } from 'antd'
import windowSize from 'react-window-size'
import { get as _get } from 'lodash-es'

import LayoutDashboard from 'src/layout/dashboard'

const WrapperIndex = styled.div``

const mapStateToProps = state => ({})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
@windowSize
class MarketPlacePage extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number
  }

  state = {}

  render() {
    return (
      <WrapperIndex windowWidth={this.props.windowWidth}>
        <div style={{ padding: 4, paddingLeft: 8 }}>
          <Typography.Title style={{ fontWeight: 800 }} level={3}>
            Data Market Place
          </Typography.Title>
        </div>
      </WrapperIndex>
    )
  }
}

MarketPlacePage.Layout = LayoutDashboard

export default MarketPlacePage
