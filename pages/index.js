import React from 'react'
import { Button } from 'antd'
import Link from 'next/link'

class Index extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Button type='primary'>
          <Link prefetch href='/manager'>
            <a>ss</a>
          </Link>
        </Button>
      </div>
    )
  }
}
export default Index
