import React from 'react'
import PropsTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'

const ElementWrapper = styled.div`
`

export default class ButtonElement extends React.PureComponent {
  propTypes = {
    name: PropsTypes.string
  }
  render() {
    return (
      <ElementWrapper>
        <Button>{this.props.name}</Button>
      </ElementWrapper>
    )
  }
}
