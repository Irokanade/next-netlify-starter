import { motion } from 'framer-motion'

export default function NoButtonCat({ position, message }) {
  return (
    <motion.div
      className="no-button-cat"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y 
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none'
      }}
    >
      <div className="cat-container">
        <div className="cat">
          <div className="ear ear-left"></div>
          <div className="ear ear-right"></div>
          <div className="face">
            <div className="eye eye-left"></div>
            <div className="eye eye-right"></div>
            <div className="nose"></div>
            <div className="mouth"></div>
          </div>
          <div className="paw"></div>
        </div>
        <div className="speech-bubble">{message}</div>
      </div>

      <style jsx>{`
        .no-button-cat {
          z-index: 100;
        }
        .cat-container {
          position: relative;
        }
        .cat {
          width: 80px;
          height: 60px;
          background: #ffb347;
          border-radius: 50% 50% 40% 40%;
          position: relative;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .ear {
          position: absolute;
          width: 20px;
          height: 25px;
          background: #ffb347;
          top: -15px;
          border-radius: 50% 50% 0 0;
        }
        .ear-left {
          left: 15px;
          transform: rotate(-20deg);
        }
        .ear-right {
          right: 15px;
          transform: rotate(20deg);
        }
        .face {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 40px;
        }
        .eye {
          position: absolute;
          width: 10px;
          height: 15px;
          background: #333;
          border-radius: 50%;
          top: 10px;
          animation: blink 3s infinite;
        }
        .eye-left {
          left: 10px;
        }
        .eye-right {
          right: 10px;
        }
        .nose {
          position: absolute;
          width: 8px;
          height: 8px;
          background: pink;
          border-radius: 50%;
          top: 25px;
          left: 50%;
          transform: translateX(-50%);
        }
        .mouth {
          position: absolute;
          width: 20px;
          height: 10px;
          border-bottom: 3px solid #333;
          border-radius: 0 0 50% 50%;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
        }
        .paw {
          position: absolute;
          width: 40px;
          height: 25px;
          background: #ffb347;
          border-radius: 50%;
          bottom: -5px;
          right: -10px;
          transform: rotate(30deg);
        }
        .speech-bubble {
          position: absolute;
          top: -60px;
          left: 50px;
          background: white;
          padding: 10px 15px;
          border-radius: 20px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
          white-space: nowrap;
          font-size: 14px;
          color: #d63384;
          animation: wiggle 0.5s ease-in-out infinite alternate;
        }
        .speech-bubble:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 20px;
          border: 10px solid transparent;
          border-top-color: white;
        }
        @keyframes blink {
          0%, 90%, 100% { height: 15px; }
          95% { height: 3px; }
        }
        @keyframes wiggle {
          from { transform: rotate(-2deg); }
          to { transform: rotate(2deg); }
        }
      `}</style>
    </motion.div>
  )
}