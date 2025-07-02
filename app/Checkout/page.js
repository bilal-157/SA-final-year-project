'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment submitted! This is a demo UI only.');
    localStorage.removeItem('cart');
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="font-serif">
      <Navbar />
      <main className="bg-amber-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-center text-amber-800 mb-8">Checkout</h1>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
              {/* Cart Summary */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-amber-800">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t pt-4 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-amber-800">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <div>
                  <label className="block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    placeholder="1234 5678 9012 3456"
                    value={form.cardNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block mb-1 font-medium">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      required
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-1 font-medium">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      required
                      placeholder="123"
                      value={form.cvv}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-800 hover:bg-amber-700 text-white py-2 rounded-md font-semibold transition"
                >
                  Pay ${totalAmount.toFixed(2)}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
