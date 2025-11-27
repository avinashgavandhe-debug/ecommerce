import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import UserDetails from './components/UserDetails'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile/:id' element={<UserDetails/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default App