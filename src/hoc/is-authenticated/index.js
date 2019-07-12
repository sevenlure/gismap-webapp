import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import slug from 'src/routes'

const hocProtectLoginTemp = Component => {
  class hocProtectLogin extends React.Component {
    static async getInitialProps(appContext) {
      let appProps = !Component.getInitialProps ? {} : await Component.getInitialProps(appContext)
      return { ...appProps }
    }

    static propTypes = {
      isAuthenticated: PropTypes.bool
    }
    state = {
      isLoaded: false
    }

    UNSAFE_componentWillMount() {
      const { isAuthenticated } = this.props
      if (!isAuthenticated) {
        // console.log(isAuthenticated, 'isAuthenticated')
        Router.replace(slug.login)
      } else {
        this.setState({
          isLoaded: true
        })
      }
    }

    render() {
      return this.state.isLoaded ? <Component {...this.props} /> : null
    }
  }
  return hocProtectLogin
}

export default hocProtectLoginTemp
