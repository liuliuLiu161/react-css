require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  wechatAppId: '',
  wxRedirectUrl: '',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT, //process.env.PORT, 9020
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: 9107, // process.env.APIPORT || 7293,
  app: {
    title: 'react组件及样式',
    description: 'All the modern best practices in one example.',
    head: {
      meta: [
        {name: 'description', content: 'All the modern best practices in one example.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'React Redux Example'},
        {property: 'og:description', content: 'All the modern best practices in one example.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
