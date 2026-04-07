# VibeShelf

A mobile-first web application designed to help readers choose their next book based on their current mood and organize their personal book collections.

## 🚀 Project Overview

VibeShelf addresses reading indecision by enabling users to apply mood-based filters and generate personalized book recommendations. The application combines features similar to Goodreads (ratings and community reviews) and Libib (book inventory management), while uniquely focusing on mood-driven recommendations to simplify the decision-making process.

## 📱 Features

### Core Functionality
- **🧠 Mood-Based Recommendations**: Select your current mood and get personalized book suggestions
- **📚 Personal Library**: Build and organize your digital bookshelf
- **📖 Reading Progress**: Track reading status and progress for each book
- **⭐ Ratings & Reviews**: Rate books and write personal reviews
- **🔍 Smart Search**: Find books by title, author, or genre
- **👥 Community Insights**: View community ratings and reviews

### User Experience
- **📱 Mobile-First Design**: Optimized for mobile devices with PWA capabilities
- **🎨 Modern UI**: Clean, intuitive interface built with React and TailwindCSS
- **⚡ Fast Performance**: Optimized loading times and smooth interactions
- **📱 Offline Support**: Core features work offline with PWA

## 🏗️ Project Structure

```
VibeShelf/
├── client/                 # React PWA (local dev: Vite)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Utilities and helpers
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript definitions
│   ├── public/            # Static assets
│   ├── package.json       # Client dependencies
│   └── vite.config.ts     # Vite configuration
├── api/                   # Express API (local dev: Node)
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Data models
│   │   └── index.js       # API entry point
│   ├── package.json       # API dependencies
│   └── .env.example       # Environment variables template
├── supabase/              # SQL migrations + seeds
│   ├── migrations/        # Database schema migrations
│   └── seeds/             # Sample data
├── docs/                  # Documentation
│   ├── PRD.md            # Product Requirements Document
│   ├── deployment.md     # Deployment guide
│   └── api.md            # API documentation
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🛠️ Tech Stack

### Frontend (client/)
- **React 18** with TypeScript
- **Vite** for build tooling and development
- **TailwindCSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Supabase Client** for authentication and data

### Backend (api/)
- **Node.js** with Express.js
- **Supabase** for database and authentication
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Morgan** for logging
- **Rate limiting** for API protection

### Database
- **Supabase** (PostgreSQL)
- Row Level Security (RLS)
- Real-time subscriptions

### Deployment
- **Netlify** for frontend hosting
- **Railway/Render** for API hosting
- **Supabase Cloud** for database

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VibeShelf
   ```

2. **Set up the database**
   - Create a new Supabase project
   - Run migrations from `supabase/migrations/`
   - Run seeds from `supabase/seeds/`

3. **Configure the API**
   ```bash
   cd api
   cp .env.example .env
   # Edit .env with your Supabase credentials
   npm install
   npm run dev
   ```

4. **Configure the client**
   ```bash
   cd client
   npm install
   # Create .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
   npm run dev
   ```

5. **Access the applications**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001

## 📦 Build & Deploy

### Client
```bash
cd client
npm run build
```

### API
```bash
cd api
npm install --production
npm start
```

## 🧪 Testing

```bash
# Client tests
cd client
npm test

# API tests
cd api
npm test
```

## 📚 Documentation

- **[Product Requirements](docs/PRD.md)** - Detailed feature specifications
- **[Deployment Guide](docs/deployment.md)** - Production deployment instructions
- **[API Documentation](docs/api.md)** - REST API endpoints and usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🗺️ Roadmap

### Current Release ✅
- [x] Basic book management
- [x] Mood-based recommendations
- [x] User authentication
- [x] Mobile-responsive design
- [x] PWA capabilities

### Future Enhancements
- [ ] Barcode scanning for book addition
- [ ] Reading goals and statistics
- [ ] Social features (friends, book clubs)
- [ ] Advanced recommendation algorithms
- [ ] Offline reading mode
- [ ] Integration with external book APIs

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for book lovers everywhere**
