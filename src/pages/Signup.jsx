import React, { useState } from 'react';
import { Lock, Mail, User, UserPlus, Briefcase, HardHat, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { useAuth } from '../context/AuthContext';
import {auth ,db} from '../components/firebase'
import { setDoc, doc } from "firebase/firestore"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { login, setLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('labor');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db, "Users", user.uid), {
          email:user.email,
          fname:name,
          role:accountType,
        });
      }
      console.log("User Successfully registered!!!");
      toast.success("User Successfully registered!!!",{
        position: 'top-right',
      });
      auth.signOut();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
      toast.success(error.message,{
        postion: "bottom-center",
      });
    }


    // if (password !== confirmPassword) {
    //   setError('Passwords do not match');
    //   return;
    // }

    // if (password.length < 6) {
    //   setError('Password must be at least 6 characters long');
    //   return;
    // }

    // try {
    //   const userData = {
    //     name,
    //     email,
    //     password,
    //     accountType,
    //     createdAt: new Date().toISOString()
    //   };

    //   await signup(userData);
    //   navigate('/');
    //   setLoggedIn('LoggedIn'); // Set global state

    // } catch (err) {
    //   setError(err.message || 'An error occurred during signup');
    // }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStrength(calculatePasswordStrength(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4 pt-28 pb-20">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-blue-600 animate-float" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us today and get started
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
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
                    ? 'border-blue-600 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                } transition-all duration-300 flex flex-col items-center space-y-2`}
              >
                <HardHat className={`h-6 w-6 ${
                  accountType === 'labor' ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  accountType === 'labor' ? 'text-blue-600' : 'text-gray-700'
                }`}>Labor</span>
              </button>
              
              <button
                type="button"
                onClick={() => setAccountType('contractor')}
                className={`p-4 rounded-lg border ${
                  accountType === 'contractor'
                    ? 'border-blue-600 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                } transition-all duration-300 flex flex-col items-center space-y-2`}
              >
                <Briefcase className={`h-6 w-6 ${
                  accountType === 'contractor' ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  accountType === 'contractor' ? 'text-blue-600' : 'text-gray-700'
                }`}>Contractor</span>
              </button>
            </div>

            <div className="relative group">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-2 transition-transform group-focus-within:translate-x-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 hover:border-gray-400"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2 transition-transform group-focus-within:translate-x-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 hover:border-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2 transition-transform group-focus-within:translate-x-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 hover:border-gray-400"
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    passwordStrength === 0 ? 'bg-red-500' :
                    passwordStrength === 1 ? 'bg-yellow-500' :
                    passwordStrength === 2 ? 'bg-yellow-300' :
                    passwordStrength === 3 ? 'bg-green-400' :
                    'bg-green-600'
                  }`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-2 transition-transform group-focus-within:translate-x-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 transition-transform group-focus-within:scale-110" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 hover:border-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="opacity-0 absolute h-4 w-4"
              />
              <div className="bg-white border-2 rounded-md w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500 transition-all duration-300">
                <Check className="hidden w-3 h-3 text-blue-600 pointer-events-none" />
              </div>
            </div>
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create {accountType === 'labor' ? 'Labor' : 'Contractor'} Account
          </button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <img className="h-5 w-5" src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                <img className="h-5 w-5" src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" alt="Facebook" />
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="font-medium text-blue-600 hover:text-blue-500 transition-all duration-300"
            >
              Sign in
            </button>
          </p>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}