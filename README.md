# 🎬 Movie Recommendation App

A beautiful web application that recommends movies based on user preferences using AI (Groq/OpenAI API).

## ✨ Features

- 🤖 AI-powered movie recommendations
- 🎨 Beautiful, modern UI/UX with smooth animations
- 💾 SQLite database to store recommendations
- 🆓 Uses Groq API (free tier) by default
- 📱 Fully responsive design
- ⚡ Fast and lightweight

## 🏗️ Tech Stack

### Frontend
- React 19
- Modern CSS with gradients and animations

### Backend
- Node.js
- Fastify (fast web framework)
- SQLite database

### AI Provider
- Groq API (free tier) - Default
- OpenAI API (optional)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Movie
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   API_PROVIDER=groq
   ```
   
   Get your free Groq API key from: https://console.groq.com/keys

5. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server runs on `http://127.0.0.1:5001`

6. **Start the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## 📖 API Endpoints

- `POST /recommend` - Get movie recommendations
  - Body: `{ "userInput": "action movies with strong female lead" }`
  - Response: `{ "recommendations": "1. Movie Name\n2. Movie Name..." }`

- `GET /health` - Health check endpoint

## 🗄️ Database

The app uses SQLite (`movies.db`) to store:
- User inputs
- Recommended movies
- Timestamps

## 🔧 Configuration

### Using Groq API (Free - Recommended)
```env
GROQ_API_KEY=your_key_here
API_PROVIDER=groq
```

### Using OpenAI API
```env
OPENAI_API_KEY=your_key_here
API_PROVIDER=openai
```

## 📁 Project Structure

```
Movie/
├── backend/
│   ├── index.js          # Fastify server & API routes
│   ├── db.js             # SQLite database setup
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables (not in git)
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styles
│   │   └── index.js      # React entry point
│   └── package.json      # Frontend dependencies
└── README.md
```

## 🎯 Usage

1. Enter your movie preferences in the search box
   - Example: "action movies with strong female lead"
   - Example: "sci-fi thrillers"
   - Example: "romantic comedies from 2000s"

2. Click "Get Recommendations" or press Enter

3. View your personalized movie recommendations!

## 🐛 Troubleshooting

- **API Quota Errors**: Switch to Groq API (free tier) by setting `API_PROVIDER=groq`
- **Backend Connection Issues**: Make sure the backend is running on port 5001
- **API Key Errors**: Check that your `.env` file contains the correct API key

## 📝 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

- Groq for providing free AI API access
- OpenAI for their API platform
# movie
