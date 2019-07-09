import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import AppWithLayout from 'src/components/layout/default'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Provider>
          <AppWithLayout>
            <Component {...pageProps} />
          </AppWithLayout>
        </Provider>
      </Container>
    )
  }
}

export default MyApp
