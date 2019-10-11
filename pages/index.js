import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Form } from 'antd'
import DefaultLayout from 'src/layout/default'
import windowSize from 'react-window-size'

const WrapperIndex = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
@windowSize
class Index extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number
  }

  state = {
    querySearch: null
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
