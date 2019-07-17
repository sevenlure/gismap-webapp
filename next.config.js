/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'))

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables // make your antd custom effective
  },
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude:  ['/node_modules/', '/.next/'],
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      })
    }

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }
    return config
  },
  env: {
    // NODE_ENV: 'dev',
    HOST_API: 'http://prtr.southeastasia.cloudapp.azure.com:3105/',
    HOST_API: 'http://localhost:3105/'
  }
})
