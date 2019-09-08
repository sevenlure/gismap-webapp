import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Divider } from 'antd'

const Wraper = styled.div`
  height: 195px;
  border: solid 1px #e6e6e6;
  border-radius: 12px;

  .half-circle {
    position: absolute;
    background-color: #fff;
    z-index: 2;
    bottom: 77px;
    width: 20px;
    height: 20px;
    border: solid 1px #e6e6e6;
    border-radius: 50%;
    border-bottom-color: transparent;
    border-left-color: transparent;
    &.left-rotated {
      left: 14px;
      transform: rotate(45deg);
    }

    &.right-rotated {
      right: 14px;
      transform: rotate(-135deg);
    }
  }

  .body {
    height: 130px;
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 20px 40px;

    .body-left {
      .body-left-discount {
        font-size: 1.75rem;
        font-weight: bold;
        color: #3880ff;
      }
      .body-left-description {
        font-size: 1rem;
        color: #9ea7d0;
      }
    }
    .body-right {
    }
  }
  .footer {
  }
`

export default class ItemPromotion extends React.Component {
  render() {
    return (
      <Wraper>
        <div className='body'>
          <div className='body-left'>
            <div>
              <strong>DATVEXE50</strong>
            </div>
            <div className='body-left-discount'>50%</div>
            <div className='body-left-description'>
              <span>Giảm 50% trên tổng tiền đặt vé</span>
            </div>
          </div>
          <div className='body-right'>
            <Button style={{ marginRight: 16 }}>Chi tiết</Button>
            <Button type='primary'>Sử dụng</Button>
          </div>
        </div>
        <div className='half-circle left-rotated' />
        <div className='half-circle right-rotated' />
        <Divider dashed style={{ marginTop: 0 }} />
        <div className='footer'></div>
      </Wraper>
    )
  }
}
