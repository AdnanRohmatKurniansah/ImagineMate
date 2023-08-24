import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <div className='bg-[#f9fafe]'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/create_post' element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
