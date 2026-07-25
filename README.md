# Make-It-Wear-It AI

AI Powered Personal Fashion Stylist and Virtual Try-On Platform

## 🌟 Features

- **AI Body Analysis** - Detect body shape, type, and measurements using MediaPipe and TensorFlow
- **Skin Tone Detection** - Analyze skin tone and undertone with color recommendations
- **AI Outfit Recommendations** - Get personalized outfit suggestions based on occasion, weather, and preferences
- **Virtual Try-On** - See how clothes look on you using AI models (IDM-VTON, CatVTON)
- **Digital Wardrobe** - Organize, categorize, and track your clothes
- **AI Fashion Assistant** - Chat with Gemini-powered fashion assistant
- **Community Features** - Share outfits, follow users, and participate in challenges
- **Admin Dashboard** - Manage users, analytics, and system logs

## 🏗️ Architecture

This is a monorepo using npm workspaces with the following structure:

```
make-it-wear-it/
├── apps/
│   ├── api/          # Node.js/Express backend
│   └── web/          # React 19 frontend
├── packages/
│   ├── shared/       # Shared TypeScript types and utilities
│   └── ui/           # Shared UI components (shadcn/ui)
├── .github/
│   └── workflows/    # GitHub Actions CI/CD
├── docker-compose.yml
└── Dockerfile
```

## 🚀 Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Router
- TanStack Query
- Zustand
- Axios
- React Hook Form
- Zod

### Backend
- Node.js
- Express
- TypeScript
- JWT Authentication
- Refresh Tokens
- MongoDB Atlas
- Mongoose
- Multer
- Cloudinary
- Pino Logger
- Swagger
- Helmet
- Rate Limiter

### AI/ML
- MediaPipe
- TensorFlow.js
- HuggingFace Models
- OpenCV
- Gemini API
- OpenAI API (optional)

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (local or Atlas)
- Cloudinary account (for image storage)
- Gemini API key (for AI features)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd make-it-wear-it
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env` files in both apps:

   **apps/api/.env**
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/make-it-wear-it
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-this-in-production
   JWT_REFRESH_EXPIRE=30d
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Gemini API
   GEMINI_API_KEY=your-gemini-api-key
   ```

   **apps/web/.env**
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Start MongoDB**
   
   Using Docker:
   ```bash
   docker-compose up -d mongodb
   ```
   
   Or use MongoDB Atlas connection string in `.env`

5. **Run development servers**
   ```bash
   # Run both API and Web
   npm run dev
   
   # Or run individually
   npm run dev:api
   npm run dev:web
   ```

   The API will be available at `http://localhost:5000`
   The Web app will be available at `http://localhost:5173`
   API Documentation at `http://localhost:5000/api-docs`

## 🐳 Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop services**
   ```bash
   docker-compose down
   ```

## 📦 Available Scripts

### Root Scripts
- `npm run dev` - Start both API and Web in development mode
- `npm run build` - Build all packages
- `npm run lint` - Lint all packages
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run clean` - Clean build artifacts

### API Scripts (apps/api)
- `npm run dev` - Start API in development mode with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Lint TypeScript code
- `npm run lint:fix` - Fix linting issues

### Web Scripts (apps/web)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint TypeScript/React code
- `npm run lint:fix` - Fix linting issues

## 🔒 Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting
- JWT authentication with refresh tokens
- Password hashing with bcryptjs
- Input validation with Zod
- Environment variable protection

## 📊 API Documentation

Swagger documentation is available at `/api-docs` when the API is running.

## 🧪 Testing

```bash
# Run tests (to be implemented)
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Phases

This project is developed in 12 phases:

1. ✅ **Phase 0** - Project Setup (Current)
2. ⏳ **Phase 1** - Authentication
3. ⏳ **Phase 2** - User Profile
4. ⏳ **Phase 3** - AI Body Analysis
5. ⏳ **Phase 4** - Skin Tone Detection
6. ⏳ **Phase 5** - AI Outfit Recommendation
7. ⏳ **Phase 6** - Virtual Try-On
8. ⏳ **Phase 7** - Digital Wardrobe
9. ⏳ **Phase 8** - Wishlist
10. ⏳ **Phase 9** - AI Fashion Assistant
11. ⏳ **Phase 10** - Community
12. ⏳ **Phase 11** - Admin Dashboard
13. ⏳ **Phase 12** - Deployment

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Make-It-Wear-It Development Team

## 🙏 Acknowledgments

- MediaPipe for pose detection
- TensorFlow for ML models
- HuggingFace for AI models
- shadcn/ui for UI components
- Gemini API for AI capabilities
