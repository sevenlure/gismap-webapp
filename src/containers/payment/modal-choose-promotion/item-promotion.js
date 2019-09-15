import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Divider } from 'antd'
import posed from 'react-pose'
import windowSize from 'react-window-size'
import moment from 'moment'
import { DATE_FORMAT } from 'src/config/format'
import { map as _map } from 'lodash-es'

const DetailContainer = posed.div({
  enter: { height: 'auto', opacity: 1, marginBottom: 12 },
  exit: { opacity: 0, height: '0px', marginBottom: 0 }
})

const Wraper = styled.div`
  min-height: 180px;
  border: solid 1px #e6e6e6;
  border-radius: 12px;
  margin-bottom: 20px;
  position: relative;

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
      left: -10px;
      transform: translate(0px, -10px) rotate(45deg);
    }

    &.right-rotated {
      right: -10px;
      transform: translate(0px, -10px) rotate(-135deg);
    }
  }

  .body {
    /* height: ${props => (props.isMobileView ? '160px' : '130px')}; */
    display: flex;
    justify-content: space-between;
    padding: ${props => (props.isMobileView ? '20px 20px 20px 20px' : '20px 20px 20px 40px')};

    .body-left {
      margin-right: 8px;
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
      text-align: ${props => (props.isMobileView ? 'right' : '')};
      width: ${props => (props.isMobileView ? '120px' : '')};
      button {
        width: 90px;
        height: 40px;
        margin-right: ${props => (props.isMobileView ? '' : '16px')};
        :not(.ant-btn-primary) {
          margin-bottom: 16px;
        }
        border: none;
        span {
          font-family: myFont-Medium;
        }
        &:not(.ant-btn-primary) {
          border: solid 1px #9ea7d0;
          color: #9ea7d0;
        }
      }
    }
  }
  .footer {
    padding-left: ${props => (props.isMobileView ? '20px' : '40px')};
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

@windowSize
export default class ItemPromotion extends React.Component {
  static propTypes = {
    windowWidth: PropTypes.number,
    item: PropTypes.object.isRequired,
    onChange: PropTypes.func
  }

  state = {
    isDetail: false
  }
  handleOnClick = (item)=>{
    if(this.props.onChange){
      this.props.onChange(item)
    }
  }
  render() {
    const { item } = this.props
    const isMobileView = this.props.windowWidth < 600 ? true : false
    const { isDetail } = this.state
    const labelButton = isDetail ? 'Rút gọn' : 'Chi tiết'
    return (
      <Wraper isMobileView={isMobileView}>
        <div className='body'>
          <div className='body-left'>
            <div>
              <strong>{item.code}</strong>
            </div>
            <div className='body-left-discount'>{item.discount}%</div>
            <div className='body-left-description'>
              <span>{item.description}</span>
            </div>
          </div>
          <div className='body-right'>
            <Button
              onClick={() => {
                this.setState({ isDetail: !isDetail })
              }}
            >
              {labelButton}
            </Button>
            <Button onClick={()=>this.handleOnClick(item)} type='primary'>Sử dụng</Button>
          </div>
        </div>
        <div className='half-circle left-rotated' />
        <div className='half-circle right-rotated' />
        <Divider dashed style={{ marginTop: 0, marginBottom: 12 }} />
        <div className='footer'>
          <DetailContainer key='detail' pose={isDetail ? 'enter' : 'exit'}>
            <div className='footer-title'>Điều kiện:</div>
            {_map(item.detailInfo, (strItem, index) => {
              return <div key={index}>- {strItem}.</div>
            })}
          </DetailContainer>
          <div className='footer-end'>
            <span>Hạn sử dụng: {moment(item.expire).format(DATE_FORMAT)}</span>
          </div>
        </div>
      </Wraper>
    )
  }
}
