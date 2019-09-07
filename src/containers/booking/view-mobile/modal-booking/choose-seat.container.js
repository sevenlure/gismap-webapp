import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, Row, Col, Icon } from 'antd'
import IconSvg from 'icons'
import Clearfix from 'src/components/elements/clearfix'
import IconSeat from 'src/components/elements/icon-seat'
import { connect } from 'react-redux'
import { get as _get } from 'lodash-es'
// const { Option } = Select

const Wrapper = styled.div`
  .title {
    font-family: myFont-Bold;
    font-size: 1.125rem;
    margin-bottom: 16px;
  }
  .anticon {
    cursor: pointer;
  }

  .ant-card.ant-card-bordered {
    .ant-card-head {
      zoom: 0.6;
    }
    .ant-card-body {
      zoom: 0.75;
    }
  }

  .seat {
    display: flex;
    justify-content: space-between;
    margin-left: 8px;
    margin-right: 8px;
    .seat-matrix {
      width: 142px;
    }
  }
`

// const matrixObj = {
//   ['1-A']: { status: 3 },
//   // ['1-B']: { status: 0 },
//   ['1-C']: { status: 0 },
//   ['1-D']: { status: 2 },

//   ['2-A']: { status: 0 },
//   ['2-B']: { status: 0 },
//   ['2-C']: { status: 0 },
//   // ['2-D']: { status: 2 },

//   ['3-A']: { status: 0 },
//   ['3-B']: { status: 2 },
//   ['3-C']: { status: 0 },
//   // ['3-D']: { status: 2 },

//   ['4-A']: { status: 0 },
//   ['4-B']: { status: 0 },
//   ['4-C']: { status: 0 },
//   ['4-D']: { status: 2 },

//   ['5-A']: { status: 0 },
//   ['5-B']: { status: 0 },
//   ['5-C']: { status: 0 },
//   ['5-D']: { status: 0 }
// }

const SEAT_ICON_FROM_STATUS = {
  0: IconSvg.seatOff,
  1: IconSvg.seatChoose,
  2: IconSvg.seatDisable,
  3: IconSvg.seatDriver
}

const IconFromMatrix = ({ matrix }) => {
  if (!matrix || matrix.status == null) return <div />
  return <Icon style={{ fontSize: 28 }} component={SEAT_ICON_FROM_STATUS[matrix.status]} />
}
IconFromMatrix.propTypes = {
  matrix: PropTypes.any
}

const TitleCard = () => {
  return (
    <Row gutter={8}>
      <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
        <IconSeat zoom={0.8} matrix={{ status: 3 }} />
        <span style={{ marginLeft: 4, fontSize: '0.75rem' }}> Tài xế</span>
      </Col>
      <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
        <IconSeat zoom={0.8} matrix={{ status: 2 }} />
        <span style={{ marginLeft: 4, fontSize: '0.75rem' }}> Đã đặt</span>
      </Col>
      <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
        <IconSeat zoom={0.8} matrix={{ status: 1 }} />
        <span style={{ marginLeft: 4, fontSize: '0.75rem' }}> Đang chọn</span>
      </Col>
      <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
        <IconSeat zoom={0.8} matrix={{ status: 0 }} />
        <span style={{ marginLeft: 4, fontSize: '0.75rem' }}> Còn trống</span>
      </Col>
    </Row>
  )
}

const mapStateToProps = state => ({
  seatDiagramDown: _get(state, 'BookingStore.BookingNow.seatDiagramDown'),
  seatDiagramUp: _get(state, 'BookingStore.BookingNow.seatDiagramUp')
})

const mapDispatchToProps = {}

// MARK  this.ModalBooking nắm ref của modal-booking
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class ChooseSeatContainer extends React.Component {
  static propTypes = {
    seatDiagramDown: PropTypes.object,
    seatDiagramUp: PropTypes.object
  }

  state = {}

  render() {
    const { seatDiagramDown, seatDiagramUp } = this.props
    const isHave2Floor = seatDiagramUp ? true : false

    let styleHave1Floor = {}
    if (!isHave2Floor) {
      styleHave1Floor.display = 'flex'
      styleHave1Floor.justifyContent = 'center'
    }

    return (
      <Wrapper>
        <div className='title'>Chọn ghế xe</div>
        <Card bodyStyle={{ padding: '8px 12px 8px 12px' }} title={<TitleCard />}>
          <div style={{ ...styleHave1Floor }} className='seat'>
            <div className='seat-matrix'>
              {isHave2Floor && <strong>Tầng dưới</strong>}
              <Clearfix height={12} />
              {[1, 2, 3, 4, 5].map(row => {
                return (
                  <Row style={{ marginBottom: 20 }} key={row} gutter={16}>
                    <Col span={6}>
                      <IconSeat name={`${row}A`} row={row} col='A' matrix={seatDiagramDown[`${row}-A`]} />
                    </Col>
                    <Col span={6}>
                      <IconSeat name={`${row}B`} row={row} col='B' matrix={seatDiagramDown[`${row}-B`]} />
                    </Col>
                    <Col span={6}>
                      <IconSeat name={`${row}C`} row={row} col='C' matrix={seatDiagramDown[`${row}-C`]} />
                    </Col>
                    <Col span={6}>
                      <IconSeat name={`${row}D`} row={row} col='D' matrix={seatDiagramDown[`${row}-D`]} />
                    </Col>
                  </Row>
                )
              })}
            </div>
            {isHave2Floor && (
              <div className='seat-matrix'>
                {isHave2Floor && <strong>Tầng trên</strong>}
                <Clearfix height={12} />
                {[6, 7, 8, 9, 10].map(row => {
                  return (
                    <Row style={{ marginBottom: 20 }} key={row} gutter={16}>
                      <Col span={6}>
                        <IconSeat name={`${row}A`} row={row} col='A' matrix={seatDiagramUp[`${row}-A`]} />
                      </Col>
                      <Col span={6}>
                        <IconSeat name={`${row}B`} row={row} col='B' matrix={seatDiagramUp[`${row}-B`]} />
                      </Col>
                      <Col span={6}>
                        <IconSeat name={`${row}C`} row={row} col='C' matrix={seatDiagramUp[`${row}-C`]} />
                      </Col>
                      <Col span={6}>
                        <IconSeat name={`${row}D`} row={row} col='D' matrix={seatDiagramUp[`${row}-D`]} />
                      </Col>
                    </Row>
                  )
                })}
              </div>
            )}{' '}
          </div>
        </Card>
      </Wrapper>
    )
  }
}
