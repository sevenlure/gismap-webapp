import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {} from 'antd'
import DefaultLayout from 'src/layout/default'
import windowSize from 'react-window-size'
import { setBreadCrumb, updateKeyPath, updateBackgroundColor } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'
import DashBoard from 'src/containers/dashboard'

const WrapperIndex = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`

const mapStateToProps = () => ({})
const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath,
  updateBackgroundColor
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@windowSize
class Index extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    setBreadCrumb: PropTypes.func,
    updateKeyPath: PropTypes.func,
    updateBackgroundColor: PropTypes.func
  }

  state = {
    querySearch: null
  }
  componentDidMount = () => {
    const pathPage = slug.basic
    this.props.updateBackgroundColor('none')
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
  }

  render() {
    return (
      <WrapperIndex windowWidth={this.props.windowWidth}>
        <DashBoard />
      </WrapperIndex>
    )
  }
}

Index.Layout = DefaultLayout

export default Index
