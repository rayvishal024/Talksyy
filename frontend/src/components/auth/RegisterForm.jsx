import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {  UserPlus, Mail, Key } from 'lucide-react';
import { InputField } from '../../index.js'
import axios from 'axios';

const RegisterForm = ({ switchToLogin }) => {

     // useState hooks --
     const [step, setStep] = useState(1);
     const [email, setEmail] = useState('');
     const [name, setName] = useState('');
     const [password, setPassword] = useState('');
     const [otp, setOtp] = useState('');
     const [isLoading, setIsLoading] = useState(false);


     // Handle otp form 
     const handleSendOTP = async (e) => {
          e.preventDefault();

          // check email
          if (!email) {
               toast.error("Please enter a valid email address.");
               return;
          }

          setIsLoading(true);
          axios.post(`${import.meta.env.VITE_BASE_URL}/otp/send-otp`, { email })
               .then((response) => {
                    setIsLoading(false);
                    if (response.data.success === true) {
                         toast.success(response.data.message)
                         setStep(2);
                    }
                    else {
                         toast.error(response.data.message)
                         setEmail('')
                    }

               })
               .catch((error) => {
                    console.log(error)
                    toast.error("Something went wrong")
               })
     };

     // habdle register form 
     const handleRegister = (e) => {
          e.preventDefault();


          if (!name || !password || !otp) {
               toast.error("Please fill all fields.");
               return;
          }

          // validating password
          if (password.length < 8) {
               toast.error("Password atleast 8 character");
               return;
          }

          setIsLoading(true);

          axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, { name, email, otp, password })
               .then((response) => {
                   
                    setIsLoading(false);

                    if (response.data.success === true) {
                         toast.success(response.data.message);
                         switchToLogin();
                    }
                    else {
                         toast.error(response.data.message)
                    }
               })
               .catch((error) => {
                    console.log(error)
                    toast.error("Something went wrong")
          })
     };



     return (
          <form onSubmit={step === 1 ? handleSendOTP : handleRegister} className="w-full">
               <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
               <p className="text-slate-400 mb-8">Join Talksyy to start collaborating.</p>

               {/* STEP 1: Email and Send OTP */}
               {step === 1 && (
                    <div>
                         <InputField
                              label="Email Address"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                              icon={Mail}
                         />
                         <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full bg-emerald-600 text-white p-3 rounded-lg font-semibold hover:bg-emerald-500 transition duration-200 shadow-xl shadow-emerald-900/50 disabled:bg-slate-600 disabled:shadow-none flex items-center justify-center"
                         >
                              {isLoading ? 'Sending OTP...' : 'Send OTP'}
                         </button>
                    </div>
               )}

               {/* STEP 2: Name, Email, Password, OTP */}
               {step === 2 && (
                    <div className="space-y-4">
                         <InputField
                              label="Email Address (Locked)"
                              type="email"
                              value={email}
                              disabled={true}
                              icon={Mail}
                         />
                         <InputField
                              label="Verification Code (OTP)"
                              type="text"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="Enter 6-digit code"
                              icon={Key}
                         />
                         <InputField
                              label="Full Name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your Name"
                              icon={UserPlus}
                         />
                         <InputField
                              label="Password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Min 8 characters"
                              icon={Key}
                         />
                         <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-500 transition duration-200 shadow-xl shadow-indigo-900/50 disabled:bg-slate-600 flex items-center justify-center mt-6"
                         >
                              {isLoading ? 'Registering...' : 'Register Account'}
                         </button>
                    </div>
               )}

               <div className="mt-8 text-center text-slate-400">
                    Already have an account?{' '}
                    <button
                         type="button"
                         onClick={switchToLogin}
                         className="text-indigo-400 font-semibold hover:text-indigo-300 transition duration-150"
                    >
                         Log In
                    </button>
               </div>
          </form>
     )
}

export default RegisterForm