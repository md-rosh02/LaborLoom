import React, { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-20">
      <div className="max-w-md w-full space-y-8 bg-black p-8 rounded-xl shadow-2xl border border-white/50 hover:border-white transition-colors duration-300 container-pulse">
        {/* Header */}
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-white animate-float" />
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-white/80">
            Please sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <label htmlFor="email" className="text-sm font-medium text-white block mb-2 transition-transform group-focus-within:translate-x-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/50 bg-black rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 text-white placeholder-white/60 input-focus-effect hover:border-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label htmlFor="password" className="text-sm font-medium text-white block mb-2 transition-transform group-focus-within:translate-x-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/50 bg-black rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 text-white placeholder-white/60 input-focus-effect hover:border-white"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-white focus:ring-white border-white/50 rounded bg-black transition-colors hover:border-white"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-white hover:underline transition-all duration-300 hover:text-white/80">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-white rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign in
          </button>

          {/* Sign up link */}
          <p className="mt-4 text-center text-sm text-white/80">
            Don't have an account?{' '}
            <a href="#" onClick={() => navigate('/signup')} className="font-medium text-white hover:underline transition-all duration-300 hover:text-white/80">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;