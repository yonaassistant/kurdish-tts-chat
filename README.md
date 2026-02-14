# Kurdish TTS Chat 🎤

A beautiful, simple chat interface for Kurdish Text-to-Speech using Next.js and the `razhan/mms-tts-ckb` model.

## Features

- 🗣️ Real-time Kurdish (Sorani) text-to-speech
- 💬 Clean chat-like interface
- 🎨 Beautiful gradient UI with Tailwind CSS
- 🔊 Instant audio playback
- 📱 Responsive design

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Make sure your TTS API is running:**
   ```bash
   # In the tts directory
   uvicorn api:app --reload --host 0.0.0.0
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Deploy to Netlify

### Option 1: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### Option 2: Deploy via Netlify Dashboard

1. Push this project to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Add environment variable:
   - **Key:** `TTS_API_URL`
   - **Value:** Your deployed TTS API URL (must be publicly accessible)
7. Click "Deploy site"

### Option 3: Deploy Button

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/kurdish-tts-chat)

## Important: TTS API Deployment

⚠️ **The TTS API needs to be publicly accessible for the Netlify deployment to work.**

Your TTS API (currently running on localhost:8000) needs to be deployed to a cloud service like:

- **Railway** (easiest for Python apps)
- **Render**
- **Fly.io**
- **AWS/GCP/Azure**
- **Your own VPS**

Once deployed, set the `TTS_API_URL` environment variable in Netlify to point to your TTS API.

### Example TTS API Deployment (Railway)

1. Create a `Procfile` in your `tts` directory:
   ```
   web: uvicorn api:app --host 0.0.0.0 --port $PORT
   ```

2. Push to GitHub and connect to Railway
3. Copy the deployed URL and set it as `TTS_API_URL` in Netlify

## Environment Variables

- `TTS_API_URL` - URL of your deployed TTS API (defaults to `http://127.0.0.1:8000` for local dev)

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Kurdish TTS API** - Backend text-to-speech service

## License

MIT
