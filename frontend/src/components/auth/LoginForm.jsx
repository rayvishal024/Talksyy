import React, {useState} from 'react'
import { LogIn, UserPlus, Mail, Key } from 'lucide-react';
import toast from 'react-hot-toast';
import { InputField } from '../../index.js'
import axios from 'axios';

const LoginForm = ({ switchToRegister }) => {
     
     // use state hooks for feild data --
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [isLoading, setIsLoading] = useState(false);

     // handle login form --
     const handleLogin = (e) => {
          e.preventDefault();

          if (!email || !password) {
               toast.error("Please enter both email and password.");
               return;
          }

          setIsLoading(true);

          // api call to backend --
          axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, { email, password })
               .then((response) => {

                    // reset the loading
                    setIsLoading(false);

                    // success response --
                    if (response.data.success === true) {
                         toast.success(response.data.message);
                         // now we have to navigate to user profile --

                         setTimeout(() => {
                              toast(`welcome ${response.data.user.name}`, {
                                   icon: '👏',
                              });
                         }, 2000);
                         

                    }
                    else {
                         toast.error(response.data.message);
                    }
               })
               .catch((error) => {
               
               })
          
     };


  return (
       <form onSubmit={handleLogin} className="w-full">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-400 mb-8">Log in to continue your conversations.</p>

            <InputField
                 label="Email Address"
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="Your email"
                 icon={Mail}
            />
            <InputField
                 label="Password"
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Your password"
                 icon={Key}
            />
            <button
                 type="submit"
                 disabled={isLoading}
                 className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-500 transition duration-200 shadow-xl shadow-indigo-900/50 disabled:bg-slate-600 disabled:shadow-none flex items-center justify-center mt-6"
            >
                 {isLoading ? 'Logging In...' : 'Log In'}
            </button>

            <div className="mt-8 text-center text-slate-400">
                 Don't have an account?{' '}
                 <button
                      type="button"
                      onClick={switchToRegister}
                      className="text-emerald-400 font-semibold hover:text-emerald-300 transition duration-150"
                 >
                      Register Now
                 </button>
            </div>
       </form>
  )
}

export default LoginForm