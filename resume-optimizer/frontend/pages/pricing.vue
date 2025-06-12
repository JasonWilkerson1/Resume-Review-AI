<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative bg-indigo-700">
      <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Simple, transparent pricing
          </h1>
          <p class="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
            Choose the perfect plan for your needs. Start with a 7-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>

    <!-- Pricing Toggle -->
    <div class="bg-indigo-100 pt-12 pb-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center">
          <div class="bg-indigo-200 p-1 rounded-lg">
            <div class="flex">
              <button
                v-for="(tab, index) in tabs"
                :key="tab.name"
                @click="activeTab = index"
                :class="[
                  'px-6 py-3 text-sm font-medium rounded-md',
                  activeTab === index
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-indigo-600 hover:text-indigo-800',
                ]"
              >
                {{ tab.name }}
              </button>
            </div>
          </div>
        </div>

        <!-- Pricing Cards -->
        <div class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          <div v-for="tier in pricingTiers" :key="tier.id" class="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div class="p-6">
              <h2 class="text-lg leading-6 font-medium text-gray-900">{{ tier.title }}</h2>
              <p class="mt-4">
                <span class="text-4xl font-extrabold text-gray-900">${{ tier.price }}</span>
                <span class="text-base font-medium text-gray-500">/{{ tier.frequency }}</span>
              </p>
              <p class="mt-4 text-sm text-gray-500">{{ tier.description }}</p>
              <a
                :href="tier.href"
                :class="[
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
                  'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center text-sm font-medium',
                ]"
              >
                {{ tier.buttonText }}
              </a>
            </div>
            <div class="pt-6 pb-8 px-6">
              <h3 class="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="feature in tier.features" :key="feature" class="flex">
                  <CheckIcon class="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                  <span class="ml-3 text-base text-gray-500">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Feature Comparison Table -->
        <div class="mt-24">
          <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-12">Compare all features</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feature
                  </th>
                  <th 
                    v-for="tier in pricingTiers" 
                    :key="tier.id"
                    scope="col" 
                    class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ tier.title }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="feature in featureComparison" :key="feature.name">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ feature.name }}
                  </td>
                  <td v-for="tier in pricingTiers" :key="`${feature.name}-${tier.id}`" class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    <span v-if="feature.levels[tier.id] === true" class="text-green-500">
                      <CheckIcon class="h-5 w-5 inline" />
                    </span>
                    <span v-else-if="feature.levels[tier.id] === false" class="text-gray-400">
                      <XIcon class="h-5 w-5 inline" />
                    </span>
                    <span v-else>
                      {{ feature.levels[tier.id] }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="mt-24">
          <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-12">Frequently asked questions</h2>
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
            <div v-for="(faq, index) in faqs" :key="index" class="bg-gray-50 p-6 rounded-lg">
              <dt class="text-lg font-medium text-gray-900">
                {{ faq.question }}
              </dt>
              <dd class="mt-2 text-base text-gray-600">
                {{ faq.answer }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckIcon, XIcon } from '@heroicons/vue/outline'

export default {
  name: 'PricingPage',
  components: {
    CheckIcon,
    XIcon,
  },
  data() {
    return {
      tabs: [
        { name: 'Monthly billing' },
        { name: 'Annual billing (save 20%)' },
      ],
      activeTab: 0,
      pricingTiers: [
        {
          id: 'free',
          title: 'Free',
          price: '0',
          frequency: 'forever',
          description: 'Perfect for trying out our basic features.',
          buttonText: 'Get started',
          href: '/signup',
          mostPopular: false,
          features: [
            'Basic resume templates',
            '1 resume download per month',
            'Basic ATS score check',
            'Email support',
            'Community forum access',
          ],
        },
        {
          id: 'pro',
          title: 'Pro',
          price: '9',
          frequency: 'month',
          description: 'For professionals who want to stand out.',
          buttonText: 'Start 7-day free trial',
          href: '/signup?plan=pro',
          mostPopular: true,
          features: [
            'All Free features',
            'Unlimited resume downloads',
            'Advanced ATS optimization',
            '10 resume templates',
            'Priority email support',
            'Cover letter generator',
          ],
        },
        {
          id: 'enterprise',
          title: 'Enterprise',
          price: '29',
          frequency: 'month',
          description: 'For career coaches and power users.',
          buttonText: 'Contact sales',
          href: '/contact',
          mostPopular: false,
          features: [
            'All Pro features',
            'Unlimited resumes & clients',
            'White-label branding',
            'API access',
            'Dedicated account manager',
            'Team collaboration',
          ],
        },
      ],
      featureComparison: [
        {
          name: 'Number of resumes',
          levels: {
            free: '1',
            pro: 'Unlimited',
            enterprise: 'Unlimited',
          },
        },
        {
          name: 'Resume templates',
          levels: {
            free: '3',
            pro: '10+',
            enterprise: 'All templates',
          },
        },
        {
          name: 'ATS optimization',
          levels: {
            free: true,
            pro: true,
            enterprise: true,
          },
        },
        {
          name: 'Cover letter generator',
          levels: {
            free: false,
            pro: true,
            enterprise: true,
          },
        },
        {
          name: 'Priority support',
          levels: {
            free: false,
            pro: true,
            enterprise: true,
          },
        },
        {
          name: 'Team collaboration',
          levels: {
            free: false,
            pro: false,
            enterprise: true,
          },
        },
      ],
      faqs: [
        {
          question: 'Can I cancel my subscription?',
          answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to paid features until the end of your billing period.',
        },
        {
          question: 'Is there a free trial?',
          answer: 'Yes, we offer a 7-day free trial for the Pro plan. No credit card is required to start the trial.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support payments through PayPal.',
        },
        {
          question: 'Can I switch plans later?',
          answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Any prorated amount will be credited to your account.',
        },
        {
          question: 'Do you offer discounts for students?',
          answer: 'Yes, we offer a 50% discount for students with a valid .edu email address. Contact our support team to verify your student status.',
        },
        {
          question: 'How secure is my data?',
          answer: 'We take security seriously. All data is encrypted in transit and at rest. We use industry-standard security measures to protect your information.',
        },
      ],
    }
  },
  computed: {
    // You can add computed properties here if needed
  },
  methods: {
    // You can add methods here if needed
  },
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
