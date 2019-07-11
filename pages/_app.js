import React from 'react'
import App, { Container } from 'next/app'
import AppWithLayout from 'src/components/layout/default'
import withReduxStore from '../src/lib/with-redux-store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

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

  constructor(props) {
    super(props)
    this.persistor = persistStore(props.reduxStore)
  }

  render() {
    const { Component, pageProps, reduxStore, isNotHaveLayout } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <PersistGate loading={<Component {...pageProps} />} persistor={this.persistor}>
            {isNotHaveLayout ? (
              <Component {...pageProps} />
            ) : (
              <AppWithLayout>
                <Component {...pageProps} />
              </AppWithLayout>
            )}
          </PersistGate>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
