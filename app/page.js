"use client";
import '../lib/fontawesome'
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Herosection';
import FeaturedProduct from '../components/FeaturedProduct';
import ProductGallery from '../components/ProductGallery';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModel';
import { useState } from 'react';
import Notification from '@/components/Notification';
export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <>
      <Head>
        <title>Artisan Collection | Handcrafted Masterpieces</title>
        <meta name="description" content="Discover authentic handcrafted pieces from master artisans in Sierra Leone" />
        <link rel="icon" href="/favicon.ico" />
        {/* Font Awesome CDN */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <Navbar 
        onLoginClick={() => setIsAuthModalOpen(true)}
        onSignupClick={() => setIsAuthModalOpen(true)}
      />
      
      <main>
        <Hero />
        <FeaturedProduct />
        <ProductGallery />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
      />

      {notification==0 && (
        <Notification 
          message={notification} 
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}