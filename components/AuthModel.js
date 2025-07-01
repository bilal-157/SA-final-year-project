import { useState } from 'react';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl transform transition-all">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 font-medium ${activeTab === 'login' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-4 font-medium ${activeTab === 'signup' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-gray-500'}`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'login' ? (
            <form>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="login-email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="login-password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="login-password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-800 hover:bg-amber-700 text-white rounded-md font-medium transition duration-300 mb-4"
              >
                Login
              </button>
              <p className="text-center text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="text-amber-800 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            </form>
          ) : (
            <form>
              <div className="mb-4">
                <label htmlFor="signup-name" className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="signup-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="signup-email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="signup-password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Create a password"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="signup-confirm" className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="signup-confirm"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-800 hover:bg-amber-700 text-white rounded-md font-medium transition duration-300 mb-4"
              >
                Sign Up
              </button>
              <p className="text-center text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-amber-800 font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;