import React from 'react'
import { useState } from 'react'
import {LoginForm, RegisterForm} from '../index.js'

function AuthPage() {
    
  // hooks for login or registation component
  const [isLoginMode, setIsLoginMode] = useState();

  // methode to switch to login
  const switchToLogin = () => {
    setIsLoginMode(true);
  }

  // methode to switch register
  const switchToRegister = () => {
    setIsLoginMode(false);
  }

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center py-8">
      <div className="max-w-4xl w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
      
        {/* Left Side: Branding and Logo */}
        <div className="md:w-1/2 p-8 md:p-12 bg-indigo-700 bg-opacity-80 backdrop-blur-sm flex flex-col justify-center items-center text-center text-white relative overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
        
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-500 to-sky-500"></div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mb-4 z-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Custom logo representing conversation/speech */}
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <path d="M8 10h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M16 10h.01"></path>
          </svg>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 z-10 tracking-wider">
            Talksyy
          </h1>
          <p className="text-indigo-100 z-10 text-lg font-light">
            Seamlessly connect, communicate, and create.
          </p>
        </div>

        {/* Right Side: Login/Register Forms */}
        <div className="md:w-1/2 p-6 md:p-10 flex items-center justify-center">
          
          {/* switch to form based on selected mode */}
          {isLoginMode ? (
            <LoginForm switchToRegister={switchToRegister} />
          ) : (
            <RegisterForm switchToLogin={switchToLogin} />
          )}
        </div>
     </div>
      
    </div>
  )
}

export default AuthPage