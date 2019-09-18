import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DefaultLayout from 'src/layout/default'
import { Button } from 'antd'
import { getFormatNumber } from 'src/config/format'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
import { get as _get } from 'lodash-es'
import { getListSchedule } from 'src/redux/actions/generalAction'
import { changeFilter, clearFilter } from 'src/redux/actions/BookingAction'
import moment from 'moment'
import { DATE_FORMAT } from 'src/config/format'
import Router from 'next/router'
import slug from 'src/routes'

const WrapperPage = styled.div`
  min-height: calc(100vh - 140px);
  background: #fff;
  display: flex;
  justify-content: center;

  .content {
    margin: 50px 24px;
    max-width: 800px;
    width: 100%;

    .title {
      font-family: myFont-Bold;
      font-size: 1.5rem;
      color: #4c4c4c;
      font-weight: bold;
      margin-bottom: 24px;
    }
    .info--container {
      max-width: 682px;
      width: 100%;
      .info--container--item {
        height: ${props => (props.isMobileView ? '200px' : '125px')};
        display: flex;
        margin-bottom: 16px;
        padding: 24px 40px;
        border-radius: 10px;
        border: solid 1px #e6e6e6;
        align-items: center;
        display: flex;
        justify-content: space-between;
        .info--container--item--left {
          h4 {
            font-family: myFont-Bold;
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 2px;
          }
          .description {
            font-family: myFont-Light;
            font-size: 1rem;
            font-weight: 300;
            margin-bottom: 8px;
          }
          .price {
            font-family: myFont-Bold;
            font-size: 1.25rem;
            font-weight: bold;
            color: #3880ff;
          }
        }
        .info--container--item--right {
        }
      }
    }
  }

  .ant-btn-primary {
    width: 96px;
    font-family: myFont-Medium;
    font-weight: 500;
  }
`

@connect(
  state => ({
    scheduleIsLoading: _get(state, 'GeneralStore.scheduleIsLoading'),
    scheduleList: _get(state, 'GeneralStore.scheduleList')
    // isLoadedListTourPopular: _get(state, 'GeneralStore.isLoadedListTourPopular'),
  }),
  { getListSchedule, changeFilter, clearFilter }
)
@windowSize
class SchedulePage extends React.Component {
  static propTypes = {
    changeFilter: PropTypes.func,
    clearFilter: PropTypes.func,
    getListSchedule: PropTypes.func,
    scheduleList: PropTypes.array,
    windowWidth: PropTypes.number
  }
  componentDidMount() {
    this.props.getListSchedule()
  }
  hanldeSearch = (from, to) => {
    // console.log('from', from, 'to', to)
    this.props.clearFilter()
    this.props.changeFilter({
      from,
      to,
      date: moment().format(DATE_FORMAT)
    })
    Router.push(slug.booking.base)
  }

  render() {
    console.log('scheduleList', this.props.scheduleList)
    const isMobileView = this.props.windowWidth < 576 ? true : false
    return (
      <WrapperPage isMobileView={isMobileView}>
        <div className='content'>
          <div className='title'>Lịch trình - Giá vé</div>
          <div className='info--container'>
            {this.props.scheduleList.map((item, index) => {
              const { fromDeparture, toDeparture } = item
              const fromDepartureName = _get(fromDeparture, 'name')
              const toDepartureName = _get(toDeparture, 'name')

              return (
                <div key={index} className='info--container--item'>
                  <div className='info--container--item--left'>
                    <div>
                      <h4>
                        {fromDepartureName} {'->'} {toDepartureName}
                      </h4>
                    </div>
                    <div className='description'>{item.title}</div>
                    <div className='price'>{getFormatNumber(item.price)}</div>
                    {isMobileView && (
                      <div style={{ marginTop: 16 }}>
                        <Button size='large' type='primary' onClick={this.hanldeSearch.bind(this, item.from, item.to)}>
                          Đặt vé
                        </Button>
                      </div>
                    )}
                  </div>
                  {!isMobileView && (
                    <div className='info--container--item--right'>
                      <Button size='large' type='primary' onClick={this.hanldeSearch.bind(this, item.from, item.to)}>
                        Đặt vé
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </WrapperPage>
    )
  }
}

SchedulePage.Layout = DefaultLayout
export default SchedulePage
