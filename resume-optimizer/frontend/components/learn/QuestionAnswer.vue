<template>
  <li class="px-6 py-5">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <img class="h-10 w-10 rounded-full" :src="expert.image" :alt="expert.name" />
      </div>
      <div class="ml-4 flex-1">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ expert.name }}</p>
            <p class="text-xs text-gray-500">{{ expert.title }}, {{ expert.company }}</p>
          </div>
          <div class="text-sm text-gray-500">
            <time :datetime="new Date(date).toISOString()">
              {{ formatDate(date) }}
            </time>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-sm font-medium text-gray-900">Q: {{ question }}</p>
          <p class="mt-1 text-sm text-gray-600">A: {{ answer }}</p>
        </div>
        <div class="mt-3 flex items-center">
          <button
            type="button"
            class="inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
            @click="likeQuestion"
          >
            <ThumbUpIcon class="h-4 w-4 mr-1" />
            <span>{{ likes }} {{ likes === 1 ? 'like' : 'likes' }}</span>
          </button>
          <button
            type="button"
            class="ml-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
          >
            <ChatAltIcon class="h-4 w-4 mr-1" />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { ThumbUpIcon, ChatAltIcon } from '@heroicons/vue/outline'

export default {
  name: 'QuestionAnswer',
  components: {
    ThumbUpIcon,
    ChatAltIcon,
  },
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    expert: {
      type: Object,
      required: true,
    },
    date: {
      type: [String, Date],
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
    likeQuestion() {
      this.$emit('like')
    },
  },
}
</script>
