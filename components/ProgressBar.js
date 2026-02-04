export default function ProgressBar({ current, total }) {
  const progress = (current / total) * 100
  
  return (
    <div className="progress-container">
      <div className="progress-labels">
        <span className="current">Question {current}</span>
        <span className="total">of {total}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <style jsx>{`
        .progress-container {
          margin-bottom: 2rem;
        }
        .progress-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #666;
        }
        .progress-bar {
          height: 10px;
          background: #e9ecef;
          border-radius: 5px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6b6b, #ff8e53);
          border-radius: 5px;
          transition: width 0.5s ease;
        }
      `}</style>
    </div>
  )
}