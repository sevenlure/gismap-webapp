import React from 'react'
import App, { Container } from 'next/app'
import { PageTransition } from 'next-page-transitions'
// import { Icon } from 'antd'
import { getOrCreateStore } from '../src/lib/with-redux-store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from 'src/components/loading-screen'
import 'src/less/app.less'

const reduxStore = getOrCreateStore()


class MyApp extends App {
  constructor(props) {
    super(props)
    // this.persistor = persistStore(props.reduxStore)
    this.reduxStore = reduxStore
    this.persistor = persistStore(reduxStore)
  }

  componentDidMount() {
    // MARK  hạn chế Modal Alert authen nhìu lần
    window.isAlertModalErr = false
    window.dispatch = this.reduxStore.dispatch
  }

  render() {
    const { Component, pageProps } = this.props
    const Layout = Component.Layout
    return (
      <Container>
        <Provider store={reduxStore}>
          <PersistGate loading={<Loader />} persistor={this.persistor}>
            <Layout>
              <PageTransition timeout={200} classNames='page-transition'>
                <Component {...pageProps} />
              </PageTransition>
            </Layout>
          </PersistGate>
        </Provider>
      </Container>
    )
  }
}

export default MyApp
