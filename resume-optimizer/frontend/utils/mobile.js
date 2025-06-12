// Mobile detection and utilities
export const isMobile = () => {
  if (process.client) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }
  return false
}

export const isIOS = () => {
  if (process.client) {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  }
  return false
}

export const isAndroid = () => {
  if (process.client) {
    return /Android/i.test(navigator.userAgent)
  }
  return false
}

export const isInStandaloneMode = () => {
  if (process.client) {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://')
    )
  }
  return false
}

// Install prompt handling
let deferredPrompt = null

export const initInstallPrompt = () => {
  if (process.client) {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      deferredPrompt = e
      // Update UI notify the user they can install the PWA
      return false
    })
  }
}

export const showInstallPrompt = async () => {
  if (!deferredPrompt) return false

  // Show the install prompt
  deferredPrompt.prompt()
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt = null
  
  return outcome === 'accepted'
}
