import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Briefcase, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../components/firebase'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('labor');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Unique feature: Password visibility toggle
  const navigate = useNavigate();
  const { login, setLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      toast.success("User Successfully registered!!!",{
        position: 'top-right',
      });
      navigate('/');
      setLoggedIn('LoggedIn'); // Set global state
    } catch (error) {
      setError(error.message);
      console.log(error.msg);
      toast.success(error.message,{
        postion: 'top-right',
      });
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20 pb-20">
      {/* Scaled-out form container with subtle grey theme */}
      <div className="max-w-lg w-full space-y-8 bg-gray-100 p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-gray-900 animate-float" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded-lg border border-red-100">
              {error}
            </p>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Role Selection */}
            <div className="relative group">
              <label className="text-sm font-medium text-gray-700 block mb-2 transition-transform group-focus-within:translate-x-1">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('labor')}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                    role === 'labor'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-700'
                  } transition-all duration-300`}
                >
                  <User className="h-4 w-4 mr-2" />
                  Labor
                </button>
                <button
                  type="button"
                  onClick={() => setRole('contractor')}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                    role === 'contractor'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-700'
                  } transition-all duration-300`}
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Contractor
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2 transition-transform group-focus-within:translate-x-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500 transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 input-focus-effect hover:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input with Visibility Toggle */}
            <div className="relative group">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2 transition-transform group-focus-within:translate-x-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'} // Toggle password visibility
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-400 input-focus-effect hover:border-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded bg-white transition-colors hover:border-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:underline transition-all duration-300 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign in as {role === 'labor' ? 'Labor' : 'Contractor'}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" onClick={() => navigate('/signup')} className="font-medium text-blue-600 hover:underline transition-all duration-300 hover:text-blue-500">
              Sign up
            </a>
          </p>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}