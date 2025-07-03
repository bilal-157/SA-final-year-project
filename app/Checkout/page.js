'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaInfoCircle, FaMobileAlt, FaCheck, FaCheckCircle, FaCloudUploadAlt } from 'react-icons/fa';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    orangeNumber: '',
    transactionId: ''
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted! This is a demo UI only.');
    localStorage.removeItem('cart');
    nextStep(); // Move to confirmation step
  };

  return (
    <div className="font-serif">
      <Navbar />
      <main className="bg-amber-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-center text-amber-800 mb-8">Checkout</h1>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Cart Summary - Always visible */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-amber-800">SLL{(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t pt-4 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-amber-800">SLL{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Steps */}
              {currentStep === 1 && (
                <div>
                  <div className="flex justify-between mb-8">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">1</div>
                      <div className="text-sm font-medium mt-1">Information</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center relative">
                      <div className="absolute w-full h-1 bg-gray-200">
                        <div className="h-1 bg-orange-500 w-0"></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">2</div>
                      <div className="text-sm text-gray-500 mt-1">Payment</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center relative">
                      <div className="absolute w-full h-1 bg-gray-200">
                        <div className="h-1 bg-gray-200 w-0"></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">3</div>
                      <div className="text-sm text-gray-500 mt-1">Confirmation</div>
                    </div>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (Optional)</label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      ></textarea>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-md">
                      <h4 className="flex items-center text-sm font-medium text-orange-800 mb-2">
                        <FaInfoCircle className="mr-2" /> Important Payment Information
                      </h4>
                     <p className="text-xs text-orange-700">
  We accept payments via Orange Money. After completing your order information, you&apos;ll receive payment instructions on the next screen.
</p>

                    </div>
                  </form>

                  <div className="flex justify-between mt-6">
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Previous
                    </button>
                    <button
                      onClick={nextStep}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <div className="flex justify-between mb-8">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                        <FaCheck />
                      </div>
                      <div className="text-sm font-medium mt-1">Information</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center relative">
                      <div className="absolute w-full h-1 bg-gray-200">
                        <div className="h-1 bg-orange-500 w-full"></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">2</div>
                      <div className="text-sm font-medium mt-1">Payment</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center relative">
                      <div className="absolute w-full h-1 bg-gray-200">
                        <div className="h-1 bg-gray-200 w-0"></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">3</div>
                      <div className="text-sm text-gray-500 mt-1">Confirmation</div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-orange-50 p-4 rounded-md">
                      <h4 className="flex items-center text-sm font-medium text-orange-800 mb-2">
                        <FaMobileAlt className="mr-2" /> How to Pay with Orange Money
                      </h4>
                      <ol className="list-decimal list-inside text-xs text-orange-700 space-y-1">
                        <li>Dial <strong>#144#</strong> on your Orange mobile phone</li>
                        <li>Select <strong>Payment</strong> from the menu</li>
                        <li>Enter our merchant code: <strong>ARTISAN123</strong></li>
                        <li>Enter the total amount shown below</li>
                        <li>Confirm the transaction with your PIN</li>
                      </ol>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount to Pay</label>
                      <input
                        type="text"
                        value={`SLL${totalAmount.toFixed(2)}`}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-bold text-orange-500 bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Orange Money Number</label>
                      <input
                        type="tel"
                        name="orangeNumber"
                        value={form.orangeNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. 0777123456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID (Optional)</label>
                      <input
                        type="text"
                        name="transactionId"
                        value={form.transactionId}
                        onChange={handleInputChange}
                        placeholder="If you have a transaction reference"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
                      onClick={() => document.getElementById('receiptFile').click()}
                    >
                      <input 
                        type="file" 
                        id="receiptFile" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileUpload}
                      />
                      {receiptPreview ? (
                        <img 
                          src={receiptPreview} 
                          alt="Receipt Preview" 
                          className="max-h-40 mx-auto mb-2"
                        />
                      ) : (
                        <>
                          <div className="text-orange-500 text-2xl mb-2">
                            <FaCloudUploadAlt />
                          </div>
                          <p className="font-medium">Upload Payment Screenshot</p>
                          <small className="text-gray-500">Click to upload or drag & drop</small>
                        </>
                      )}
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        Complete Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {currentStep === 3 && (
                <div className="p-8 text-center">
                  <div className="text-green-500 text-5xl mb-4">
                    <FaCheckCircle />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your purchase.We&apos; sent a confirmation to your email. Your order will be processed and shipped within 2-3 business days.
                  </p>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setCartItems([]);
                    }}
                    className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;