# Resume Optimizer AI

A modern, scalable web application that helps users optimize their resumes for ATS (Applicant Tracking Systems) and improve their job application success rate.

## Features

- **User Authentication**: Secure signup/login with email, Google, and LinkedIn
- **Resume Analysis**: Upload and parse PDF/DOCX resumes
- **ATS Scoring**: Get a detailed score (0-100) with improvement suggestions
- **AI-Powered Suggestions**: Get tailored recommendations for resume improvement
- **Spelling & Grammar Check**: Integrated LanguageTool for writing improvements
- **Premium Features**: Advanced analytics, unlimited scans, and AI-generated content
- **Mobile-First Design**: Responsive UI that works on all devices
- **Progressive Web App**: Installable on mobile devices and works offline

## Tech Stack

### Frontend
- Vue.js with Nuxt.js
- Tailwind CSS for styling
- Chart.js for data visualization
- Material-UI React components
- Capacitor for mobile apps
- Progressive Web App (PWA) support

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
├── backend/               # Backend API and services
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── .env.example      # Example environment variables
│   └── server.js         # Entry point
├── frontend/             # Frontend application
│   ├── assets/           # Static assets
│   ├── components/       # Reusable Vue components
│   │   └── ui/           # UI component library
│   ├── layouts/          # Layout components
│   ├── middleware/       # Nuxt middleware
│   ├── pages/            # Application views
│   ├── plugins/          # Vue plugins
│   │   ├── ui.js         # UI components plugin
│   │   └── capacitor.js  # Capacitor integration
│   ├── static/           # Static files
│   ├── store/            # Vuex store
│   ├── utils/            # Utility functions
│   ├── capacitor.config.json  # Capacitor config
│   └── nuxt.config.js    # Nuxt configuration
└── README.md             # Project documentation
```

## UI Components

### Button Component

A highly customizable button component with multiple variants and states.

```vue
<ui-button 
  :loading="isLoading"
  variant="primary | secondary | outline | danger | text"
  size="sm | md | lg"
  :disabled="false"
  :fullWidth="false"
  @click="handleClick"
>
  Button Text
</ui-button>
```

### Button Group

Group buttons together with consistent spacing and alignment.

```vue
<ui-button-group :vertical="false">
  <ui-button>First</ui-button>
  <ui-button variant="outline">Middle</ui-button>
  <ui-button variant="danger">Last</ui-button>
</ui-button-group>
```

## Mobile Setup with Capacitor

### Prerequisites

- Node.js 14+ and npm/yarn
- Android Studio (for Android development)
- Xcode 12+ (for iOS development, macOS only)

### Setup

1. Install Capacitor CLI and core packages:

```bash
npm install --save @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
```

2. Initialize Capacitor (run from frontend directory):

```bash
npx cap init "Resume Optimizer" "com.resumeoptimizer.app" --web-dir="dist"
```

3. Add platforms:

```bash
# For Android
npx cap add android

# For iOS (macOS only)
npx cap add ios
```

4. Build the app and sync with native projects:

```bash
# Build the web app
npm run generate

# Sync with native projects
npx cap sync
```

### Running the App

#### Web
```bash
npm run dev
```

#### Android
```bash
# Open in Android Studio
npx cap open android

# Or run directly on connected device
npx cap run android
```

#### iOS (macOS only)
```bash
# Open in Xcode
npx cap open ios

# Or run on simulator
npx cap run ios
```

### Testing the App

1. A test page is available at `/test` to verify all UI components and mobile features.
2. The test page shows device information and allows testing of:
   - Button variants and states
   - Button groups (horizontal and vertical)
   - Toast notifications
   - Network status
   - PWA installation

## Development

### Adding New UI Components

1. Create a new Vue component in `frontend/components/ui/`
2. Register it in `frontend/plugins/ui.js`
3. Use the component in your templates with the `ui-` prefix

### Theming

Customize the design system by editing:
- `tailwind.config.js` for colors, spacing, and typography
- `assets/css/main.css` for global styles

### Mobile-Specific Features

- Use `@/utils/mobile.js` for device detection
- Access Capacitor plugins via `this.$capacitor` in components
- Check `plugins/capacitor.js` for native functionality

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
