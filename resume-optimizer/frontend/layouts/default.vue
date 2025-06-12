<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <nuxt-link to="/" class="flex-shrink-0 flex items-center">
              <img class="h-8 w-auto" src="~/assets/images/logo.svg" alt="Resume Optimizer AI">
              <span class="ml-2 text-xl font-bold text-gray-900">Resume Optimizer AI</span>
            </nuxt-link>
            <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <nuxt-link 
                v-for="item in navigation" 
                :key="item.name" 
                :to="item.href"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {{ item.name }}
              </nuxt-link>
            </nav>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div class="ml-3 relative">
              <div>
                <button @click="isProfileMenuOpen = !isProfileMenuOpen" class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="">
                </button>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div v-show="isProfileMenuOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                  <a v-for="item in userNavigation" :key="item.name" :href="item.href" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    {{ item.name }}
                  </a>
                </div>
              </transition>
            </div>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMobileMenuOpen" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <nuxt-link 
            v-for="item in navigation" 
            :key="item.name" 
            :to="item.href"
            class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            {{ item.name }}
          </nuxt-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="">
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
              <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
            </div>
            <button class="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
          <div class="mt-3 space-y-1">
            <a v-for="item in userNavigation" :key="item.name" :href="item.href" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <Nuxt />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900">About</a>
          </div>
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900">Blog</a>
          </div>
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900">Pricing</a>
          </div>
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900">Contact</a>
          </div>
          <div class="px-5 py-2">
            <a href="#" class="text-base text-gray-500 hover:text-gray-900">Terms</a>
          </div>
        </nav>
        <p class="mt-8 text-center text-base text-gray-400">
          &copy; 2023 Resume Optimizer AI. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      isProfileMenuOpen: false,
      isMobileMenuOpen: false,
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      navigation: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Resume Editor', href: '/editor' },
        { name: 'Templates', href: '/templates' },
        { name: 'Pricing', href: '/pricing' },
      ],
      userNavigation: [
        { name: 'Your Profile', href: '#' },
        { name: 'Settings', href: '#' },
        { name: 'Sign out', href: '#' },
      ],
    }
  },
  mounted() {
    // Close mobile menu when route changes
    this.$router.afterEach(() => {
      this.isMobileMenuOpen = false
    })
  }
}
</script>
