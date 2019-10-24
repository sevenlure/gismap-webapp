module.exports = {
  apps: [
    {
      name: 'NPRwork-ADMIN',
      script: './server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3300
      }
    }
  ],
  deploy: {
    ser_dev: {
      user: 'root',
      host: '35.234.205.100',
      ref: 'origin/master',
      repo: 'git@gitlab.com:pnrwork/web-admin.git',
      path: '/home/sevenlure/NPRwork/web-admin',
      'post-setup': 'sudo npm i -g yarn',
      'post-deploy': 'yarn install && yarn run build && pm2 startOrRestart ecosystem.config.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}
