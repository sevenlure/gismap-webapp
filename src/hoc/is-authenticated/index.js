import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'
// import redirect from 'src/lib/redirect'
// import slug from 'src/routes'

const hocProtectLoginTemp = Component => {
  class hocProtectLogin extends React.Component {
    static async getInitialProps(appContext) {
      let appProps = !Component.getInitialProps ? {} : await Component.getInitialProps(appContext)
      return { ...appProps }
    }

    static propTypes = {
      isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
      // console.log(this.props, 'isAutheted')
      const { isAuthenticated } = this.props
      console.log(isAuthenticated, 'isAutheted')

      // if (!isAuthenticated) {
      //   redirect({}, slug.login)
      // }
    }

    render() {
      return <Component {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: _get(state, 'AuthStore.isAuthenticated')
  })

  return connect(mapStateToProps)(hocProtectLogin)
}

export default hocProtectLoginTemp
