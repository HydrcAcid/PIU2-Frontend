import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Board from './pages/Board.jsx'
import NotFound from './pages/NotFound.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/board/:boardId" element={<Board />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
)
