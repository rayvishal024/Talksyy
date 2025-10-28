import React from 'react'
import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'

import {Home, Login, Profile, AuthPage} from './index'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 md:p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App