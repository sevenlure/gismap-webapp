import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Avatar, Icon, Modal } from 'antd'
import Icons from 'icons/index'
import windowSize from 'react-window-size'
import EditUser from 'src/containers/auth/edit-user'

// import { get as _get } from 'lodash-es'
// import Router from 'next/router'
// import slug from 'src/routes'

const AvatarUserWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  // NOTE  avatar
  .avatar__border {
    position: relative;
    background: conic-gradient(#fff, #dde8fc, #3880ff);
    padding: 3px;
    border-radius: 50%;
  }

  .avatar__icon {
    position: absolute;
    cursor: pointer;
    top: 25%;
    right: -40px;
    width: 36px;
    height: 36px;
    background-color: #f2f3f7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
`
@windowSize
export default class AvatarUserV2 extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number
  }

  state = {
    isEdit: true
  }

  hanldeOnClickEdit = () => {
    this.setState({
      isEdit: true
    })
  }

  getStyleReponsive = () => {
    const { windowWidth } = this.props
    let style
    if (windowWidth >= 992) {
      style = {
        width: 968,
        bodyStyle: {
          padding: '30px 70px'
        }
      }
    } else if (windowWidth >= 576) {
      style = {
        width: 500,
        bodyStyle: {
          padding: '30px 70px'
        }
      }
    } else if (windowWidth < 576) {
      style = {}
    }
    return {
      ...style
    }
  }

  render() {
    const { windowWidth } = this.props
    return (
      <AvatarUserWrapper>
        <div className='avatar__border'>
          <Avatar
            src='/static/images/avatar_default.png'
            style={{ backgroundColor: '', cursor: 'pointer' }}
            size={74}
          />
          <div className='avatar__icon'>
            <div>
              <Icon onClick={this.hanldeOnClickEdit} style={{ fontSize: '1.5rem' }} component={Icons.edit} />
            </div>
          </div>
        </div>

        <Modal
          visible={this.state.isEdit}
          footer={null}
          centered
          closeIcon={<span />}
          // onCancel={
          //   () => this.props.setVisibleRegister(false)
          // }
          // wrapClassName='register--modal'
          closable={false}
          {...this.getStyleReponsive()}
          width='100%'
          style={{
            padding: windowWidth > 576 ? 24 : 12,
            maxWidth: 968
          }}
        >
          <EditUser handleCancel={() =>{
            this.setState({
              isEdit: false
            })
          }} />
        </Modal>
      </AvatarUserWrapper>
    )
  }
}
