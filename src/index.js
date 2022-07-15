import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Login from './routes/Login'
import Note from './routes/Note'
import AppBar from './Components/AppBar'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/notes' element={<App />}>
      </Route>
        <Route path='/notes/:noteId' element={<Note />} />

      <Route path='user' element={<AppBar />}>
      </Route>
      <Route path='logUp' element={<Login action={'Registrarse'}/>} />
      <Route path='login' element={<Login action={'Iniciar Sesión'}/>} />
    </Routes>
  </BrowserRouter>
)

reportWebVitals(console.log())
