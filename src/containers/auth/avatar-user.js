import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Avatar, Dropdown, Icon, Modal } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { get as _get } from 'lodash-es'
import { userLogout } from 'src/redux/actions/authAction'
import { clearUserInfo } from 'src/redux/actions/generalAction.js'
// import { setVisibleEdituser } from 'src/redux/actions/generalAction'
import Router from 'next/router'
import slug from 'src/routes'
import ChangePassword from 'src/containers/change-password/index'

const AvatarUserWrapper = styled.div`
  padding: 0px 12px;

  .user--info {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .name--user {
    padding-right: 8px;
  }
`

@connect(
  state => ({
    FirstName: _get(state, 'GeneralStore.userInfo.FirstName', ''),
    userInfo: _get(state, 'GeneralStore.userInfo', '')
  }),
  {
    userLogout,
    clearUserInfo
    // setVisibleEdituser
  }
)
export default class AvatarUser extends React.Component {
  static propTypes = {
    FirstName: PropTypes.string,
    userLogout: PropTypes.func,
    clearUserInfo: PropTypes.func,
    disabled: PropTypes.bool,
    userInfo: PropTypes.object
  }

  state = {
    isChangePassWord: false
  }

  render() {
    // const { name } = this.props
    return (
      <AvatarUserWrapper>
        <Dropdown
          trigger={['click']}
          disabled={this.props.disabled}
          overlay={
            <Menu>
              <Menu.Item
                key='2'
                onClick={() => {
                  this.setState({
                    isChangePassWord: true
                  })
                }}
              >
                <Icon type='lock' />
                Đổi mật khẩu
              </Menu.Item>
              <Menu.Item
                key='3'
                onClick={() => {
                  Router.replace(slug.login)
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
          <div className='user--info' style={{ cursor: 'pointer' }}>
            <div>
              <span className='name--user antd-pro-components-global-header-index-name'>{this.props.FirstName}</span>
            </div>
            <div>
              <Avatar src='/static/images/avatar_default.png' size={32} />
            </div>
          </div>
        </Dropdown>
        <Modal
          // width='70%'
          visible={this.state.isChangePassWord}
          footer={null}
          centered
          closeIcon={<span />}
          closable={false}
        >
          {/* // NOTE edit */}
          <ChangePassword
            rule={this.state.rule}
            isUser={false}
            onCancel={this.hanldleOnCancel}
            onSuccess={() => {
              this.hanldleOnCancel()
              Router.replace(slug.login)
              this.props.userLogout()
              this.props.clearUserInfo()
            }}
            initialData={this.props.userInfo}
          />
        </Modal>
      </AvatarUserWrapper>
    )
  }

  hanldleOnCancel = () => {
    this.setState({
      isChangePassWord: false
    })
  }
}
