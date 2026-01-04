import { useState } from 'react';
import './QuestionCard.css';

function QuestionCard({ passage, question, optA, optB, optC, optD, correctAnswer, explanation }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAnswer) {
            setSubmitted(true);
        }
    };

    const isCorrect = (option) => option === correctAnswer;
    const isSelected = (option) => option === selectedAnswer;

    return (
        <div className="QuestionCard">
            <h1>Question Card</h1>
            <p className="passage">{passage}</p>
            <p className="question">{question}</p>
            <form onSubmit={handleSubmit}>
                <label className={submitted && isCorrect('A') ? 'correct' : submitted && isSelected('A') ? 'incorrect' : ''}>
                    <input 
                        type="radio" 
                        name="answer" 
                        value="A"
                        checked={selectedAnswer === 'A'}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        disabled={submitted}
                    />
                    A. {optA}
                </label>
                <label className={submitted && isCorrect('B') ? 'correct' : submitted && isSelected('B') ? 'incorrect' : ''}>
                    <input 
                        type="radio" 
                        name="answer" 
                        value="B"
                        checked={selectedAnswer === 'B'}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        disabled={submitted}
                    />
                    B. {optB}
                </label>
                <label className={submitted && isCorrect('C') ? 'correct' : submitted && isSelected('C') ? 'incorrect' : ''}>
                    <input 
                        type="radio" 
                        name="answer" 
                        value="C"
                        checked={selectedAnswer === 'C'}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        disabled={submitted}
                    />
                    C. {optC}
                </label>
                <label className={submitted && isCorrect('D') ? 'correct' : submitted && isSelected('D') ? 'incorrect' : ''}>
                    <input 
                        type="radio" 
                        name="answer" 
                        value="D"
                        checked={selectedAnswer === 'D'}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        disabled={submitted}
                    />
                    D. {optD}
                </label>
                {!submitted && (
                    <button type="submit" disabled={!selectedAnswer}>
                        Submit Answer
                    </button>
                )}
            </form>
            {submitted && (
                <div className="explanation">
                    <h3>{selectedAnswer === correctAnswer ? '✓ Correct!' : '✗ Incorrect'}</h3>
                    <p>{explanation}</p>
                </div>
            )}
        </div>
    );
}

export default QuestionCard