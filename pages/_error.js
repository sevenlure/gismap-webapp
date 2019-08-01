import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import Clearfix from 'src/components/elements/clearfix'
import EmptyLayout from 'src/layout/empty'
import Router from 'next/router'
import slug from 'src/routes'

const ErrorWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
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
          <Button
            type='primary'
            onClick={() => {
              Router.push(slug.basic)
            }}
          >
            Về trang chủ
          </Button>
        </div>
      </ErrorWrapper>
    )
  }
}
Error.Layout = EmptyLayout
export default Error
