import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import { Menu, Avatar, Dropdown, Icon } from 'antd'
import { connect } from 'react-redux'
import { get as _get } from 'lodash-es'
import { userLogout } from 'src/redux/actions/authAction'
import { clearUserInfo } from 'src/redux/actions/generalAction.js'
// import Router from 'next/router'
// import slug from 'src/routes'

@connect(
  state => ({
    name: _get(state, 'GeneralStore.userInfo.name', '')
  }),
  {
    userLogout,
    clearUserInfo
  }
)
export default class AvatarUser extends React.Component {
  static propTypes = {
    // name: PropTypes.string,
    userLogout: PropTypes.func,
    clearUserInfo: PropTypes.func,
    disabled: PropTypes.bool
  }

  state = {
    isVisible: false
  }

  render() {
    // const { name } = this.props
    return (
      <div>
        <Dropdown
          trigger={['click']}
          disabled={this.props.disabled}
          overlay={
            <Menu>
              {/* <Menu.Item
                onClick={() => {
                  this.ModalChangePassword.openModal()
                }}
                key='0'
              >
                <Icon type='lock' />
                Đổi mật khẩu
              </Menu.Item> */}
              <Menu.Item
                key='1'
                onClick={() => {
                  // Router.replace(slug.login)
                  this.props.userLogout()
                  this.props.clearUserInfo()
                }}
              >
                <Icon type='logout' />
                Đăng xuất
              </Menu.Item>
            </Menu>
          }
        >
          <div>
            {/* <strong style={{ marginRight: 16, color: '#4c4c4c' }}>{name}</strong> */}
            <Avatar
              src='/static/images/avatar_default.png'
              style={{ backgroundColor: '', cursor: 'pointer' }}
              size={44}
            />
          </div>
        </Dropdown>
      </div>
    )
  }
}
