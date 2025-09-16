// components/ui/LoadingButton.jsx
import LoadingSpinner from './LoadingSpinner'

const LoadingButton = ({ 
  loading = false, 
  children, 
  className = '', 
  disabled = false,
  ...props 
}) => {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center ${className} ${(loading || disabled) ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading && <LoadingSpinner size="small" className="mr-2" />}
      {children}
    </button>
  )
}

export default LoadingButton