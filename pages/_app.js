import React from 'react'
import App, { Container } from 'next/app'
import { PageTransition } from 'next-page-transitions'
// import { Icon } from 'antd'
import { getOrCreateStore } from '../src/lib/with-redux-store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from 'src/components/loading-screen'

// import 'src/less/font.less'
import 'antd/dist/antd.css'
import 'src/less/app.less'
import 'src/less/responsive.less'
import 'react-leaflet-markercluster/dist/styles.min.css'

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
    // if (navigator.userAgent.includes('Windows')) document.documentElement.style.fontSize = '18px'
    // console.log('navigator.userAgent',navigator.userAgent,document.documentElement.style.fontSize )
  }

  render() {
    const { Component, pageProps, router } = this.props
    const Layout = Component.Layout

    // console.log(router,"router.router")
    return (
      <Container>
        <Provider store={reduxStore}>
          <PersistGate loading={<Loader />} persistor={this.persistor}>
            <Layout>
              <PageTransition timeout={200} classNames='page-transition'>
                <Component {...pageProps} key={router.route} />
              </PageTransition>
            </Layout>
          </PersistGate>
        </Provider>
      </Container>
    )
  }
}

export default MyApp
