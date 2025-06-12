# Resume Optimizer AI

A modern, scalable web application that helps users optimize their resumes for ATS (Applicant Tracking Systems) and improve their job application success rate.

## Features

- **User Authentication**: Secure signup/login with email, Google, and LinkedIn
- **Resume Analysis**: Upload and parse PDF/DOCX resumes
- **ATS Scoring**: Get a detailed score (0-100) with improvement suggestions
- **AI-Powered Suggestions**: Get tailored recommendations for resume improvement
- **Spelling & Grammar Check**: Integrated LanguageTool for writing improvements
- **Premium Features**: Advanced analytics, unlimited scans, and AI-generated content

## Tech Stack

### Frontend
- Vue.js with Nuxt.js
- Tailwind CSS for styling
- Chart.js for data visualization
- Material-UI React components

### Backend
- Node.js with Strapi (Headless CMS)
- AWS Services:
  - Cognito (Authentication)
  - S3 (File Storage)
  - Lambda (Serverless Functions)
  - RDS (Database)
  - API Gateway
  - CloudFront (CDN)

### AI/ML
- TensorFlow.js for ATS scoring
- Grok API for AI-generated content
- LanguageTool for grammar checking

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- AWS Account (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd resume-optimizer
   ```

2. Install backend dependencies:
   ```bash
   cd backend/strapi
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../../frontend/nuxt
   npm install
   ```

4. Set up environment variables (see .env.example files in each directory)

5. Start the development servers:
   - Backend: `npm run develop` (from backend/strapi)
   - Frontend: `npm run dev` (from frontend/nuxt)

## Project Structure

```
resume-optimizer/
├── backend/                    # Node.js backend with Strapi and AWS
│   └── strapi/                 # Strapi CMS
│       ├── config/             # Configuration files
│       ├── api/                # API endpoints
│       ├── plugins/            # Custom plugins
│       └── database/           # Database configurations
├── frontend/                   # Vue.js frontend with Nuxt.js
│   └── nuxt/                   # Nuxt.js app
│       ├── components/         # Vue components
│       ├── pages/              # Application pages
│       ├── assets/             # Static assets
│       ├── plugins/            # Nuxt plugins
│       └── layouts/            # Layout components
├── aws/                        # AWS configurations
├── docker/                     # Docker configurations
└── scripts/                    # Utility scripts
```

## Deployment

### AWS Deployment
1. Set up AWS credentials
2. Configure AWS services (Cognito, S3, Lambda, etc.)
3. Deploy backend to Elastic Beanstalk
4. Deploy frontend to CloudFront

### Environment Variables
Create `.env` files in both `backend/strapi` and `frontend/nuxt` with the required configurations.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
