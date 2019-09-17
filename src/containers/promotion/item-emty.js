import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'
import IconSvg from 'icons'

const Wraper = styled.div`
  height: 230px;
  border-radius: 20px;
  border: dashed 1px #9ea7d0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .content--empty {
    max-width: 292px;
    text-align: center;

    .content--empty--text {
      font-family: myFont-Light;
      font-size: 1rem;
      font-weight: 300;
      color: #9ea7d0;
    }
  }
`

export default class componentName extends React.Component {
  render() {
    return (
      <Wraper>
        <div className='content--empty'>
          <div>
            <Icon style={{ fontSize: 56, marginBottom: 16 }} component={IconSvg.sale2} />
          </div>
          <div className='content--empty--text'>Chưa có chương trình khuyến mãi nào, vui lòng quay lại sau.</div>
        </div>
      </Wraper>
    )
  }
}
