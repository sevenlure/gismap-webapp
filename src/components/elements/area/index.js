import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Clearfix from 'src/components/elements/clearfix'
import { COLOR } from 'src/constant/theme'

const AreaCotainer = styled.div`
  position: relative;
  width: 100%;
  font-size: 14px;
  border-radius: 0 0 2px 2px;
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
  // border: 2px solid #ebedf0;
`

const Title = styled.div`
  position: absolute;
  top: -4px;
  // margin-left: 16px;
  // padding: 1px 8px;
  color: #777;
  background: #fff;
  border-radius: 2px 2px 0 0;
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
  color: ${COLOR.TITLE};
  font-size: 20px;
  font-weight: 500;
`

export default class AreaComponent extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string
  }
  render() {
    return (
      <AreaCotainer>
        <Clearfix height={8} />
        <Title>{this.props.title}</Title>
        <div style={{ padding: 16 }}>
          <Clearfix height={8} />
          {this.props.children}
        </div>
      </AreaCotainer>
    )
  }
}
