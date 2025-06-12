<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6">
              <!-- Header -->
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="$emit('close')"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Main Content -->
              <div class="sm:flex sm:items-start">
                <!-- Left Sidebar - Score Summary -->
                <div class="w-full sm:w-1/3 pr-6 border-r border-gray-200">
                  <div class="text-center">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                      Resume Analysis
                    </DialogTitle>
                    
                    <!-- Score Circle -->
                    <div class="mt-6 flex justify-center">
                      <div class="relative w-48 h-48">
                        <svg class="w-full h-full" viewBox="0 0 100 100">
                          <!-- Background Circle -->
                          <circle
                            class="text-gray-200"
                            stroke-width="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <!-- Progress Circle -->
                          <circle
                            class="text-indigo-600 transition-all duration-1000 ease-in-out"
                            :class="getScoreColor(analysis.overallScore)"
                            stroke-width="8"
                            :stroke-dasharray="circumference"
                            :stroke-dashoffset="circumference - (animatedScore / 100) * circumference"
                            stroke-linecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                          <span class="text-4xl font-bold text-gray-900">{{ Math.round(animatedScore) }}</span>
                          <span class="text-sm text-gray-500">out of 100</span>
                          <span class="mt-1 px-2 py-0.5 text-xs font-medium rounded-full" :class="getScoreBadgeClass(animatedScore)">
                            {{ getScoreLabel(animatedScore) }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Score Summary -->
                    <div class="mt-6 text-left">
                      <h4 class="text-sm font-medium text-gray-900 mb-2">Summary</h4>
                      <p class="text-sm text-gray-600">
                        {{ getScoreSummary(analysis.overallScore) }}
                      </p>
                    </div>

                    <!-- Quick Stats -->
                    <div class="mt-6 space-y-3">
                      <div v-for="(stat, index) in quickStats" :key="index" class="flex items-center justify-between">
                        <div class="text-sm font-medium text-gray-500">{{ stat.label }}</div>
                        <div class="text-sm font-medium text-gray-900">{{ stat.value }}</div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="mt-6 space-y-2">
                      <button
                        @click="$emit('improve')"
                        class="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <SparklesIcon class="-ml-1 mr-2 h-4 w-4" />
                        Improve My Resume
                      </button>
                      <button
                        @click="$emit('download')"
                        class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <ArrowDownTrayIcon class="-ml-1 mr-2 h-4 w-4" />
                        Download Report
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Right Content - Detailed Analysis -->
                <div class="w-full sm:w-2/3 pl-6 mt-6 sm:mt-0">
                  <!-- Tabs -->
                  <div class="border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8">
                      <button
                        v-for="tab in tabs"
                        :key="tab.name"
                        @click="currentTab = tab.name"
                        :class="[
                          currentTab === tab.name
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                        ]"
                      >
                        {{ tab.name }}
                        <span 
                          v-if="tab.count" 
                          class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="currentTab === tab.name ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'"
                        >
                          {{ tab.count }}
                        </span>
                      </button>
                    </nav>
                  </div>

                  <!-- Tab Content -->
                  <div class="mt-6">
                    <!-- Overview Tab -->
                    <div v-if="currentTab === 'Overview'" class="space-y-6">
                      <!-- ATS Score Breakdown -->
                      <div>
                        <h4 class="text-sm font-medium text-gray-900 mb-3">ATS Score Breakdown</h4>
                        <div class="space-y-3">
                          <div v-for="(category, index) in analysis.categories" :key="index">
                            <div class="flex items-center justify-between mb-1">
                              <div class="flex items-center">
                                <span class="text-sm font-medium text-gray-700">{{ category.name }}</span>
                                <span class="ml-2 text-xs text-gray-500">{{ category.score }}/100</span>
                              </div>
                              <span 
                                class="text-xs font-medium"
                                :class="getScoreTextColor(category.score)"
                              >
                                {{ getScoreLabel(category.score) }}
                              </span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                class="h-2 rounded-full transition-all duration-1000 ease-in-out"
                                :class="getScoreColor(category.score)"
                                :style="{ width: `${category.score}%` }"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Key Findings -->
                      <div>
                        <h4 class="text-sm font-medium text-gray-900 mb-3">Key Findings</h4>
                        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                          <div class="flex">
                            <div class="flex-shrink-0">
                              <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
                            </div>
                            <div class="ml-3">
                              <p class="text-sm text-yellow-700">
                                {{ analysis.keyFindings || 'No critical issues found. Your resume is in good shape!' }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Issues Tab -->
                    <div v-else-if="currentTab === 'Issues'" class="space-y-4">
                      <div 
                        v-for="(issue, index) in analysis.issues" 
                        :key="index"
                        class="border-l-4 border-red-400 bg-red-50 p-4"
                      >
                        <div class="flex">
                          <div class="flex-shrink-0">
                            <ExclamationCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                          </div>
                          <div class="ml-3">
                            <h4 class="text-sm font-medium text-red-800">{{ issue.title }}</h4>
                            <div class="mt-2 text-sm text-red-700">
                              <p>{{ issue.description }}</p>
                            </div>
                            <div v-if="issue.suggestions" class="mt-2">
                              <p class="text-sm font-medium text-red-800">Suggestions:</p>
                              <ul class="list-disc pl-5 mt-1 space-y-1">
                                <li v-for="(suggestion, idx) in issue.suggestions" :key="idx" class="text-sm text-red-700">
                                  {{ suggestion }}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="!analysis.issues || analysis.issues.length === 0" class="text-center py-8">
                        <CheckCircleIcon class="mx-auto h-12 w-12 text-green-500" />
                        <h4 class="mt-2 text-sm font-medium text-gray-900">No critical issues found</h4>
                        <p class="mt-1 text-sm text-gray-500">Your resume looks good! Keep up the good work.</p>
                      </div>
                    </div>

                    <!-- Keywords Tab -->
                    <div v-else-if="currentTab === 'Keywords'" class="space-y-6">
                      <!-- Missing Keywords -->
                      <div>
                        <div class="flex justify-between items-center mb-3">
                          <h4 class="text-sm font-medium text-gray-900">Missing Keywords</h4>
                          <span class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            {{ analysis.missingKeywords?.length || 0 }} missing
                          </span>
                        </div>
                        <div v-if="analysis.missingKeywords && analysis.missingKeywords.length > 0" class="flex flex-wrap gap-2">
                          <span 
                            v-for="(keyword, index) in analysis.missingKeywords" 
                            :key="`missing-${index}`"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                          >
                            {{ keyword }}
                          </span>
                        </div>
                        <p v-else class="text-sm text-gray-500">No missing keywords found. Great job!</p>
                      </div>

                      <!-- Found Keywords -->
                      <div>
                        <div class="flex justify-between items-center mb-3">
                          <h4 class="text-sm font-medium text-gray-900">Found Keywords</h4>
                          <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {{ analysis.foundKeywords?.length || 0 }} found
                          </span>
                        </div>
                        <div v-if="analysis.foundKeywords && analysis.foundKeywords.length > 0" class="flex flex-wrap gap-2">
                          <span 
                            v-for="(keyword, index) in analysis.foundKeywords" 
                            :key="`found-${index}`"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            <CheckIcon class="mr-1 h-3 w-3" />
                            {{ keyword }}
                          </span>
                        </div>
                        <p v-else class="text-sm text-gray-500">No keywords found in the job description.</p>
                      </div>
                    </div>

                    <!-- Suggestions Tab -->
                    <div v-else-if="currentTab === 'Suggestions'" class="space-y-4">
                      <div 
                        v-for="(suggestion, index) in analysis.suggestions" 
                        :key="index"
                        class="bg-blue-50 p-4 rounded-lg"
                      >
                        <div class="flex">
                          <div class="flex-shrink-0">
                            <LightBulbIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
                          </div>
                          <div class="ml-3">
                            <h4 class="text-sm font-medium text-blue-800">{{ suggestion.title }}</h4>
                            <div class="mt-2 text-sm text-blue-700">
                              <p>{{ suggestion.description }}</p>
                            </div>
                            <div v-if="suggestion.examples" class="mt-3">
                              <p class="text-xs font-medium text-blue-800 uppercase tracking-wider mb-1">Example:</p>
                              <div class="bg-white p-3 rounded-md border border-blue-200 text-sm font-mono text-gray-800">
                                {{ suggestion.examples }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  LightBulbIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
} from '@heroicons/vue/24/outline'

const defaultAnalysis = {
  overallScore: 0,
  keyFindings: '',
  categories: [],
  issues: [],
  suggestions: [],
  missingKeywords: [],
  foundKeywords: [],
}

export default {
  name: 'ResumeAnalysisModal',
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    ExclamationCircleIcon,
    LightBulbIcon,
    SparklesIcon,
    ArrowDownTrayIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    analysisData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['close', 'improve', 'download'],
  setup(props) {
    const currentTab = ref('Overview')
    const animatedScore = ref(0)
    const radius = 40
    const circumference = 2 * Math.PI * radius
    
    // Merge default values with provided analysis data
    const analysis = computed(() => ({
      ...defaultAnalysis,
      ...props.analysisData,
      categories: [
        { name: 'Content', score: 0 },
        { name: 'Formatting', score: 0 },
        { name: 'Keywords', score: 0 },
        { name: 'Readability', score: 0 },
        { name: 'Sections', score: 0 },
        ...(props.analysisData.categories || []),
      ],
    }))

    // Quick stats for the sidebar
    const quickStats = computed(() => [
      { label: 'Pages', value: analysis.value.pages || '1' },
      { label: 'Word Count', value: analysis.value.wordCount || '0' },
      { label: 'Sections', value: analysis.value.sectionCount || '0' },
      { label: 'Issues Found', value: analysis.value.issues?.length || '0' },
    ])

    // Tabs with dynamic counts
    const tabs = computed(() => [
      { name: 'Overview' },
      { name: 'Issues', count: analysis.value.issues?.length || 0 },
      { name: 'Keywords', count: (analysis.value.missingKeywords?.length || 0) + (analysis.value.foundKeywords?.length || 0) },
      { name: 'Suggestions', count: analysis.value.suggestions?.length || 0 },
    ])

    // Animate score when modal opens
    watch(() => props.isOpen, (isOpen) => {
      if (isOpen) {
        // Reset animation
        animatedScore.value = 0
        // Animate to actual score
        const duration = 1500 // ms
        const startTime = Date.now()
        const startValue = 0
        const endValue = analysis.value.overallScore
        
        const animate = () => {
          const now = Date.now()
          const progress = Math.min((now - startTime) / duration, 1)
          const easeInOutCubic = progress < 0.5 
            ? 4 * progress * progress * progress 
            : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1
          
          animatedScore.value = Math.round(startValue + (endValue - startValue) * easeInOutCubic)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        
        requestAnimationFrame(animate)
      }
    })

    // Helper functions
    const getScoreColor = (score) => {
      if (score >= 80) return 'text-green-500'
      if (score >= 60) return 'text-yellow-500'
      return 'text-red-500'
    }

    const getScoreTextColor = (score) => {
      if (score >= 80) return 'text-green-700'
      if (score >= 60) return 'text-yellow-700'
      return 'text-red-700'
    }

    const getScoreBadgeClass = (score) => {
      if (score >= 80) return 'bg-green-100 text-green-800'
      if (score >= 60) return 'bg-yellow-100 text-yellow-800'
      return 'bg-red-100 text-red-800'
    }

    const getScoreLabel = (score) => {
      if (score >= 90) return 'Excellent'
      if (score >= 80) return 'Very Good'
      if (score >= 70) return 'Good'
      if (score >= 60) return 'Fair'
      if (score >= 50) return 'Needs Work'
      return 'Poor'
    }

    const getScoreSummary = (score) => {
      if (score >= 90) return 'Your resume is in excellent shape and should perform well with ATS systems.'
      if (score >= 80) return 'Your resume is in good shape but could use some minor improvements.'
      if (score >= 70) return 'Your resume is decent but needs some work to be more competitive.'
      if (score >= 60) return 'Your resume needs significant improvements to be ATS-friendly.'
      return 'Your resume needs a complete overhaul to be ATS-compatible.'
    }

    return {
      currentTab,
      analysis,
      quickStats,
      tabs,
      animatedScore,
      circumference,
      getScoreColor,
      getScoreTextColor,
      getScoreBadgeClass,
      getScoreLabel,
      getScoreSummary,
    }
  },
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
