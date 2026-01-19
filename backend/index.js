require("dotenv").config();

const Fastify = require("fastify");
const cors = require("@fastify/cors");
const db = require("./db");
const { OpenAI } = require("openai");

// Create Fastify app
const app = Fastify({ logger: true });

// Enable CORS
app.register(cors, {
  origin: "*",
});

// Determine which API to use (defaults to groq for free tier)
const API_PROVIDER = process.env.API_PROVIDER || "groq"; // "openai" or "groq"

// Initialize API client based on provider
let aiClient;
let modelName;

if (API_PROVIDER === "groq") {
  // Groq API (FREE TIER) - Get API key from https://console.groq.com/keys
  aiClient = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });
  modelName = "llama-3.1-8b-instant"; // Free and fast model
  console.log("Using Groq API (Free Tier)");
} else {
  // OpenAI API
  aiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  modelName = "gpt-3.5-turbo";
  console.log("Using OpenAI API");
}

// Movie Recommendation API
app.post("/recommend", async (request, reply) => {
  const { userInput } = request.body;

  if (!userInput) {
    return reply.status(400).send({ error: "userInput is required" });
  }

  try {
    // Call AI API
    const response = await aiClient.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: "user",
          content: `Recommend 3 to 5 movies based on this preference: "${userInput}". 
Return only movie names in a numbered list format (1. Movie Name, 2. Movie Name, etc.).`,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const movies = response.choices[0].message.content;

    // Save to SQLite using promise wrapper
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)`,
        [userInput, movies],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    reply.send({ recommendations: movies });
  } catch (error) {
    console.error("Error:", error);
    
    // Handle specific error types
    if (error.code === "insufficient_quota" || error.type === "insufficient_quota") {
      reply.status(429).send({ 
        error: "API quota exceeded. Please check your billing or switch to Groq API (free tier). See README for setup instructions." 
      });
    } else if (error.status === 429) {
      reply.status(429).send({ 
        error: "Rate limit exceeded. Please try again in a moment." 
      });
    } else if (error.message && (error.message.includes("API key") || error.message.includes("authentication"))) {
      const provider = API_PROVIDER === "groq" ? "Groq" : "OpenAI";
      reply.status(500).send({ 
        error: `${provider} API key is missing or invalid. Please check your .env file.` 
      });
    } else {
      reply.status(500).send({ 
        error: error.message || "Failed to generate recommendations" 
      });
    }
  }
});

// Health check endpoint
app.get("/health", async (request, reply) => {
  reply.send({ status: "ok" });
});

// Start server
const start = async () => {
  try {
    const port = process.env.PORT || 5001;
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
