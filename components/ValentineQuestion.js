import { useState } from 'react'

export default function ValentineQuestion({ question, onAnswer, onNext, onPrev, isFirstQuestion, isLastQuestion }) {
  const [noButtonHovered, setNoButtonHovered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  
  const handleYesClick = () => {
    setSelectedAnswer(0) // Yes is answer index 0
    setAnswered(true)
    onAnswer(0)
  }

  const handleNoClick = () => {
    if (noButtonHovered) {
      setSelectedAnswer(1) // No is answer index 1
      setAnswered(true)
      onAnswer(1)
    }
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      onNext()
    }
  }

  const handlePrev = () => {
    onPrev()
  }

  return (
    <div className="valentine-question">
      <h2 className="question-text">💖 {question.question} 💖</h2>
      
      <div className="answers-container">
        <button 
          className={`yes-button ${selectedAnswer === 0 ? 'selected' : ''}`}
          onClick={handleYesClick}
        >
          YES! 💝
        </button>
        
        <button 
          className={`no-button ${selectedAnswer === 1 ? 'selected' : ''}`}
          onMouseEnter={() => setNoButtonHovered(true)}
          onMouseLeave={() => setNoButtonHovered(false)}
          onClick={handleNoClick}
          style={{
            position: noButtonHovered ? 'relative' : 'static',
            left: noButtonHovered ? `${Math.random() * 100 - 50}px` : '0',
            top: noButtonHovered ? `${Math.random() * 100 - 50}px` : '0'
          }}
        >
          {noButtonHovered ? "🐱 No... 🐱" : "No"}
        </button>
      </div>

      {answered && (
        <div className="feedback">
          <p className="valentine-feedback">
            {selectedAnswer === 0 ? 
              "Yay! You made my day! 💖" : 
              "Are you sure? Let me try again! 🥺"}
          </p>
        </div>
      )}

      <div className="navigation-buttons">
        <button
          className="prev-button"
          onClick={handlePrev}
          disabled={isFirstQuestion}
        >
          ← Previous
        </button>
        
        <button
          className="next-button"
          onClick={handleNext}
          disabled={!answered}
        >
          {isLastQuestion ? 'See Results 💖' : 'Next →'}
        </button>
      </div>
      
      <style jsx>{`
        .valentine-question {
          text-align: center;
          position: relative;
          padding: 2rem;
        }
        .question-text {
          font-size: 2rem;
          color: #d63384;
          margin-bottom: 3rem;
        }
        .answers-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .yes-button, .no-button {
          padding: 1rem 3rem;
          font-size: 1.5rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 150px;
        }
        .yes-button {
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          color: white;
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }
        .yes-button:hover, .yes-button.selected {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(255, 107, 107, 0.6);
        }
        .no-button {
          background: #f0f0f0;
          color: #666;
          transition: all 0.5s ease;
        }
        .no-button:hover, .no-button.selected {
          background: #ffcccc;
        }
        .feedback {
          margin: 2rem 0;
        }
        .valentine-feedback {
          font-size: 1.3rem;
          color: #ff6b6b;
          font-weight: bold;
          padding: 1rem;
          background: #fff0f6;
          border-radius: 15px;
          display: inline-block;
        }
        .navigation-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 2px dashed #ffc3a0;
        }
        .prev-button, .next-button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        .prev-button {
          background: #f8f9fa;
          color: #666;
        }
        .prev-button:not(:disabled):hover {
          background: #e9ecef;
          transform: translateX(-3px);
        }
        .prev-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .next-button {
          background: linear-gradient(45deg, #ff6b6b, #ff8e53);
          color: white;
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }
        .next-button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(255, 107, 107, 0.4);
        }
        .next-button:disabled {
          background: #e9ecef;
          color: #999;
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style>
    </div>
  )
}