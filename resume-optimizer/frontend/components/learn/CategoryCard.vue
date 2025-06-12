<template>
  <div class="bg-white overflow-hidden shadow rounded-lg h-full">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
          <component :is="category.icon" class="h-6 w-6 text-white" />
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
              <nuxt-link :to="category.url" class="hover:text-indigo-600">
                {{ category.name }}
              </nuxt-link>
            </dt>
            <dd class="flex items-baseline">
              <div class="text-2xl font-semibold text-gray-900">{{ category.articleCount }}</div>
              <div class="ml-2 flex items-baseline text-sm font-semibold text-indigo-600">
                Articles
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 px-5 py-3">
      <div class="text-sm">
        <nuxt-link :to="category.url" class="font-medium text-indigo-600 hover:text-indigo-500">
          View all <span class="sr-only">{{ category.name }} articles</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
}
</script>
