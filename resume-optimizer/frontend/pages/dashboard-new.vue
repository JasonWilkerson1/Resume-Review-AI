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
                <DocumentTextIcon class="h-6 w-6 text-white" />
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
                <ChartBarIcon class="h-6 w-6 text-white" />
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
                <BriefcaseIcon class="h-6 w-6 text-white" />
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
                <TemplateIcon class="h-6 w-6 text-white" />
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
          </div>

          <!-- ATS Tips -->
          <div class="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900">ATS Optimization Tips</h3>
              <p class="mt-1 text-sm text-gray-500">Improve your resume's ATS score with these recommendations.</p>
            </div>
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="(tip, index) in atsTips" :key="tip.id" class="px-4 py-4 sm:px-6">
                <div class="flex items-center">
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center">
                      <input
                        :id="`tip-${tip.id}`"
                        type="checkbox"
                        v-model="tip.completed"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label :for="`tip-${tip.id}`" class="ml-3">
                        <p class="text-sm font-medium text-gray-900">{{ tip.title }}</p>
                        <p class="text-sm text-gray-500">{{ tip.description }}</p>
                      </label>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <span :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      tip.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    ]">
                      {{ tip.priority }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Right Sidebar -->
        <div class="lg:col-span-1">
          <!-- Recent Activity -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div class="flow-root">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="activity in recentActivity" :key="activity.id" class="px-4 py-4">
                  <div class="flex space-x-3">
                    <img class="h-8 w-8 rounded-full" :src="activity.user.avatar" alt="" />
                    <div class="flex-1 space-y-1">
                      <div class="flex items-center justify-between">
                        <h3 class="text-sm font-medium">{{ activity.user.name }}</h3>
                        <p class="text-sm text-gray-500">{{ formatRelativeTime(activity.time) }}</p>
                      </div>
                      <p class="text-sm text-gray-500">{{ activity.title }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <a href="#" class="font-medium text-blue-600 hover:text-blue-500">View all activity<span aria-hidden="true"> &rarr;</span></a>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 gap-4">
                <button
                  v-for="action in quickActions"
                  :key="action.id"
                  @click="handleQuickAction(action.action)"
                  class="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <component :is="action.icon" class="h-8 w-8 text-blue-600" />
                  <span class="mt-2 text-sm font-medium text-gray-900">{{ action.name }}</span>
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
  SparklesIcon, 
  ChartBarIcon, 
  BriefcaseIcon 
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
    SparklesIcon,
    ChartBarIcon,
    BriefcaseIcon
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
      atsScoreChange: 5,
      jobsApplied: 12,
      jobsChange: 3,
      templates: 8
    })

    const recentResumes = ref([
      {
        id: '1',
        title: 'Senior Frontend Developer',
        updatedAt: new Date(Date.now() - 3600000 * 2),
        atsScore: 85,
        template: 'Modern'
      },
      {
        id: '2',
        title: 'Full Stack Engineer',
        updatedAt: new Date(Date.now() - 3600000 * 24),
        atsScore: 72,
        template: 'Professional'
      },
      {
        id: '3',
        title: 'UI/UX Designer',
        updatedAt: new Date(Date.now() - 3600000 * 24 * 3),
        atsScore: 68,
        template: 'Creative'
      }
    ])

    const atsTips = ref([
      {
        id: 1,
        title: 'Add more relevant skills',
        description: 'Include at least 5-7 key skills that match the job description.',
        priority: 'high',
        completed: false
      },
      {
        id: 2,
        title: 'Optimize for ATS keywords',
        description: 'Use more industry-standard terms like "JavaScript" instead of "JS".',
        priority: 'medium',
        completed: true
      },
      {
        id: 3,
        title: 'Add metrics to work experience',
        description: 'Quantify your achievements with numbers and percentages.',
        priority: 'high',
        completed: false
      }
    ])

    const recentActivity = ref([
      {
        id: 1,
        type: 'resume_update',
        title: 'Updated Senior Frontend Developer resume',
        time: new Date(Date.now() - 3600000 * 2),
        user: user.value
      },
      {
        id: 2,
        type: 'job_applied',
        title: 'Applied to Senior Frontend Developer at Tech Corp',
        time: new Date(Date.now() - 3600000 * 5),
        user: user.value
      },
      {
        id: 3,
        type: 'resume_created',
        title: 'Created Full Stack Engineer resume',
        time: new Date(Date.now() - 3600000 * 24),
        user: user.value
      }
    ])

    const quickActions = [
      { id: 1, name: 'Create New Resume', icon: 'DocumentTextIcon', action: 'create_resume' },
      { id: 2, name: 'Upload Resume', icon: 'UploadIcon', action: 'upload_resume' },
      { id: 3, name: 'Check ATS Score', icon: 'DocumentReportIcon', action: 'check_ats' },
      { id: 4, name: 'Optimize Resume', icon: 'SparklesIcon', action: 'optimize' },
      { id: 5, name: 'View Templates', icon: 'TemplateIcon', action: 'templates' },
      { id: 6, name: 'Job Search', icon: 'BriefcaseIcon', action: 'job_search' }
    ]

    const formatRelativeTime = (date) => {
      if (!date) return 'just now'
      
      const seconds = Math.floor((new Date() - new Date(date)) / 1000)
      let interval = Math.floor(seconds / 31536000)
      
      if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`
      interval = Math.floor(seconds / 2592000)
      if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`
      interval = Math.floor(seconds / 86400)
      if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`
      interval = Math.floor(seconds / 3600)
      if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`
      interval = Math.floor(seconds / 60)
      if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`
      return 'just now'
    }

    const handleQuickAction = (action) => {
      // Handle quick action button clicks
      console.log('Quick action:', action)
      // Implement action handling logic here
    }

    onMounted(() => {
      // Any initialization code can go here
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
