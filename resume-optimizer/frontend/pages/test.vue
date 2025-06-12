<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">UI Components Test</h1>
      
      <section class="mb-12">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Buttons</h2>
        <div class="space-y-4">
          <ui-button @click="testClick">Primary Button</ui-button>
          <ui-button variant="secondary">Secondary Button</ui-button>
          <ui-button variant="outline">Outline Button</ui-button>
          <ui-button variant="danger">Danger Button</ui-button>
          <ui-button variant="text">Text Button</ui-button>
          <ui-button :loading="loading" @click="toggleLoading">
            {{ loading ? 'Loading...' : 'Click to Load' }}
          </ui-button>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Button Groups</h2>
        <div class="space-y-6">
          <ui-button-group>
            <ui-button>First</ui-button>
            <ui-button variant="outline">Middle</ui-button>
            <ui-button variant="danger">Last</ui-button>
          </ui-button-group>

          <ui-button-group vertical>
            <ui-button>First</ui-button>
            <ui-button variant="outline">Middle</ui-button>
            <ui-button variant="secondary">Last</ui-button>
          </ui-button-group>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Device Info</h2>
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="space-y-2">
            <p><span class="font-medium">Is Mobile:</span> {{ isMobile }}</p>
            <p><span class="font-medium">Is iOS:</span> {{ isIOS }}</p>
            <p><span class="font-medium">Is Android:</span> {{ isAndroid }}</p>
            <p><span class="font-medium">Is Native App:</span> {{ isNative }}</p>
            <p><span class="font-medium">Platform:</span> {{ platform }}</p>
            <p><span class="font-medium">Is PWA:</span> {{ isPWA }}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-4 text-gray-700">Actions</h2>
        <div class="space-y-3">
          <ui-button @click="showToast">Show Toast</ui-button>
          <ui-button @click="checkNetworkStatus">Check Network Status</ui-button>
          <ui-button v-if="!isPWA" @click="installPWA">Install PWA</ui-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { isMobile, isIOS, isAndroid, isInStandaloneMode, showInstallPrompt } from '@/utils/mobile'

export default {
  data() {
    return {
      loading: false,
      isNative: false,
      platform: 'web',
      networkStatus: null
    }
  },
  
  computed: {
    isMobile() {
      return isMobile()
    },
    isIOS() {
      return isIOS()
    },
    isAndroid() {
      return isAndroid()
    },
    isPWA() {
      return isInStandaloneMode()
    }
  },

  mounted() {
    if (process.client) {
      this.isNative = window.Capacitor?.isNative || false
      this.platform = window.Capacitor?.getPlatform() || 'web'
    }
  },

  methods: {
    testClick() {
      this.$toast.info('Button clicked!')
    },

    toggleLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$toast.success('Loading complete!')
      }, 2000)
    },

    async showToast() {
      this.$toast.success('Hello from Toast!', {
        position: 'top-center',
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
    },

    async checkNetworkStatus() {
      if (this.$capacitor.Network) {
        const status = await this.$capacitor.Network.getStatus()
        this.$toast.info(`Network status: ${status.connected ? 'Connected' : 'Disconnected'}`)
        this.networkStatus = status
      } else {
        this.$toast.info('Network plugin not available in web')
      }
    },

    async installPWA() {
      const installed = await showInstallPrompt()
      if (installed) {
        this.$toast.success('App installed successfully!')
      } else {
        this.$toast.info('Installation cancelled')
      }
    }
  }
}
</script>
