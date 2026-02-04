import { useState } from 'react'
import QuestionCard from './QuestionCard'
import ValentineQuestion from './ValentineQuestion'
import ResultsScreen from './ResultsScreen'
import ScoreDisplay from './ScoreDisplay'
import ProgressBar from './ProgressBar'

export default function QuizContainer({ quizData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState({})
  const [scoredQuestions, setScoredQuestions] = useState({}) // Track which questions have been scored
  
  // Check if quizData exists and has questions
  if (!quizData || !quizData.questions) {
    return (
      <div className="error-container">
        <p>Quiz data not loaded properly. Please refresh! 🐱</p>
      </div>
    )
  }
  
  const questions = quizData.questions || []
  const currentQuestion = questions[currentQuestionIndex]
  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  
  const handleAnswer = (selectedAnswerIndex) => {
    console.log('Answer selected:', selectedAnswerIndex, 'Correct answer:', currentQuestion.correctAnswer)
    
    // Store the answer for this question
    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedAnswerIndex
    }))
    
    // Only add score if this question hasn't been scored yet
    if (!scoredQuestions[currentQuestionIndex]) {
      if (currentQuestion.correctAnswer === selectedAnswerIndex) {
        const points = currentQuestion.isValentineQuestion 
          ? (quizData.settings?.valentineQuestionPoints || 100) 
          : (quizData.settings?.pointsPerCorrect || 10)
        setScore(prevScore => prevScore + points)
        console.log('Added points:', points, 'New score:', score + points)
      }
      
      // Mark this question as scored
      setScoredQuestions(prev => ({
        ...prev,
        [currentQuestionIndex]: true
      }))
    }
  }
  
  const handleNext = () => {
    if (isLastQuestion) {
      setQuizCompleted(true)
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1)
    }
  }
  
  const handlePrev = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1)
    }
  }
  
  if (quizCompleted) {
    const maxScore = (questions.length - 1) * (quizData.settings?.pointsPerCorrect || 10) + 
                    (quizData.settings?.valentineQuestionPoints || 100)
    return <ResultsScreen score={score} maxScore={maxScore} />
  }
  
  return (
    <div className="quiz-container">
      <ScoreDisplay score={score} />
      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={questions.length} 
      />
      
      {currentQuestion.isValentineQuestion ? (
        <ValentineQuestion 
          question={currentQuestion}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
        />
      ) : (
        <QuestionCard 
          question={currentQuestion}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
        />
      )}
      
      <style jsx>{`
        .quiz-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(214, 51, 132, 0.3);
        }
        .error-container {
          text-align: center;
          padding: 2rem;
          color: #d63384;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  )
}