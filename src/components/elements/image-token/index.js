import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { get as _get } from 'lodash-es'
import { Avatar } from 'antd'
import { getFilePrivate } from 'src/api/updateFileApi'

const ImageWrapper = styled.div`
  flex: 1;
`
@connect(state => ({
  token: _get(state, 'AuthStore.token')
}))
export default class ImageToken extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string,
    token: PropTypes.string
  }

  state = {
    urlToken: null
  }

  componentDidMount = () => {
    if (this.props.src) {
      const objImage = getFilePrivate(this.props.src, this.props.token)
      this.setState({
        urlToken: _get(objImage, 'URL', null)
      })
    }
  }

  render() {
    return (
      <ImageWrapper>
        <Avatar shape='square' style={{
            width:'100%',
            height: '100%'
        }} src={this.state.urlToken} />
      </ImageWrapper>
    )
  }
}
