import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Tabs, Radio, Typography } from 'antd'
import LayoutDashboard from 'src/layout/dashboard'
import windowSize from 'react-window-size'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import dynamic from 'next/dynamic'

const WrapperIndex = styled.div``

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

@connect(mapStateToProps, mapDispatchToProps)
@windowSize
class AnalyticsPage extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number
  }

  state = {}
  componentDidMount = () => {}

  render() {
    return (
      <WrapperIndex windowWidth={this.props.windowWidth}>
        <div style={{ padding: 4, paddingLeft: 8 }}>
          <Typography.Title level={3}>Analytics Control</Typography.Title>
        </div>
        <div></div>
      </WrapperIndex>
    )
  }
}

AnalyticsPage.Layout = LayoutDashboard

export default AnalyticsPage
