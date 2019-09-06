import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const I = styled.i`
  background: ${props => props.background}
  height: 28px;
  width: 28px;
  font-size: 2px;
`

const NameSeat = styled.span`
  position: absolute;
  transform: translate(-50%, 100%);
  font-family: myFont-Bold;
  color: #fff;
  font-size: 8px;
`

const TYPE = {
  choose: 'url(/static/images/icSeatChoose.png) no-repeat;',
  disable: 'url(/static/images/icSeatDisable.png) no-repeat;',
  driver: 'url(/static/images/icSeatDriver.png) no-repeat;',
  off: 'url(/static/images/icSeatOff.png) no-repeat;'
}

const SEAT_ICON = {
  0: TYPE.off,
  1: TYPE.choose,
  2: TYPE.disable,
  3: TYPE.driver
}

export default class IconSeat extends React.Component {
  static propTypes = {
    matrix: PropTypes.object,
    name: PropTypes.string,
    zoom: PropTypes.number
  }

  static defaultProps = {
    zoom: 1
  }

  render() {
    const { name, matrix, zoom } = this.props
    if (!matrix || matrix.status == null) return <div />
    const status = matrix.status
    let color = '#fff'
    if (status === 0) color = '#9ea7d0'
    return (
      <I style={{ zoom: zoom }} className='anticon' background={SEAT_ICON[status]}>
        <NameSeat style={{ color: color }}>{name !== '1A' ? name : ''}</NameSeat>
      </I>
    )
  }
}
