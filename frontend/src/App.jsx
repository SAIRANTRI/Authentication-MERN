import { Route, Routes } from "react-router-dom"
import FloatingShape from "./components/FloatingShape"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx"

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-gray-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

      <Routes>
        <Route path='/' element={"Home"} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/verify-email' element={<EmailVerificationPage/>} />
      </Routes>
    </div>
  )
}

export default App
