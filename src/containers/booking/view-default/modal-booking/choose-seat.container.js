import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, Row, Col, Icon } from 'antd'
import IconSvg from 'icons'
// import Clearfix from 'src/components/elements/clearfix'

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

  .seat {
    display: flex;
    justify-content: space-between;
    margin-left: 24px;
    margin-right: 24px;
    .seat-matrix {
      width: 142px;
    }
  }
`

const matrixObj = {
  ['1-A']: { status: 3 },
  // ['1-B']: { status: 0 },
  ['1-C']: { status: 0 },
  ['1-D']: { status: 2 },

  ['2-A']: { status: 0 },
  ['2-B']: { status: 0 },
  ['2-C']: { status: 0 },
  // ['2-D']: { status: 2 },

  ['3-A']: { status: 0 },
  ['3-B']: { status: 2 },
  ['3-C']: { status: 0 },
  // ['3-D']: { status: 2 },

  ['4-A']: { status: 0 },
  ['4-B']: { status: 0 },
  ['4-C']: { status: 0 },
  ['4-D']: { status: 2 },

  ['5-A']: { status: 0 },
  ['5-B']: { status: 0 },
  ['5-C']: { status: 0 },
  ['5-D']: { status: 0 }
}

const SEAT_ICON_FROM_STATUS = {
  0: IconSvg.seatOff,
  1: IconSvg.seatChoose,
  2: IconSvg.seatDisable,
  3: IconSvg.seatDriver
}

const IconFromMatrix = ({ matrix, col, row }) => {
  if (!matrix || matrix.status == null) return <div />
  return <Icon style={{ fontSize: 28 }} component={SEAT_ICON_FROM_STATUS[matrix.status]} />
}

const TitleCard = () => {
  return (
    <Row gutter={8}>
      <Col span={6}>
        <Icon style={{ fontSize: 18 }} component={SEAT_ICON_FROM_STATUS[3]} />
        <span style={{ fontSize: '1rem' }}> Tài xế</span>
      </Col>
      <Col span={6}>
        <Icon style={{ fontSize: 18 }} component={SEAT_ICON_FROM_STATUS[2]} />
        <span style={{ fontSize: '1rem' }}> Đã đặt</span>
      </Col>
      <Col span={6}>
        <Icon style={{ fontSize: 18 }} component={SEAT_ICON_FROM_STATUS[1]} />
        <span style={{ fontSize: '1rem' }}> Đang chọn</span>
      </Col>
      <Col span={6}>
        <Icon style={{ fontSize: 18 }} component={SEAT_ICON_FROM_STATUS[0]} />
        <span style={{ fontSize: '1rem' }}> Còn trống</span>
      </Col>
    </Row>
  )
}

export default class ChooseSeatContainer extends React.Component {
  state = {}

  render() {
    return (
      <Wrapper>
        <div className='title'>Chọn ghế xe</div>
        <Card bodyStyle={{ padding: '16px 24px 16px 24px' }} title={<TitleCard />}>
          <div className='seat'>
            <div className='seat-matrix'>
              <strong>Tầng dưới</strong>
              <Clearfix height={12} />
              {[1, 2, 3, 4, 5].map(row => {
                return (
                  <Row style={{ marginBottom: 20 }} key={row} gutter={16}>
                    <Col span={6}>
                      <IconFromMatrix row={row} col='A' matrix={matrixObj[`${row}-A`]} />
                    </Col>
                    <Col span={6}>
                      <IconFromMatrix row={row} col='B' matrix={matrixObj[`${row}-B`]} />
                    </Col>
                    <Col span={6}>
                      <IconFromMatrix row={row} col='C' matrix={matrixObj[`${row}-C`]} />
                    </Col>
                    <Col span={6}>
                      <IconFromMatrix row={row} col='D' matrix={matrixObj[`${row}-D`]} />
                    </Col>
                  </Row>
                )
              })}
            </div>
            <div className='seat-matrix'>
              <strong>Tầng trên</strong>
              <Clearfix height={12} />
              {[1, 2, 3, 4, 5].map(row => {
                return (
                  <Row style={{ marginBottom: 20 }} key={row} gutter={16}>
                    <Col span={6}>
                      <IconFromMatrix row={row} col='A' matrix={matrixObj[`${row}-A`]} />
                    </Col>
                    <Col span={6}>
                      <IconFromMatrix row={row} col='B' matrix={matrixObj[`${row}-B`]} />
                    </Col>
                    <Col span={6}>
                      <IconFromMatrix row={row} col='C' matrix={matrixObj[`${row}-C`]} />
                    </Col>
                    <Col span={6}>
                      <IconFromMatrix row={row} col='D' matrix={matrixObj[`${row}-D`]} />
                    </Col>
                  </Row>
                )
              })}
            </div>
          </div>
        </Card>
      </Wrapper>
    )
  }
}
