import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Avatar, Icon } from 'antd'
import Icons from 'icons/index'
import windowSize from 'react-window-size'
import { connect } from 'react-redux'
// import { setVisibleEdituser } from 'src/redux/actions/generalAction'

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
const mapDispathToProps = {
  // setVisibleEdituser
}
@connect(
  () => ({}),
  mapDispathToProps
)
@windowSize
export default class AvatarUserV2 extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    // setVisibleEdituser: PropTypes.func
  }

  state = {}

  hanldeOnClickEdit = () => {
    // this.props.setVisibleEdituser(true)
  }

  render() {
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
      </AvatarUserWrapper>
    )
  }
}
