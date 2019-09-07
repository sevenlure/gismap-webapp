import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { addBookingNowSeat, removeBookingNowSeat } from 'src/redux/actions/BookingAction'
import { get as _get } from 'lodash-es'

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

const mapStateToProps = state => ({
  BookingNowSeat: _get(state, 'BookingStore.BookingNowSeat'),
  price: _get(state, 'BookingStore.BookingNow.price')
})

const mapDispatchToProps = {
  addBookingNowSeat,
  removeBookingNowSeat
}

// MARK  this.ModalBooking nắm ref của modal-booking
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class IconSeat extends React.Component {
  static propTypes = {
    BookingNowSeat: PropTypes.object,
    addBookingNowSeat: PropTypes.func.isRequired,
    col: PropTypes.string,
    matrix: PropTypes.object,
    name: PropTypes.string,
    price: PropTypes.number.isRequired,
    removeBookingNowSeat: PropTypes.func.isRequired,
    row: PropTypes.number,
    zoom: PropTypes.number
  }

  static defaultProps = {
    zoom: 1
  }

  handleOnClick = () => {
    const { name, row, col, addBookingNowSeat, price, BookingNowSeat, removeBookingNowSeat } = this.props

    const item = BookingNowSeat[`${row}-${col}`]
    if (!item) {
      // MARK  chưa book => add seat vào Booking
      addBookingNowSeat({
        [`${row}-${col}`]: {
          price,
          name
        }
      })
    } else {
      // MARK đã book => remove seat booking
      removeBookingNowSeat(`${row}-${col}`)
    }
  }

  render() {
    const { name, matrix, zoom, BookingNowSeat, row, col } = this.props
    if (!matrix || matrix.status == null) return <div />
    const status = matrix.status
    let color = '#fff'
    if (status === 0) color = '#9ea7d0'

    let background = SEAT_ICON[status]
    if (BookingNowSeat[`${row}-${col}`]) {
      background = SEAT_ICON[1]
      color = '#fff'
    }

    return (
      <I
        onClick={() => {
          //NOTE dieu kien de thuc thi logic, ghế còn trống
          if (status === 0) this.handleOnClick()
        }}
        style={{ zoom: zoom }}
        className='anticon'
        background={background}
      >
        <NameSeat style={{ color: color }}>{name !== '1A' ? name : ''}</NameSeat>
      </I>
    )
  }
}
