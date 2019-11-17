/* eslint-disable */
const withPlugins = require('next-compose-plugins')
const withLess = require('@zeit/next-less')
const withTM = require('next-transpile-modules')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackStrip = require('webpack-strip')
const withCSS = require('@zeit/next-css')

const DashboardPlugin = process.env.isDev ? require('webpack-dashboard/plugin') : null
// const env = require("./env.json")
const env = process.env.isDev ? require('./.env/dev.json') : require('./.env/production.json')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'))

const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: ['/node_modules/', '/.next/'],
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      })
      config.plugins.push(new DashboardPlugin())
    } else {
      config.module.rules.push({
        test: /\.js$/,
        exclude: ['/node_modules/', '/.next/'],
        loader: WebpackStrip.loader('debug', 'console.log')
      })
    }
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            icon: true
          }
        }
      ]
    })

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

    if (!isServer && !dev) {
      config.optimization.splitChunks.cacheGroups.commons.minChunks = 1
    }

    if (config.mode === 'production') {
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))
      }
    }
    config.plugins.push(new CompressionPlugin())

    return config
  },
  env: {
    isDev: env.isDev,
    HOST_API: env.HOST_API,
    HOST_MEDIA: env.HOST_MEDIA,
    GOOGLE_MAP_API_KEY: env.GOOGLE_MAP_API_KEY
  }
}
// module.exports = withCSS({
//   cssLoaderOptions: {
//     url: false
//   }
// })
module.exports = withPlugins(
  // MARK  multi plugin nextjs
  [
    [withCSS, {
      cssModules: false, // setting to false to prevent any extra stuff added to the class name apart of localIdentName
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[name]__[local]___[hash:base64:5]", // this was taken from amplify ui webpack config
      }
    }],
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables // make your antd custom effective
        }
      }
    ],
    [withTM, { transpileModules: ['lodash-es'] }]
  ],
  nextConfig
)


