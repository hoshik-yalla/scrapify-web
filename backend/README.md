# Scrapify Backend

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
The `.env` file is already configured with:
- `GITHUB_TOKEN`: Your GitHub AI API token
- `PORT`: Server port (default: 3001)

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Generate Question
```
POST /api/generate-question
Content-Type: application/json

{
  "url": "https://example.com/article"
}
```

**Response:**
```json
{
  "success": true,
  "passage": "Extracted passage from article...",
  "question": "SAT-style question...",
  "optA": "Answer option A",
  "optB": "Answer option B",
  "optC": "Answer option C",
  "optD": "Answer option D",
  "correctAnswer": "B",
  "explanation": "Detailed explanation...",
  "sourceUrl": "https://example.com/article"
}
```

## 🏗️ Architecture

### Components

1. **server.js** - Express server with API endpoints
2. **scraper.js** - Web scraping functionality
   - Removes navigation, headers, footers, ads
   - Extracts main article content
   - Cleans and validates text
3. **aiService.js** - OpenAI integration
   - Sophisticated SAT question generation prompt
   - JSON response parsing and validation
   - Error handling

### Features

- ✅ Web scraping with intelligent content extraction
- ✅ Filters out navigation, ads, and non-content elements
- ✅ AI-powered SAT question generation
- ✅ College Board-style explanations
- ✅ Comprehensive error handling
- ✅ CORS enabled for frontend integration
- ✅ Input validation and sanitization

## 🎯 AI Prompt Strategy

The AI service uses a sophisticated system prompt that:
- Warns about potential scraped artifacts (navigation, menus, etc.)
- Enforces SAT-level question complexity
- Requires 150-250 word passage excerpts
- Demands plausible wrong answers
- Ensures comprehensive explanations
- Tests higher-order thinking (inference, analysis, synthesis)
- Follows official SAT question formats

## 🔧 Testing

### Test with curl:
```bash
curl -X POST http://localhost:3001/api/generate-question \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.nytimes.com/2024/01/01/science/article.html"}'
```

## 📦 Dependencies

- **express** - Web server framework
- **cors** - Cross-origin resource sharing
- **axios** - HTTP client for scraping
- **cheerio** - HTML parsing and manipulation
- **openai** - OpenAI/GitHub AI API client
- **dotenv** - Environment variable management

## 🚨 Error Handling

The backend handles:
- Invalid URLs
- Scraping failures (network issues, blocked content)
- Short or empty articles
- AI generation failures
- Malformed responses
- JSON parsing errors

All errors return appropriate HTTP status codes and descriptive messages.
