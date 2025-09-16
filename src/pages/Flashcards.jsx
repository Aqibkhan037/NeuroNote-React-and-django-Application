// pages/Flashcards.jsx
import { useState, useEffect } from 'react'

const Flashcards = () => {
  const [decks, setDecks] = useState([])
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studyMode, setStudyMode] = useState(false)
  const [knownCards, setKnownCards] = useState(new Set())

  // Mock data - will be replaced with API calls
  useEffect(() => {
    setDecks([
      { 
        id: 1, 
        title: 'Biology - Cell Structure', 
        date: '2023-06-16',
        cardCount: 12,
        cards: [
          { id: 1, front: 'What is the powerhouse of the cell?', back: 'Mitochondria' },
          { id: 2, front: 'What does the nucleus contain?', back: 'DNA and genetic material' },
          { id: 3, front: 'What is the function of ribosomes?', back: 'Protein synthesis' },
          { id: 4, front: 'What is the cell membrane made of?', back: 'Phospholipid bilayer' }
        ]
      },
      { 
        id: 2, 
        title: 'History - World War II', 
        date: '2023-06-11',
        cardCount: 8,
        cards: [
          { id: 1, front: 'When did WWII begin?', back: 'September 1, 1939' },
          { id: 2, front: 'Which event caused the US to enter WWII?', back: 'Attack on Pearl Harbor' },
          { id: 3, front: 'Who was the leader of Nazi Germany?', back: 'Adolf Hitler' }
        ]
      }
    ])
  }, [])

  const handleDeckSelect = (deck) => {
    setSelectedDeck(deck)
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setStudyMode(false)
    setKnownCards(new Set())
  }

  const handleNextCard = () => {
    if (currentCardIndex < selectedDeck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
    }
  }

  const markAsKnown = () => {
    const currentCardId = selectedDeck.cards[currentCardIndex].id
    setKnownCards(prev => new Set(prev).add(currentCardId))
    handleNextCard()
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const startStudyMode = () => {
    setStudyMode(true)
    setKnownCards(new Set())
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
        <p className="text-gray-600 dark:text-gray-400">Study with AI-generated flashcards from your notes</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Decks List */}
        <div className="w-full md:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Flashcard Decks</h2>
              <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                New Deck
              </button>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {decks.map(deck => (
                <div 
                  key={deck.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedDeck?.id === deck.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => handleDeckSelect(deck)}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{deck.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {deck.cardCount} cards • Created {formatDate(deck.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flashcard Viewer */}
        <div className="w-full md:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 h-full">
            {selectedDeck ? (
              <div className="p-6 flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedDeck.title}</h2>
                  {!studyMode && (
                    <button 
                      onClick={startStudyMode}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Study Mode
                    </button>
                  )}
                </div>

                <div className="w-full max-w-md">
                  <div 
                    className={`relative w-full h-64 cursor-pointer perspective-1000 ${isFlipped ? 'flipped' : ''}`}
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div className="absolute w-full h-64 preserve-3d transition-transform duration-500">
                      <div className="absolute w-full h-64 backface-hidden bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 flex items-center justify-center border border-gray-200 dark:border-gray-600">
                        <div className="text-center">
                          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Question</p>
                          <p className="text-xl font-medium text-gray-900 dark:text-white">
                            {selectedDeck.cards[currentCardIndex].front}
                          </p>
                        </div>
                      </div>
                      <div className="absolute w-full h-64 backface-hidden bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow-lg p-6 flex items-center justify-center border border-blue-200 dark:border-blue-700 rotate-y-180">
                        <div className="text-center">
                          <p className="text-blue-500 dark:text-blue-400 text-sm mb-2">Answer</p>
                          <p className="text-xl font-medium text-gray-900 dark:text-white">
                            {selectedDeck.cards[currentCardIndex].back}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Card {currentCardIndex + 1} of {selectedDeck.cards.length}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center space-x-4">
                    <button 
                      onClick={handlePrevCard}
                      disabled={currentCardIndex === 0}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {studyMode && (
                      <button 
                        onClick={markAsKnown}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        I Know This
                      </button>
                    )}
                    
                    <button 
                      onClick={handleNextCard}
                      disabled={currentCardIndex === selectedDeck.cards.length - 1}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>

                  {studyMode && (
                    <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                              {knownCards.size}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Progress</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {knownCards.size} of {selectedDeck.cards.length} cards marked as known
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No deck selected</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Select a flashcard deck from the list to start studying, or generate new flashcards from your notes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .flipped {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}

export default Flashcards