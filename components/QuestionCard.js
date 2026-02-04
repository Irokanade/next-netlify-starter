import { useState } from 'react'

export default function QuestionCard({ question, onAnswer, onNext, onPrev, isFirstQuestion, isLastQuestion }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleClick = (answerIndex) => {
    if (answered) return
    
    setSelectedAnswer(answerIndex)
    setAnswered(true)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      onAnswer(selectedAnswer)
      setSelectedAnswer(null)
      setAnswered(false)
      onNext()
    }
  }

  const handlePrev = () => {
    onPrev()
  }

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">Question {question.id}</span>
        <div className="decoration">💝</div>
      </div>
      
      <h2 className="question-text">{question.question}</h2>
      
      <div className="answers-grid">
        {question.answers && question.answers.map((answer, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correctAnswer
          let buttonClass = "answer-button"
          
          if (answered) {
            if (isSelected && isCorrect) buttonClass += " correct"
            else if (isSelected && !isCorrect) buttonClass += " wrong"
            else if (isCorrect) buttonClass += " correct-not-selected"
          }
          
          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleClick(index)}
              disabled={answered && selectedAnswer !== index}
            >
              <span className="answer-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="answer-text">{answer}</span>
              {answered && isSelected && (
                <span className="feedback-icon">
                  {isCorrect ? "✅" : "❌"}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="feedback">
          {selectedAnswer === question.correctAnswer ? (
            <p className="correct-feedback">Correct! 🎉 +10 points!</p>
          ) : (
            <p className="wrong-feedback">
              Not quite! The correct answer was: {question.answers[question.correctAnswer]}
            </p>
          )}
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
          {isLastQuestion ? 'Finish Quiz 💖' : 'Next →'}
        </button>
      </div>

      <style jsx>{`
        .question-card {
          padding: 1rem;
        }
        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .question-number {
          font-size: 1rem;
          color: #666;
          background: #f8f9fa;
          padding: 0.5rem 1rem;
          border-radius: 20px;
        }
        .decoration {
          font-size: 1.5rem;
        }
        .question-text {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 2rem;
          line-height: 1.4;
          text-align: center;
        }
        .answers-grid {
          display: grid;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .answer-button {
          display: flex;
          align-items: center;
          padding: 1.2rem;
          border: 2px solid #e9ecef;
          border-radius: 15px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          text-align: left;
        }
        .answer-button:hover:not(:disabled) {
          border-color: #ff6b6b;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.1);
        }
        .answer-button.correct {
          background: #40c057;
          color: white;
          border-color: #40c057;
        }
        .answer-button.wrong {
          background: #fa5252;
          color: white;
          border-color: #fa5252;
        }
        .answer-button.correct-not-selected {
          background: rgba(64, 192, 87, 0.1);
          border-color: #40c057;
          color: #40c057;
        }
        .answer-button:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
        .answer-letter {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          background: #ff6b6b;
          color: white;
          border-radius: 50%;
          margin-right: 1rem;
          font-weight: bold;
        }
        .answer-button.correct .answer-letter,
        .answer-button.wrong .answer-letter {
          background: rgba(255, 255, 255, 0.3);
        }
        .answer-text {
          flex: 1;
        }
        .feedback-icon {
          margin-left: 0.5rem;
          font-size: 1.2rem;
        }
        .feedback {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1.5rem;
        }
        .correct-feedback {
          color: #40c057;
          font-size: 1.2rem;
          font-weight: bold;
          text-align: center;
        }
        .wrong-feedback {
          color: #fa5252;
          font-size: 1.1rem;
          text-align: center;
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
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