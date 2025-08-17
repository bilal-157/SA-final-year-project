"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SLIDES = [
  {
    image: "/images/saone.jpg",
    caption: "Master carver creating traditional ceremonial masks"
  },
  {
    image: "/images/satwo.jpg",
    caption: "Beadwork artisan crafting intricate jewelry patterns"
  },
  {
    image: "/images/sathree.jpg",
    caption: "Weaver working on traditional textile patterns"
  },
  {
    image: "https://images.pexels.com/photos/30195883/pexels-photo-30195883.jpeg",
    caption: "Sculptor shaping wood using traditional tools"
  }
];

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Optional: Pause auto-play when user manually selects a slide
    setIsAutoPlaying(false);
    // Optional: Resume auto-play after a delay
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    // Optional: Reset auto-play timer on manual navigation
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    // Optional: Reset auto-play timer on manual navigation
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="font-serif">
      <Navbar />
      <main className="bg-amber-50">
        <section className="bg-amber-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Artisan Story</h1>
            <p className="text-xl">Discover the hands and hearts behind our handcrafted collections</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-amber-800 mb-6">Handcrafted with Passion</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Founded in 2015, Artisan Collection began as a small cooperative of local craftspeople dedicated to preserving traditional techniques while creating contemporary designs. What started with just five artisans in a shared workshop has grown into a global community of over 200 master craftspeople.</p>
                  <p>Each piece in our collection tells a story - of the artisan who created it, the generations of knowledge behind it, and the careful attention to detail that makes it unique. We&apos;re proud to support fair trade practices and sustainable materials in all our creations.</p>
                  <p>Our journey has been one of collaboration, innovation, and respect for the timeless art of handmade craftsmanship. Every purchase supports these talented individuals and helps keep traditional skills alive for future generations.</p>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl">
                  {SLIDES.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.caption}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                        <p className="text-center">{slide.caption}</p>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-amber-800 p-2 rounded-full hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-amber-600"
                    aria-label="Previous slide"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-amber-800 p-2 rounded-full hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-amber-600"
                    aria-label="Next slide"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {SLIDES.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-amber-500 scale-125' : 'bg-white/50 hover:bg-white/70'}`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentSlide}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;