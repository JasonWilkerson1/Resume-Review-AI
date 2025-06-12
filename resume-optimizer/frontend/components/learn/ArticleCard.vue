<template>
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden h-full">
    <div class="flex-shrink-0">
      <img class="h-48 w-full object-cover" :src="article.image" :alt="article.title" />
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          {{ article.category }}
        </p>
        <nuxt-link :to="article.url" class="block mt-2">
          <h3 class="text-xl font-semibold text-gray-900">{{ article.title }}</h3>
          <p class="mt-3 text-base text-gray-500">{{ article.excerpt }}</p>
        </nuxt-link>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
          <span class="sr-only">Read time</span>
          <span class="text-sm text-gray-500">{{ article.readTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>
