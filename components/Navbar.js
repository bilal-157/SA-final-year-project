"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setIsCartOpen(false);
    };

    window.addEventListener('routeChange', handleRouteChange);
    return () => window.removeEventListener('routeChange', handleRouteChange);
  }, []);

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white shadow-md' : 'py-4 bg-white/95 backdrop-blur-md'
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
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>

            {/* User Auth Section */}
            {isLoggedIn ? (
              <div className="relative group">
                <button className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center">
                  U
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800">
                    <i className="fas fa-user mr-2"></i> My Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800">
                    <i className="fas fa-box mr-2"></i> My Orders
                  </Link>
                  <button 
                    onClick={() => setIsLoggedIn(false)} 
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex space-x-3">
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-2 border-2 border-amber-800 text-amber-800 rounded-full hover:bg-amber-800 hover:text-white transition duration-300"
                >
                  Login
                </button>
                <button className="px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-700 transition duration-300">
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800 text-xl p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white shadow-lg transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
        }`}>
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {[
              { href: "/", text: "Home" },
              { href: "/featured", text: "Featured" },
              { href: "/products", text: "Products" },
              { href: "/about", text: "About" },
              { href: "/contact", text: "Contact" }
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
            <div className="flex space-x-3 pt-2">
              <button 
                onClick={() => setIsLoggedIn(true)}
                className="px-4 py-2 border-2 border-amber-800 text-amber-800 rounded-full hover:bg-amber-800 hover:text-white transition duration-300"
              >
                Login
              </button>
              <button className="px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-700 transition duration-300">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className={`h-${isScrolled ? '16' : '20'} transition-all duration-300`}></div>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 z-[60] ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">Your Cart</h3>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="text-gray-500 hover:text-amber-800 p-2"
            aria-label="Close cart"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div className="p-4 h-[calc(100%-60px)] overflow-y-auto">
          <p className="text-center text-gray-500 py-8">Your cart is empty</p>
        </div>
      </div>

      <style jsx>{`
        /* Animation for mobile menu */
        .mobile-menu-enter {
          max-height: 0;
        }
        .mobile-menu-enter-active {
          max-height: 100vh;
          transition: max-height 300ms ease-in-out;
        }
        .mobile-menu-exit {
          max-height: 100vh;
        }
        .mobile-menu-exit-active {
          max-height: 0;
          transition: max-height 300ms ease-in-out;
        }

        /* Ensure cart sidebar doesn't cause horizontal scroll */
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