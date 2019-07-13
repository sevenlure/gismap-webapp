import React from 'react'
import { Button } from 'antd'
import Link from 'next/link'
import SelectQuanHuyen from 'src/components/elements/select-quan-huyen'
import SelectCoQuanCapPhep from 'src/components/elements/select-co-quan-cap-phep'

class Index extends React.Component {
  render() {
    return (
      <div>
        <div style={{ width: '400px' }}>
          <SelectQuanHuyen />
        </div>
        <div style={{ width: '400px' }}>
          <SelectCoQuanCapPhep />
        </div>
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
