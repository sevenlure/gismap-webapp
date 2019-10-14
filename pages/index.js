import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Form } from 'antd'
import DefaultLayout from 'src/layout/default'
import windowSize from 'react-window-size'
import { setBreadCrumb, updateKeyPath } from 'src/redux/actions/generalAction'
import slug, { breadcrumb } from 'src/routes/index'

const WrapperIndex = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`

const mapStateToProps = () => ({})
const mapDispatchToProps = {
  setBreadCrumb,
  updateKeyPath
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
    updateKeyPath: PropTypes.func
  }

  state = {
    querySearch: null
  }
  componentDidMount = () => {
    const pathPage = slug.basic
    this.props.setBreadCrumb(breadcrumb[pathPage])
    this.props.updateKeyPath([pathPage])
  }

  render() {
    return (
      <WrapperIndex windowWidth={this.props.windowWidth}>
        <div>index</div>
      </WrapperIndex>
    )
  }
}
Index.Layout = DefaultLayout

export default Form.create({})(Index)
