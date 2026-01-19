# Deployment Guide - Alternatives to Render

This guide covers multiple deployment options for your movie recommendation app.

## 🚂 Option 1: Railway (Recommended - Easiest)

**Why Railway:**
- ✅ Free tier available ($5 credit/month)
- ✅ Excellent monorepo support
- ✅ Auto-detects Node.js projects
- ✅ Simple setup, similar to Render

**Setup Steps:**

1. **Sign up**: Go to [railway.app](https://railway.app) and sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**:
   - Railway will auto-detect the backend
   - Set Root Directory to: `backend`
   - Or use the `railway.json` config file (already created)

4. **Set Environment Variables**:
   - `GROQ_API_KEY` - Your Groq API key
   - `API_PROVIDER` - Set to `groq`
   - `PORT` - Railway sets this automatically, but you can use `10000`

5. **Deploy**: Railway will automatically deploy on every push

**Cost**: Free tier includes $5 credit/month (usually enough for small apps)

---

## ✈️ Option 2: Fly.io (Great for Backend APIs)

**Why Fly.io:**
- ✅ Generous free tier (3 shared VMs)
- ✅ Global edge deployment
- ✅ Great for APIs and backend services
- ✅ Fast cold starts

**Setup Steps:**

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login**:
   ```bash
   fly auth login
   ```

3. **Initialize** (from project root):
   ```bash
   cd backend
   fly launch
   ```
   - Follow prompts
   - Use the `fly.toml` already created (or let Fly generate one)

4. **Set Secrets**:
   ```bash
   fly secrets set GROQ_API_KEY=your_key_here
   fly secrets set API_PROVIDER=groq
   ```

5. **Deploy**:
   ```bash
   fly deploy
   ```

**Cost**: Free tier includes 3 shared VMs (256MB RAM each)

---

## ▲ Option 3: Vercel (Full-Stack)

**Why Vercel:**
- ✅ Excellent for React frontend
- ✅ Serverless functions for backend
- ✅ Free tier is generous
- ✅ Already configured!

**Setup Steps:**

1. **Sign up**: Go to [vercel.com](https://vercel.com) and sign up with GitHub

2. **Import Project**:
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will detect the `vercel.json` config

3. **Configure**:
   - Root Directory: Leave as root (or set to `frontend` for frontend only)
   - Framework Preset: Create React App
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/build`

4. **For Backend API**:
   - You may need to convert backend to Vercel Serverless Functions
   - Or deploy backend separately (Railway/Fly.io) and frontend on Vercel

5. **Set Environment Variables**:
   - Add `GROQ_API_KEY` and `API_PROVIDER` in Vercel dashboard

**Cost**: Free tier includes generous limits for personal projects

---

## 🟢 Option 4: Netlify (Frontend + Functions)

**Why Netlify:**
- ✅ Great for static sites (React)
- ✅ Netlify Functions for backend
- ✅ Already configured!
- ✅ Free tier available

**Setup Steps:**

1. **Sign up**: Go to [netlify.com](https://netlify.com) and sign up with GitHub

2. **Deploy Frontend**:
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub repo
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `build`

3. **For Backend**:
   - Convert backend to Netlify Functions, OR
   - Deploy backend separately (Railway/Fly.io recommended)

**Cost**: Free tier includes 100GB bandwidth/month

---

## 🐳 Option 5: DigitalOcean App Platform

**Why DigitalOcean:**
- ✅ Simple PaaS similar to Render
- ✅ Good monorepo support
- ✅ Predictable pricing

**Setup Steps:**

1. **Sign up**: Go to [digitalocean.com](https://digitalocean.com)

2. **Create App**:
   - Go to App Platform
   - Create from GitHub
   - Select your repository

3. **Configure Backend Service**:
   - Add a Web Service
   - Source Directory: `backend`
   - Build Command: `npm install`
   - Run Command: `npm start`
   - HTTP Port: `10000`

4. **Set Environment Variables**:
   - Add `GROQ_API_KEY`, `API_PROVIDER`, `PORT`

**Cost**: Starts at $5/month (no free tier, but reliable)

---

## 📊 Comparison Table

| Platform | Free Tier | Ease of Setup | Monorepo Support | Best For |
|----------|-----------|---------------|------------------|----------|
| **Railway** | ✅ $5 credit | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Full-stack apps |
| **Fly.io** | ✅ 3 VMs | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Backend APIs |
| **Vercel** | ✅ Generous | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Frontend + Serverless |
| **Netlify** | ✅ 100GB | ⭐⭐⭐⭐ | ⭐⭐⭐ | Static sites + Functions |
| **DigitalOcean** | ❌ $5/mo | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Production apps |

---

## 🎯 Recommended Setup

**Best Combination:**
- **Backend**: Railway or Fly.io (both excellent for Node.js APIs)
- **Frontend**: Vercel or Netlify (both great for React)

**Simplest Single Platform:**
- **Railway** - Can deploy both backend and frontend easily

---

## 🚀 Quick Start (Railway - Recommended)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect - set Root Directory to `backend`
6. Add environment variables:
   - `GROQ_API_KEY`
   - `API_PROVIDER=groq`
7. Deploy!

Your app will be live in minutes! 🎉

---

## 📝 Notes

- All platforms support environment variables
- Make sure your backend listens on the PORT environment variable (Railway/Fly.io set this automatically)
- For CORS, ensure your frontend URL is whitelisted in backend CORS settings
- Consider using a `.env.example` file to document required environment variables
