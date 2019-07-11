import React from 'react'
import redirect from 'src/lib/redirect'
import { get as _get} from 'lodash'
import slug from 'src/routes'


const hocProtectLogin = Component => {

  return class hocProtectLogin extends React.Component {
    
     static getInitialProps (appContext) {
        const { AuthStore } = appContext.reduxStore.getState()
        const isAuthenticated = _get(AuthStore,'isAuthenticated',false)

      if (!isAuthenticated) {
        if (!process.browser) {
          redirect(appContext, slug.login)
        } else {
          redirect({}, slug.login)
        }
      }
      let appProps = !Component.getInitialProps
        ? {}
        :  Component.getInitialProps(appContext)
      return appProps
    }
    render () {
      return <Component {...this.props} />
    }
  }
}

export default hocProtectLogin
