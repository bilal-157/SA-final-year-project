"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHands, faLeaf, faHeart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faWeixin } from '@fortawesome/free-brands-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/mask-work.jpeg",
      caption: "Master carver creating traditional ceremonial masks"
    },
    {
      image: "/images/lady-beads.jpeg",
      caption: "Beadwork artisan crafting intricate jewelry patterns"
    },
    {
      image: "/images/mom.jpeg",
      caption: "Weaver working on traditional textile patterns"
    },
    {
      image: "/images/bondo-mask.jpeg",
      caption: "Sculptor shaping wood using traditional tools"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="font-serif">
      <Navbar />
      
      <main className="bg-amber-50">
        {/* About Header */}
        <section className="bg-amber-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Artisan Story</h1>
            <p className="text-xl">Discover the hands and hearts behind our handcrafted collections</p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-amber-800 mb-6">Handcrafted with Passion</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Founded in 2015, Artisan Collection began as a small cooperative of local craftspeople dedicated to preserving traditional techniques while creating contemporary designs. What started with just five artisans in a shared workshop has grown into a global community of over 200 master craftspeople.</p>
                  <p>Each piece in our collection tells a story - of the artisan who created it, the generations of knowledge behind it, and the careful attention to detail that makes it unique. We're proud to support fair trade practices and sustainable materials in all our creations.</p>
                  <p>Our journey has been one of collaboration, innovation, and respect for the timeless art of handmade craftsmanship. Every purchase supports these talented individuals and helps keep traditional skills alive for future generations.</p>
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                <div className="relative h-96 overflow-hidden rounded-lg shadow-xl">
                  {slides.map((slide, index) => (
                    <div 
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                        <p className="text-center">{slide.caption}</p>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-amber-800 p-2 rounded-full hover:bg-white transition-all"
                    aria-label="Previous slide"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  
                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-amber-800 p-2 rounded-full hover:bg-white transition-all"
                    aria-label="Next slide"
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-amber-500' : 'bg-white/50'} transition-all`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">Our Craftsmanship Philosophy</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              At Artisan Collection, we believe in three fundamental principles that guide everything we create
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-amber-50 p-8 rounded-lg text-center">
                <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faHands} className="text-amber-800 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Handmade Excellence</h3>
                <p className="text-gray-600">
                  Every piece is individually crafted by skilled artisans using time-honored techniques passed down through generations.
                </p>
              </div>
              
              <div className="bg-amber-50 p-8 rounded-lg text-center">
                <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faLeaf} className="text-amber-800 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainable Practices</h3>
                <p className="text-gray-600">
                  We source eco-friendly materials and implement production methods that minimize environmental impact.
                </p>
              </div>
              
              <div className="bg-amber-50 p-8 rounded-lg text-center">
                <div className="bg-amber-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faHeart} className="text-amber-800 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Ethical Partnerships</h3>
                <p className="text-gray-600">
                  We maintain direct relationships with our artisans, ensuring fair wages and safe working conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">Meet Our Master Artisans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Artisan 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/images/lady-beads.jpeg" 
                    alt="Artisan Yema Mansaray" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Yema Mansaray</h3>
                  <p className="text-amber-700 mb-4">Bead Artisan & Cultural Storyteller</p>
                  <div className="flex gap-3 mb-4">
                    <a href="#" className="text-gray-500 hover:text-amber-800 transition-colors">
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-amber-800 transition-colors">
                      <FontAwesomeIcon icon={faFacebook} size="lg" />
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm">
                    A visionary bead artist preserving Sierra Leone's heritage through vibrant, handcrafted jewelry, Yema transforms recycled glass and natural materials into wearable art.
                  </p>
                </div>
              </div>
              
              {/* Artisan 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/images/mom.jpeg" 
                    alt="Artisan Fatmata Barrie" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Fatmata Barrie</h3>
                  <p className="text-amber-700 mb-4">Clay Alchemist & Cultural Preservationist</p>
                  <div className="flex gap-3 mb-4">
                    <a href="#" className="text-gray-500 hover:text-amber-800 transition-colors">
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm">
                    With earth-caked hands and rhythmic precision, Fatmata coaxes ancestral magic from Northern Sierra Leone's red clay using traditional pinch-and-coil techniques.
                  </p>
                </div>
              </div>
              
              {/* Artisan 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/images/bondo-mask.jpeg" 
                    alt="Artisan Foday Sesay" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Foday Sesay</h3>
                  <p className="text-amber-700 mb-4">Master Woodcarver & Guardian of Tradition</p>
                  <div className="flex gap-3 mb-4">
                    <a href="#" className="text-gray-500 hover:text-amber-800 transition-colors">
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Descended from a long line of Temne woodcarvers, he preserves sacred carving techniques passed down through generations while infusing contemporary forms.
                  </p>
                </div>
              </div>
              
              {/* Artisan 4 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="/images/father-gara-tie.jpeg" 
                    alt="Artisan Alusine Bangura" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Alusine Bangura</h3>
                  <p className="text-amber-700 mb-4">Master Weaver & Textile Innovator</p>
                  <div className="flex gap-3 mb-4">
                    <a href="#" className="text-gray-500 hover:text-amber-800 transition-colors">
                      <FontAwesomeIcon icon={faWeixin} size="lg" />
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm">
                    A third-generation Mende weaver, he transforms locally spun cotton and raffia into striking textiles that dance between heritage and contemporary design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">Our Craft Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Authenticity</h3>
                <p className="text-gray-600">
                  We celebrate imperfections that reveal the human touch behind each piece. No two items are exactly alike, making your purchase truly one-of-a-kind.
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Heritage</h3>
                <p className="text-gray-600">
                  Our artisans preserve cultural traditions while adapting them for contemporary living. Each technique tells a story of cultural heritage.
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Quality</h3>
                <p className="text-gray-600">
                  From material selection to final finishing, we never compromise on quality. Our pieces are made to last and become heirlooms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-amber-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Bring Artisan Craftsmanship Into Your Home?</h2>
            <a 
              href="/products" 
              className="inline-block bg-white text-amber-800 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Explore Collections
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;