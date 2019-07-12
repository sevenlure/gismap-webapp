import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import Clearfix from 'src/components/elements/clearfix'

const ErrorWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

class Error extends React.Component {
  render() {
    return (
      <ErrorWrapper>
        <div>
          <img src='/static/images/404.svg/' />
        </div>
        <Clearfix height={8} />
        <div>
          <h2>404</h2>
        </div>
        <div>
          <span> Sorry, the page you visited does not exist.</span>
        </div>
        <Clearfix height={8} />
        <div>
          <Button type='primary'> Về trang chủ</Button>
        </div>
      </ErrorWrapper>
    )
  }
}
export default Error
