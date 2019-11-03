import React from 'react'
// import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import Clearfix from 'src/components/elements/clearfix'
import styled from 'styled-components'

const DashBoardWrapper = styled.div`
  .card {
    background: #fff;
    margin-right: 10px;
  }
`

class DashBoard extends React.Component {
  static propTypes = {}

  render() {
    return (
      <DashBoardWrapper>
        <Row>
          <Col span={12}>
            <div className='card'></div>
          </Col>
          <Col span={12}>
            <div className='card'></div>
          </Col>
        </Row>
        <Clearfix height={16} />
        <Row gutter={8}>
          <Col span={24}>
            <div className='card'></div>
          </Col>
        </Row>
      </DashBoardWrapper>
    )
  }
}

export default DashBoard
