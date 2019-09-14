import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Divider, Icon, Timeline, Button, Row, Col, Drawer, Skeleton } from 'antd'
import { get as _get } from 'lodash-es'
// import IconSvg from 'icons'
import windowSize from 'react-window-size'

import FromSelectIconSvg from 'static/images/icon/ic-arrow-map-from-select.svg'
import ToSelectIconSvg from 'static/images/icon/ic-arrow-map-to-select.svg'
import BookingContentDefault from 'src/containers/booking/view-default'
import BookingContentMobile from 'src/containers/booking/view-mobile'

import Clearfix from 'src/components/elements/clearfix'
import { map as _map, set as _set } from 'lodash-es'
import { DATE_FORMAT } from 'src/config/format'
import DateStepPicker from 'src/components/elements/date-step-picker'

import { connect } from 'react-redux'
import { getListTourSearch, setIsLoadedListTourSearch, changeFilter } from 'src/redux/actions/BookingAction'

import moment from 'moment'
import SelectDepartureV2 from 'src/components/elements/select-departure-v2'
import SelectCustom from 'src/components/elements/select-order'
import posed from 'react-pose'

const BookingContainer = styled.div`
  flex: 1;
  display: flex;

  .left-booking {
    background-color: white;
    width: ${props => (props.isVisibleFilter ? '400px' : '375px')};
    box-shadow: 1px 0 0 0 #e6e6e6;
    .ant-btn-round {
      height: 44px;
      font-family: myFont-Light;
      background-color: #f2f3f7;
      border: none;
      color: #4c4c4c;

      span {
        margin-left: 16px;
        margin-right: 16px;
      }
      
      &.select {
        font-family: myFont-Medium;
        // background-color: #3880ff;
        background-color: rgba(56, 128, 255, 0.2);
      }
    }
    .left-booking--content {
      padding: 24px;
      .select{
        // background-color: rgb(56, 128, 255, 0.4);
      }
      .select > span {
        font-weight: 500;
        font-family: myFont-Medium;
        color: #3880ff;
      }
      .left-booking--content__border{
        padding: 8px 0px 8px 16px;
        border-radius: 4px;
        border: solid 1px #e6e6e6;
      }
      .left-booking--content__title {
        font-size: 1.125rem;
        padding-bottom:16px;
      }


        .left-booking--content--trip{
            .ant-timeline-item-head-custom{
                top: 15px;
            }
            .ant-timeline-item-content{
                top:0px;
                // margin-left: 30px;
            }
            .ant-timeline-item{
                padding: 0 0 1px;
                .ant-timeline-item-tail{
                    border-left: 7px dotted #d2d3db;
                    position: absolute;
                    top: 7px;
                    left: 0px;
                    padding-bottom: 1px;
                }
            }

            .ant-timeline-item-last{
                padding: 0px;  
            }
            .ant-timeline-item-last > .ant-timeline-item-content {
                min-height: 0px;
            }
        }
          
      }
    }
  }

  .right-booking {
    flex: 1;
    background: #f2f3f7;

    .right-booking--content {
      .right-booking--content--header {
        padding: 20px;
        display: flex;
        justify-content: space-between;
      }
      
    }
  }
`

const LeftP = posed.div({
  enter: { x: 0, opacity: 1, transition: { duration: 500 }, staggerChildren: 300 },
  exit: { x: -200, opacity: 0 }
})

const LeftItemP = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
})

const RightP = posed.div({
  enter: { x: 0, opacity: 1, transition: { duration: 500 }, staggerChildren: 300 },
  exit: { x: 1000, opacity: 0 }
})

const mapStatetoProps = state => ({
  listTourSearch: _get(state, 'BookingStore.listTourSearch', []),
  listDeparture: _get(state, 'GeneralStore.danhMuc.listDeparture', []),
  isLoadedlistTourSearch: _get(state, 'BookingStore.isLoadedlistTourSearch', null),
  listTypeSeat: _get(state, 'GeneralStore.danhMuc.listTypeSeat', []),
  listTimeSlot: _get(state, 'GeneralStore.danhMuc.listTimeSlot', []),
  filter: _get(state, 'BookingStore.filter', {})
})
const mapDispatchToProps = { getListTourSearch, setIsLoadedListTourSearch, changeFilter }

