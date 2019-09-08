import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Divider } from 'antd'
import posed from 'react-pose'

const DetailContainer = posed.div({
  enter: { height: 'auto', opacity: 1, marginBottom: 12 },
  exit: { opacity: 0, height: '0px', marginBottom: 0 }
})

const Wraper = styled.div`
  min-height: 180px;
  border: solid 1px #e6e6e6;
  border-radius: 12px;

  .half-circle {
    position: absolute;
    background-color: #fff;
    z-index: 2;
    width: 20px;
    height: 20px;
    border: solid 1px #e6e6e6;
    border-radius: 50%;
    border-bottom-color: transparent;
    border-left-color: transparent;
    &.left-rotated {
      left: 14px;
      transform: translate(0px, -10px) rotate(45deg);
    }

    &.right-rotated {
      right: 14px;
      transform: translate(0px, -10px) rotate(-135deg);
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
    padding-left: 40px;
    .footer-title {
      font-size: 18px;
      font-family: myFont-Bold;
      color: #4c4c4c;
    }
    .footer-end {
      // margin-top: 12px;
      margin-bottom: 12px;
    }
  }
`

export default class ItemPromotion extends React.Component {
  state = {
    isDetail: false
  }
  render() {
    const { isDetail } = this.state
    const labelButton = isDetail ? 'Rút gọn' : 'Chi tiết'
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
            <Button
              style={{ marginRight: 16 }}
              onClick={() => {
                this.setState({ isDetail: !isDetail })
              }}
            >
              {labelButton}
            </Button>
            <Button type='primary'>Sử dụng</Button>
          </div>
        </div>
        <div className='half-circle left-rotated' />
        <div className='half-circle right-rotated' />
        <Divider dashed style={{ marginTop: 0, marginBottom: 12 }} />
        <div className='footer'>
          <DetailContainer key='detail' pose={isDetail ? 'enter' : 'exit'}>
            <div className='footer-title'>Điều kiện:</div>
            <div>- Áp dụng cho các ngày thứ 7, chủ nhật.</div>
            <div>- Giảm tối đa 100,000 đ.</div>
            <div>- Mỗi khách hàng sử dụng tối đa 1 lần.</div>
          </DetailContainer>
          <div className='footer-end'>
            <span>Hạn sử dụng: 30/8/2019</span>
          </div>
        </div>
      </Wraper>
    )
  }
}
