"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState('login');
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize cart and listen for updates
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(cart);
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    // Initial load
    updateCart();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const cartSidebar = document.querySelector('.cart-sidebar');
      const cartButton = document.querySelector('.cart-button');

      if (isCartOpen && cartSidebar && !cartSidebar.contains(event.target) &&
        cartButton && !cartButton.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  // Auth functions
  const switchAuthTab = (tab) => setActiveAuthTab(tab);

  const openAuthModal = (type) => {
    setActiveAuthTab(type);
    type === 'login' ? (setIsLoginOpen(true), setIsSignupOpen(false)) : (setIsSignupOpen(true), setIsLoginOpen(false));
    setIsMenuOpen(false); // Close mobile menu when opening auth modal
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const handleAuthSubmit = async (e, action) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // For signup, check if passwords match
    if (action === 'signup' && data.password !== data.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          action: action // 'login' or 'signup'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      if (action === 'login') {
        // Store the token and user data
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        // Update login state
        setIsLoggedIn(true);
        // Close the modal
        setIsLoginOpen(false);
        setIsSignupOpen(false);
      } else {
        // For signup, switch to login tab
        switchAuthTab('login');
        // Show success message
        alert('Account created successfully! Please login.');
      }
    } catch (error) {
      alert(error.message);
      console.error('Authentication error:', error);
    }
  };

  // Cart functions
  const updateItemQuantity = (id, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-white shadow-md' : 'py-4 bg-white/95 backdrop-blur-md'
        }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center text-2xl font-bold">
            <span className="text-amber-800 mr-2"><i className="fas fa-hands-helping"></i></span>
            <span className="text-amber-800">Artisan</span>
            <span className="text-gray-800">Collection</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {[
              { href: "/", text: "Home" },
              { href: "/Featured", text: "Featured" },
              { href: "/Products", text: "Products" },
              { href: "/About", text: "About" },
              { href: "/Contact", text: "Contact" }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:text-amber-800 transition duration-300 relative group"
              >
                {link.text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="cart-button relative text-gray-800 hover:text-amber-800 transition duration-300 p-2"
              aria-label="Cart"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Auth Section - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="relative group">
                  <button className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center">
                    <i className="fas fa-user"></i>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-300">
                    <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800">
                      <i className="fas fa-user mr-2"></i> My Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800">
                      <i className="fas fa-box mr-2"></i> My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="px-4 py-2 border-2 border-amber-800 text-amber-800 rounded-full hover:bg-amber-800 hover:text-white transition duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-700 transition duration-300"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-12 h-12 rounded-md bg-amber-800 hover:bg-amber-700 text-white transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="space-y-1.5 w-6">
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
          }`}>
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {[
              { href: "/", text: "Home" },
              { href: "/Featured", text: "Featured" },
              { href: "/Products", text: "Products" },
              { href: "/About", text: "About" },
              { href: "/Contact", text: "Contact" }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:text-amber-800 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            {isLoggedIn ? (
              <div className="pt-2 space-y-3">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-user mr-2"></i> My Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-box mr-2"></i> My Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800 rounded-lg"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 border-2 border-amber-800 text-amber-800 rounded-full hover:bg-amber-800 hover:text-white transition duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-700 transition duration-300"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className={`h-${isScrolled ? '16' : '20'} transition-all duration-300`}></div>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 z-[60] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">Your Cart ({cartCount})</h3>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-amber-800 p-2"
            aria-label="Close cart"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="p-4 h-[calc(100%-180px)] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Your cart is empty</p>
              <Link
                href="/Products"
                className="mt-4 inline-block px-6 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-700 transition"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start border-b pb-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded"
                      unoptimized={true}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-amber-800 font-semibold">SLL {item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="mx-3 w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 p-2"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-amber-800 font-bold">SLL {calculateTotal()}</span>
            </div>
            <Link
              href="/Checkout"
              className="block w-full bg-amber-800 hover:bg-amber-700 text-white text-center py-3 rounded-full font-medium transition"
              onClick={() => setIsCartOpen(false)}
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {(isLoginOpen || isSignupOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 font-medium text-lg transition-colors ${activeAuthTab === 'login'
                    ? 'text-amber-800 border-b-2 border-amber-800'
                    : 'text-gray-500 hover:text-amber-700'
                  }`}
                onClick={() => switchAuthTab('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 py-4 font-medium text-lg transition-colors ${activeAuthTab === 'signup'
                    ? 'text-amber-800 border-b-2 border-amber-800'
                    : 'text-gray-500 hover:text-amber-700'
                  }`}
                onClick={() => switchAuthTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Login Form */}
              {activeAuthTab === 'login' && (
                <>
                  <div className="mb-1 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                      <i className="fas fa-user text-amber-800 text-2xl"></i>
                    </div>
                  </div>
                  <h3 className="text-center text-xl font-semibold mb-6">Welcome Back</h3>
                  <form onSubmit={(e) => handleAuthSubmit(e, 'login')}>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="login-email">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-envelope text-gray-400"></i>
                        </div>
                        <input
                          id="login-email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2" htmlFor="login-password">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-lock text-gray-400"></i>
                        </div>
                        <input
                          id="login-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <a href="/Contact" className="text-sm text-amber-700 hover:text-amber-800">
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center"
                    >
                      <i className="fas fa-sign-in-alt mr-2"></i> Login
                    </button>
                  </form>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => switchAuthTab('signup')}
                      className="text-amber-700 hover:text-amber-800 font-medium"
                    >
                      Sign up
                    </button>
                  </div>
                </>
              )}

              {/* Signup Form */}
              {activeAuthTab === 'signup' && (
                <>
                  <div className="mb-1 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                      <i className="fas fa-user-plus text-amber-800 text-2xl"></i>
                    </div>
                  </div>
                  <h3 className="text-center text-xl font-semibold mb-6">Create Account</h3>
                  <form onSubmit={(e) => handleAuthSubmit(e, 'signup')}>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="signup-name">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-user text-gray-400"></i>
                        </div>
                        <input
                          id="signup-name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="signup-email">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-envelope text-gray-400"></i>
                        </div>
                        <input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="signup-password">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-lock text-gray-400"></i>
                        </div>
                        <input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2" htmlFor="signup-confirm-password">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-lock text-gray-400"></i>
                        </div>
                        <input
                          id="signup-confirm-password"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6 flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        I agree to the <a href="#" className="text-amber-700 hover:text-amber-800">Terms</a> and <a href="#" className="text-amber-700 hover:text-amber-800">Privacy Policy</a>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center"
                    >
                      <i className="fas fa-user-plus mr-2"></i> Create Account
                    </button>
                  </form>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={() => switchAuthTab('login')}
                      className="text-amber-700 hover:text-amber-800 font-medium"
                    >
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                setIsLoginOpen(false);
                setIsSignupOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 767px) {
          .cart-sidebar {
            width: 100vw;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;