module.exports = {
  apps: [
    {
      name: 'GISMap-APP',
      script: './server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3400
      }
    }
  ]
}
