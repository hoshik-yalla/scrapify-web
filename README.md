# 🎓 Scrapify - AI-Powered SAT Practice Generator

Transform any article into SAT-level reading comprehension questions with AI-generated explanations.

## 🌟 Features

- 📚 **Any Article**: Paste any article URL to generate practice questions
- 🤖 **AI-Powered**: Sophisticated GPT-4 generated SAT-style questions
- 🎯 **Instant Feedback**: College Board-style explanations for every answer
- ✨ **Beautiful UI**: Modern, animated interface with purple-gradient theme
- 🔍 **Smart Scraping**: Intelligent content extraction filtering out ads and navigation

## 🚀 Quick Start

### Prerequisites
- Node.js environment (nvenv included in `misc/`)
- GitHub AI API token (already configured)

### Option 1: Run Everything at Once
```bash
./start.sh
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
source ./misc/nvenv/bin/activate
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
source ./misc/nvenv/bin/activate
cd scrapify
npm install
npm run dev
```

## 📱 Access the App

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 🏗️ Project Structure

```
scrapify-web/
├── backend/               # Express API server
│   ├── server.js         # Main server file
│   ├── scraper.js        # Web scraping logic
│   ├── aiService.js      # OpenAI integration
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
│
├── scrapify/             # React frontend
│   ├── src/
│   │   ├── App.jsx       # Main app component
│   │   ├── components/
│   │   │   ├── Landing.jsx      # Animated landing page
│   │   │   ├── Home.jsx         # URL input page
│   │   │   └── QuestionCard.jsx # Question display
│   │   └── ...
│   └── package.json      # Frontend dependencies
│
├── misc/nvenv/           # Node.js environment
└── start.sh              # Convenience startup script
```

## 🎨 User Flow

1. **Landing Page** → Beautiful animated intro with "Get Started" button
2. **Home Page** → Paste article URL and click "Generate Question"
3. **Question Page** → Answer SAT-style question and get instant feedback

## 🧠 AI Prompt Features

The backend uses a sophisticated prompt that:
- Filters out scraped website artifacts (navigation, ads, headers)
- Creates SAT-level difficulty questions
- Tests higher-order thinking (inference, analysis, synthesis)
- Generates 4 plausible answer choices
- Provides comprehensive College Board-style explanations
- Ensures questions follow official SAT format

## 🔧 API Endpoint

**POST** `/api/generate-question`
```json
{
  "url": "https://example.com/article"
}
```

**Response:**
```json
{
  "success": true,
  "passage": "Article excerpt...",
  "question": "SAT question...",
  "optA": "Answer A",
  "optB": "Answer B", 
  "optC": "Answer C",
  "optD": "Answer D",
  "correctAnswer": "B",
  "explanation": "Detailed explanation...",
  "sourceUrl": "https://example.com/article"
}
```

## 🎯 Technology Stack

**Frontend:**
- React + Vite
- CSS3 with animations
- Fetch API

**Backend:**
- Node.js + Express
- OpenAI API (via GitHub AI)
- Axios + Cheerio (web scraping)

## 📝 Example Articles to Try

- New York Times articles
- Scientific American
- The Atlantic
- Medium posts
- Wikipedia articles
- News sites

## 🚨 Troubleshooting

**Backend not starting?**
- Check that port 3001 is available
- Verify GitHub token in `backend/.env`

**Frontend not connecting to backend?**
- Ensure backend is running on port 3001
- Check browser console for CORS errors

**Scraping fails?**
- Some sites block scrapers - try a different article
- Ensure the URL is publicly accessible

## 🎉 Ready to Use!

Your Scrapify application is fully set up and ready to generate SAT practice questions from any article on the web!
