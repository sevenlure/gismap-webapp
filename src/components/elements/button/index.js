import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'antd'
import Ink from 'react-ink'

const ButtonWrapper = styled.div`
  flex: 1;
`
export default class ButtonCustom extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    type: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.string
  }
  render() {
    return (
      <ButtonWrapper>
        <Button {...this.props}>
          {this.props.children}
          <Ink
            style={{
              color: '#d35400'
            }}
          />
        </Button>
      </ButtonWrapper>
    )
  }
}
