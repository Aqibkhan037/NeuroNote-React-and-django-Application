// Update components/layout/Sidebar.jsx to support custom logo
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Sidebar = () => {
  const location = useLocation()
  const { currentUser } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Upload Notes', href: '/upload', icon: '📤' },
    { name: 'My Notes', href: '/notes', icon: '📝' },
    { name: 'Summaries', href: '/summaries', icon: '📋' },
    { name: 'Flashcards', href: '/flashcards', icon: '🔖' },
    { name: 'Quizzes', href: '/quizzes', icon: '🧠' },
  ]

  const isCurrentPath = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        {/* Logo Section - Replace with your custom logo */}
        <div className="flex items-center flex-shrink-0 px-4">
          {/* Use your custom logo image */}
          <img 
            src="/images/neuronote-logo.png" 
            alt="NeuroNote" 
            className="h-8 w-auto"
            onError={(e) => {
              // Fallback to text if image fails to load
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          {/* Fallback logo */}
          <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold" style={{ display: 'none' }}>
            NN
          </div>
          <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">NeuroNote</h1>
        </div>
        
        <nav className="mt-8 flex-1 px-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isCurrentPath(item.href)
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="w-full">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              {currentUser?.plan === 'free' ? 'Free Plan' : 'Premium Plan'}
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
              {currentUser?.uploadsUsed} of {currentUser?.uploadsLimit} uploads used
            </p>
            <div className="mt-2 w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(currentUser?.uploadsUsed / currentUser?.uploadsLimit) * 100}%` }}
              ></div>
            </div>
            {currentUser?.plan === 'free' && (
              <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded-md text-xs font-medium transition-colors">
                Upgrade Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar