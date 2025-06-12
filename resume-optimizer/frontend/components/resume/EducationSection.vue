<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h4 class="text-lg font-medium text-gray-900">Education</h4>
      <button
        type="button"
        @click="addEducation"
        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon class="-ml-0.5 mr-1 h-4 w-4" aria-hidden="true" />
        Add Education
      </button>
    </div>
    
    <div v-if="education.length === 0" class="text-center">
      <AcademicCapIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">No education added</h3>
      <p class="mt-1 text-sm text-gray-500">
        Get started by adding your education history.
      </p>
      <div class="mt-6">
        <button
          type="button"
          @click="addEducation"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Education
        </button>
      </div>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="(edu, index) in education" 
        :key="edu.id"
        class="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200"
      >
        <div class="px-4 py-4 sm:px-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ edu.degree || 'Degree' }}
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                {{ edu.school }}
                <span v-if="edu.school && (edu.fieldOfStudy || edu.location)"> • </span>
                <span v-if="edu.fieldOfStudy">{{ edu.fieldOfStudy }}</span>
                <span v-if="edu.fieldOfStudy && edu.location">, </span>
                {{ edu.location }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                {{ formatDateRange(edu.startDate, edu.endDate, edu.isCurrent) }}
                <span v-if="edu.gpa"> • GPA: {{ formatGPA(edu.gpa) }}</span>
              </p>
            </div>
            <div class="flex space-x-2">
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
                @click="removeEducation(index)"
                class="text-red-400 hover:text-red-500"
              >
                <TrashIcon class="h-5 w-5" aria-hidden="true" />
                <span class="sr-only">Remove</span>
              </button>
            </div>
          </div>
        </div>
        
        <div v-show="expandedSections[index]" class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <!-- School/Institution -->
            <div class="sm:col-span-4">
              <label :for="`school-${edu.id}`" class="block text-sm font-medium text-gray-700">
                School/Institution <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  :id="`school-${edu.id}`"
                  v-model="edu.school"
                  @input="updateEducation(index)"
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="University Name"
                  required
                />
              </div>
            </div>
            
            <!-- Degree -->
            <div class="sm:col-span-4">
              <label :for="`degree-${edu.id}`" class="block text-sm font-medium text-gray-700">
                Degree <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  :id="`degree-${edu.id}`"
                  v-model="edu.degree"
                  @input="updateEducation(index)"
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Bachelor of Science in Computer Science"
                  required
                />
              </div>
            </div>
            
            <!-- Field of Study -->
            <div class="sm:col-span-4">
              <label :for="`field-${edu.id}`" class="block text-sm font-medium text-gray-700">
                Field of Study
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  :id="`field-${edu.id}`"
                  v-model="edu.fieldOfStudy"
                  @input="updateEducation(index)"
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Computer Science"
                />
              </div>
            </div>
            
            <!-- Location -->
            <div class="sm:col-span-4">
              <label :for="`edu-location-${edu.id}`" class="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div class="mt-1">
                <input
                  type="text"
                  :id="`edu-location-${edu.id}`"
                  v-model="edu.location"
                  @input="updateEducation(index)"
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="City, Country"
                />
              </div>
            </div>
            
            <!-- Date Range -->
            <div class="sm:col-span-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <!-- Start Date -->
                <div class="sm:col-span-2">
                  <label :for="`edu-start-date-${edu.id}`" class="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <div class="mt-1">
                    <input
                      type="month"
                      :id="`edu-start-date-${edu.id}`"
                      v-model="edu.startDate"
                      @input="updateEducation(index)"
                      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <!-- End Date or Present -->
                <div class="sm:col-span-2">
                  <label :for="`edu-end-date-${edu.id}`" class="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <div class="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="month"
                      :id="`edu-end-date-${edu.id}`"
                      v-model="edu.endDate"
                      @input="updateEducation(index)"
                      :disabled="edu.isCurrent"
                      :class="[
                        'shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-l-md',
                        edu.isCurrent ? 'bg-gray-100' : ''
                      ]"
                    />
                    <div class="relative flex items-center">
                      <div class="flex items-center h-5 ml-2">
                        <input
                          :id="`edu-current-${edu.id}`"
                          v-model="edu.isCurrent"
                          @change="handleCurrentEducationChange(edu)"
                          type="checkbox"
                          class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-2 text-sm">
                        <label :for="`edu-current-${edu.id}`" class="font-medium text-gray-700">
                          Present
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- GPA -->
            <div class="sm:col-span-2">
              <label :for="`gpa-${edu.id}`" class="block text-sm font-medium text-gray-700">
                GPA
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  :id="`gpa-${edu.id}`"
                  v-model.number="edu.gpa"
                  @input="updateEducation(index)"
                  min="0"
                  max="4"
                  step="0.01"
                  class="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="3.8"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm"> / 4.0 </span>
                </div>
              </div>
            </div>
            
            <!-- Description -->
            <div class="sm:col-span-6">
              <label :for="`edu-description-${edu.id}`" class="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div class="mt-1">
                <textarea
                  :id="`edu-description-${edu.id}`"
                  v-model="edu.description"
                  @input="updateEducation(index)"
                  rows="3"
                  class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Relevant coursework, honors, activities, or achievements"
                />
              </div>
            </div>
            
            <!-- Activities -->
            <div class="sm:col-span-6">
              <label class="block text-sm font-medium text-gray-700">
                Activities & Achievements
              </label>
              <div class="mt-1 space-y-2">
                <div 
                  v-for="(activity, aIndex) in edu.activities" 
                  :key="aIndex"
                  class="flex items-start"
                >
                  <div class="flex items-center h-5 mt-1">
                    <span class="text-gray-500">•</span>
                  </div>
                  <div class="ml-2 flex-1">
                    <input
                      type="text"
                      v-model="edu.activities[aIndex]"
                      @input="updateEducation(index)"
                      class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                      placeholder="Activity or achievement"
                    />
                  </div>
                  <button
                    type="button"
                    @click="removeActivity(index, aIndex)"
                    class="ml-2 text-gray-400 hover:text-red-500"
                  >
                    <XIcon class="h-4 w-4" aria-hidden="true" />
                    <span class="sr-only">Remove</span>
                  </button>
                </div>
                <button
                  type="button"
                  @click="addActivity(index)"
                  class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon class="-ml-0.5 mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  Add Activity/Achievement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-6">
        <button
          type="button"
          @click="addEducation"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Another Education
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { 
  PlusIcon, 
  TrashIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  XIcon,
  AcademicCapIcon
} from '@heroicons/vue/outline'

