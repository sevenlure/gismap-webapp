import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import slug from 'src/routes'
import { setAuthorizationforHeader } from 'src/constant/funcAixos.js'

const hocProtectLoginTemp = Component => {
  class hocProtectLogin extends React.Component {
    static async getInitialProps(appContext) {
      let appProps = !Component.getInitialProps ? {} : await Component.getInitialProps(appContext)
      return { ...appProps }
    }

    static propTypes = {
      isAuthenticated: PropTypes.bool,
      token: PropTypes.string
    }
    state = {
      isLoaded: false
    }

    componentDidMount() {
      const { isAuthenticated, token } = this.props
      if (!isAuthenticated) {
        console.log(isAuthenticated, 'isAuthenticated')
        Router.replace(slug.login)
      } else {
        setAuthorizationforHeader(token)
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
