<template>
  <div class="h-full flex overflow-hidden bg-gray-100">
    <!-- Sidebar -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div class="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center px-4">
            <img class="h-8 w-auto" src="~/assets/images/logo.svg" alt="Resume Optimizer AI">
          </div>
          
          <!-- Navigation -->
          <nav class="mt-5 flex-1 px-2 space-y-1">
            <nuxt-link 
              v-for="(item, itemIdx) in navigation" 
              :key="item.name"
              :to="item.href"
              :class="[
                item.current 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              ]"
            >
              <component 
                :is="item.icon" 
                :class="[
                  item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                ]" 
                aria-hidden="true" 
              />
              {{ item.name }}
            </nuxt-link>
          </nav>

          <!-- Resume Sections -->
          <div class="px-4 py-4">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Resume Sections</h3>
            <nav class="mt-2 space-y-1">
              <button
                v-for="(section, sectionIdx) in resumeSections"
                :key="section.name"
                @click="activeSection = section.id"
                :class="[
                  activeSection === section.id
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                  'group w-full flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md'
                ]"
              >
                <component 
                  :is="section.icon" 
                  :class="[
                    activeSection === section.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-5 w-5'
                  ]" 
                  aria-hidden="true" 
                />
                {{ section.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- User Profile -->
        <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div class="flex-shrink-0 group block">
            <div class="flex items-center">
              <div>
                <img class="inline-block h-9 w-9 rounded-full" :src="user.imageUrl" alt="" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {{ user.name }}
                </p>
                <nuxt-link to="/settings" class="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View account
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex">
            <div class="w-full flex md:ml-0">
              <label for="resume-title" class="sr-only">Resume Title</label>
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="resume-title"
                  v-model="resume.title"
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Untitled Resume"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="saveResume"
            >
              <span class="sr-only">Save</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              type="button"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="exportResume"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile sidebar -->
      <div v-show="sidebarOpen" class="md:hidden">
        <div class="fixed inset-0 flex z-40">
          <div class="fixed inset-0" @click="sidebarOpen = false">
            <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="sidebarOpen = false"
              >
                <span class="sr-only">Close sidebar</span>
                <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <img class="h-8 w-auto" src="~/assets/images/logo.svg" alt="Resume Optimizer AI">
              </div>
              <nav class="mt-5 px-2 space-y-1">
                <nuxt-link 
                  v-for="item in navigation" 
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    item.current 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                  ]"
                  @click.native="sidebarOpen = false"
                >
                  <component 
                    :is="item.icon" 
                    :class="[
                      item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-4 flex-shrink-0 h-6 w-6'
                    ]" 
                    aria-hidden="true" 
                  />
                  {{ item.name }}
                </nuxt-link>
              </nav>
            </div>
            <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div class="flex-shrink-0 group block">
                <div class="flex items-center">
                  <div>
                    <img class="inline-block h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                  </div>
                  <div class="ml-3">
                    <p class="text-base font-medium text-gray-700 group-hover:text-gray-900">
                      {{ user.name }}
                    </p>
                    <nuxt-link to="/settings" class="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                      View account
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-shrink-0 w-14">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </div>

      <!-- Editor Content -->
      <div class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
          <div class="h-full">
            <!-- Resume Preview/Editor Tabs -->
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8">
                <button
                  v-for="tab in editorTabs"
                  :key="tab.name"
                  @click="activeTab = tab.id"
                  :class="[
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  ]"
                >
                  {{ tab.name }}
                </button>
              </nav>
            </div>

            <!-- Tab Panels -->
            <div class="py-6">
              <!-- Editor Panel -->
              <div v-show="activeTab === 'editor'" class="space-y-6">
                <div v-for="section in activeSections" :key="section.id" class="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      {{ section.name }}
                    </h3>
                    <button
                      v-if="section.collapsible"
                      @click="toggleSection(section.id)"
                      class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <span class="sr-only">{{ section.isOpen ? 'Collapse' : 'Expand' }} section</span>
                      <svg
                        :class="{
                          'transform rotate-180': section.isOpen,
                          'transform rotate-0': !section.isOpen
                        }"
                        class="h-5 w-5 transition-transform duration-200"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div v-show="!section.collapsible || section.isOpen" class="border-t border-gray-200 px-4 py-5 sm:p-6">
                    <component :is="section.component" v-bind="section.props" @update="updateResumeData" />
                  </div>
                </div>
              </div>

              <!-- Preview Panel -->
              <div v-show="activeTab === 'preview'" class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Resume Preview</h3>
                  <p class="mt-1 text-sm text-gray-500">This is how your resume will look when exported.</p>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <!-- Resume Preview Component will go here -->
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">No preview available</h3>
                    <p class="mt-1 text-sm text-gray-500">Start building your resume to see a live preview.</p>
                  </div>
                </div>
              </div>

              <!-- ATS Analysis Panel -->
              <div v-show="activeTab === 'analysis'" class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">ATS Analysis</h3>
                  <p class="mt-1 text-sm text-gray-500">Get insights on how to optimize your resume for ATS.</p>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                          Complete your resume to get a detailed ATS analysis and improve your chances of getting noticed by recruiters.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { 
  HomeIcon,
  DocumentTextIcon,
  TemplateIcon,
  ChartBarIcon,
  UserCircleIcon,
  CogIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  StarIcon,
  BeakerIcon,
  DocumentReportIcon,
  CodeIcon,
  UserGroupIcon,
  GlobeAltIcon,
  MailIcon,
  PhoneIcon,
  LocationMarkerIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/vue/outline'

// Import section components
import PersonalInfoSection from '@/components/resume/PersonalInfoSection.vue'
import SummarySection from '@/components/resume/SummarySection.vue'
import ExperienceSection from '@/components/resume/ExperienceSection.vue'
import EducationSection from '@/components/resume/EducationSection.vue'
import SkillsSection from '@/components/resume/SkillsSection.vue'
import ProjectsSection from '@/components/resume/ProjectsSection.vue'
import CertificationsSection from '@/components/resume/CertificationsSection.vue'
import LanguagesSection from '@/components/resume/LanguagesSection.vue'

export default {
  name: 'ResumeEditor',
  components: {
    HomeIcon,
    DocumentTextIcon,
    TemplateIcon,
    ChartBarIcon,
    UserCircleIcon,
    CogIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    StarIcon,
    BeakerIcon,
    DocumentReportIcon,
    CodeIcon,
    UserGroupIcon,
    GlobeAltIcon,
    MailIcon,
    PhoneIcon,
    LocationMarkerIcon,
    LinkIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    PersonalInfoSection,
    SummarySection,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    ProjectsSection,
    CertificationsSection,
    LanguagesSection
  },
  setup() {
    const sidebarOpen = ref(false)
    const activeTab = ref('editor')
    const activeSection = ref('personal')
    
    // Sample resume data
    const resume = ref({
      id: '1',
      title: 'My Professional Resume',
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: ''
      },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: []
    })

    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }

    const navigation = [
      { name: 'Dashboard', href: '/dashboard', icon: 'HomeIcon', current: false },
      { name: 'My Resumes', href: '/resumes', icon: 'DocumentTextIcon', current: false },
      { name: 'Templates', href: '/templates', icon: 'TemplateIcon', current: false },
      { name: 'Analytics', href: '/analytics', icon: 'ChartBarIcon', current: false },
      { name: 'Account', href: '/account', icon: 'UserCircleIcon', current: false },
      { name: 'Settings', href: '/settings', icon: 'CogIcon', current: false },
    ]

    const resumeSections = [
      { id: 'personal', name: 'Personal Info', icon: 'UserCircleIcon', collapsible: false },
      { id: 'summary', name: 'Professional Summary', icon: 'DocumentTextIcon', collapsible: true, isOpen: true },
      { id: 'experience', name: 'Work Experience', icon: 'BriefcaseIcon', collapsible: true, isOpen: true },
      { id: 'education', name: 'Education', icon: 'AcademicCapIcon', collapsible: true, isOpen: true },
      { id: 'skills', name: 'Skills', icon: 'StarIcon', collapsible: true, isOpen: true },
      { id: 'projects', name: 'Projects', icon: 'BeakerIcon', collapsible: true, isOpen: true },
      { id: 'certifications', name: 'Certifications', icon: 'DocumentReportIcon', collapsible: true, isOpen: true },
      { id: 'languages', name: 'Languages', icon: 'GlobeAltIcon', collapsible: true, isOpen: true },
    ]

    const editorTabs = [
      { id: 'editor', name: 'Editor' },
      { id: 'preview', name: 'Preview' },
      { id: 'analysis', name: 'ATS Analysis' },
    ]

    const activeSections = computed(() => {
      if (activeSection.value === 'all') {
        return resumeSections.map(section => ({
          ...section,
          component: getSectionComponent(section.id),
          props: { data: resume.value[section.id] || {} }
        }))
      }
      
      const section = resumeSections.find(s => s.id === activeSection.value) || resumeSections[0]
      return [{
        ...section,
        component: getSectionComponent(section.id),
        props: { data: resume.value[section.id] || {} }
      }]
    })

    function getSectionComponent(sectionId) {
      const components = {
        personal: 'PersonalInfoSection',
        summary: 'SummarySection',
        experience: 'ExperienceSection',
        education: 'EducationSection',
        skills: 'SkillsSection',
        projects: 'ProjectsSection',
        certifications: 'CertificationsSection',
        languages: 'LanguagesSection'
      }
      return components[sectionId] || 'div'
    }

    function toggleSection(sectionId) {
      const section = resumeSections.find(s => s.id === sectionId)
      if (section) {
        section.isOpen = !section.isOpen
      }
    }

    function updateResumeData({ section, data }) {
      resume.value[section] = data
    }

    function saveResume() {
      // Implement save functionality
      console.log('Saving resume:', resume.value)
      // Show success message
    }

    function exportResume() {
      // Implement export functionality
      console.log('Exporting resume as PDF')
    }

    return {
      sidebarOpen,
      activeTab,
      activeSection,
      resume,
      user,
      navigation,
      resumeSections,
      editorTabs,
      activeSections,
      toggleSection,
      updateResumeData,
      saveResume,
      exportResume
    }
  }
}
</script>
