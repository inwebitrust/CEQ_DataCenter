// eslint hotreload
const webpack = require('webpack')
module.exports = {
  /*
  ** Build configuration
  */
  modules: [
    'nuxt-babel',
  ],
  babel: {
    presets: [
      [ '@nuxtjs/babel-preset-app', {
          targets: { ie: 11 }
        }
      ]
    ]
  },
  //loading: '~/components/loading.vue',
  loading: false,
  loadingIndicator: false,
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/print.scss',
    '@/assets/scss/responsive.scss'
  ],
  head: {
    htmlAttrs: {
      lang: "en",
      class: "own-html",
      "data-lang": "en-EN"
    },
    bodyAttrs: {
      id: "bodySite"
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700' }
    ]
  },
  plugins: [{src: '~/plugins/velocity', ssr: false}, '~/plugins/mixinCommonMethods.js'],
  build: {
      /*
      ** You can extend webpack config here
      */
       /*plugins: [
        new webpack.ProvidePlugin({
          '$': 'jquery',
          '_': 'lodash'
          // ...etc.
        })
      ],
      */
      vendor: ['velocity-animate', 'axios','d3'],
      extend(config, ctx) {
        config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin')
          // Run ESLint on save
          /*
          if (ctx.isDev && ctx.isClient) {
              config.module.rules.push({
                  enforce: "pre",
                  test: /\.(js|vue)$/,
                  loader: "eslint-loader",
                  exclude: /(node_modules)/,
                  options: {
                      //formatter: require('eslint-friendly-formatter'),
                      emitWarning: true
                  }
              })
          }
          */

          if (ctx.isClient) {
            config.entry.vendor.push('babel-polyfill')
          }
      }
  },
  generate: {
    routes: [
      '/',
      '/comparison/',
      '/country/',
      '/sustainable',
      '/thematic/',
      '/about/',
      "/country/ALB","/country/ARG","/country/ARM","/country/BFA","/country/BOL","/country/BRA","/country/CHL","/country/COL","/country/CRI","/country/DOM","/country/ECU","/country/ETH","/country/GEO","/country/GHA","/country/GTM","/country/HND","/country/HRV","/country/IDN","/country/IRN","/country/JOR","/country/KEN","/country/LKA","/country/MEX","/country/NIC","/country/PAN","/country/PER","/country/POL","/country/PRY","/country/RUS","/country/SLV","/country/TUN","/country/TZA","/country/UGA","/country/URY","/country/USA","/country/VEN","/country/ZAF", "/comparison/1.7","/comparison/2.6.1.3.2","/comparison/2.6.2.3.2","/comparison/2.6.3.3.2","/comparison/2.6.1.1.2","/comparison/2.6.2.1.2","/comparison/2.6.3.1.2","/comparison/4.2","/comparison/4.3","/comparison/4.4","/comparison/4.15","/comparison/4.14","/comparison/1.11","/comparison/1.8","/comparison/1.9","/comparison/1.12","/comparison/1.4","/comparison/1.6","/comparison/1.5","/comparison/1.2","/comparison/2.6.1.1.1","/comparison/2.6.1.3.1","/comparison/2.6.2.1.1","/comparison/2.6.2.3.1","/comparison/2.6.3.1.1","/comparison/2.6.3.3.1","/comparison/1.10","/comparison/4.7","/comparison/4.8","/comparison/4.9","/comparison/4.5","/comparison/4.6","/comparison/2.6.1.2","/comparison/2.6.1.4","/comparison/2.6.2.2","/comparison/2.6.2.4","/comparison/2.6.3.2","/comparison/2.6.3.4","/comparison/5.1.2.1","/comparison/5.2.2.1","/comparison/5.1.4.1","/comparison/5.2.4.1","/comparison/5.1.6.1","/comparison/5.2.6.1","/comparison/5.1.6.5","/comparison/5.2.6.5","/comparison/5.1.6.2","/comparison/5.2.6.2","/comparison/5.1.6.3","/comparison/5.2.6.3","/comparison/5.1.6.4","/comparison/5.2.6.4","/comparison/5.1.6.8","/comparison/5.2.6.8","/comparison/5.1.6.6","/comparison/5.2.6.6","/comparison/5.1.6.7","/comparison/5.2.6.7","/comparison/5.1.7.1","/comparison/5.2.7.1","/comparison/5.1.5.3","/comparison/5.2.5.3","/comparison/5.1.5.2","/comparison/5.2.5.2","/comparison/5.1.5.4","/comparison/5.2.5.4","/comparison/5.1.5.1","/comparison/5.2.5.1","/comparison/5.1.5.5","/comparison/5.2.5.5","/comparison/5.1.5.6","/comparison/5.2.5.6","/comparison/5.1.1.1","/comparison/5.2.1.1","/comparison/5.1.1.2","/comparison/5.2.1.2","/comparison/5.1.1.3","/comparison/5.2.1.3","/comparison/5.1.1.4","/comparison/5.2.1.4","/comparison/5.1.3.2","/comparison/5.2.3.2","/comparison/5.1.3.1","/comparison/5.2.3.1","/comparison/5.1.3.3","/comparison/5.2.3.3","/comparison/5.11.1","/comparison/5.13.1","/comparison/5.5.4","/comparison/5.6.4","/comparison/5.11.5","/comparison/5.12.5","/comparison/5.13.5","/comparison/5.14.5","/comparison/5.5.16","/comparison/5.6.16","/comparison/5.11.17","/comparison/5.12.17","/comparison/5.13.17","/comparison/5.14.17","/comparison/5.5.3","/comparison/5.6.2","/comparison/5.11.3","/comparison/5.12.3","/comparison/5.13.3","/comparison/5.14.3","/comparison/5.5.1","/comparison/5.6.3","/comparison/5.11.4","/comparison/5.12.4","/comparison/5.13.4","/comparison/5.14.4","/comparison/5.5.2","/comparison/5.6.1","/comparison/5.11.2","/comparison/5.12.2","/comparison/5.13.2","/comparison/5.14.2","/comparison/5.6.6","/comparison/5.12.7","/comparison/5.14.7","/comparison/5.5.6","/comparison/5.11.7","/comparison/5.13.7","/comparison/5.5.7","/comparison/5.6.7","/comparison/5.11.8","/comparison/5.12.8","/comparison/5.13.8","/comparison/5.14.8","/comparison/5.5.24","/comparison/5.6.24","/comparison/5.11.25","/comparison/5.12.25","/comparison/5.13.25","/comparison/5.14.25","/comparison/5.5.11","/comparison/5.6.11","/comparison/5.11.12","/comparison/5.12.12","/comparison/5.13.12","/comparison/5.14.12","/comparison/5.5.10","/comparison/5.6.10","/comparison/5.11.11","/comparison/5.12.11","/comparison/5.13.11","/comparison/5.14.11","/comparison/5.5.27","/comparison/5.6.27","/comparison/5.11.28","/comparison/5.12.28","/comparison/5.13.28","/comparison/5.14.28","/comparison/5.5.28","/comparison/5.6.28","/comparison/5.11.29","/comparison/5.12.29","/comparison/5.13.29","/comparison/5.14.29","/comparison/5.5.12","/comparison/5.6.12","/comparison/5.11.13","/comparison/5.12.13","/comparison/5.13.13","/comparison/5.14.13","/comparison/5.5.25","/comparison/5.6.25","/comparison/5.11.26","/comparison/5.12.26","/comparison/5.13.26","/comparison/5.14.26","/comparison/5.5.15","/comparison/5.6.15","/comparison/5.11.16","/comparison/5.12.16","/comparison/5.13.16","/comparison/5.14.16","/comparison/5.5.9","/comparison/5.6.9","/comparison/5.11.10","/comparison/5.12.10","/comparison/5.13.10","/comparison/5.14.10","/comparison/5.5.13","/comparison/5.6.13","/comparison/5.11.14","/comparison/5.12.14","/comparison/5.13.14","/comparison/5.14.14","/comparison/5.5.20","/comparison/5.6.20","/comparison/5.11.21","/comparison/5.12.21","/comparison/5.13.21","/comparison/5.14.21","/comparison/5.5.5","/comparison/5.6.5","/comparison/5.11.6","/comparison/5.12.6","/comparison/5.13.6","/comparison/5.14.6","/comparison/5.5.14","/comparison/5.6.14","/comparison/5.11.15","/comparison/5.12.15","/comparison/5.13.15","/comparison/5.14.15","/comparison/5.5.26","/comparison/5.6.26","/comparison/5.11.27","/comparison/5.12.27","/comparison/5.13.27","/comparison/5.14.27","/comparison/5.12.1","/comparison/5.14.1","/comparison/5.5.17","/comparison/5.6.17","/comparison/5.11.18","/comparison/5.12.18","/comparison/5.13.18","/comparison/5.14.18","/comparison/5.5.18","/comparison/5.6.18","/comparison/5.11.19","/comparison/5.12.19","/comparison/5.13.19","/comparison/5.14.19","/comparison/5.5.19","/comparison/5.6.19","/comparison/5.11.20","/comparison/5.12.20","/comparison/5.13.20","/comparison/5.14.20","/comparison/5.5.23","/comparison/5.6.23","/comparison/5.11.24","/comparison/5.12.24","/comparison/5.13.24","/comparison/5.14.24","/comparison/5.5.21","/comparison/5.6.21","/comparison/5.11.22","/comparison/5.12.22","/comparison/5.13.22","/comparison/5.14.22","/comparison/5.5.8","/comparison/5.6.8","/comparison/5.11.9","/comparison/5.12.9","/comparison/5.13.9","/comparison/5.14.9","/comparison/5.5.22","/comparison/5.6.22","/comparison/5.11.23","/comparison/5.12.23","/comparison/5.13.23","/comparison/5.14.23","/comparison/4.16.1.4.4","/comparison/4.16.2.4.4","/comparison/4.16.3.4.4","/comparison/4.19.1.4.4","/comparison/4.19.2.4.4","/comparison/4.19.3.4.4","/comparison/4.22.1.4.4","/comparison/4.22.2.4.4","/comparison/4.22.3.4.4","/comparison/4.25.1.4.4","/comparison/4.25.2.4.4","/comparison/4.25.3.4.4","/comparison/4.16.1.4.3","/comparison/4.16.2.4.3","/comparison/4.16.3.4.3","/comparison/4.22.1.4.3","/comparison/4.22.2.4.3","/comparison/4.22.3.4.3","/comparison/4.25.1.4.3","/comparison/4.25.2.4.3","/comparison/4.25.3.4.3","/comparison/4.19.1.4.3","/comparison/4.19.2.4.3","/comparison/4.19.3.4.3","/comparison/4.16.1.4.1","/comparison/4.16.2.4.1","/comparison/4.16.3.4.1","/comparison/4.19.1.4.1","/comparison/4.19.2.4.1","/comparison/4.19.3.4.1","/comparison/4.22.1.4.1","/comparison/4.22.2.4.1","/comparison/4.22.3.4.1","/comparison/4.25.1.4.1","/comparison/4.25.2.4.1","/comparison/4.25.3.4.1","/comparison/4.16.1.4.2","/comparison/4.16.2.4.2","/comparison/4.16.3.4.2","/comparison/4.19.1.4.2","/comparison/4.19.2.4.2","/comparison/4.19.3.4.2","/comparison/4.22.1.4.2","/comparison/4.22.2.4.2","/comparison/4.22.3.4.2","/comparison/4.25.1.4.2","/comparison/4.25.2.4.2","/comparison/4.25.3.4.2","/comparison/3.2.3","/comparison/3.3.3","/comparison/4.10.1.1.3","/comparison/4.10.1.2.3","/comparison/4.10.1.3.3","/comparison/4.10.2.1.3","/comparison/4.10.2.2.3","/comparison/4.10.2.3.3","/comparison/4.12.1.1.3","/comparison/4.12.1.2.3","/comparison/4.12.1.3.3","/comparison/4.12.2.1.3","/comparison/4.12.2.2.3","/comparison/4.12.2.3.3","/comparison/4.16.1.3.4","/comparison/4.16.2.3.4","/comparison/4.16.3.3.4","/comparison/4.19.1.3.4","/comparison/4.19.2.3.4","/comparison/4.19.3.3.4","/comparison/4.22.1.3.4","/comparison/4.22.2.3.4","/comparison/4.22.3.3.4","/comparison/4.25.1.3.4","/comparison/4.25.2.3.4","/comparison/4.25.3.3.4","/comparison/4.16.1.3.3","/comparison/4.16.2.3.3","/comparison/4.16.3.3.3","/comparison/4.22.1.3.3","/comparison/4.22.2.3.3","/comparison/4.22.3.3.3","/comparison/4.25.1.3.3","/comparison/4.25.2.3.3","/comparison/4.25.3.3.3","/comparison/4.19.1.3.3","/comparison/4.19.2.3.3","/comparison/4.19.3.3.3","/comparison/4.16.1.3.1","/comparison/4.16.2.3.1","/comparison/4.16.3.3.1","/comparison/4.19.1.3.1","/comparison/4.19.2.3.1","/comparison/4.19.3.3.1","/comparison/4.22.1.3.1","/comparison/4.22.2.3.1","/comparison/4.22.3.3.1","/comparison/4.25.1.3.1","/comparison/4.25.2.3.1","/comparison/4.25.3.3.1","/comparison/4.16.1.3.2","/comparison/4.16.2.3.2","/comparison/4.16.3.3.2","/comparison/4.19.1.3.2","/comparison/4.19.2.3.2","/comparison/4.19.3.3.2","/comparison/4.22.1.3.2","/comparison/4.22.2.3.2","/comparison/4.22.3.3.2","/comparison/4.25.1.3.2","/comparison/4.25.2.3.2","/comparison/4.25.3.3.2","/comparison/3.2.2","/comparison/3.3.2","/comparison/4.10.1.1.2","/comparison/4.10.1.2.2","/comparison/4.10.1.3.2","/comparison/4.10.2.1.2","/comparison/4.10.2.2.2","/comparison/4.10.2.3.2","/comparison/4.12.1.1.2","/comparison/4.12.1.2.2","/comparison/4.12.1.3.2","/comparison/4.12.2.1.2","/comparison/4.12.2.2.2","/comparison/4.12.2.3.2","/comparison/3.2.4","/comparison/3.3.4","/comparison/5.3.5","/comparison/5.4.5","/comparison/5.7.6","/comparison/5.8.6","/comparison/5.9.6","/comparison/5.10.6","/comparison/5.3.17","/comparison/5.4.17","/comparison/5.7.18","/comparison/5.8.18","/comparison/5.9.18","/comparison/5.10.18","/comparison/5.3.4","/comparison/5.4.3","/comparison/5.7.5","/comparison/5.8.4","/comparison/5.9.5","/comparison/5.10.4","/comparison/5.3.2","/comparison/5.4.4","/comparison/5.7.3","/comparison/5.8.5","/comparison/5.9.3","/comparison/5.10.5","/comparison/5.3.3","/comparison/5.4.2","/comparison/5.7.4","/comparison/5.8.3","/comparison/5.9.4","/comparison/5.10.3","/comparison/5.4.7","/comparison/5.8.8","/comparison/5.10.8","/comparison/5.3.7","/comparison/5.7.8","/comparison/5.9.8","/comparison/5.3.8","/comparison/5.4.8","/comparison/5.7.9","/comparison/5.8.9","/comparison/5.9.9","/comparison/5.10.9","/comparison/5.3.25","/comparison/5.4.25","/comparison/5.7.26","/comparison/5.8.26","/comparison/5.9.26","/comparison/5.10.26","/comparison/5.3.12","/comparison/5.4.12","/comparison/5.7.13","/comparison/5.8.13","/comparison/5.9.13","/comparison/5.10.13","/comparison/5.3.11","/comparison/5.4.11","/comparison/5.7.12","/comparison/5.8.12","/comparison/5.9.12","/comparison/5.10.12","/comparison/5.3.28","/comparison/5.4.28","/comparison/5.7.29","/comparison/5.8.29","/comparison/5.9.29","/comparison/5.10.29","/comparison/5.3.29","/comparison/5.4.29","/comparison/5.7.30","/comparison/5.8.30","/comparison/5.9.30","/comparison/5.10.30","/comparison/5.3.13","/comparison/5.4.13","/comparison/5.7.14","/comparison/5.8.14","/comparison/5.9.14","/comparison/5.10.14","/comparison/5.3.26","/comparison/5.4.26","/comparison/5.7.27","/comparison/5.8.27","/comparison/5.9.27","/comparison/5.10.27","/comparison/5.3.16","/comparison/5.4.16","/comparison/5.7.17","/comparison/5.8.17","/comparison/5.9.17","/comparison/5.10.17","/comparison/5.3.10","/comparison/5.4.10","/comparison/5.7.11","/comparison/5.8.11","/comparison/5.9.11","/comparison/5.10.11","/comparison/5.3.14","/comparison/5.4.14","/comparison/5.7.15","/comparison/5.8.15","/comparison/5.9.15","/comparison/5.10.15","/comparison/5.3.21","/comparison/5.4.21","/comparison/5.7.22","/comparison/5.8.22","/comparison/5.9.22","/comparison/5.10.22","/comparison/5.8.2","/comparison/5.10.2","/comparison/5.4.1","/comparison/5.3.1","/comparison/5.7.2","/comparison/5.9.2","/comparison/5.3.6","/comparison/5.4.6","/comparison/5.7.7","/comparison/5.8.7","/comparison/5.9.7","/comparison/5.10.7","/comparison/5.3.15","/comparison/5.4.15","/comparison/5.7.16","/comparison/5.8.16","/comparison/5.9.16","/comparison/5.10.16","/comparison/5.3.27","/comparison/5.4.27","/comparison/5.7.28","/comparison/5.8.28","/comparison/5.9.28","/comparison/5.10.28","/comparison/5.3.18","/comparison/5.4.18","/comparison/5.7.19","/comparison/5.8.19","/comparison/5.9.19","/comparison/5.10.19","/comparison/5.3.19","/comparison/5.4.19","/comparison/5.7.20","/comparison/5.8.20","/comparison/5.9.20","/comparison/5.10.20","/comparison/5.3.20","/comparison/5.4.20","/comparison/5.7.21","/comparison/5.8.21","/comparison/5.9.21","/comparison/5.10.21","/comparison/5.3.24","/comparison/5.4.24","/comparison/5.7.25","/comparison/5.8.25","/comparison/5.9.25","/comparison/5.10.25","/comparison/5.3.22","/comparison/5.4.22","/comparison/5.7.23","/comparison/5.8.23","/comparison/5.9.23","/comparison/5.10.23","/comparison/5.3.9","/comparison/5.4.9","/comparison/5.7.10","/comparison/5.8.10","/comparison/5.9.10","/comparison/5.10.10","/comparison/5.3.23","/comparison/5.4.23","/comparison/5.7.24","/comparison/5.8.24","/comparison/5.9.24","/comparison/5.10.24","/comparison/5.7.1","/comparison/5.8.1","/comparison/5.9.1","/comparison/5.10.1","/comparison/4.22.1.1.4","/comparison/4.22.2.1.4","/comparison/4.22.3.1.4","/comparison/4.25.1.1.4","/comparison/4.25.2.1.4","/comparison/4.25.3.1.4","/comparison/4.22.1.1.3","/comparison/4.22.2.1.3","/comparison/4.22.3.1.3","/comparison/4.25.1.1.3","/comparison/4.25.2.1.3","/comparison/4.25.3.1.3","/comparison/4.22.1.1.1","/comparison/4.22.2.1.1","/comparison/4.22.3.1.1","/comparison/4.25.1.1.1","/comparison/4.25.2.1.1","/comparison/4.25.3.1.1","/comparison/4.22.1.1.2","/comparison/4.22.2.1.2","/comparison/4.22.3.1.2","/comparison/4.25.1.1.2","/comparison/4.25.2.1.2","/comparison/4.25.3.1.2","/comparison/3.3.1","/comparison/4.10.2.1.1","/comparison/4.10.2.2.1","/comparison/4.10.2.3.1","/comparison/4.12.2.1.1","/comparison/4.12.2.2.1","/comparison/4.12.2.3.1","/comparison/4.16.1.1.4","/comparison/4.16.2.1.4","/comparison/4.16.3.1.4","/comparison/4.19.1.1.4","/comparison/4.19.2.1.4","/comparison/4.19.3.1.4","/comparison/4.16.1.1.3","/comparison/4.16.2.1.3","/comparison/4.16.3.1.3","/comparison/4.19.1.1.3","/comparison/4.19.2.1.3","/comparison/4.19.3.1.3","/comparison/4.16.1.1.1","/comparison/4.16.2.1.1","/comparison/4.16.3.1.1","/comparison/4.19.1.1.1","/comparison/4.19.2.1.1","/comparison/4.19.3.1.1","/comparison/4.16.1.1.2","/comparison/4.16.2.1.2","/comparison/4.16.3.1.2","/comparison/4.19.1.1.2","/comparison/4.19.2.1.2","/comparison/4.19.3.1.2","/comparison/3.2.1","/comparison/4.10.1.1.1","/comparison/4.10.1.2.1","/comparison/4.10.1.3.1","/comparison/4.12.1.1.1","/comparison/4.12.1.2.1","/comparison/4.12.1.3.1","/comparison/4.16.1.2.4","/comparison/4.16.2.2.4","/comparison/4.16.3.2.4","/comparison/4.19.1.2.4","/comparison/4.19.2.2.4","/comparison/4.19.3.2.4","/comparison/4.22.1.2.4","/comparison/4.22.2.2.4","/comparison/4.22.3.2.4","/comparison/4.25.1.2.4","/comparison/4.25.2.2.4","/comparison/4.25.3.2.4","/comparison/4.16.1.2.3","/comparison/4.16.2.2.3","/comparison/4.16.3.2.3","/comparison/4.22.1.2.3","/comparison/4.22.2.2.3","/comparison/4.22.3.2.3","/comparison/4.25.1.2.3","/comparison/4.25.2.2.3","/comparison/4.25.3.2.3","/comparison/4.19.1.2.3","/comparison/4.19.2.2.3","/comparison/4.19.3.2.3","/comparison/4.16.1.2.1","/comparison/4.16.2.2.1","/comparison/4.16.3.2.1","/comparison/4.19.1.2.1","/comparison/4.19.2.2.1","/comparison/4.19.3.2.1","/comparison/4.22.1.2.1","/comparison/4.22.2.2.1","/comparison/4.22.3.2.1","/comparison/4.25.1.2.1","/comparison/4.25.2.2.1","/comparison/4.25.3.2.1","/comparison/4.16.1.2.2","/comparison/4.16.2.2.2","/comparison/4.16.3.2.2","/comparison/4.19.1.2.2","/comparison/4.19.2.2.2","/comparison/4.19.3.2.2","/comparison/4.22.1.2.2","/comparison/4.22.2.2.2","/comparison/4.22.3.2.2","/comparison/4.25.1.2.2","/comparison/4.25.2.2.2","/comparison/4.25.3.2.2","/comparison/4.23.1.1.2","/comparison/4.23.1.2.2","/comparison/4.23.1.3.2","/comparison/4.26.1.1.2","/comparison/4.26.1.2.2","/comparison/4.26.1.3.2","/comparison/4.23.1.1.1","/comparison/4.23.1.2.1","/comparison/4.23.1.3.1","/comparison/4.26.1.1.1","/comparison/4.26.1.2.1","/comparison/4.26.1.3.1","/comparison/4.17.1.1.2","/comparison/4.17.1.2.2","/comparison/4.17.1.3.2","/comparison/4.20.1.1.2","/comparison/4.20.1.2.2","/comparison/4.20.1.3.2","/comparison/4.17.1.1.1","/comparison/4.17.1.2.1","/comparison/4.17.1.3.1","/comparison/4.20.1.1.1","/comparison/4.20.1.2.1","/comparison/4.20.1.3.1","/comparison/4.11.2.1.2","/comparison/4.11.2.2.2","/comparison/4.11.2.3.2","/comparison/4.13.2.1.2","/comparison/4.13.2.2.2","/comparison/4.13.2.3.2","/comparison/4.11.2.1.1","/comparison/4.11.2.2.1","/comparison/4.11.2.3.1","/comparison/4.13.2.1.1","/comparison/4.13.2.2.1","/comparison/4.13.2.3.1","/comparison/4.11.1.1.2","/comparison/4.11.1.2.2","/comparison/4.11.1.3.2","/comparison/4.13.1.1.2","/comparison/4.13.1.2.2","/comparison/4.13.1.3.2","/comparison/4.11.1.1.1","/comparison/4.11.1.2.1","/comparison/4.11.1.3.1","/comparison/4.13.1.1.1","/comparison/4.13.1.2.1","/comparison/4.13.1.3.1","/comparison/4.24.1.1.2","/comparison/4.24.1.2.2","/comparison/4.24.1.3.2","/comparison/4.27.1.1.2","/comparison/4.27.1.2.2","/comparison/4.27.1.3.2","/comparison/4.24.1.1.1","/comparison/4.24.1.2.1","/comparison/4.24.1.3.1","/comparison/4.27.1.1.1","/comparison/4.27.1.2.1","/comparison/4.27.1.3.1","/comparison/4.18.1.1.2","/comparison/4.18.1.2.2","/comparison/4.18.1.3.2","/comparison/4.21.1.1.2","/comparison/4.21.1.2.2","/comparison/4.21.1.3.2","/comparison/4.18.1.1.1","/comparison/4.18.1.2.1","/comparison/4.18.1.3.1","/comparison/4.21.1.1.1","/comparison/4.21.1.2.1","/comparison/4.21.1.3.1","/comparison/3.4.2.2","/comparison/3.4.2.1","/comparison/3.4.2.3","/comparison/3.4.1.2","/comparison/3.4.1.1","/comparison/3.4.1.3","/comparison/2.4.4","/comparison/2.4.3","/comparison/2.4.1","/comparison/2.4.2.5","/comparison/2.4.2.2","/comparison/2.4.2.1","/comparison/2.4.2.3.3","/comparison/2.4.2.3.4","/comparison/2.4.2.3.2","/comparison/2.4.2.3.1","/comparison/2.4.2.4.3","/comparison/2.4.2.4.4","/comparison/2.4.2.4.1","/comparison/2.4.2.4.2","/comparison/2.5.2","/comparison/2.5.6","/comparison/2.5.8","/comparison/2.5.7","/comparison/2.5.1","/comparison/2.5.5.1","/comparison/2.5.4.1","/comparison/2.5.3.2","/comparison/2.5.3.3","/comparison/2.5.3.4","/comparison/2.5.3.5","/comparison/2.5.3.1","/comparison/1.3.1","/comparison/1.3.3","/comparison/1.3.2","/comparison/1.1.2","/comparison/1.1.1"
    ]
  },
  env: {
    title: process.env.APP_TITLE || 'NUxtjs template',
    CONFIG_APP: {
      api_url: "https://batcave.wedodata.fr/CEQ/API/"
    }
  },
  mode: 'spa',
  router : {
    middleware: [
      'loadCountries',
      'loadIndicators'
    ],
    //base:"/expo/"
  }
}
