import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Icon } from 'antd'
import IconsPath from 'icons/index'

const BookingItemWrapper = styled.div`
  // NOTE  item
  .page--content--item {
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    border: solid 1px #e6e6e6;
    background-color: #f2f3f7;
    ${props => (props.backgroundColor ? `background-color: ${props.backgroundColor};` : 'background-color: #f2f3f7;')}
    padding: 25px 34px;

    .page--content--item--left {
      display: flex;
      flex-direction: column;
    }
    .page--content--item--right {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`
export default class BookingItem extends React.PureComponent {
  static propTypes = {
    timeFrom: PropTypes.string,
    timeTo: PropTypes.string,
    to: PropTypes.string,
    from: PropTypes.string,
    typeCar: PropTypes.string,
    seat: PropTypes.string,
    dateStart: PropTypes.any,
    backgroundColor: PropTypes.string
  }

  render() {
    const { timeFrom, timeTo, from, to, typeCar, seat, dateStart, backgroundColor } = this.props
    return (
      <BookingItemWrapper backgroundColor={backgroundColor}>
        <div className='page--content--item'>
          <div className='page--content--item--left'>
            <div>
              <h4>
                {timeFrom} <Icon component={IconsPath.arrowNext} /> {timeTo}
              </h4>
            </div>
            <div>
              <h5>
                {from} <Icon component={IconsPath.arrowNext} /> {to}
              </h5>
            </div>
            <div>
              <span>{typeCar}</span>
            </div>
          </div>
          <div className='page--content--item---right'>
            <div>
              <h4>{seat}</h4>
            </div>
            <div>
              <span>{dateStart}</span>
            </div>
          </div>
        </div>
      </BookingItemWrapper>
    )
  }
}
