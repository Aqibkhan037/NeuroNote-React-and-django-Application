import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import MobileSidebar from './components/layout/MobileSidebar'
import Dashboard from './pages/Dashboard'
import UploadNotes from './pages/UploadNotes'
import NotesViewer from './pages/NoteViewer'
import Summaries from './pages/Summaries'
import Flashcards from './pages/Flashcards'
import Quizzes from './pages/Quizzes'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Settings from './pages/Settings'
import LoadingSpinner from './components/ui/LoadingSpinner'

import './App.css'

function App() {

   const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a dark mode preference in localStorage
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })

  // Update localStorage when dark mode changes
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
  }

  return (
       <div className={`h-screen flex flex-col ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <AuthProvider>
        <Router>
          <div className="flex flex-1 h-full">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
              <Sidebar />
            </div>
            
            {/* Mobile Sidebar */}
            <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            {/* Main Content - Adjusted for proper spacing */}
            <div className="flex flex-col flex-1 md:ml-64">
              <Navbar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode} 
              />
              
              <main className="flex-1 p-6 overflow-auto">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/upload" element={
                    <ProtectedRoute>
                      <UploadNotes />
                    </ProtectedRoute>
                  } />
                  <Route path="/notes" element={
                    <ProtectedRoute>
                      <NotesViewer />
                    </ProtectedRoute>
                  } />
                  <Route path="/summaries" element={
                    <ProtectedRoute>
                      <Summaries />
                    </ProtectedRoute>
                  } />
                  <Route path="/flashcards" element={
                    <ProtectedRoute>
                      <Flashcards />
                    </ProtectedRoute>
                  } />
                  <Route path="/quizzes" element={
                    <ProtectedRoute>
                      <Quizzes />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
