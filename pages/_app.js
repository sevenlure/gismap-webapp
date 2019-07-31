import React from 'react'
import App, { Container } from 'next/app'
import { PageTransition } from 'next-page-transitions'
import AppWithLayout from 'src/layout/default'
import { Icon } from 'antd'
import withReduxStore, { getOrCreateStore } from '../src/lib/with-redux-store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const reduxStore = getOrCreateStore()
const SLUG_NOT_HAVE_LAYOUT = ['/user/login']

const Loader = () => {
  return (
    <div
      style={{
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <Icon
        style={{
          fontSize: 100,
          color: '#52c41a'
        }}
        type='setting'
        spin={true}
      />
    </div>
  )
}

class MyApp extends App {
  constructor(props) {
    super(props)
    // this.persistor = persistStore(props.reduxStore)
    this.reduxStore = reduxStore
    this.persistor = persistStore(reduxStore)
  }

  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {}
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   let isNotHaveLayout = SLUG_NOT_HAVE_LAYOUT.includes(ctx.pathname)
  //   return { pageProps, isNotHaveLayout, pathname: ctx.pathname }
  // }

  componentDidMount() {
    // MARK  hạn chế Modal Alert authen nhìu lần
    window.isAlertModalErr = false
  }

  render() {
    // const { Component, pageProps, reduxStore, isNotHaveLayout, pathname } = this.props
    const { Component, pageProps, router } = this.props

    // pathname = router.pathname
    console.log('this.props', this.props)
    return (
      <Container>
        <Provider store={reduxStore}>
          <PersistGate loading={<Loader />} persistor={this.persistor}>
            {/* {isNotHaveLayout ? (
              <PageTransition timeout={200} classNames='page-transition'>
                <Component {...pageProps} />
              </PageTransition>
            ) : (
              <AppWithLayout pathname={pathname}>
                <PageTransition timeout={200} classNames='page-transition'>
                  <Component {...pageProps} />
                </PageTransition>
              </AppWithLayout>
            )} */}

            <Component.Layout pathname={router.pathname}>
              <PageTransition timeout={200} classNames='page-transition'>
                <Component {...pageProps} />
              </PageTransition>
            </Component.Layout>
          </PersistGate>
        </Provider>
      </Container>
    )
  }
}

export default MyApp
