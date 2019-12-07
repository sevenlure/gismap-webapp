import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu, Dropdown, Icon } from 'antd'
import Flag from 'react-flags'

import 'react-flags-select/css/react-flags-select.css'

const FlagUS = ({ marginRight, height }) => (
  <img style={{ marginRight: marginRight || 8 }} height={height || 24} src='/static/flags/US.png' alt='US Flag' />
)
const FlagUK = ({ marginRight, height }) => (
  <img style={{ marginRight: marginRight || 8 }} height={height || 24} src='/static/flags/UK.png' alt='UK Flag' />
)
const FlagVN = ({ marginRight, height }) => (
  <img
    style={{ marginRight: marginRight || 2, marginLeft: -6 }}
    height={height || 30}
    src='/static/flags/VN.png'
    alt='VN Flag'
  />
)
export default class componentName extends React.Component {
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

  // <Flags name='US' format='svg' height={16} shiny={true} basePath='/static/flags' alt='Vn Flag' />
  // <span style={{ marginLeft: 8 }} />
  // <Flag name='VN' format='svg' height={16} shiny={true} basePath='/static/flags' alt='Eng Flag' />
  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <Dropdown overlay={this.menu} trigger={['click']}>
          {/* <a className='ant-dropdown-link' href='#'>
            Click me <Icon type='down' />
          </a> */}
          <span>
            <FlagVN marginRight={-1} height={30} /> <Icon type='down' />
          </span>
        </Dropdown>
      </div>
    )
  }
}
