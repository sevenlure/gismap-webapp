import React from 'react'
import App, { Container } from 'next/app'
import AppWithLayout from 'src/components/layout/default'
import withReduxStore from '../src/lib/with-redux-store'
import { Provider } from 'react-redux'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <AppWithLayout>
            <Component {...pageProps} />
          </AppWithLayout>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
