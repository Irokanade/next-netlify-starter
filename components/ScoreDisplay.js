export default function ScoreDisplay({ score }) {
  return (
    <div className="score-display">
      <div className="score-container">
        <div className="score-label">Score</div>
        <div className="score-value">
          {score}
          <span className="score-heart">💖</span>
        </div>
      </div>
      
      <style jsx>{`
        .score-display {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1.5rem;
        }
        .score-container {
          background: linear-gradient(45deg, #ff6b6b, #ff8e53);
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .score-label {
          color: white;
          font-size: 0.9rem;
          font-weight: bold;
        }
        .score-value {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .score-heart {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}