import React from 'react'
import { Route } from 'react-router'
import {  Routes } from 'react-router'
import {Home, Login, Profile} from './index'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App