@connect(
  mapStatetoProps,
  mapDispatchToProps
)
@windowSize
class Booking extends React.Component {
  static propTypes = {
    changeFilter: PropTypes.func.isRequired,
    getListTourSearch: PropTypes.func,
    isLoadedlistTourSearch: PropTypes.bool,
    listDeparture: PropTypes.array,
    listTimeSlot: PropTypes.any,
    listTourSearch: PropTypes.array,
    listTypeSeat: PropTypes.any,
    setIsLoadedListTourSearch: PropTypes.func,
    windowWidth: PropTypes.number,
    filter: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
      isVisibleDrawer: false,
      datafilter: {
        from: _get(this.props, 'filter.from', null),
        to: _get(this.props, 'filter.to', null),
        timeSlotId: _get(this.props, 'filter.timeSlotId', null),
        typeSeat: _get(this.props, 'filter.typeSeat', null),
        date: _get(this.props, 'filter.date', null) ? moment(this.props.filter.date) : moment()
      },
      anim: 'exit'
    }
  }

  componentDidMount = () => {
    this.setState({ anim: 'enter' })
  }

  componentWillUnmount = () => {
    // this.setState({ anim: 'exit' })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let dataUpdate = null
    if (nextProps.windowWidth >= 1024 && prevState.isVisibleDrawer) {
      dataUpdate = {
        ...prevState,
        isVisibleDrawer: false
      }
    }

    if (dataUpdate) {
      return {
        ...dataUpdate
      }
    }
    return null
  }

  onChangeFilter = (type, value) => {
    // console.log(type, value, 'onChangeFilter')
    let tempData = this.state.datafilter
    _set(tempData, type, value)
    // console.log(tempData, 'tempData')
    this.setState(
      {
        datafilter: {
          ...tempData
        }
      },
      async () => {
        // console.log('this.state changed', this.state.datafilter)
        this.props.setIsLoadedListTourSearch(false)
        try {
          await this.props.getListTourSearch({
            from: _get(this.state, 'datafilter.from', null),
            to: _get(this.state, 'datafilter.to', null),
            date: decodeURIComponent(_get(this.state, 'datafilter.date', null).format(DATE_FORMAT)),
            typeSeat: decodeURIComponent(_get(this.state, 'datafilter.typeSeat', null)),
            timeSlot: _get(this.state, 'datafilter.date', null)
          })
          this.props.setIsLoadedListTourSearch(true)
        } catch (ex) {
          console.log(ex, 'ajs')
        }
      }
    )
  }

  LeftBooking = ({ isVisibleDrawer, zIndex }) => {
    return (
      <div className='left-booking' style={{ zIndex: zIndex }}>
        <LeftP pose={this.state.anim} className='left-booking--content'>
          <LeftItemP className='left-booking--content--trip'>
            <div className='util-space-between'>
              <h3 className='left-booking--content__title'>Tuyến đi</h3>
              {isVisibleDrawer && (
                <Button
                  type='default'
                  onClick={() => {
                    this.setState({
                      isVisibleDrawer: false
                    })
                  }}
                >
                  Đóng
                </Button>
              )}
            </div>
            <div className='left-booking--content__border'>
              <Timeline>
                <Timeline.Item dot={<Icon style={{ fontSize: '1.5rem' }} component={FromSelectIconSvg} />} color='red'>
                  <div>
                    {/* <span style={{ fontSize: '1.25rem' }}>{this.state.fromName}</span> */}
                    <SelectDepartureV2
                      placeholder='Điểm khởi hành'
                      // onChange={value => this.onChangeFilter('from', value)}
                      onChange={value => {
                        this.props.changeFilter({ from: value })
                        this.onChangeFilter('from', value)
                      }}
                      defaultValue={this.state.datafilter.from}
                      keyDisable={this.state.datafilter.to}
                    />
                  </div>
                  <Divider style={{ margin: '8px 0px 16px 0px' }} />
                </Timeline.Item>
                <Timeline.Item dot={<Icon style={{ fontSize: '1.5rem' }} component={ToSelectIconSvg} />} color='red'>
                  {/* <span style={{ fontSize: '1.25rem' }}>{this.state.toName}</span> */}
                  <SelectDepartureV2
                    placeholder='Điểm muốn đến'
                    // onChange={value => this.onChangeFilter('to', value)}
                    onChange={value => {
                      this.props.changeFilter({ to: value })
                      this.onChangeFilter('to', value)
                    }}
                    defaultValue={this.state.datafilter.to}
                    keyDisable={this.state.datafilter.from}
                  />
                </Timeline.Item>
              </Timeline>
            </div>
          </LeftItemP>
          <Clearfix height={45} />
          <LeftItemP className='left-booking--content--date--picker'>
            <h3 className='left-booking--content__title'>Thời gian khởi hành</h3>
            <div>
              <DateStepPicker
                onChange={date => {
                  this.props.changeFilter({ date: date })
                  this.onChangeFilter('date', date)
                }}
                defaultValue={this.state.datafilter.date}
              />
            </div>
          </LeftItemP>
          <Clearfix height={45} />
          <LeftItemP className='left-booking--content--time-slot'>
            <h3 className='left-booking--content__title'>Khung giờ</h3>
            <div>
              {_map(this.props.listTimeSlot, item => {
                return (
                  <Button
                    key={item.value}
                    style={{ padding: '0px 10px', margin: '0px 12px 12px 0px', fontSize: '1rem', minWidth: 86 }}
                    type='default'
                    shape='round'
                    className={item.value === this.state.datafilter.timeSlotId ? 'select' : ''}
                    onClick={() => {
                      this.props.changeFilter({ timeSlotId: item.value })
                      this.onChangeFilter('timeSlotId', item.value)
                    }}
                  >
                    {item.name}
                  </Button>
                )
              })}
            </div>
          </LeftItemP>
          <Clearfix height={45} />
          <LeftItemP className='left-booking--content--seat-type'>
            <h3 className='left-booking--content__title'>Loại ghế</h3>
            <div>
              {_map(this.props.listTypeSeat, item => {
                return (
                  <Button
                    key={item.value}
                    style={{ padding: '0px 10px', margin: '0px 12px 12px 0px', fontSize: '1rem', minWidth: 86 }}
                    type='default'
                    shape='round'
                    className={item.value === this.state.datafilter.typeSeat ? 'select' : ''}
                    onClick={event => {
                      event.preventDefault()
                      this.props.changeFilter({ typeSeat: item.value })
                      this.onChangeFilter('typeSeat', item.value)
                    }}
                  >
                    {item.name}
                  </Button>
                )
              })}
            </div>
          </LeftItemP>
        </LeftP>
      </div>
    )
  }

  render() {
    // console.log(this.state.datafilter, 'datafilter')
    let isVisibleFilter = true
    let isViewDefault = true
    if (this.props.windowWidth < 1024) {
      isVisibleFilter = false
    }

    let drawerStyle = {
      width: 375,
      placement: 'left'
    }
    if (this.props.windowWidth < 576) {
      isViewDefault = false
      drawerStyle = {
        height: '75vh',
        placement: 'bottom',
        bodyStyle: {
          height: '75vh',
          overflowY: 'auto'
        }
      }
    }
    return (
      <BookingContainer isVisibleFilter={isVisibleFilter}>
        {isVisibleFilter && <this.LeftBooking zIndex={2} />}
        {this.state.isVisibleDrawer && (
          <div id='drawerContainer' style={{ zIndex: this.state.isVisibleDrawer ? 10 : 1 }}>
            <Drawer
              {...drawerStyle}
              onClose={() => this.setState({ isVisibleDrawer: false })}
              visible={this.state.isVisibleDrawer}
              getContainer={document.getElementById('drawerContainer')}
              closable={false}
              destroyOnClose={true}
            >
              <this.LeftBooking isVisibleDrawer={this.state.isVisibleDrawer} />
            </Drawer>
          </div>
        )}

        <RightP pose={this.state.anim} className='right-booking'>
          <div className='right-booking--content'>
            <div className='right-booking--content--header'>
              <Row gutter={8} style={{ flex: 1 }}>
                {!isVisibleFilter && (
                  <Col xs={8} sm={4}>
                    <Button
                      size='large'
                      type='primary'
                      style={{ width: '100%' }}
                      icon='filter'
                      onClick={() => {
                        this.setState({ isVisibleDrawer: true })
                      }}
                    >
                      Bộ lọc
                    </Button>
                  </Col>
                )}
                <Col xs={16} sm={20} lg={10} style={{ marginBottom: '8px' }}>
                  <SelectCustom
                    defaultSelectedKeys={this.state.datafilter.orderBy}
                    onChange={value => {
                      // this.props.changeFilter({ orderBy: value })// không luư biến này vào redux
                      this.onChangeFilter('orderBy', value)
                    }}
                  />
                </Col>
              </Row>
            </div>
            <Divider style={{ margin: 0 }} />
            <div style={{ padding: '30px' }}>
              {!this.props.isLoadedlistTourSearch &&
                _map([1, 2, 3], key => {
                  return (
                    <div key={key} style={{ background: 'white', padding: '16px 8px', marginBottom: '20px' }}>
                      <Skeleton paragraph={{ rows: 2 }} active />
                    </div>
                  )
                })}
              {this.props.isLoadedlistTourSearch && isViewDefault && (
                <BookingContentDefault windowWidth={this.props.windowWidth} dataSearch={this.props.listTourSearch} />
              )}
              {this.props.isLoadedlistTourSearch && !isViewDefault && (
                <BookingContentMobile windowWidth={this.props.windowWidth} dataSearch={this.props.listTourSearch} />
              )}
            </div>
          </div>
        </RightP>
      </BookingContainer>
    )
  }
}

export default Booking
