<template>
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden h-full">
    <div class="flex-shrink-0 relative">
      <img class="h-48 w-full object-cover" :src="video.thumbnail" :alt="video.title" />
      <div class="absolute inset-0 flex items-center justify-center">
        <button
          @click="playVideo(video)"
          class="bg-white bg-opacity-75 text-indigo-600 rounded-full p-3 hover:bg-opacity-100 transition-all transform hover:scale-110"
          aria-label="Play video"
        >
          <PlayIcon class="h-8 w-8" />
        </button>
      </div>
      <div class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        {{ video.duration }}
      </div>
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <h3 class="text-lg font-medium text-gray-900">
          <nuxt-link :to="video.url" class="hover:text-indigo-600">
            {{ video.title }}
          </nuxt-link>
        </h3>
      </div>
      <div class="mt-4 flex items-center
      <div class="flex-shrink-0">
        <span class="sr-only">Views</span>
        <span class="text-sm text-gray-500">{{ video.views }} views</span>
      </div>
    </div>
  </div>
</template>

<script>
import { PlayIcon } from '@heroicons/vue/solid'

export default {
  name: 'VideoCard',
  components: {
    PlayIcon,
  },
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  methods: {
    playVideo(video) {
      // In a real app, this would open a modal or navigate to the video player
      this.$emit('play', video)
    },
  },
}
</script>
