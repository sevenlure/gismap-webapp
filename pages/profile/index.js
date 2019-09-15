import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { connect } from 'react-redux'
import { Row, Col, Avatar, Icon, Radio, Skeleton } from 'antd'
import Icons from 'icons/index'
import DefaultLayout from 'src/layout/default'
import Clearfix from 'src/components/elements/clearfix'
import windowSize from 'react-window-size'
import BookingItem from 'src/components/elements/booking-item'

const ProfilePageWrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;

  .page--content {
    // background: white;
    max-width: 682px;
    width: 100%;
    margin: 50px 0px;

    // NOTE  avatar
    .page--content--avatar__border {
      background: conic-gradient(#fff, #dde8fc, #3880ff);
      padding: 3px;
      border-radius: 50%;
    }

    .page--content--avatar .page--content--avatar__icon {
      width: 36px;
      height: 36px;
      background-color: #f2f3f7;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }

    .page--content--wrapper-tab {
      border-radius: 20px;
      border: 1px dashed #9ea7d0;
     
      ${props => (props.windowWidth >= 992 ? '  padding: 40px 30px;' : '')}
      ${props => (props.windowWidth >= 576 ? ' padding: 30px 20px;' : '')}
      ${props => (props.windowWidth < 576 ? ' padding: 20px 10px; border:none;' : '')}

      // NOTE  tab
      .page--content--tab {
        flex: 1;
        display: flex;
        justify-content: center;

        // NOTE Customer Radius
        .ant-radio-group {
          display: flex;
          border-radius: 36px;
          border: none;
          background-color: #f2f3f7;

          .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
            color: #fff;
            background: #3880ff;
            outline: none;
          }
          .ant-radio-button-wrapper {
            border-radius: 36px;
            border: none;
            background-color: #f2f3f7;
            ${props => (props.windowWidth >= 576 ? ' padding-left: 83px; padding-right: 83px;' : '')}
            ${props => (props.windowWidth >= 992 ? ' padding-left: 83px; padding-right: 83px;' : '')}
            ${props => (props.windowWidth < 576 ? 'padding-left: 24px; padding-right: 24px;' : '')}
           
          }
        }
      }
      
    }
  }
`

// // const mapStateToProps = state => ({

// // })

// const mapDispatchToProps = {}

// @connect(
//   {},
//   mapDispatchToProps
// )
const keyDefault = 'ticektBooking'

@windowSize
class ProfilePage extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number
  }

  state = {
    keyTab: keyDefault,
    isLoading: false
  }

  hanldeOnChange = e => {
    this.setState({
      isLoading: true
    })
    const key = e.target.value

    setTimeout(() => {
      this.setState({
        keyTab: key,
        isLoading: false
      })
    }, 500)
  }

  render() {
    const backgroundColor = this.state.keyTab === keyDefault ? '#f2f3f7' : '#fff'

    console.log(backgroundColor, 'backgroundColor')
    return (
      <ProfilePageWrapper windowWidth={this.props.windowWidth}>
        <div className='page--content'>
          <Row className='page--content--avatar'>
            <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className='page--content--avatar__border'>
                <Avatar
                  src='/static/images/avatar_default.png'
                  style={{ backgroundColor: '', cursor: 'pointer' }}
                  size={74}
                />
              </div>

              <Clearfix width={16} />
              <div className='page--content--avatar__icon'>
                <div>
                  <Icon style={{ fontSize: '1.5rem' }} component={Icons.edit} />
                </div>
              </div>
            </Col>
            <Clearfix height={12} />
            <Col style={{ textAlign: 'center' }}>
              <strong>Mai Thuận Thảo</strong>
            </Col>
          </Row>
          <Clearfix height={30} />
          <Row className='page--content--wrapper-tab'>
            <Col>
              <div className='page--content--tab'>
                <Row type={'flex'}>
                  <Radio.Group
                    defaultValue={this.state.keyTab}
                    onChange={this.hanldeOnChange}
                    size='large'
                    buttonStyle='solid'
                  >
                    <Col>
                      <Radio.Button value='ticketBooked'>Vé đã đặt</Radio.Button>
                    </Col>
                    <Col>
                      <Radio.Button value='ticektBooking'>Vé đang đặt</Radio.Button>
                    </Col>
                  </Radio.Group>
                </Row>
              </div>
            </Col>
            <Clearfix height={30} />
            {this.state.isLoading && (
              <div>
                <Skeleton active />
                <Clearfix height={20} />
                <Skeleton active />
              </div>
            )}
            {!this.state.isLoading && (
              <div>
                <Col>
                  <BookingItem
                    timeFrom={'05:00'}
                    timeTo={'07:00'}
                    from={'Tây Ninh'}
                    to='Quận 10, Hồ Chí Minh'
                    typeCar='Xe giường nằm 2 tầng'
                    seat='A5, B6, G7'
                    dateStart='Thứ tư, ngày 18/08/2019'
                    backgroundColor={backgroundColor}
                  />
                  <Clearfix height={20} />
                </Col>
                <Col>
                  <BookingItem
                    timeFrom={'05:00'}
                    timeTo={'07:00'}
                    from={'Tây Ninh'}
                    to='Quận 10, Hồ Chí Minh'
                    typeCar='Xe giường nằm 2 tầng'
                    seat='A5, B6, G7'
                    dateStart='Thứ tư, ngày 18/08/2019'
                    backgroundColor={backgroundColor}
                  />
                  <Clearfix height={20} />
                </Col>
                <Col>
                  <BookingItem
                    timeFrom={'05:00'}
                    timeTo={'07:00'}
                    from={'Tây Ninh'}
                    to='Quận 10, Hồ Chí Minh'
                    typeCar='Xe giường nằm 2 tầng'
                    seat='A5, B6, G7'
                    dateStart='Thứ tư, ngày 18/08/2019'
                    backgroundColor={backgroundColor}
                  />
                  <Clearfix height={20} />
                </Col>
              </div>
            )}
          </Row>
        </div>
      </ProfilePageWrapper>
    )
  }
}

ProfilePage.Layout = DefaultLayout
export default ProfilePage
