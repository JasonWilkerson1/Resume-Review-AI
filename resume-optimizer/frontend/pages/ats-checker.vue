<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="bg-indigo-700">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Free ATS Resume Checker
        </h1>
        <p class="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
          Upload your resume to check its ATS compatibility and get instant feedback.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Upload Section -->
            <div class="lg:col-span-2">
              <div
                v-if="!file"
                class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                @dragover.prevent="dragover"
                @dragleave="dragleave"
                @drop.prevent="drop($event)"
                :class="{ 'border-indigo-500 bg-indigo-50': isDragging }"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        ref="fileInput"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        accept=".pdf,.doc,.docx"
                        @change="onFileChange"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                </div>
              </div>

              <!-- File Preview -->
              <div v-else class="mt-2">
                <div class="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                  <div class="flex items-center">
                    <DocumentTextIcon class="h-10 w-10 text-indigo-600" />
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
                      <p class="text-sm text-gray-500">{{ formatFileSize(file.size) }}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="text-gray-400 hover:text-gray-500"
                    @click="removeFile"
                  >
                    <XMarkIcon class="h-5 w-5" />
                    <span class="sr-only">Remove file</span>
                  </button>
                </div>

                <!-- Job Description -->
                <div class="mt-6">
                  <label for="job-description" class="block text-sm font-medium text-gray-700">
                    Job Description (Optional)
                  </label>
                  <div class="mt-1">
                    <textarea
                      id="job-description"
                      v-model="jobDescription"
                      rows="4"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Paste the job description here to match your resume against it..."
                    />
                  </div>
                </div>

                <!-- Analyze Button -->
                <div class="mt-6">
                  <button
                    type="button"
                    @click="analyzeResume"
                    :disabled="isAnalyzing"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="!isAnalyzing">Analyze My Resume</span>
                    <span v-else class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1">
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 mb-4">How It Works</h3>
                <ul class="space-y-4">
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <CheckCircleIcon class="h-5 w-5 text-green-500" />
                    </div>
                    <p class="ml-3 text-sm text-gray-600">
                      Upload your resume in PDF, DOC, or DOCX format
                    </p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <CheckCircleIcon class="h-5 w-5 text-green-500" />
                    </div>
                    <p class="ml-3 text-sm text-gray-600">
                      Optionally add a job description to match against
                    </p>
                  </li>
                  <li class="flex items-start">
                    <div class="flex-shrink-0">
                      <CheckCircleIcon class="h-5 w-5 text-green-500" />
                    </div>
                    <p class="ml-3 text-sm text-gray-600">
                      Get instant feedback on your resume's ATS compatibility
                    </p>
                  </li>
                </ul>

                <div class="mt-6">
                  <h4 class="text-sm font-medium text-gray-900 mb-2">What We Check:</h4>
                  <ul class="space-y-2">
                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <CheckIcon class="h-4 w-4 text-green-500 mt-0.5" />
                      </div>
                      <span class="ml-2 text-sm text-gray-600">File Format</span>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <CheckIcon class="h-4 w-4 text-green-500 mt-0.5" />
                      </div>
                      <span class="ml-2 text-sm text-gray-600">Readability</span>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <CheckIcon class="h-4 w-4 text-green-500 mt-0.5" />
                      </div>
                      <span class="ml-2 text-sm text-gray-600">Keywords</span>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <CheckIcon class="h-4 w-4 text-green-500 mt-0.5" />
                      </div>
                      <span class="ml-2 text-sm text-gray-600">Sections</span>
                    </li>
                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <CheckIcon class="h-4 w-4 text-green-500 mt-0.5" />
                      </div>
                      <span class="ml-2 text-sm text-gray-600">Job Match</span>
                    </li>
                  </ul>
                </div>

                <div class="mt-6">
                  <p class="text-xs text-gray-500">
                    Your resume is processed securely and never stored. By uploading, you agree to our
                    <a href="/privacy" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="showResults" class="mt-12">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 bg-gray-50">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-gray-900">Analysis Results</h2>
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-500 mr-2">Overall Score:</span>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getScoreClass(atsScore)"
                >
                  {{ atsScore }}/100
                </span>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div v-for="(check, index) in atsChecks" :key="index" class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500 flex items-center">
                  <CheckCircleIcon v-if="check.passed" class="h-5 w-5 text-green-500 mr-2" />
                  <XCircleIcon v-else class="h-5 w-5 text-red-500 mr-2" />
                  {{ check.name }}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p>{{ check.message }}</p>
                  <div v-if="check.suggestions && check.suggestions.length > 0" class="mt-2">
                    <p class="text-sm font-medium text-gray-700">Suggestions:</p>
                    <ul class="list-disc pl-5 mt-1 space-y-1">
                      <li v-for="(suggestion, idx) in check.suggestions" :key="idx" class="text-sm text-gray-600">
                        {{ suggestion }}
                      </li>
                    </ul>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          
          <div class="px-4 py-4 sm:px-6 bg-gray-50 text-right">
            <button
              type="button"
              @click="startOver"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Over
            </button>
            <button
              type="button"
              @click="upgradeToPro"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upgrade to Pro for Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { 
  DocumentTextIcon, 
  XMarkIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'ATSCheckerPage',
  components: {
    DocumentTextIcon,
    XMarkIcon,
    CheckCircleIcon,
    XCircleIcon,
    CheckIcon
  },
  setup() {
    const file = ref(null)
    const fileInput = ref(null)
    const isDragging = ref(false)
    const jobDescription = ref('')
    const isAnalyzing = ref(false)
    const showResults = ref(false)
    const atsScore = ref(0)
    const atsChecks = ref([])

    const dragover = () => {
      isDragging.value = true
    }

    const dragleave = () => {
      isDragging.value = false
    }

    const drop = (e) => {
      isDragging.value = false
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0])
      }
    }


    const onFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0])
      }
    }

    const handleFile = (selectedFile) => {
      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!validTypes.includes(selectedFile.type)) {
        alert('Please upload a valid file type (PDF, DOC, or DOCX)')
        return
      }

      // Check file size (5MB max)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (selectedFile.size > maxSize) {
        alert('File is too large. Maximum size is 5MB.')
        return
      }

      file.value = selectedFile
    }

    const removeFile = () => {
      file.value = null
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const analyzeResume = () => {
      if (!file.value) {
        alert('Please upload a resume first')
        return
      }

      isAnalyzing.value = true
      showResults.value = false

      // Simulate API call
      setTimeout(() => {
        // Mock analysis results
        atsScore.value = Math.floor(Math.random() * 30) + 70 // Random score between 70-100
        
        atsChecks.value = [
          {
            name: 'File Format',
            passed: true,
            message: 'Your resume is in a compatible format (PDF, DOC, or DOCX).',
            suggestions: []
          },
          {
            name: 'Readability',
            passed: true,
            message: 'Your resume is easily readable by ATS systems.',
            suggestions: []
          },
          {
            name: 'Contact Information',
            passed: true,
            message: 'Your contact information is complete and properly formatted.',
            suggestions: []
          },
          {
            name: 'Sections',
            passed: true,
            message: 'Your resume contains all the essential sections.',
            suggestions: []
          },
          {
            name: 'Keywords',
            passed: atsScore.value > 75,
            message: atsScore.value > 75 
              ? 'Your resume contains relevant keywords.' 
              : 'Your resume could benefit from more relevant keywords.',
            suggestions: atsScore.value > 75 
              ? []
              : [
                  'Add more industry-specific keywords',
                  'Incorporate terms from the job description',
                  'Highlight key skills and technologies'
                ]
          },
          {
            name: 'Job Match',
            passed: jobDescription.value ? atsScore.value > 80 : null,
            message: jobDescription.value 
              ? (atsScore.value > 80 
                  ? 'Your resume is a good match for the job description.' 
                  : 'Your resume could be better tailored to the job description.')
              : 'Upload a job description for a more detailed analysis.',
            suggestions: jobDescription.value && atsScore.value <= 80
              ? [
                  'Match your skills to the job requirements',
                  'Use similar terminology as the job posting',
                  'Highlight relevant experience first'
                ]
              : []
          }
        ]

        isAnalyzing.value = false
        showResults.value = true
        
        // Scroll to results
        setTimeout(() => {
          const resultsSection = document.querySelector('#results')
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }, 2000) // Simulate API delay
    }

    const getScoreClass = (score) => {
      if (score >= 90) return 'bg-green-100 text-green-800'
      if (score >= 70) return 'bg-yellow-100 text-yellow-800'
      return 'bg-red-100 text-red-800'
    }

    const startOver = () => {
      file.value = null
      jobDescription.value = ''
      showResults.value = false
      atsScore.value = 0
      atsChecks.value = []
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }

    const upgradeToPro = () => {
      // Navigate to pricing or signup page
      window.location.href = '/pricing'
    }

    return {
      file,
      fileInput,
      isDragging,
      jobDescription,
      isAnalyzing,
      showResults,
      atsScore,
      atsChecks,
      dragover,
      dragleave,
      drop,
      onFileChange,
      removeFile,
      formatFileSize,
      analyzeResume,
      getScoreClass,
      startOver,
      upgradeToPro
    }
  }
}
</script>
