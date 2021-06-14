export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: true,
  
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'chattie',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: ''}
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        {
           rel:"stylesheet",
           href:"https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",
           integrity:"sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l", 
           crossorigin:"anonymous"
        }
      ],
      script: [
        {
          src:"./node_modules/nexmo-client/dist/nexmoClient.js",
          // src:"./node_modules/moment/moment.js",
          

        },
      ],
    },
  
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],
  
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],
  
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
  
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],
  
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
    //   '@nuxtjs/axios',
    ],
  
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    // axios: {},
  
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
  }