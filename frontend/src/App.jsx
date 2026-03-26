import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login  from './pages/login'
import Register from './pages/Register'
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Home</div>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<div>Dashboard</div>}/>
        <Route path='/trades' element={<div>Trades</div>}/>
        <Route path='/ai-insights' element={<div>AI Insights</div>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App