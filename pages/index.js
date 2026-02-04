import Head from 'next/head'
import { useState, useEffect } from 'react'
import QuizContainer from '@components/QuizContainer'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [quizData, setQuizData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch quiz data from JSON file
    fetch('/data/quizData.json')
      .then(res => res.json())
      .then(data => {
        setQuizData(data)
        setLoading(false)
        console.log(data)
      })
      .catch(err => {
        console.error('Error loading quiz data:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Will You Be My Valentine? ❤️</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Valentine's Day Quiz ❤️" />
        
        {loading ? (
          <div className="loading">
            <p>Loading quiz... 🐱</p>
          </div>
        ) : quizData ? (
          <QuizContainer quizData={quizData} />
        ) : (
          <div className="error">
            <p>Failed to load quiz. Please refresh! 🐾</p>
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #ffafbd, #ffc3a0);
        }
        .loading, .error {
          text-align: center;
          padding: 2rem;
          font-size: 1.5rem;
          color: #d63384;
        }
      `}</style>
    </div>
  )
}