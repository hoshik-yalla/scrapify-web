import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { scrapeArticle } from './scraper.js';
import { generateSATQuestion } from './aiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Scrapify backend is running' });
});

// Main endpoint: Generate SAT question from article URL
app.post('/api/generate-question', async (req, res) => {
  try {
    const { url } = req.body;

    // Validate URL
    if (!url) {
      return res.status(400).json({ 
        success: false, 
        error: 'URL is required' 
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid URL format' 
      });
    }

    console.log(`Processing request for URL: ${url}`);

    // Step 1: Scrape the article
    console.log('Scraping article...');
    const scrapedData = await scrapeArticle(url);
    
    if (!scrapedData.success) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to scrape article content' 
      });
    }

    console.log(`Scraped ${scrapedData.content.length} characters`);

    // Step 2: Generate SAT question using AI
    console.log('Generating SAT question...');
    const questionData = await generateSATQuestion(scrapedData.content);

    if (!questionData.success) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to generate question' 
      });
    }

    console.log('Question generated successfully');

    // Return the complete question data
    res.json({
      success: true,
      passage: questionData.passage,
      question: questionData.question,
      optA: questionData.optA,
      optB: questionData.optB,
      optC: questionData.optC,
      optD: questionData.optD,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation,
      sourceUrl: url
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Scrapify backend running on http://localhost:${PORT}`);
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/generate-question`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
