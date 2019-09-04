import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Radio, Input, Select, Card, Row, Col, Icon } from 'antd'
import IconSvg from 'icons'
import Clearfix from 'src/components/elements/clearfix'

const { Option } = Select

const Wrapper = styled.div`
  .title {
    font-family: myFont-Bold;
    font-size: 1.125rem;
    margin-bottom: 16px;
  }

  .seat {
    .seat-matrix {
      width: 142px;
    }
  }
`

const matrixObj = {
  ['1A']: { status: 3 },
  // ['1B']: { status: 0 },
  ['1C']: { status: 0 },
  ['1D']: { status: 2 },

  ['2A']: { status: 0 },
  ['2B']: { status: 0 },
  ['2C']: { status: 0 },
  // ['2D']: { status: 2 },

  ['3A']: { status: 0 },
  ['3B']: { status: 2 },
  ['3C']: { status: 0 },
  // ['3D']: { status: 2 },

  ['4A']: { status: 0 },
  ['4B']: { status: 0 },
  ['4C']: { status: 0 },
  ['4D']: { status: 2 },

  ['5A']: { status: 0 },
  ['5B']: { status: 0 },
  ['5C']: { status: 0 },
  ['5D']: { status: 0 }
}

const SEAT_ICON_FROM_STATUS = {
  0: IconSvg.seatOff,
  1: IconSvg.seatChoose,
  2: IconSvg.seatDisable,
  3: IconSvg.seatDriver
}

const IconFromMatrix = ({ matrix }) => {
  console.log('matrix', matrix)
  if (!matrix || matrix.status == null) return <div />
  return <Icon style={{ fontSize: 28 }} component={SEAT_ICON_FROM_STATUS[matrix.status]} />
}

export default class ChooseSeatContainer extends React.Component {
  state = {}

  render() {
    return (
      <Wrapper>
        <div className='title'>Chọn ghế xe</div>
        <Card title='Default size card'>
          <div className='seat'>
            <div className='seat-matrix'>
              {[1, 2, 3, 4, 5].map(row => {
                return (
                  <Row style={{ marginBottom: 20 }} key={row} gutter={16}>
                    <Col span={6}>
                      <IconFromMatrix matrix={matrixObj[`${row}A`]} />
                    </Col>
                    <Col span={6}>
                      <IconFromMatrix matrix={matrixObj[`${row}B`]} />
                    </Col>
                    <Col span={6}>
                      <IconFromMatrix matrix={matrixObj[`${row}C`]} />
                    </Col>
                    <Col span={6}>
                      <IconFromMatrix matrix={matrixObj[`${row}D`]} />
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
