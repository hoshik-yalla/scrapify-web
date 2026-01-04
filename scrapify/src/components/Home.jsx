import { useState } from 'react';
import './Home.css';

function Home({ onSubmit }) {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (url.trim()) {
            setLoading(true);
            // Pass URL to parent component
            await onSubmit(url);
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="logo-animation">
                    <div className="logo-circle"></div>
                    <h1 className="logo-text">Scrapify</h1>
                </div>
                
                <p className="tagline">
                    Transform any article into SAT practice questions
                </p>
                
                <p className="description">
                    Paste any article URL and get instant, AI-generated SAT reading comprehension 
                    questions with detailed College Board-style explanations.
                </p>

                <form className="url-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input
                            type="url"
                            placeholder="Paste article URL here..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            disabled={loading}
                            className="url-input"
                        />
                        <button 
                            type="submit" 
                            className={`submit-btn ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Generating...
                                </>
                            ) : (
                                'Generate Question'
                            )}
                        </button>
                    </div>
                </form>

                <div className="features">
                    <div className="feature">
                        <div className="feature-icon">📚</div>
                        <h3>Any Article</h3>
                        <p>Practice with content you're interested in</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">🤖</div>
                        <h3>AI-Powered</h3>
                        <p>Smart questions tailored to SAT format</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">✨</div>
                        <h3>Instant Feedback</h3>
                        <p>Detailed explanations for every answer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
