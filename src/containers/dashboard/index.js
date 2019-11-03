import React from 'react'
// import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import Clearfix from 'src/components/elements/clearfix'
import styled from 'styled-components'

const DashBoardWrapper = styled.div``

class DashBoard extends React.Component {
  static propTypes = {}

  render() {
    return (
      <DashBoardWrapper>
        <Row gutter={8}>
          <Col span='12'>á ư</Col>
          <Col span='12'>á ư</Col>
        </Row>
        <Clearfix height={16} />
        <Row gutter={8}>
          <Col span='24'>á ư</Col>
        </Row>
      </DashBoardWrapper>
    )
  }
}

export default DashBoard
