import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { Menu, Dropdown, Icon } from 'antd'

// const FlagUS = ({ marginRight, height }) => (
//   <img style={{ marginRight: marginRight || 8 }} height={height || 24} src='/static/flags/US.png' alt='US Flag' />
// )
const FlagUK = ({ marginRight, height }) => (
  <img style={{ marginRight: marginRight || 8 }} height={height || 24} src='/static/flags/UK.png' alt='UK Flag' />
)
FlagUK.propTypes = {
  marginRight: PropTypes.number,
  height: PropTypes.number
}

const FlagVN = ({ marginRight, height }) => (
  <img
    style={{ marginRight: marginRight || 2, marginLeft: -6 }}
    height={height || 30}
    src='/static/flags/VN.png'
    alt='VN Flag'
  />
)
FlagVN.propTypes = {
  marginRight: PropTypes.number,
  height: PropTypes.number
}

export default class SelectLang extends React.Component {
  menu = (
    <Menu style={{ width: 200 }}>
      <Menu.Item key='0' style={{ display: 'flex', alignItems: 'center' }}>
        <FlagUK /> <span>English</span>
      </Menu.Item>
      <Menu.Item key='1' style={{ display: 'flex', alignItems: 'center' }}>
        <FlagVN /> <span>Tiếng việt</span>
      </Menu.Item>
    </Menu>
  )

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <Dropdown overlay={this.menu} trigger={['click']}>
          {/* <a className='ant-dropdown-link' href='#'>
            Click me <Icon type='down' />
          </a> */}
          <span>
            <FlagUK marginRight={-1} height={30} /> <Icon type='down' />
          </span>
        </Dropdown>
      </div>
    )
  }
}
