<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h4 class="text-lg font-medium text-gray-900">Work Experience</h4>
      <button
        type="button"
        @click="addExperience"
        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon class="-ml-0.5 mr-1 h-4 w-4" aria-hidden="true" />
        Add Experience
      </button>
    </div>
    
    <div v-if="experiences.length === 0" class="text-center">
      <BriefcaseIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">No experience added</h3>
      <p class="mt-1 text-sm text-gray-500">
        Get started by adding your work experience.
      </p>
      <div class="mt-6">
        <button
          type="button"
          @click="addExperience"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Experience
        </button>
      </div>
    </div>

    <div v-else class="space-y-6">
      <draggable 
        v-model="experiences" 
        item-key="id"
        handle=".drag-handle"
        @end="onDragEnd"
        class="space-y-4"
      >
        <template #item="{ element: experience, index }">
          <div class="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200 border border-gray-200">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <button type="button" class="drag-handle text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Drag to reorder</span>
                    <MenuAlt2Icon class="h-5 w-5" aria-hidden="true" />
                  </button>
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ experience.jobTitle || 'Untitled Position' }}
                  </h3>
                </div>
                <div class="flex space-x-2">
                  <button
                    type="button"
                    @click="duplicateExperience(index)"
                    class="text-gray-400 hover:text-gray-500"
                    title="Duplicate"
                  >
                    <DocumentDuplicateIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">Duplicate</span>
                  </button>
                  <button
                    type="button"
                    @click="toggleExpand(index)"
                    class="text-gray-400 hover:text-gray-500"
                  >
                    <ChevronDownIcon v-if="!expandedSections[index]" class="h-5 w-5" aria-hidden="true" />
                    <ChevronUpIcon v-else class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">{{ expandedSections[index] ? 'Collapse' : 'Expand' }} section</span>
                  </button>
                  <button
                    type="button"
                    @click="removeExperience(index)"
                    class="text-red-400 hover:text-red-500"
                    title="Remove"
                  >
                    <TrashIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">Remove</span>
                  </button>
                </div>
              </div>
              <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <OfficeBuildingIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ experience.company || 'Company Name' }}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <LocationMarkerIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ experience.location || 'Location' }}
                </div>
                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  {{ formatDateRange(experience.startDate, experience.endDate, experience.current) }}
                </div>
              </div>
            </div>
            
            <div v-if="expandedSections[index]" class="px-4 py-5 sm:p-6 space-y-6">
              <!-- Job Title -->
              <div>
                <label :for="`job-title-${experience.id}`" class="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  :id="`job-title-${experience.id}`"
                  v-model="experience.jobTitle"
                  @input="updateExperience(index)"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
              
              <!-- Company & Location -->
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <label :for="`company-${experience.id}`" class="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    :id="`company-${experience.id}`"
                    v-model="experience.company"
                    @input="updateExperience(index)"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Company Name"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label :for="`location-${experience.id}`" class="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    :id="`location-${experience.id}`"
                    v-model="experience.location"
                    @input="updateExperience(index)"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="City, Country"
                  />
                </div>
              </div>
              
              <!-- Date Range -->
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-2">
                  <label :for="`start-date-${experience.id}`" class="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="month"
                    :id="`start-date-${experience.id}`"
                    v-model="experience.startDate"
                    @input="updateExperience(index)"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label :for="`end-date-${experience.id}`" class="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="month"
                    :id="`end-date-${experience.id}`"
                    v-model="experience.endDate"
                    :disabled="experience.current"
                    @input="updateExperience(index)"
                    :class="[
                      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                      experience.current ? 'bg-gray-100' : ''
                    ]"
                  />
                </div>
                <div class="sm:col-span-2 flex items-end">
                  <div class="flex items-center h-10">
                    <input
                      :id="`current-${experience.id}`"
                      v-model="experience.current"
                      type="checkbox"
                      @change="updateExperience(index)"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label :for="`current-${experience.id}`" class="ml-2 block text-sm text-gray-700">
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Job Description -->
              <div>
                <label :for="`description-${experience.id}`" class="block text-sm font-medium text-gray-700">Job Description</label>
                <div class="mt-1">
                  <textarea
                    :id="`description-${experience.id}`"
                    v-model="experience.description"
                    @input="updateExperience(index)"
                    rows="3"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Briefly describe your role and responsibilities"
                  />
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Write a few sentences about your role and key achievements.
                </p>
              </div>
              
              <!-- Achievements -->
              <div>
                <div class="flex justify-between items-center">
                  <label class="block text-sm font-medium text-gray-700">Key Achievements</label>
                  <button
                    type="button"
                    @click="addAchievement(index)"
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon class="-ml-0.5 mr-1 h-3 w-3" aria-hidden="true" />
                    Add Achievement
                  </button>
                </div>
                <div class="mt-2 space-y-2">
                  <div 
                    v-for="(achievement, aIndex) in experience.achievements" 
                    :key="aIndex"
                    class="flex items-start"
                  >
                    <div class="flex items-center h-5">
                      <StarIcon class="h-4 w-4 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div class="ml-3 flex-1">
                      <input
                        type="text"
                        v-model="experience.achievements[aIndex]"
                        @input="updateExperience(index)"
                        class="block w-full border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-500 sm:text-sm py-1 px-2"
                        placeholder="Describe an achievement or responsibility"
                      />
                    </div>
                    <button
                      type="button"
                      @click="removeAchievement(index, aIndex)"
                      class="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <XIcon class="h-4 w-4" aria-hidden="true" />
                      <span class="sr-only">Remove</span>
                    </button>
                  </div>
                  <div v-if="!experience.achievements || experience.achievements.length === 0" class="text-center py-2">
                    <p class="text-sm text-gray-500">No achievements added yet.</p>
                  </div>
                </div>
              </div>
              
              <!-- Skills -->
              <div>
                <label :for="`skills-${experience.id}`" class="block text-sm font-medium text-gray-700">Skills Used</label>
                <div class="mt-1">
                  <input
                    type="text"
                    :id="`skills-${experience.id}`"
                    v-model="skillsInput[index]"
                    @keydown.enter.prevent="addSkill(index)"
                    @keydown.188.prevent="addSkill(index)"
                    @blur="addSkill(index)"
                    class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g. React, Node.js, Project Management"
                  />
                </div>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span 
                    v-for="(skill, sIndex) in experience.skills" 
                    :key="sIndex"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ skill }}
                    <button 
                      type="button"
                      @click="removeSkill(index, sIndex)"
                      class="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                    >
                      <span class="sr-only">Remove skill</span>
                      <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
              
              <!-- AI Suggestions -->
              <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-center">
                  <h4 class="text-sm font-medium text-gray-700">AI-Powered Suggestions</h4>
                  <button
                    type="button"
                    @click="showAISuggestions[index] = !showAISuggestions[index]"
                    class="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-500"
                  >
                    {{ showAISuggestions[index] ? 'Hide suggestions' : 'Show suggestions' }}
                    <ChevronDownIcon v-if="!showAISuggestions[index]" class="ml-1 h-4 w-4" aria-hidden="true" />
                    <ChevronUpIcon v-else class="ml-1 h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                
                <div v-if="showAISuggestions[index]" class="mt-3 space-y-3">
                  <div class="flex items-start">
                    <div class="flex-shrink-0 mt-1">
                      <SparklesIcon class="h-4 w-4 text-yellow-500" aria-hidden="true" />
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-sm text-gray-700">
                        Try using more action verbs like "Led", "Developed", or "Implemented" to start your achievement statements.
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0 mt-1">
                      <SparklesIcon class="h-4 w-4 text-yellow-500" aria-hidden="true" />
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-sm text-gray-700">
                        Quantify your achievements where possible (e.g., "Increased efficiency by 30%" or "Managed a team of 5").
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0 mt-1">
                      <SparklesIcon class="h-4 w-4 text-yellow-500" aria-hidden="true" />
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-sm text-gray-700">
                        <button type="button" class="text-blue-600 hover:text-blue-500" @click="generateAchievements(index)">
                          Generate achievement statements
                        </button> based on your job description.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
      
      <div class="flex justify-end">
        <button
          type="button"
          @click="addExperience"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Another Position
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import draggable from 'vuedraggable'
import { 
  PlusIcon, 
  TrashIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  StarIcon, 
  XIcon, 
  BriefcaseIcon,
  OfficeBuildingIcon,
  LocationMarkerIcon,
  CalendarIcon,
  MenuAlt2Icon,
  DocumentDuplicateIcon,
  SparklesIcon
} from '@heroicons/vue/outline'

