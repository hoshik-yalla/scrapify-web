import { useEffect, useState } from 'react';
import './Landing.css';

function Landing({ onGetStarted }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="landing-container">
            {/* Animated Background Orbs */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
            <div className="orb orb-4"></div>
            <div className="orb orb-5"></div>

            {/* Floating Particles */}
            <div className="particles">
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 10}s`
                    }}></div>
                ))}
            </div>

            {/* Main Content */}
            <div className="landing-content" style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}>
                {/* Logo Section */}
                <div className="landing-logo">
                    <div className="logo-rings">
                        <div className="ring ring-1"></div>
                        <div className="ring ring-2"></div>
                        <div className="ring ring-3"></div>
                    </div>
                    <div className="logo-center">
                        <span className="logo-icon">📚</span>
                    </div>
                </div>

                {/* Hero Text */}
                <h1 className="landing-title">
                    <span className="title-word word-1">Scrapify</span>
                    <span className="title-word word-2">Your</span>
                    <span className="title-word word-3">SAT</span>
                </h1>

                <p className="landing-subtitle">
                    Transform <span className="highlight">any article</span> into 
                    <span className="highlight"> SAT-level</span> practice questions
                </p>

                <p className="landing-description">
                    AI-powered reading comprehension • Instant feedback • College Board style
                </p>

                {/* CTA Button */}
                <button className="cta-button" onClick={onGetStarted}>
                    <span className="cta-text">Get Started</span>
                    <span className="cta-arrow">→</span>
                    <div className="cta-glow"></div>
                </button>

                {/* Stats */}
                <div className="stats">
                    <div className="stat">
                        <div className="stat-number">
                            <span className="counter">AI</span>
                        </div>
                        <div className="stat-label">Powered</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">
                            <span className="counter">∞</span>
                        </div>
                        <div className="stat-label">Questions</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">
                            <span className="counter">100%</span>
                        </div>
                        <div className="stat-label">Free</div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <div className="arrow-down"></div>
            </div>
        </div>
    );
}

export default Landing;
