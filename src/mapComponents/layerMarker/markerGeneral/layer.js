import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get, mapKeys as _mapKeys } from 'lodash-es'
import expr from 'expression-eval'

import PixiMarkers from 'src/mapComponents/elements/pixiMarkers'
import { ICON } from 'src/constant/layer/general'
import { updateMarkerGeneralFilteredBykey } from 'src/redux/actions/layerAction'

const mapStateToProps = (state, ownProps) => {
  const { keyFeature } = ownProps

  return {
    featureData: _get(state, `LayerStore.markerGeneral.${keyFeature}`),
    analyticsStore: _get(state, 'AnalyticsStore')
  }
}
const mapDispatchToProps = { updateMarkerGeneralFilteredBykey }

@connect(mapStateToProps, mapDispatchToProps)
export default class LayerComp extends React.Component {
  // NOTE  featureData.list là datasource.
  //       featureData.filtered là data render vì sau khi tuong tac logic se luu o day

  static propTypes = {
    featureData: PropTypes.object.isRequired,
    keyFeature: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updateMarkerGeneralFilteredBykey: PropTypes.func.isRequired
  }

  state = {
    isLoading: false
  }

  reloadData = () => {
    this.setState({ isLoading: true }, () => {
      this.setState({ isLoading: false })
    })
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { keyFeature, featureData } = this.props
    // MARK  handle filter analytic

    const preQuery = _get(this.props, `analyticsStore.${keyFeature}.tabFilter.queryString`)
    const nextQuery = _get(nextProps, `analyticsStore.${keyFeature}.tabFilter.queryString`)
    if (preQuery !== nextQuery) {
      const queryString = _get(nextProps, `analyticsStore.${keyFeature}.tabFilter.queryString`)
      // console.log('queryString', queryString)

      if (featureData && queryString) {
        const ast = expr.parse(queryString)
        const filtered = featureData.list.filter(item => {
          const properties = _get(item, 'properties')
          _mapKeys(properties, function(value, key) {
            properties[`__${key}`] = value ? value : ''
          })
          // console.log('expr.eval(ast, properties)', expr.eval(ast, properties))
          return expr.eval(ast, properties) //Parser.evaluate(queryString, properties)
        })
        this.props.updateMarkerGeneralFilteredBykey(keyFeature, filtered)
        this.reloadData()
      }
    }
  }

  render() {
    const { featureData, keyFeature } = this.props
    if (this.state.isLoading) return null
    return (
      <PixiMarkers
        key={keyFeature}
        keyFeature={keyFeature}
        markersData={featureData.filtered}
        title={this.props.title}
        iconUrl={ICON[keyFeature].iconUrl}
      ></PixiMarkers>
    )
  }
}
