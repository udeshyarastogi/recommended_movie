# Movie Recommendation Backend

A Node.js backend using Fastify and AI API (Groq or OpenAI) to recommend movies based on user preferences.

## Setup Instructions

### Option 1: Groq API (Recommended - FREE TIER) 🆓

Groq offers a generous free tier with fast inference:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Get Groq API Key (FREE)**
   - Sign up at: https://console.groq.com/
   - Get your API key from: https://console.groq.com/keys
   - It's completely free with no credit card required!

3. **Configure Environment**
   - Create a `.env` file in the backend directory
   - Add your Groq API key:
     ```
     GROQ_API_KEY=your_groq_api_key_here
     API_PROVIDER=groq
     ```
   - Or simply use:
     ```
     OPENAI_API_KEY=your_groq_api_key_here
     ```
   - The app defaults to Groq if `API_PROVIDER` is not set

4. **Start the Server**
   ```bash
   npm start
   ```
   
   The server will run on `http://127.0.0.1:5001`

### Option 2: OpenAI API (Paid)

If you prefer OpenAI:

1. **Configure Environment**
   - Create a `.env` file in the backend directory
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     API_PROVIDER=openai
     ```
   - Get your API key from: https://platform.openai.com/api-keys
   - Note: OpenAI requires billing setup (not free)

## API Endpoints

- `POST /recommend` - Get movie recommendations
  - Body: `{ "userInput": "action movies with strong female lead" }`
  - Response: `{ "recommendations": "1. Movie Name\n2. Movie Name..." }`

- `GET /health` - Health check endpoint

## Database

The app uses SQLite (`movies.db`) to store:
- User inputs
- Recommended movies
- Timestamps

## Troubleshooting

- **Quota/Rate Limit Errors**: Switch to Groq API (free tier) by setting `API_PROVIDER=groq` in your `.env` file
- **API Key Errors**: Make sure your `.env` file is in the backend directory and contains the correct API key
