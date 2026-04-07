import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login  from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Trades from './pages/Trades'
import AiInsights from './pages/AIInsights'
import ProtectedRoute from './components/ProtectedRoute'
import AuthSuccess from './pages/AuthSuccess'
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/auth/success' element={<AuthSuccess />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path='/trades' element={
          <ProtectedRoute>
            <div><Trades/></div>
          </ProtectedRoute>
        }/>
        <Route path='/ai-insights' element={
          <ProtectedRoute>
            <div><AiInsights/></div>
          </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App