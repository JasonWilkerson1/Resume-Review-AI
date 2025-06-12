<template>
  <div class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header with welcome message -->
      <div class="lg:flex lg:items-center lg:justify-between mb-8">
        <div class="flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome back, {{ user.name || 'User' }}!
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Here's what's happening with your resumes and job applications.
          </p>
        </div>
        <div class="mt-4 flex sm:mt-0">
          <nuxt-link 
            to="/editor" 
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            New Resume
          </nuxt-link>
          <button 
            type="button" 
            class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Upload Resume
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <!-- Total Resumes -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Resumes</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ stats.totalResumes || 0 }}</div>
                    <div v-if="stats.newResumes > 0" class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      +{{ stats.newResumes }} new
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- ATS Score -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Avg. ATS Score</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ stats.avgAtsScore ? `${stats.avgAtsScore}%` : 'N/A' }}
                    </div>
                    <div v-if="stats.atsScoreChange" :class="[
                      'ml-2 flex items-baseline text-sm font-semibold',
                      stats.atsScoreChange >= 0 ? 'text-green-600' : 'text-red-600'
                    ]">
                      {{ stats.atsScoreChange >= 0 ? '↑' : '↓' }}{{ Math.abs(stats.atsScoreChange) }}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Jobs Applied -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Jobs Applied</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ stats.jobsApplied || 0 }}</div>
                    <div v-if="stats.jobsChange" :class="[
                      'ml-2 flex items-baseline text-sm font-semibold',
                      stats.jobsChange >= 0 ? 'text-green-600' : 'text-red-600'
                    ]">
                      {{ stats.jobsChange >= 0 ? '+' : '' }}{{ stats.jobsChange }} this month
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Resume Templates -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Templates</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ stats.templates || 8 }}</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-blue-600">
                      +2 new
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Resumes -->
        <div class="lg:col-span-2">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Resumes</h3>
              <p class="mt-1 text-sm text-gray-500">Your most recently created or updated resumes.</p>
            </div>
            <div class="bg-white overflow-hidden">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="resume in recentResumes" :key="resume.id">
                  <div class="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <div class="min-w-0 flex-1 flex items-center">
                          <div class="flex-shrink-0">
                            <DocumentTextIcon class="h-8 w-8 text-gray-400" />
                          </div>
                          <div class="min-w-0 flex-1 px-4">
                            <div>
                              <p class="text-sm font-medium text-blue-600 truncate">
                                {{ resume.title || 'Untitled Resume' }}
                              </p>
                              <p class="mt-1 flex items-center text-sm text-gray-500">
                                <span class="truncate">
                                  Updated {{ formatRelativeTime(resume.updatedAt) }}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ml-5 flex-shrink-0 flex">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 text-sm text-gray-500">
                            ATS: 
                            <span :class="[
                              'font-medium',
                              resume.atsScore >= 80 ? 'text-green-600' : 
                              resume.atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                            ]">
                              {{ resume.atsScore || '--' }}
                            </span>
                          </div>
                          <nuxt-link 
                            :to="`/editor/${resume.id}`" 
                            class="ml-4 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Edit
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li v-if="recentResumes.length === 0" class="px-4 py-6 text-center text-gray-500">
                  <p>No resumes found. Create your first resume to get started.</p>
                </li>
              </ul>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-200">
              <div class="text-sm">
                <nuxt-link to="/resumes" class="font-medium text-blue-600 hover:text-blue-500">
                  View all resumes<span aria-hidden="true"> &rarr;</span>
                </nuxt-link>
              </div>
            </div>
          </div>
          
          <!-- ATS Optimization Tips -->
          <div class="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900">ATS Optimization Tips</h3>
              <p class="mt-1 text-sm text-gray-500">Improve your resume's ATS score with these recommendations.</p>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div class="space-y-4">
                <div v-for="(tip, index) in atsTips" :key="index" class="flex items-start">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                      <CheckIcon class="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-gray-700">
                      {{ tip }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-6">
                <button 
                  type="button" 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Run ATS Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Sidebar -->
        <div class="lg:col-span-1">
          <!-- Recent Activity -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div class="flow-root">
                <ul role="list" class="-mb-8">
                  <li v-for="(activity, index) in recentActivity" :key="index">
                    <div class="relative pb-8">
                      <span v-if="index !== recentActivity.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div class="relative flex space-x-3">
                        <div>
                          <span :class="[activity.iconBackground, 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']">
                            <component :is="activity.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p class="text-sm text-gray-500">
                              {{ activity.content }}
                              <a :href="activity.href" class="font-medium text-gray-900">{{ activity.target }}</a>
                            </p>
                          </div>
                          <div class="text-right text-sm whitespace-nowrap text-gray-500">
                            <time :datetime="activity.datetime">{{ activity.time }}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-6 flex flex-col justify-stretch">
                <button type="button" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  View all activity
                </button>
              </div>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div class="grid grid-cols-1 gap-4">
                <button 
                  v-for="(action, index) in quickActions" 
                  :key="index"
                  @click="handleQuickAction(action.action)"
                  class="inline-flex items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <component :is="action.icon" class="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  {{ action.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { 
  DocumentTextIcon,
  CheckIcon,
  PencilIcon,
  DocumentDownloadIcon,
  ShareIcon,
  DuplicateIcon,
  TemplateIcon,
  UploadIcon,
  DocumentReportIcon,
  SparklesIcon
} from '@heroicons/vue/outline'

export default {
  name: 'DashboardPage',
  components: {
    DocumentTextIcon,
    CheckIcon,
    PencilIcon,
    DocumentDownloadIcon,
    ShareIcon,
    DuplicateIcon,
    TemplateIcon,
    UploadIcon,
    DocumentReportIcon,
    SparklesIcon
  },
  setup() {
    const user = ref({
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    })
    
    const stats = ref({
      totalResumes: 5,
      newResumes: 2,
      avgAtsScore: 78,
      atsScoreChange: 12,
      jobsApplied: 8,
      jobsChange: 3,
      templates: 8
    })
    
    const recentResumes = ref([
      {
        id: '1',
        title: 'Software Engineer - Tech Lead',
        updatedAt: new Date(Date.now() - 3600000 * 24),
        atsScore: 85
      },
      {
        id: '2',
        title: 'Senior Full Stack Developer',
        updatedAt: new Date(Date.now() - 3600000 * 48),
        atsScore: 72
      },
      {
        id: '3',
        title: 'Frontend Developer',
        updatedAt: new Date(Date.now() - 3600000 * 72),
        atsScore: 65
      }
    ])
    
    const atsTips = ref([
      'Add 10-15 relevant skills from the job description',
      'Include measurable achievements with numbers',
      'Use standard section headings (e.g., Experience, Education)',
      'Avoid using tables, headers, or footers',
      'Save your resume as a .docx or .pdf file',
      'Keep your resume to 1-2 pages maximum'
    ])
    
    const recentActivity = ref([
      {
        id: 1,
        content: 'You created ', 
        target: 'Senior Full Stack Developer',
        href: '#',
        icon: DocumentTextIcon,
        iconBackground: 'bg-blue-500',
        datetime: '2023-06-01T15:00',
        time: '1h ago'
      },
      {
        id: 2,
        content: 'You improved your ATS score for ', 
        target: 'Software Engineer Resume',
        href: '#',
        icon: ChartBarIcon,
        iconBackground: 'bg-green-500',
        datetime: '2023-06-01T12:00',
        time: '4h ago'
      },
      {
        id: 3,
        content: 'You applied to ', 
        target: 'Senior Frontend Developer at TechCorp',
        href: '#',
        icon: BriefcaseIcon,
        iconBackground: 'bg-yellow-500',
        datetime: '2023-05-31T09:30',
        time: '1d ago'
      }
    ])
    
    const quickActions = ref([
      { label: 'Create New Resume', icon: PencilIcon, action: 'create' },
      { label: 'Import Resume', icon: UploadIcon, action: 'import' },
      { label: 'Use a Template', icon: TemplateIcon, action: 'template' },
      { label: 'Run ATS Analysis', icon: DocumentReportIcon, action: 'analyze' },
      { label: 'AI Resume Builder', icon: SparklesIcon, action: 'ai-builder' }
    ])
    
    const formatRelativeTime = (date) => {
      const now = new Date()
      const diffInSeconds = Math.floor((now - new Date(date)) / 1000)
      
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
      }
      
      for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds)
        if (interval >= 1) {
          return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`
        }
      }
      
      return 'just now'
    }
    
    const handleQuickAction = (action) => {
      // Handle quick actions
      switch(action) {
        case 'create':
          navigateTo('/editor')
          break
        case 'import':
          // Handle import
          break
        case 'template':
          // Handle template selection
          break
        case 'analyze':
          // Handle ATS analysis
          break
        case 'ai-builder':
          // Handle AI builder
          break
      }
    }
    
    // Mock data fetch
    onMounted(() => {
      // In a real app, fetch data from your API
      console.log('Dashboard mounted')
    })
    
    return {
      user,
      stats,
      recentResumes,
      atsTips,
      recentActivity,
      quickActions,
      formatRelativeTime,
      handleQuickAction
    }
  }
}
</script>
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Time Saved</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">14.6h</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Templates</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">8</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Resumes -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Resumes</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Your most recently created or edited resumes</p>
        </div>
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <ul class="divide-y divide-gray-200">
            <li v-for="resume in recentResumes" :key="resume.id">
              <div class="px-4 py-4 flex items-center sm:px-6">
                <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div class="truncate">
                    <div class="flex text-sm">
                      <p class="font-medium text-blue-600 truncate">{{ resume.title }}</p>
                      <p class="ml-1 flex-shrink-0 font-normal text-gray-500">in {{ resume.template }}</p>
                    </div>
                    <div class="mt-2 flex">
                      <div class="flex items-center text-sm text-gray-500">
                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                        <p>Updated <time :datetime="resume.updatedAt">{{ formatDate(resume.updatedAt) }}</time></p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div class="flex overflow-hidden">
                      <span :class="[resume.score >= 80 ? 'bg-green-100 text-green-800' : resume.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800', 'px-2 py-1 text-xs font-medium rounded-full']">
                        ATS: {{ resume.score }}%
                      </span>
                    </div>
                  </div>
                </div>
                <div class="ml-5 flex-shrink-0">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Get started with these quick actions</p>
        </div>
        <div class="bg-white">
        </div>
      </div>
    </div>
  </div>
  <!-- ... -->
</template>

<script>
        {
          name: 'Settings',
          description: 'Configure your account',
          href: '/settings',
          icon: 'CogIcon',
          iconBackground: 'bg-gray-500'
        }
      ]
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }
}
</script>