export default {
  name: 'ExperienceSection',
  components: {
    draggable,
    PlusIcon,
    TrashIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    StarIcon,
    XIcon,
    BriefcaseIcon,
    OfficeBuildingIcon,
    LocationMarkerIcon,
    CalendarIcon,
    MenuAlt2Icon,
    DocumentDuplicateIcon,
    SparklesIcon
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const experiences = ref([...props.data])
    const expandedSections = ref({})
    const showAISuggestions = ref({})
    const skillsInput = ref([])
    
    // Initialize expanded sections and skills input
    onMounted(() => {
      experiences.value.forEach((exp, index) => {
        expandedSections.value[index] = false
        showAISuggestions.value[index] = false
        skillsInput.value[index] = ''
        
        // Ensure required fields exist
        if (!exp.achievements) exp.achievements = []
        if (!exp.skills) exp.skills = []
      })
    })
    
    // Format date range for display
    const formatDateRange = (startDate, endDate, isCurrent) => {
      if (!startDate) return 'Date not specified'
      
      const start = startDate ? new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''
      const end = isCurrent ? 'Present' : (endDate ? new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present')
      
      return `${start} - ${end}`
    }
    
    // Add a new experience entry
    const addExperience = () => {
      const newExperience = {
        id: uuidv4(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
        skills: []
      }
      
      const newIndex = experiences.value.length
      experiences.value.push(newExperience)
      expandedSections.value[newIndex] = true
      showAISuggestions.value[newIndex] = false
      skillsInput.value[newIndex] = ''
      
      updateExperiences()
    }
    
    // Duplicate an experience
    const duplicateExperience = (index) => {
      const experience = { ...experiences.value[index], id: uuidv4() }
      experiences.value.splice(index + 1, 0, experience)
      updateExperiences()
    }
    
    // Remove an experience
    const removeExperience = (index) => {
      if (confirm('Are you sure you want to remove this experience?')) {
        experiences.value.splice(index, 1)
        updateExperiences()
      }
    }
    
    // Toggle expand/collapse
    const toggleExpand = (index) => {
      expandedSections.value[index] = !expandedSections.value[index]
    }
    
    // Update a specific experience
    const updateExperience = (index) => {
      updateExperiences()
    }
    
    // Add an achievement
    const addAchievement = (expIndex) => {
      if (!experiences.value[expIndex].achievements) {
        experiences.value[expIndex].achievements = []
      }
      experiences.value[expIndex].achievements.push('')
      updateExperiences()
    }
    
    // Remove an achievement
    const removeAchievement = (expIndex, achIndex) => {
      experiences.value[expIndex].achievements.splice(achIndex, 1)
      updateExperiences()
    }
    
    // Add a skill
    const addSkill = (index) => {
      const skill = skillsInput.value[index]?.trim()
      if (skill && !experiences.value[index].skills.includes(skill)) {
        if (!experiences.value[index].skills) {
          experiences.value[index].skills = []
        }
        experiences.value[index].skills.push(skill)
        skillsInput.value[index] = ''
        updateExperiences()
      }
    }
    
    // Remove a skill
    const removeSkill = (expIndex, skillIndex) => {
      experiences.value[expIndex].skills.splice(skillIndex, 1)
      updateExperiences()
    }
    
    // Generate achievements using AI (mock implementation)
    const generateAchievements = async (index) => {
      // In a real app, this would call an API to generate achievements
      // based on the job description and other details
      const mockAchievements = [
        'Led a team of developers to deliver a major feature ahead of schedule',
        `Increased system performance by 40% through optimization of key components`,
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ]
      
      if (!experiences.value[index].achievements) {
        experiences.value[index].achievements = []
      }
      
      // Add only unique achievements
      mockAchievements.forEach(ach => {
        if (!experiences.value[index].achievements.includes(ach)) {
          experiences.value[index].achievements.push(ach)
        }
      })
      
      updateExperiences()
    }
    
    // Handle drag end
    const onDragEnd = () => {
      updateExperiences()
    }
    
    // Update parent component
    const updateExperiences = () => {
      emit('update', { 
        section: 'experience',
        data: [...experiences.value]
      })
    }
    
    // Watch for changes in props
    watch(() => props.data, (newData) => {
      if (JSON.stringify(newData) !== JSON.stringify(experiences.value)) {
        experiences.value = [...newData]
      }
    }, { deep: true })
    
    return {
      experiences,
      expandedSections,
      showAISuggestions,
      skillsInput,
      formatDateRange,
      addExperience,
      duplicateExperience,
      removeExperience,
      toggleExpand,
      updateExperience,
      addAchievement,
      removeAchievement,
      addSkill,
      removeSkill,
      generateAchievements,
      onDragEnd
    }
  }
}
</script>
