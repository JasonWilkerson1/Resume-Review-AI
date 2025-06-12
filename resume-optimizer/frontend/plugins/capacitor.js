import { Plugins } from '@capacitor/core'

export default (context, inject) => {
  // Inject Capacitor plugins
  const { App, StatusBar, SplashScreen, Network } = Plugins
  
  // Make plugins available in Vue components via this.$capacitor
  inject('capacitor', {
    App,
    StatusBar,
    SplashScreen,
    Network,
    isNative: () => {
      return window.Capacitor?.isNative
    },
    getPlatform: () => {
      return window.Capacitor?.getPlatform()
    }
  })

  // Add network status change listener
  if (process.client) {
    Network.addListener('networkStatusChange', (status) => {
      context.store.commit('SET_ONLINE', status.connected)
    })
  }

  // Handle app state changes
  App.addListener('appStateChange', (state) => {
    context.store.commit('SET_APP_STATE', state)
  })

  // Handle app URL open
  App.addListener('appUrlOpen', (data) => {
    // Handle deep links here
    console.log('App opened with URL:', data.url)
  })

  // Hide splash screen when app is ready
  if (process.client) {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        SplashScreen.hide()
      }, 500)
    })
  }
}
