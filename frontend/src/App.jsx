import { Navigate, Route, Routes, useAsyncValue } from "react-router-dom"
import FloatingShape from "./components/FloatingShape"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore.js"
import { useEffect } from "react"
import Dashboard from "./pages/Dashboard.jsx"

const ProtectedRoute = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();
  if(!isAuthenticated ) {
    return <Navigate to="/login" replace />
  }
  if(!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }
  return children; //return currentpage if not verified
}

const RedirectAutheticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();
  if(isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }
  return children; //return currentpage if not verified
}

function App() {
  const { isCheckingAuth, checkAuth, isAutheticated, user} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-gray-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/login' element={<RedirectAutheticatedUser><Login/></RedirectAutheticatedUser>} />
        <Route path='/signup' element={<RedirectAutheticatedUser><Signup/></RedirectAutheticatedUser>} />
        <Route path='/verify-email' element={<EmailVerificationPage/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
