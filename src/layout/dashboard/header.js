import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input, Avatar } from 'antd'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  padding: 8px 4px;
  align-items: center;
`

export default class HeaderContainer extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <div>
          <img height={42} src='/static/images/logo_withName.jpg' />
        </div>
        <div style={{ height: '100%', minWidth: 300 }}>
          <Input.Search
            placeholder='Enter a location'
            enterButton
            // size='large'
            onSearch={value => console.log(value)}
          />
        </div>
        <div>
          <span>HapbeeGis</span>
          <Avatar style={{ marginLeft: 8 }} src={'/static/images/avatar_default.png'} size='default' />
        </div>
      </HeaderWrapper>
    )
  }
}
