import React, { useState } from 'react';
import { Lock, Mail, User, UserPlus, Briefcase, HardHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('labor');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        accountType,
        createdAt: new Date().toISOString()
      };

      await signup(userData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-28 pb-20">
      <div className="max-w-md w-full space-y-8 bg-black p-8 rounded-xl shadow-2xl border border-white/50 hover:border-white transition-colors duration-300 container-pulse">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-white animate-float" />
          <h2 className="mt-6 text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-sm text-white/80">
            Join us today and get started
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-500 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Account Type Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAccountType('labor')}
                className={`p-4 rounded-lg border ${
                  accountType === 'labor'
                    ? 'border-white bg-white/10'
                    : 'border-white/50'
                } transition-all duration-300 flex flex-col items-center space-y-2 hover:border-white`}
              >
                <HardHat className={`h-6 w-6 ${
                  accountType === 'labor' ? 'text-white' : 'text-white/70'
                }`} />
                <span className={`text-sm font-medium ${
                  accountType === 'labor' ? 'text-white' : 'text-white/70'
                }`}>Labor</span>
              </button>
              
              <button
                type="button"
                onClick={() => setAccountType('contractor')}
                className={`p-4 rounded-lg border ${
                  accountType === 'contractor'
                    ? 'border-white bg-white/10'
                    : 'border-white/50'
                } transition-all duration-300 flex flex-col items-center space-y-2 hover:border-white`}
              >
                <Briefcase className={`h-6 w-6 ${
                  accountType === 'contractor' ? 'text-white' : 'text-white/70'
                }`} />
                <span className={`text-sm font-medium ${
                  accountType === 'contractor' ? 'text-white' : 'text-white/70'
                }`}>Contractor</span>
              </button>
            </div>

            <div className="relative group">
              <label htmlFor="name" className="text-sm font-medium text-white block mb-2 transition-transform group-focus-within:translate-x-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/50 bg-black rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 text-white placeholder-white/60 input-focus-effect hover:border-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

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

            <div className="relative group">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-white block mb-2 transition-transform group-focus-within:translate-x-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/50 bg-black rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 text-white placeholder-white/60 input-focus-effect hover:border-white"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-white focus:ring-white border-white/50 rounded bg-black transition-colors hover:border-white"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-white">
              I agree to the{' '}
              <a href="#" className="font-medium text-white hover:underline transition-colors">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-white rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create {accountType === 'labor' ? 'Labor' : 'Contractor'} Account
          </button>

          <p className="mt-4 text-center text-sm text-white/80">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="font-medium text-white hover:underline transition-all duration-300 hover:text-white/80"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}