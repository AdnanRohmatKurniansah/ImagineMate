import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import GenerateImg from './pages/GenerateImg'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import History from './pages/History'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className='bg-[#fcfcfd]'>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/create_post' element={<ProtectedRoute><GenerateImg /></ProtectedRoute>} />
          <Route path='/history' element={<ProtectedRoute><History /></ProtectedRoute>}/>
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
