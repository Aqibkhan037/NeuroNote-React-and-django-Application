// pages/Summaries.jsx
import { useState, useEffect } from 'react'

const Summaries = () => {
  const [summaries, setSummaries] = useState([])
  const [selectedSummary, setSelectedSummary] = useState(null)

  // Mock data - will be replaced with API calls
  useEffect(() => {
    setSummaries([
      { 
        id: 1, 
        title: 'Biology - Cell Structure Summary', 
        date: '2023-06-16',
        originalNote: 'Biology - Cell Structure',
        content: 'Cells are the basic building blocks of all living things. The human body is composed of trillions of cells. They provide structure for the body, take in nutrients from food, convert those nutrients into energy, and carry out specialized functions. Cells also contain the body\'s hereditary material and can make copies of themselves.\n\nCells have many parts, each with a different function. Some of these parts, called organelles, are specialized structures that perform certain tasks within the cell. Human cells contain the following major parts:\n\n- Cytoplasm: The fluid inside the cell where organelles are suspended\n- Nucleus: Controls cell activities and contains DNA\n- Mitochondria: Produce energy for the cell\n- Endoplasmic reticulum: Synthesizes proteins and lipids\n- Golgi apparatus: Modifies, sorts, and packages proteins\n- Ribosomes: Synthesize proteins\n- Cell membrane: Regulates what enters and leaves the cell'
      },
      { 
        id: 2, 
        title: 'History - World War II Summary', 
        date: '2023-06-11',
        originalNote: 'History - World War II',
        content: 'World War II was a global war that lasted from 1939 to 1945. It involved the vast majority of the world\'s countries—including all the great powers—forming two opposing military alliances: the Allies and the Axis.\n\nThe war is generally considered to have begun on 1 September 1939, when Nazi Germany, under Adolf Hitler, invaded Poland. The United Kingdom and France subsequently declared war on Germany on 3 September.\n\nUnder the Molotov–Ribbentrop Pact of August 1939, Germany and the Soviet Union had partitioned Poland and marked out their "spheres of influence" across Finland, Estonia, Latvia, Lithuania, and Romania. From late 1939 to early 1941, in a series of campaigns and treaties, Germany conquered or controlled much of continental Europe, and formed the Axis alliance with Italy and Japan.\n\nThe war ended with the capture of Berlin by Soviet and Polish troops and the subsequent German unconditional surrender on 8 May 1945. The war against Japan ended with the atomic bombings of Hiroshima and Nagasaki, and it formally ended on 2 September 1945.'
      }
    ])
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Summaries</h1>
        <p className="text-gray-600 dark:text-gray-400">AI-generated summaries of your study materials</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Summaries List */}
        <div className="w-full md:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">All Summaries</h2>
              <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                New Summary
              </button>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {summaries.map(summary => (
                <div 
                  key={summary.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedSummary?.id === summary.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => setSelectedSummary(summary)}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{summary.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      From: {summary.originalNote}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Generated {formatDate(summary.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Detail */}
        <div className="w-full md:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 h-full">
            {selectedSummary ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSummary.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Generated from {selectedSummary.originalNote} on {formatDate(selectedSummary.date)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-96 overflow-y-auto">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedSummary.content}
                  </p>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Export as PDF
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Generate Flashcards
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No summary selected</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Select a summary from the list to view its content, or generate a new one from your notes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summaries