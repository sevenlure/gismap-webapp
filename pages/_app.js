import React from 'react'
import App, { Container } from 'next/app'
import AppWithLayout from 'src/components/layout/default'
import withReduxStore from '../src/lib/with-redux-store'
import { Provider } from 'react-redux'

const SLUG_NOT_HAVE_LAYOUT = ['/user/login']

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let isNotHaveLayout = SLUG_NOT_HAVE_LAYOUT.includes(ctx.pathname)

    return { pageProps, isNotHaveLayout }
  }

  render() {
    const { Component, pageProps, reduxStore, isNotHaveLayout } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          {isNotHaveLayout ? (
            <Component {...pageProps} />
          ) : (
            <AppWithLayout>
              <Component {...pageProps} />
            </AppWithLayout>
          )}
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
