export default function Header({ title }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="hearts">💖💝💕💓💗💘</div>
      <style jsx>{`
        .header {
          text-align: center;
          margin-bottom: 2rem;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .hearts {
          font-size: 1.5rem;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </header>
  )
}