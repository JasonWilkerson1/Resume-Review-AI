<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Resume Analysis Demo</h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          See how the Resume Analysis Modal works with sample data. Click the button below to view the analysis.
        </p>
        <div class="mt-8">
          <button
            @click="showAnalysis = true"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Show Analysis Modal
          </button>
        </div>
      </div>

      <!-- Sample Data Section -->
      <div class="mt-16
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Sample Analysis Data</h2>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Analysis Data Structure
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              This is the data structure used to populate the analysis modal.
            </p>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Overall Score</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ sampleAnalysis.overallScore }}/100
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Categories</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul class="list-disc pl-5">
                    <li v-for="(category, index) in sampleAnalysis.categories" :key="index">
                      {{ category.name }}: {{ category.score }}/100
                    </li>
                  </ul>
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Issues</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ sampleAnalysis.issues.length }} issues found
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Suggestions</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ sampleAnalysis.suggestions.length }} suggestions
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Resume Analysis Modal -->
    <ResumeAnalysisModal
      :isOpen="showAnalysis"
      :analysis-data="sampleAnalysis"
      @close="showAnalysis = false"
      @improve="handleImprove"
      @download="handleDownload"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import ResumeAnalysisModal from '@/components/resume/ResumeAnalysisModal.vue'

export default {
  name: 'DemoResumeAnalysis',
  components: {
    ResumeAnalysisModal,
  },
  setup() {
    const showAnalysis = ref(false)
    
    // Sample analysis data
    const sampleAnalysis = {
      overallScore: 78,
      keyFindings: 'Your resume is in good shape but could benefit from more action verbs and quantifiable achievements.',
      pages: 1,
      wordCount: 478,
      sectionCount: 5,
      categories: [
        { name: 'Content', score: 82 },
        { name: 'Formatting', score: 88 },
        { name: 'Keywords', score: 75 },
        { name: 'Readability', score: 85 },
        { name: 'Sections', score: 78 },
      ],
      issues: [
        {
          title: 'Missing Quantifiable Achievements',
          description: 'Your work experience could be strengthened with more specific metrics and results.',
          suggestions: [
            'Add specific numbers to quantify your achievements',
            'Include percentages, dollar amounts, or timeframes where possible',
            'Focus on results and impact rather than just responsibilities'
          ]
        },
        {
          title: 'Limited Action Verbs',
          description: 'Your bullet points could be more impactful with stronger action verbs.',
          suggestions: [
            'Start each bullet point with a strong action verb',
            'Use present tense for current roles and past tense for previous roles',
            'Vary your action verbs to avoid repetition'
          ]
        }
      ],
      suggestions: [
        {
          title: 'Add a Professional Summary',
          description: 'Consider adding a brief professional summary at the top of your resume to highlight your key qualifications.',
          examples: 'Results-driven marketing professional with 5+ years of experience in digital marketing, specializing in SEO and content strategy. Proven track record of increasing organic traffic by 150% and improving conversion rates by 30%.'
        },
        {
          title: 'Include Relevant Skills Section',
          description: 'Add a dedicated skills section to highlight your technical and soft skills.',
          examples: 'Digital Marketing | SEO/SEM | Google Analytics | Content Strategy | Social Media Marketing | Project Management | Team Leadership | Data Analysis'
        },
        {
          title: 'Optimize for ATS',
          description: 'Make sure your resume is optimized for Applicant Tracking Systems (ATS) by using standard section headings and relevant keywords.',
          examples: 'Use standard section headings like "Work Experience", "Education", "Skills" instead of creative titles. Include relevant keywords from the job description.'
        }
      ],
      missingKeywords: [
        'project management',
        'team leadership',
        'data analysis',
        'budget management',
        'stakeholder communication'
      ],
      foundKeywords: [
        'digital marketing',
        'SEO',
        'content strategy',
        'social media',
        'google analytics'
      ]
    }

    const handleImprove = () => {
      alert('Improve functionality would be implemented here')
    }

    const handleDownload = () => {
      alert('Download functionality would be implemented here')
    }

    return {
      showAnalysis,
      sampleAnalysis,
      handleImprove,
      handleDownload,
    }
  },
}
</script>
