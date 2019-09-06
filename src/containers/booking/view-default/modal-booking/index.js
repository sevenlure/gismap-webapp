import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Modal, Divider } from 'antd'
import PickupPointContainer from './pickup-point-container'
import ChooseSeatContainer from './choose-seat.container'
import windowSize from 'react-window-size'

const BodyWrapper = styled.div`
  flex: 1;
  .modal--title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .content-booking {
    display: flex;
    ${props => (props.windowWidth < 900 ? 'flex-direction: column;' : '')}

    .pickup-point-container {
      width: ${props => (props.windowWidth < 900 ? '100%;' : '250px;')};
    }

    .choose-seat-container {
      width: 100%;
    }
  }

  .footer-booking {
    display: flex;
    justify-content: space-between;

    .footer-booking-left {
    }
    .footer-booking-right {
      display: flex;
      justify-content: space-between;
    }
  }
`

@windowSize
export default class ModalBooking extends React.Component {
  static propTypes = {
    getRef: PropTypes.func,
    windowWidth: PropTypes.number
  }

  state = { isOpenModal: false }

  componentDidMount() {
    const { getRef } = this.props
    if (getRef) getRef(this)
  }

  showModal = () => {
    this.setState({
      isOpenModal: true
    })
  }

  closeModal = () => {
    this.setState({
      isOpenModal: false
    })
  }

  render() {
    return (
      <div>
        <Button type='primary' onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          width='100%'
          style={{
            padding: this.props.windowWidth > 900 ? 24 : 24,
            maxWidth: 780
          }}
          visible={this.state.isOpenModal}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          centered
          closable={false}
          footer={null}
        >
          <BodyWrapper windowWidth={this.props.windowWidth}>
            <div className='modal--title'>
              <div>
                <div>{`05:00 -> 07:00`}</div>
                <div>Tây Ninh - Quận 10, Hồ Chí Minh</div>
                <div>Limousine 9 chỗ</div>
              </div>
              <Button style={{ width: 88 }} onClick={this.closeModal} size='large' type='default'>
                Đóng
              </Button>
            </div>
            <Divider type='horizontal' style={{ margin: '16px 0px' }} />
            <div className='content-booking'>
              <div className='pickup-point-container'>
                <PickupPointContainer />
              </div>
              <div className='choose-seat-container'>
                <ChooseSeatContainer />
              </div>
            </div>
            <Divider dashed type='horizontal' style={{ margin: '16px 0px' }} />
            <div className='footer-booking'>
              <div className='footer-booking-left'>
                <span>Vé đã chọn</span>
                <div>
                  <h3>- - -</h3>
                </div>
              </div>
              <div className='footer-booking-right'>
                <div>
                  <span>Tổng tiền</span>
                  <div>
                    <h3>- - -</h3>
                  </div>
                </div>
                <Button style={{ marginLeft: 24 }} type='primary'>
                  Xác nhận đặt vé
                </Button>
              </div>
            </div>
          </BodyWrapper>
        </Modal>
      </div>
    )
  }
}
