<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="bg-indigo-700">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Career Resources & Learning
        </h1>
        <p class="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
          Expert advice, templates, and resources to help you land your dream job.
        </p>
        <div class="mt-8">
          <div class="mt-1 relative rounded-md shadow-sm max-w-md mx-auto">
            <input
              v-model="searchQuery"
              type="text"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 py-4 border-0 rounded-md text-gray-900"
              placeholder="Search articles, guides, and resources..."
              @keyup.enter="performSearch"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                @click="performSearch"
                class="text-indigo-600 hover:text-indigo-500"
              >
                <SearchIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Featured Articles -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
        <div class="grid gap-6 md:grid-cols-3">
          <ArticleCard
            v-for="article in featuredArticles"
            :key="article.id"
            :article="article"
            class="h-full"
          />
        </div>
      </div>

      <!-- Categories -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :category="category"
            class="h-full"
          />
        </div>
      </div>

      <!-- Popular Guides -->
      <div class="mb-16">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Popular Guides</h2>
          <a href="#" class="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
            View all guides <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GuideCard
            v-for="guide in popularGuides"
            :key="guide.id"
            :guide="guide"
            class="h-full"
          />
        </div>
      </div>

      <!-- Video Tutorials -->
      <div class="mb-16">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Video Tutorials</h2>
          <a href="#" class="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
            View all videos <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <VideoCard
            v-for="video in videoTutorials"
            :key="video.id"
            :video="video"
            class="h-full"
          />
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="bg-indigo-50 rounded-lg p-8 mb-16">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Get career tips delivered to your inbox</h2>
          <p class="text-gray-600 mb-6">
            Join over 50,000 professionals who receive our weekly newsletter with the latest career advice, resume tips, and job search strategies.
          </p>
          <form class="mt-6 sm:flex max-w-md mx-auto">
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs rounded-md"
              placeholder="Enter your email"
            />
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </form>
          <p class="mt-3 text-sm text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      <!-- Expert Q&A -->
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Expert Q&A</h2>
          <a href="#" class="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
            Ask a question <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul class="divide-y divide-gray-200">
            <QuestionAnswer
              v-for="qa in expertQA"
              :key="qa.id"
              :question="qa.question"
              :answer="qa.answer"
              :expert="qa.expert"
              :date="qa.date"
              :likes="qa.likes"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SearchIcon } from '@heroicons/vue/outline'
import ArticleCard from '@/components/learn/ArticleCard.vue'
import CategoryCard from '@/components/learn/CategoryCard.vue'
import GuideCard from '@/components/learn/GuideCard.vue'
import VideoCard from '@/components/learn/VideoCard.vue'
import QuestionAnswer from '@/components/learn/QuestionAnswer.vue'

