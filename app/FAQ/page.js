"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept Orange Money, AfriMoney, bank transfers, and major credit cards (Visa, MasterCard). Local pickup with cash payment is also available at our Freetown and Bo locations.",
      category: "payments"
    },
    {
      question: "How long does shipping take within Sierra Leone?",
      answer: "For deliveries within Freetown, orders typically arrive within 2-3 business days. For other regions in Sierra Leone, please allow 3-5 business days depending on your location.",
      category: "shipping"
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! International shipping typically takes 7-14 business days depending on the destination. Additional customs fees may apply for international orders.",
      category: "shipping"
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 14 days of delivery for non-custom items in their original condition. Due to the handmade nature of our products, custom orders cannot be returned. Please contact us for a return authorization before sending items back.",
      category: "returns"
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also check your order status by logging into your account on our website.",
      category: "orders"
    },
    {
      question: "Can I request a custom handmade piece?",
      answer: "Absolutely! We love creating custom pieces. Contact us with your ideas and we'll connect you with the perfect artisan for your project. Custom orders typically take 2-4 weeks depending on complexity.",
      category: "custom"
    },
    {
      question: "How do I care for my handmade items?",
      answer: "Each product comes with specific care instructions. Generally, we recommend hand washing for textiles and avoiding direct sunlight for wood and leather products. For specific care, please refer to the product description or contact us.",
      category: "care"
    },
    {
      question: "Do you offer wholesale pricing?",
      answer: "Yes, we offer special pricing for retailers and bulk orders. Please contact our wholesale department at wholesale@artisancollection.com for more information and pricing.",
      category: "wholesale"
    },
    {
      question: "How can I verify the authenticity of your products?",
      answer: "All our products come with a certificate of authenticity signed by the artisan who created it. You can also scan the QR code on the product tag to learn more about the artisan and their craft.",
      category: "authenticity"
    },
    {
      question: "Do you offer workshops or artisan experiences?",
      answer: "Yes! We regularly host workshops where you can learn traditional crafts from our artisans. Check our Events page or sign up for our newsletter to stay informed about upcoming opportunities.",
      category: "experiences"
    },
    {
      question: "How do you support the artisan community?",
      answer: "We pay artisans fair wages (typically 3-5x local averages) and reinvest 10% of profits into community development programs. We also provide training, materials, and tools to help artisans grow their businesses.",
      category: "mission"
    },
    {
      question: "Can I visit your workshops?",
      answer: "Our Freetown workshop welcomes visitors Monday-Friday from 9am-4pm. For groups larger than 5 people or specialized tours, please contact us in advance to arrange your visit.",
      category: "visits"
    }
  ];

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "shipping", name: "Shipping & Delivery" },
    { id: "payments", name: "Payments" },
    { id: "returns", name: "Returns & Exchanges" },
    { id: "custom", name: "Custom Orders" },
    { id: "mission", name: "Our Mission" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar/>
      
      {/* FAQ Header */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Find answers to common questions about our artisan products, shipping, returns, and more.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full ${selectedCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-blue-600 transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`px-6 pb-6 pt-0 transition-all duration-300 ease-in-out ${activeIndex === index ? 'block' : 'hidden'}`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our artisan support team is happy to help.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default FAQ;