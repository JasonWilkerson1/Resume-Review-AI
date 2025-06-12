<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h4 class="text-lg font-medium text-gray-900">Personal Information</h4>
    </div>
    
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <!-- First Name -->
      <div class="sm:col-span-3">
        <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
        <div class="mt-1">
          <input
            type="text"
            id="first-name"
            v-model="formData.firstName"
            @input="updateData"
            class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <!-- Last Name -->
      <div class="sm:col-span-3">
        <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
        <div class="mt-1">
          <input
            type="text"
            id="last-name"
            v-model="formData.lastName"
            @input="updateData"
            class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <!-- Email -->
      <div class="sm:col-span-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
        <div class="mt-1">
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              v-model="formData.email"
              @input="updateData"
              class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="you@example.com"
            />
          </div>
        </div>
      </div>

      <!-- Phone -->
      <div class="sm:col-span-2">
        <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
        <div class="mt-1">
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="phone"
              v-model="formData.phone"
              @input="updateData"
              class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="(123) 456-7890"
            />
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="sm:col-span-6">
        <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
        <div class="mt-1">
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LocationMarkerIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="location"
              v-model="formData.location"
              @input="updateData"
              class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="City, State/Province, Country"
            />
          </div>
        </div>
      </div>

      <!-- Website -->
      <div class="sm:col-span-3">
        <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
        <div class="mt-1">
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="url"
              id="website"
              v-model="formData.website"
              @input="updateData"
              class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="https://www.example.com"
            />
          </div>
        </div>
      </div>

      <!-- LinkedIn -->
      <div class="sm:col-span-3">
        <label for="linkedin" class="block text-sm font-medium text-gray-700">LinkedIn</label>
        <div class="mt-1">
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm"> linkedin.com/in/ </span>
            </div>
            <input
              type="text"
              id="linkedin"
              v-model="formData.linkedin"
              @input="updateData"
              class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-24 sm:text-sm border-gray-300 rounded-md"
              placeholder="username"
            />
          </div>
        </div>
      </div>

      <!-- GitHub -->
      <div class="sm:col-span-3">
        <label for="github" class="block text-sm font-medium text-gray-700">GitHub</label>
        <div class="mt-1">
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm"> github.com/ </span>
            </div>
            <input
              type="text"
              id="github"
              v-model="formData.github"
              @input="updateData"
              class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-20 sm:text-sm border-gray-300 rounded-md"
              placeholder="username"
            />
          </div>
        </div>
      </div>

      <!-- Profile Photo Upload -->
      <div class="sm:col-span-6">
        <label class="block text-sm font-medium text-gray-700">Profile Photo</label>
        <div class="mt-1 flex items-center">
          <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <img
              v-if="formData.photoUrl"
              :src="formData.photoUrl"
              alt="Profile"
              class="h-full w-full text-gray-300"
            />
            <UserCircleIcon v-else class="h-full w-full text-gray-300" aria-hidden="true" />
          </span>
          <button
            type="button"
            @click="openFileInput"
            class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Change
          </button>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleFileUpload"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { 
  MailIcon, 
  PhoneIcon, 
  LocationMarkerIcon, 
  LinkIcon, 
  UserCircleIcon 
} from '@heroicons/vue/outline'

export default {
  name: 'PersonalInfoSection',
  components: {
    MailIcon,
    PhoneIcon,
    LocationMarkerIcon,
    LinkIcon,
    UserCircleIcon
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
        photoUrl: ''
      })
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const fileInput = ref(null)
    const formData = ref({ ...props.data })

    // Watch for changes in the data prop
    watch(() => props.data, (newData) => {
      formData.value = { ...newData }
    }, { deep: true })

    // Emit update when form data changes
    const updateData = () => {
      emit('update', { 
        section: 'personalInfo',
        data: { ...formData.value }
      })
    }

    // Handle file upload
    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      // In a real app, you would upload the file to a server
      // For demo purposes, we'll create a local URL
      const fileUrl = URL.createObjectURL(file)
      formData.value.photoUrl = fileUrl
      updateData()
    }

    // Open file input dialog
    const openFileInput = () => {
      fileInput.value.click()
    }

    return {
      formData,
      fileInput,
      updateData,
      handleFileUpload,
      openFileInput
    }
  }
}
</script>
