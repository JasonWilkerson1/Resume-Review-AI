// Import path module
import path from 'path'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Resume Optimizer AI',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Optimize your resume for ATS and land your dream job' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/axios',
    '@/plugins/auth',
    '@/plugins/vue-toastification',
    '@/plugins/vue-apexcharts',
    '@/plugins/vue-multiselect',
    '@/plugins/ui',
    { src: '@/plugins/vue-pdf', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    '~/components',
    { path: '~/components/ui', extensions: ['vue'] },
    { path: '~/components/layout', extensions: ['vue'] },
    { path: '~/components/forms', extensions: ['vue'] },
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/recaptcha-module
    '@nuxtjs/recaptcha',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:1337',
  },

  // Auth module configuration (https://auth.nuxtjs.org/)
  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/auth/local', method: 'post' },
          logout: false,
          user: { url: '/users/me', method: 'get' },
        },
      },
      cognito: {
        scheme: 'oauth2',
        endpoints: {
          authorization: `${process.env.COGNITO_DOMAIN}/oauth2/authorize`,
          token: `${process.env.COGNITO_DOMAIN}/oauth2/token`,
          userInfo: `${process.env.COGNITO_DOMAIN}/oauth2/userInfo`,
          logout: `${process.env.COGNITO_DOMAIN}/logout`,
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 60 * 60, // 1 hour
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: process.env.COGNITO_CLIENT_ID,
        scope: ['email', 'openid', 'profile'],
        codeChallengeMethod: 'S256',
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/callback',
      home: '/dashboard',
    },
  },

  // PWA module configuration (https://pwa.nuxtjs.org/)
  pwa: {
    meta: {
      title: 'Resume Optimizer AI',
      author: 'Your Name',
    },
    manifest: {
      name: 'Resume Optimizer AI',
      short_name: 'ResumeAI',
      description: 'Optimize your resume for ATS and land your dream job',
      lang: 'en',
      theme_color: '#2196F3',
      background_color: '#ffffff',
    },
  },

  // reCAPTCHA configuration
  recaptcha: {
    hideBadge: false,
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    version: 3,
    size: 'invisible',
  },

  // Generate configuration for static export
  generate: {
    dir: 'dist',
    fallback: '404.html',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // Extend webpack config for Capacitor
    extend(config, { isClient }) {
      if (isClient) {
        config.target = 'web'
        config.node = {
          fs: 'empty',
          child_process: 'empty',
          net: 'empty',
          dns: 'empty',
          tls: 'empty'
        }
      }
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
      ],
    },
  },

  // Server configuration
  server: {
    port: 3000,
    host: '0.0.0.0',
    https: false,
  },

  // Add hooks for Capacitor
  hooks: {
    generate: {
      done(builder) {
        // Copy static files for Capacitor after generate
        const { copySync } = require('fs-extra')
        const { join } = require('path')
        
        // Copy dist files to native platforms
        const androidDir = path.resolve(__dirname, 'android/app/src/main/assets/public')
        const iosDir = path.resolve(__dirname, 'ios/App/App/public')
        
        // Create directories if they don't exist
        require('fs-extra').ensureDirSync(androidDir)
        require('fs-extra').ensureDirSync(iosDir)
        
        // Copy files
        copySync(join(__dirname, 'dist'), androidDir)
        copySync(join(__dirname, 'dist'), iosDir)
      }
    }
  },

  // Environment variables
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_BASE_URL || 'http://localhost:1337',
    nodeEnv: process.env.NODE_ENV || 'development',
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    sentryDsn: process.env.SENTRY_DSN || '',
    sentryEnvironment: process.env.SENTRY_ENVIRONMENT || 'development',
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID || '',
    cognitoClientId: process.env.COGNITO_CLIENT_ID || '',
    cognitoDomain: process.env.COGNITO_DOMAIN || '',
  },

  // Router configuration
  router: {
    middleware: ['auth'],
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'home',
          path: '/',
          component: resolve(__dirname, 'pages/index.vue'),
        },
        {
          name: 'login',
          path: '/auth/login',
          component: resolve(__dirname, 'pages/auth/login.vue'),
        },
        {
          name: 'register',
          path: '/auth/register',
          component: resolve(__dirname, 'pages/auth/register.vue'),
        },
        {
          name: 'forgot-password',
          path: '/auth/forgot-password',
          component: resolve(__dirname, 'pages/auth/forgot-password.vue'),
        },
        {
          name: 'reset-password',
          path: '/auth/reset-password',
          component: resolve(__dirname, 'pages/auth/reset-password.vue'),
        },
        {
          name: 'dashboard',
          path: '/dashboard',
          component: resolve(__dirname, 'pages/dashboard/index.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'resume-builder',
          path: '/resume/builder',
          component: resolve(__dirname, 'pages/resume/builder.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'resume-templates',
          path: '/resume/templates',
          component: resolve(__dirname, 'pages/resume/templates.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'resume-analytics',
          path: '/resume/analytics/:id',
          component: resolve(__dirname, 'pages/resume/analytics.vue'),
          meta: { requiresAuth: true },
        },
        {
          name: 'pricing',
          path: '/pricing',
          component: resolve(__dirname, 'pages/pricing.vue'),
        },
        {
          name: 'about',
          path: '/about',
          component: resolve(__dirname, 'pages/about.vue'),
        },
        {
          name: 'contact',
          path: '/contact',
          component: resolve(__dirname, 'pages/contact.vue'),
        },
        {
          name: 'privacy',
          path: '/privacy',
          component: resolve(__dirname, 'pages/legal/privacy.vue'),
        },
        {
          name: 'terms',
          path: '/terms',
          component: resolve(__dirname, 'pages/legal/terms.vue'),
        },
        {
          name: '404',
          path: '*',
          component: resolve(__dirname, 'pages/error/404.vue'),
        }
      );
    },
  },
};
