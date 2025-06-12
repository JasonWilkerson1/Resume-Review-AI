<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h4 class="text-lg font-medium text-gray-900">Professional Summary</h4>
      <div class="flex items-center">
        <label for="summary-type" class="sr-only">Summary Type</label>
        <select
          id="summary-type"
          v-model="summaryType"
          class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="summary">Summary</option>
          <option value="objective">Objective</option>
          <option value="professional">Professional Profile</option>
        </select>
      </div>
    </div>
    
    <div class="space-y-4">
      <!-- Summary Input -->
      <div>
        <label for="summary" class="block text-sm font-medium text-gray-700 sr-only">
          {{ summaryType === 'summary' ? 'Professional Summary' : 
             summaryType === 'objective' ? 'Career Objective' : 'Professional Profile' }}
        </label>
        <div class="mt-1">
          <textarea
            id="summary"
            v-model="formData.content"
            @input="updateData"
            rows="4"
            class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            :placeholder="summaryPlaceholder"
          />
        </div>
        <p class="mt-2 text-sm text-gray-500">
          {{ formData.content.length }}/500 characters
        </p>
      </div>

      <!-- AI Suggestions -->
      <div v-if="showAISuggestions" class="mt-4">
        <button
          type="button"
          @click="showAISuggestions = false"
          class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Hide AI suggestions
          <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        
        <div class="mt-2 space-y-3">
          <div 
            v-for="(suggestion, index) in aiSuggestions" 
            :key="index"
            class="p-3 bg-blue-50 rounded-lg border border-blue-100"
          >
            <p class="text-sm text-gray-700">{{ suggestion }}</p>
            <div class="mt-2 flex justify-end space-x-2">
              <button
                type="button"
                @click="useSuggestion(suggestion)"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Use this
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <button
          type="button"
          @click="getAISuggestions"
          class="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
          :disabled="isGenerating"
        >
          <svg v-if="isGenerating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-else>
            <svg class="-ml-1 mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          {{ isGenerating ? 'Generating suggestions...' : 'Get AI suggestions' }}
        </button>
      </div>
      
      <!-- Keywords -->
      <div class="mt-4">
        <label for="keywords" class="block text-sm font-medium text-gray-700">
          Keywords / Skills
          <span class="text-xs text-gray-500 font-normal">(comma separated)</span>
        </label>
        <div class="mt-1">
          <input
            type="text"
            id="keywords"
            v-model="keywordsInput"
            @keydown.enter.prevent="addKeyword"
            @keydown.188.prevent="addKeyword"
            @blur="addKeyword"
            class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="e.g. Project Management, JavaScript, Team Leadership"
          />
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <span 
            v-for="(keyword, index) in formData.keywords" 
            :key="index"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {{ keyword }}
            <button 
              type="button"
              @click="removeKeyword(index)"
              class="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
            >
              <span class="sr-only">Remove keyword</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  name: 'SummarySection',
  props: {
    data: {
      type: Object,
      default: () => ({
        type: 'summary',
        content: '',
        keywords: []
      })
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const summaryType = ref(props.data.type || 'summary')
    const formData = ref({ ...props.data })
    const keywordsInput = ref('')
    const showAISuggestions = ref(false)
    const isGenerating = ref(false)
    const aiSuggestions = ref([])

    // Computed property for summary placeholder text
    const summaryPlaceholder = computed(() => {
      const placeholders = {
        summary: 'Experienced professional with X years of experience in [industry/field]. Skilled in [key skills]. Proven track record of [key achievements]. Seeking to leverage my expertise in [specific area] to achieve [goal] at [target company].',
        objective: 'Recent [degree] graduate with a passion for [field/industry]. Eager to apply my [key skills] in a [type of position] role at [company name]. Strong [relevant skills] and a quick learner with a drive to [career goal].',
        professional: 'Results-driven [job title] with [X] years of experience in [industry/field]. Specialized in [specific skills or areas]. Adept at [key responsibilities]. Recognized for [notable achievements or awards]. Committed to [professional goal or philosophy].'
      }
      return placeholders[summaryType.value] || placeholders.summary
    })

    // Watch for changes in the data prop
    watch(() => props.data, (newData) => {
      formData.value = { ...newData }
      summaryType.value = newData.type || 'summary'
    }, { deep: true })

    // Watch for changes in summary type
    watch(summaryType, (newType) => {
      formData.value.type = newType
      updateData()
    })

    // Emit update when form data changes
    const updateData = () => {
      // Trim the content to 500 characters
      if (formData.value.content.length > 500) {
        formData.value.content = formData.value.content.substring(0, 500)
      }
      
      emit('update', { 
        section: 'summary',
        data: { ...formData.value }
      })
    }

    // Add a keyword
    const addKeyword = () => {
      const keyword = keywordsInput.value.trim()
      if (keyword && !formData.value.keywords.includes(keyword)) {
        formData.value.keywords = [...(formData.value.keywords || []), keyword]
        updateData()
      }
      keywordsInput.value = ''
    }

    // Remove a keyword
    const removeKeyword = (index) => {
      formData.value.keywords.splice(index, 1)
      updateData()
    }

    // Get AI suggestions
    const getAISuggestions = async () => {
      isGenerating.value = true
      showAISuggestions.value = true
      
      // Simulate API call
      try {
        // In a real app, this would be an API call to your backend
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock suggestions based on current content
        const baseText = formData.value.content || 'Professional with experience in the field.'
        aiSuggestions.value = [
          `${baseText} Skilled in ${formData.value.keywords.slice(0, 3).join(', ')} with a proven track record of success.`,
          `Results-driven ${summaryType.value} professional with expertise in ${formData.value.keywords[0] || 'relevant field'}. ${baseText}`,
          `Passionate about ${formData.value.keywords[1] || 'industry'}. ${baseText} Seeking opportunities to apply my skills in a challenging environment.`
        ]
      } catch (error) {
        console.error('Error generating suggestions:', error)
      } finally {
        isGenerating.value = false
      }
    }

    // Use a suggestion
    const useSuggestion = (suggestion) => {
      formData.value.content = suggestion
      updateData()
    }

    return {
      formData,
      summaryType,
      keywordsInput,
      showAISuggestions,
      isGenerating,
      aiSuggestions,
      summaryPlaceholder,
      updateData,
      addKeyword,
      removeKeyword,
      getAISuggestions,
      useSuggestion
    }
  }
}
</script>
