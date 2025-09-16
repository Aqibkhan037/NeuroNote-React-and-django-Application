// components/layout/MobileSidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }) => {
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
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 flex z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
          
          {/* Mobile sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
                  NN
                </div>
                <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">NeuroNote</h1>
              </div>
              
              <nav className="mt-8 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isCurrentPath(item.href)
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-4 text-lg">{item.icon}</span>
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
          
          <div className="flex-shrink-0 w-14"></div>
        </div>
      )}
    </>
  )
}

export default MobileSidebar