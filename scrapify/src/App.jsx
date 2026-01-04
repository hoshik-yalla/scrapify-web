import { useState } from 'react'
import './App.css'
import Landing from './components/Landing'
import Home from './components/Home'
import QuestionCard from './components/questionCard'

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'home', or 'question'
  const [questionData, setQuestionData] = useState(null);
  const [articleUrl, setArticleUrl] = useState('');

  const handleUrlSubmit = async (url) => {
    setArticleUrl(url);
    
    try {
      // Call backend API to generate question
      const response = await fetch('http://localhost:3001/api/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate question');
      }

      setQuestionData({
        passage: data.passage,
        question: data.question,
        optA: data.optA,
        optB: data.optB,
        optC: data.optC,
        optD: data.optD,
        correctAnswer: data.correctAnswer,
        explanation: data.explanation
      });

      setCurrentView('question');
    } catch (error) {
      console.error('Error generating question:', error);
      alert(`Error: ${error.message}. Please try another article URL.`);
    }
  };

  const handleGetStarted = () => {
    setCurrentView('home');
  };

  const handleReset = () => {
    setCurrentView('home');
    setQuestionData(null);
    setArticleUrl('');
  };

  return (
    <div className="app-container">
      {currentView === 'landing' ? (
        <Landing onGetStarted={handleGetStarted} />
      ) : currentView === 'home' ? (
        <Home onSubmit={handleUrlSubmit} />
      ) : (
        <div className="question-view">
          <button className="back-btn" onClick={handleReset}>
            ← New Question
          </button>
          <div className="article-source">
            <span className="source-label">Source:</span>
            <a href={articleUrl} target="_blank" rel="noopener noreferrer" className="source-link">
              {articleUrl}
            </a>
          </div>
          <QuestionCard {...questionData} />
        </div>
      )}
    </div>
  )
}

export default App