export default {
  name: 'EducationSection',
  components: {
    PlusIcon,
    TrashIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    XIcon,
    AcademicCapIcon
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const education = ref([...props.data])
    const expandedSections = ref({})

    // Initialize expanded sections
    const initExpandedSections = () => {
      education.value.forEach((_, index) => {
        expandedSections.value[index] = false
      })
    }

    // Format date range for display
    const formatDateRange = (startDate, endDate, isCurrent) => {
      if (!startDate && !endDate) return 'Dates not specified'
      
      const start = startDate ? new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''
      const end = isCurrent ? 'Present' : (endDate ? new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '')
      
      return [start, end].filter(Boolean).join(' - ')
    }

    // Format GPA to 1 decimal place
    const formatGPA = (gpa) => {
      if (gpa === null || gpa === undefined) return ''
      return parseFloat(gpa).toFixed(1)
    }

    // Add a new education entry
    const addEducation = () => {
      const newEducation = {
        id: uuidv4(),
        school: '',
        degree: '',
        fieldOfStudy: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        gpa: null,
        description: '',
        activities: []
      }
      
      education.value.push(newEducation)
      const newIndex = education.value.length - 1
      expandedSections.value[newIndex] = true
      
      updateEducation()
    }

    // Remove an education entry
    const removeEducation = (index) => {
      if (confirm('Are you sure you want to remove this education entry?')) {
        education.value.splice(index, 1)
        updateEducation()
      }
    }

    // Toggle expand/collapse
    const toggleExpand = (index) => {
      expandedSections.value[index] = !expandedSections.value[index]
    }

    // Handle current education change
    const handleCurrentEducationChange = (edu) => {
      if (edu.isCurrent) {
        edu.endDate = ''
      }
      updateEducation()
    }

    // Add an activity
    const addActivity = (index) => {
      if (!education.value[index].activities) {
        education.value[index].activities = []
      }
      education.value[index].activities.push('')
      updateEducation()
    }

    // Remove an activity
    const removeActivity = (eduIndex, activityIndex) => {
      if (education.value[eduIndex]?.activities) {
        education.value[eduIndex].activities.splice(activityIndex, 1)
        updateEducation()
      }
    }

    // Update education data
    const updateEducation = () => {
      emit('update', { 
        section: 'education',
        data: [...education.value]
      })
    }

    // Watch for changes in props
    watch(() => props.data, (newData) => {
      if (JSON.stringify(newData) !== JSON.stringify(education.value)) {
        education.value = [...newData]
        initExpandedSections()
      }
    }, { deep: true })

    // Initialize on mount
    initExpandedSections()

    return {
      education,
      expandedSections,
      formatDateRange,
      formatGPA,
      addEducation,
      removeEducation,
      toggleExpand,
      handleCurrentEducationChange,
      addActivity,
      removeActivity,
      updateEducation
    }
  }
}
</script>
