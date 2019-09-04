import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon, Button, Row, Col, Modal, Divider } from 'antd'
import PickupPointContainer from './pickup-point-container'
import ChooseSeatContainer from './choose-seat.container'

const BodyWrapper = styled.div`
  flex: 1;
  .modal--title {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .content-booking {
    display: flex;
    .pickup-point-container {
      width: 250px;
    }

    .choose-seat-container {
      width: 100%;
    }
  }
`
export default class ModalBooking extends React.Component {
  static propTypes = {
    getRef: PropTypes.func
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
            // padding: windowWidth > 576 ? 24 : 12,
            maxWidth: 780
          }}
          visible={this.state.isOpenModal}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          closable={false}
        >
          <BodyWrapper>
            <div className='modal--title'>
              <div>
                <div>05:00 -> 07:00</div>
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
          </BodyWrapper>
        </Modal>
      </div>
    )
  }
}
