import React from 'react'
import { Button } from 'antd'
import hocProtectLogin from 'src/hoc/is-authenticated'
// import { connect } from 'react-redux'
// import { get as _get } from 'lodash'

// c
// @connect(state => ({
//   isAuthenticated: _get(state, 'AuthStore.isAuthenticated')
// }))
@hocProtectLogin
class Index extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Button>abc</Button>
      </div>
    )
  }
}
export default Index
