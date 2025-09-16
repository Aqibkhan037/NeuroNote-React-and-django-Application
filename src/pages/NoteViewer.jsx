// pages/NotesViewer.jsx
import { useState, useEffect } from 'react'

const NotesViewer = () => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)

  // Mock data - will be replaced with API calls
  useEffect(() => {
    setNotes([
      { id: 1, title: 'Biology - Cell Structure', date: '2023-06-15', type: 'pdf', size: '2.4 MB' },
      { id: 2, title: 'History - World War II', date: '2023-06-10', type: 'docx', size: '1.2 MB' },
      { id: 3, title: 'Mathematics - Calculus', date: '2023-06-05', type: 'pdf', size: '3.1 MB' },
      { id: 4, title: 'Chemistry - Organic Compounds', date: '2023-05-28', type: 'pdf', size: '2.8 MB' },
      { id: 5, title: 'Physics - Quantum Mechanics', date: '2023-05-20', type: 'docx', size: '1.7 MB' }
    ])
  }, [])

  const handleNoteSelect = (note) => {
    setSelectedNote(note)
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Notes</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage your uploaded study materials</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Notes List */}
        <div className="w-full md:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">All Notes</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notes.map(note => (
                <div 
                  key={note.id} 
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedNote?.id === note.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => handleNoteSelect(note)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      {note.type === 'pdf' ? (
                        <span className="text-red-500 text-xl">📄</span>
                      ) : (
                        <span className="text-blue-500 text-xl">📝</span>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{note.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Uploaded {formatDate(note.date)} • {note.size}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note Detail */}
        <div className="w-full md:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 h-full">
            {selectedNote ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedNote.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Uploaded {formatDate(selectedNote.date)} • {selectedNote.size}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto">
                  <p className="text-gray-700 dark:text-gray-300">
                    This is a preview of the note content. In the actual application, this would display the extracted text from your uploaded document.
                    The AI would process this content to generate summaries, flashcards, and quizzes to help you study more effectively.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    For PDF and DOCX files, NeuroNote extracts the text and uses natural language processing to identify key concepts, definitions, and important information.
                  </p>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Generate Summary
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Create Flashcards
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Generate Quiz
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Select a note</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Choose a note from the list to view its details and generate study materials.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotesViewer