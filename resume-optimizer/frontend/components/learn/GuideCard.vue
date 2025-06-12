<template>
  <div class="bg-white overflow-hidden shadow rounded-lg h-full">
    <div class="p-6">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium" :class="levelClass">
            {{ guide.level }}
          </span>
          <span class="inline-flex items-center text-sm text-gray-500">
            <ClockIcon class="h-4 w-4 mr-1" />
            {{ guide.time }}
          </span>
        </div>
        <nuxt-link :to="guide.url" class="block mt-4">
          <h3 class="text-lg font-medium text-gray-900">{{ guide.title }}</h3>
          <p class="mt-3 text-base text-gray-500">{{ guide.description }}</p>
        </nuxt-link>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <a href="#">
              Sarah Johnson
            </a>
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
            <time :datetime="new Date().toISOString()">
              {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClockIcon } from '@heroicons/vue/outline'

export default {
  name: 'GuideCard',
  components: {
    ClockIcon,
  },
  props: {
    guide: {
      type: Object,
      required: true,
    },
  },
  computed: {
    levelClass() {
      const classes = {
        'Beginner': 'bg-green-100 text-green-800',
        'Intermediate': 'bg-yellow-100 text-yellow-800',
        'Advanced': 'bg-red-100 text-red-800',
        'All Levels': 'bg-blue-100 text-blue-800',
      }
      return classes[this.guide.level] || 'bg-gray-100 text-gray-800'
    },
  },
}
</script>