export default {
  name: 'LearnPage',
  components: {
    SearchIcon,
    ArticleCard,
    CategoryCard,
    GuideCard,
    VideoCard,
    QuestionAnswer,
  },
  data() {
    return {
      searchQuery: '',
      email: '',
      featuredArticles: [
        {
          id: 1,
          title: '10 Resume Mistakes That Are Costing You Interviews',
          excerpt: 'Learn the most common resume mistakes that hiring managers see and how to fix them.',
          category: 'Resume Tips',
          readTime: '5 min read',
          image: '/images/articles/resume-mistakes.jpg',
          url: '/articles/resume-mistakes',
        },
        {
          id: 2,
          title: 'How to Tailor Your Resume for Each Job Application',
          excerpt: 'Customizing your resume for each job can significantly increase your chances of getting an interview.',
          category: 'Job Search',
          readTime: '7 min read',
          image: '/images/articles/tailor-resume.jpg',
          url: '/articles/tailor-resume',
        },
        {
          id: 3,
          title: 'The Ultimate Guide to ATS Optimization in 2023',
          excerpt: 'Everything you need to know about Applicant Tracking Systems and how to make your resume pass through them.',
          category: 'ATS',
          readTime: '10 min read',
          image: '/images/articles/ats-guide.jpg',
          url: '/articles/ats-optimization-guide',
        },
      ],
      categories: [
        {
          id: 1,
          name: 'Resume Writing',
          description: 'Master the art of writing compelling resumes that get noticed.',
          icon: 'DocumentTextIcon',
          articleCount: 24,
          url: '/categories/resume-writing',
        },
        {
          id: 2,
          name: 'Cover Letters',
          description: 'Learn how to craft cover letters that complement your resume.',
          icon: 'MailIcon',
          articleCount: 15,
          url: '/categories/cover-letters',
        },
        {
          id: 3,
          name: 'Interview Tips',
          description: 'Ace your interviews with our expert advice and preparation strategies.',
          icon: 'UserGroupIcon',
          articleCount: 18,
          url: '/categories/interview-tips',
        },
        {
          id: 4,
          name: 'Career Advice',
          description: 'Navigate your career path with insights from industry professionals.',
          icon: 'BriefcaseIcon',
          articleCount: 32,
          url: '/categories/career-advice',
        },
      ],
      popularGuides: [
        {
          id: 1,
          title: 'The Complete Resume Writing Guide',
          description: 'A step-by-step guide to creating a resume that stands out from the competition.',
          level: 'Beginner',
          time: '15 min',
          url: '/guides/resume-writing',
        },
        {
          id: 2,
          title: 'How to Write a Killer Cover Letter',
          description: 'Learn the secrets to writing cover letters that get you interviews.',
          level: 'Intermediate',
          time: '12 min',
          url: '/guides/cover-letter',
        },
        {
          id: 3,
          title: 'LinkedIn Profile Optimization Guide',
          description: 'Transform your LinkedIn profile into a job search magnet with these tips.',
          level: 'All Levels',
          time: '10 min',
          url: '/guides/linkedin-optimization',
        },
      ],
      videoTutorials: [
        {
          id: 1,
          title: 'How to Write a Resume with No Experience',
          duration: '8:24',
          views: '124K',
          thumbnail: '/images/thumbnails/no-experience-resume.jpg',
          url: '/videos/no-experience-resume',
        },
        {
          id: 2,
          title: '5 Resume Hacks to Beat ATS',
          duration: '6:45',
          views: '89K',
          thumbnail: '/images/thumbnails/ats-hacks.jpg',
          url: '/videos/ats-hacks',
        },
        {
          id: 3,
          title: 'Resume Formatting Guide',
          duration: '10:12',
          views: '156K',
          thumbnail: '/images/thumbnails/resume-formatting.jpg',
          url: '/videos/resume-formatting',
        },
      ],
      expertQA: [
        {
          id: 1,
          question: 'How long should my resume be?',
          answer: 'For most professionals, a one-page resume is ideal, especially if you have less than 10 years of experience. However, if you have extensive experience (10+ years) or are in an academic or scientific field, two pages may be appropriate. The key is to be concise and only include relevant information that showcases your qualifications for the specific role you're applying for.',
          expert: {
            name: 'Sarah Johnson',
            title: 'Career Coach',
            company: 'Career Success Partners',
            image: '/images/experts/sarah-johnson.jpg',
          },
          date: '2 days ago',
          likes: 24,
        },
        {
          id: 2,
          question: 'Should I include a photo on my resume?',
          answer: 'In most cases, it's best to avoid including a photo on your resume, especially in the United States, as it can lead to unconscious bias. However, in some countries (like parts of Europe and Asia) or industries (like modeling or acting), a professional photo may be expected. Always research the norms for your specific industry and location.',
          expert: {
            name: 'Michael Chen',
            title: 'HR Director',
            company: 'TechHire Solutions',
            image: '/images/experts/michael-chen.jpg',
          },
          date: '5 days ago',
          likes: 18,
        },
      ],
    }
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        // Implement search functionality
        console.log('Searching for:', this.searchQuery)
        // In a real app, this would navigate to search results
        // this.$router.push(`/search?q=${encodeURIComponent(this.searchQuery)}`)
      }
    },
  },
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
