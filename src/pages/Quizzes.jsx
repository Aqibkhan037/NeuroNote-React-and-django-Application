// pages/Quizzes.jsx
import { useState, useEffect } from 'react'

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  // Mock data - will be replaced with API calls
  useEffect(() => {
    setQuizzes([
      { 
        id: 1, 
        title: 'Biology - Cell Structure Quiz', 
        date: '2023-06-16',
        questionCount: 5,
        questions: [
          {
            id: 1,
            question: 'What is the powerhouse of the cell?',
            options: ['Nucleus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus'],
            correctAnswer: 1
          },
          {
            id: 2,
            question: 'Which organelle contains DNA?',
            options: ['Mitochondria', 'Ribosome', 'Nucleus', 'Lysosome'],
            correctAnswer: 2
          },
          {
            id: 3,
            question: 'What is the function of ribosomes?',
            options: ['Energy production', 'Protein synthesis', 'Cellular digestion', 'Waste removal'],
            correctAnswer: 1
          }
        ]
      },
      { 
        id: 2, 
        title: 'History - World War II Quiz', 
        date: '2023-06-11',
        questionCount: 4,
        questions: [
          {
            id: 1,
            question: 'When did WWII begin?',
            options: ['1937', '1939', '1941', '1943'],
            correctAnswer: 1
          },
          {
            id: 2,
            question: 'Which event caused the US to enter WWII?',
            options: ['D-Day', 'Battle of Britain', 'Attack on Pearl Harbor', 'Invasion of Poland'],
            correctAnswer: 2
          }
        ]
      }
    ])
  }, [])

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setQuizCompleted(false)
    setScore(0)
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateScore()
      setQuizCompleted(true)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let correctCount = 0
    selectedQuiz.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    setScore(correctCount)
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setQuizCompleted(false)
    setScore(0)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const currentQuestion = selectedQuiz?.questions[currentQuestionIndex]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quizzes</h1>
        <p className="text-gray-600 dark:text-gray-400">Test your knowledge with AI-generated quizzes</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Quizzes List */}
        <div className="w-full md:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quiz Library</h2>
              <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                New Quiz
              </button>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {quizzes.map(quiz => (
                <div 
                  key={quiz.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedQuiz?.id === quiz.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => handleQuizSelect(quiz)}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{quiz.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {quiz.questionCount} questions • Created {formatDate(quiz.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz Viewer */}
        <div className="w-full md:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 h-full">
            {selectedQuiz ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedQuiz.title}</h2>
                  {!quizCompleted && (
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                      Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                    </span>
                  )}
                </div>

                {quizCompleted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {score}/{selectedQuiz.questions.length}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Quiz Completed!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      You scored {score} out of {selectedQuiz.questions.length} questions correctly.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={restartQuiz}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Try Again
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Review Answers
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        {currentQuestion.question}
                      </h3>
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <div 
                            key={index}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              userAnswers[currentQuestion.id] === index
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                            }`}
                            onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                          >
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                                userAnswers[currentQuestion.id] === index
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-400 dark:border-gray-500'
                              }`}>
                                {userAnswers[currentQuestion.id] === index && (
                                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button 
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button 
                        onClick={handleNextQuestion}
                        disabled={userAnswers[currentQuestion.id] === undefined}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No quiz selected</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Select a quiz from the list to start testing your knowledge, or generate new quizzes from your notes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quizzes