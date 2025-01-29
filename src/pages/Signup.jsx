import React, { useState } from 'react';
import { Lock, Mail, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate(); // Initialize navigation

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-28">
      <div className="max-w-md w-full space-y-8 bg-black p-8 rounded-xl shadow-2xl border border-white">
        {/* Header */}
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-white" />
          <h2 className="mt-6 text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-sm text-white">
            Join us today and get started
          </p>
        </div>

        {/* Signup Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name Input */}
            <div className="relative">
              <label htmlFor="name" className="text-sm font-medium text-white block mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white bg-black rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-colors text-white placeholder-white/60"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium text-white block mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white bg-black rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-colors text-white placeholder-white/60"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-white block mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white bg-black rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-colors text-white placeholder-white/60"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-white block mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white bg-black rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-colors text-white placeholder-white/60"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-white focus:ring-white border-white rounded bg-black"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-white">
              I agree to the{' '}
              <a href="#" className="font-medium text-white hover:underline transition-colors">
                Terms and Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-white rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black transition-colors"
          >
            Create Account
          </button>

          {/* Sign in link */}
          <p className="mt-4 text-center text-sm text-white">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="font-medium text-white hover:underline transition-colors"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
