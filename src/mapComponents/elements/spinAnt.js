import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Spin, Icon } from 'antd'

import { get as _get } from 'lodash-es'

const antIcon = <Icon type='loading' style={{ fontSize: 64, transform: 'translate(-50%, -50%)' }} spin />

const mapStateToProps = state => ({
  isLoadingLayer: _get(state, 'LayerStore.isLoadingLayer')
})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
export default class SpinComponent extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    isLoadingLayer: PropTypes.array.isRequired
  }

  state = {
    isLoading: false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isLoadingLayer.length > 0) {
      this.setState({
        isLoading: true
      })
      // map.spin(true)
      // map._container.style.opacity = 0.5
    } else {
      this.setState({
        isLoading: false
      })
      // map.spin(false)
      // map._container.style.opacity = 1
    }
  }
  render() {
    return (
      <Spin indicator={antIcon} style={{ maxHeight: 'inherit' }} spinning={this.state.isLoading}>
        {this.props.children}
      </Spin>
    )
  }
}
