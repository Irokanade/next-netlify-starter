export default function ResultsScreen({ score, maxScore }) {
  const percentage = (score / maxScore) * 100
  
  const getMessage = () => {
    if (percentage === 100) return "You're purr-fect! 🐱❤️🐱"
    if (percentage >= 80) return "Meow-velous! We're meant to be! 💕"
    if (percentage >= 60) return "We make a great pair! 🐾"
    return "Let's try again? 💝"
  }

  const getCatCouple = () => {
    if (percentage >= 90) return "😻❤️😻"
    if (percentage >= 70) return "😸💕😸"
    if (percentage >= 50) return "🐱💖🐱"
    return "🐈💔🐈"
  }

  return (
    <div className="results-screen">
      <div className="results-content">
        <h1 className="congratulations">Quiz Complete! 🎉</h1>
        
        <div className="score-display">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-total">/{maxScore}</span>
            <div className="score-percentage">{Math.round(percentage)}%</div>
          </div>
          <div className="score-message">{getMessage()}</div>
        </div>

        <div className="cat-couple">
          <div className="cat-emoji">{getCatCouple()}</div>
        </div>

        <p className="final-message">
          {percentage >= 70 
            ? "Happy Valentine's Day! Will you go on a date with me? 🥰"
            : "Let's try the quiz again and get to know each other better! 💝"
          }
        </p>

        <div className="actions">
          <button 
            className="restart-button"
            onClick={() => window.location.reload()}
          >
            Play Again 💝
          </button>
        </div>
      </div>

      <style jsx>{`
        .results-screen {
          text-align: center;
          padding: 2rem;
        }
        .results-content {
          background: white;
          padding: 2rem;
          border-radius: 30px;
          box-shadow: 0 20px 40px rgba(214, 51, 132, 0.3);
        }
        .congratulations {
          font-size: 2rem;
          color: #d63384;
          margin-bottom: 2rem;
        }
        .score-display {
          margin: 2rem 0;
        }
        .score-circle {
          width: 180px;
          height: 180px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          position: relative;
        }
        .score-number {
          font-size: 3.5rem;
          font-weight: bold;
          line-height: 1;
        }
        .score-total {
          font-size: 1.2rem;
          opacity: 0.9;
        }
        .score-percentage {
          position: absolute;
          bottom: 15px;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.8rem;
          border-radius: 20px;
        }
        .score-message {
          font-size: 1.5rem;
          color: #ff6b6b;
          font-weight: bold;
          margin-top: 1rem;
        }
        .cat-couple {
          margin: 3rem 0;
          font-size: 4rem;
          animation: bounce 2s ease-in-out infinite;
        }
        .cat-emoji {
          display: inline-block;
        }
        .final-message {
          font-size: 1.5rem;
          color: #d63384;
          margin: 2rem 0;
          padding: 1.5rem;
          background: #fff0f6;
          border-radius: 20px;
          border: 2px dashed #ff6b6b;
          line-height: 1.5;
        }
        .actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .restart-button {
          padding: 1rem 2.5rem;
          font-size: 1.2rem;
          background: linear-gradient(45deg, #ff6b6b, #ff8e53);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
        }
        .restart-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}