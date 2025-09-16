// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import PageLoading from '../components/ui/PageLoading'
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock login function - will be replaced with actual authentication
  const login = async (email, password) => {
    try {
      // This would be an API call in a real application
      const user = { 
        id: '1', 
        email, 
        name: 'Demo User', 
        plan: 'free', 
        uploadsUsed: 3,
        uploadsLimit: 5
      }
      setCurrentUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Mock signup function
  const signup = async (name, email, password) => {
    try {
      // This would be an API call in a real application
      const user = { 
        id: '1', 
        email, 
        name, 
        plan: 'free', 
        uploadsUsed: 0,
        uploadsLimit: 5
      }
      setCurrentUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
  }

  // Check if user is logged in on app load
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}