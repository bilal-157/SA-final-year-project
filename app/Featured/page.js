"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const NewArrivals = () => {
  return (
    <div className="font-serif">
      {/* Navigation would go here */}
<Navbar/>
      {/* New Arrivals Header */}
      <section className="page-header bg-amber-50 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">Artisan New Arrivals</h1>
          <p className="text-xl text-gray-600">Handcrafted with care, each piece tells a story of tradition and craftsmanship</p>
        </div>
      </section>

      {/* New Arrivals Content */}
      <section className="new-arrivals py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-title text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Handcrafted Creations</h2>
            <p className="subtitle text-gray-600">Each piece lovingly made by master artisans</p>
          </div>
          
          <div className="arrivals-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Item */}
            <div className="arrival-item featured bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <img 
                    src="https://images.pexels.com/photos/32856216/pexels-photo-32856216.jpeg" 
                    alt="Featured Artisan Pottery" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="arrival-info p-6 lg:w-1/2">
                  <span className="new-badge bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                    Masterpiece
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Hand-Thrown Gara Tie-dye Collection</h2>
                  <p className="text-gray-600 mb-6">
                    Our signature collection of wheel-thrown stoneware, each piece uniquely shaped by hand and fired in our traditional wood-burning kiln. 
                    The natural ash glaze creates unpredictable and beautiful finishes that make each item one-of-a-kind.
                  </p>
                  <div className="artisan-details flex items-center mb-4">
                    <img 
                     src="https://images.pexels.com/photos/32877962/pexels-photo-32877962.jpeg" 
                      alt="Artisan Alusine Bangura" 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="text-gray-700">Handcrafted by Mr Alusine Bangura</span>
                  </div>
                  <div className="price text-amber-800 font-bold text-xl mb-6">SLL 3,500,000 - SLL 5,500,000</div>
                  <Link 
                    href="/Products" 
                    className="shop-now bg-amber-800 hover:bg-amber-700 text-white px-6 py-2 rounded-full inline-block transition duration-300"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Grid Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Item 1 */}
              <div className="arrival-item bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative">
                  <img 
                    src="https://images.pexels.com/photos/7314472/pexels-photo-7314472.jpeg" 
                    alt="Woven Textiles" 
                    className="w-full h-64 object-cover"
                  />
                  <span className="new-badge absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    New
                  </span>
                </div>
                <div className="arrival-info p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Handwoven Textiles</h3>
                  <p className="text-gray-600 mb-4">
                    Traditional backstrap loom weaving using organic cotton dyed with natural pigments. 
                    Each textile takes 2-3 weeks to complete.
                  </p>
                  <div className="artisan-details flex items-center mb-4">
                    <img 
                      src="https://images.pexels.com/photos/185801/pexels-photo-185801.jpeg" 
                      alt="Artisan Juan" 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-700 text-sm">Woven by Jeneba Gondor</span>
                  </div>
                  <div className="price text-amber-800 font-bold mb-4">SLL 1,800,000 - SLL 3,900,000</div>
                  <Link 
                    href="/Products" 
                    className="shop-now border border-amber-800 text-amber-800 hover:bg-amber-50 px-4 py-2 rounded-full inline-block text-sm transition duration-300"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="arrival-item bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative">
                  <img 
                    src="https://images.pexels.com/photos/19652768/pexels-photo-19652768.jpeg" 
                    className="w-full h-64 object-cover"
                  />
                  <span className="new-badge absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Limited
                  </span>
                </div>
                <div className="arrival-info p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Carved Wood Sculptures</h3>
                  <p className="text-gray-600 mb-4">
                    Hand-carved from sustainably sourced local woods, these sculptures represent generations of carving tradition.
                  </p>
                  <div className="artisan-details flex items-center mb-4">
                    <img 
                      src="https://images.pexels.com/photos/5745856/pexels-photo-5745856.jpeg" 
                      alt="Artisan Koji" 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-gray-700 text-sm">Carved by Samuel Ross</span>
                  </div>
                  <div className="price text-amber-800 font-bold mb-4">SLL 2,700,000 - SLL 6,800,000</div>
                  <Link 
                    href="/Products" 
                    className="shop-now border border-amber-800 text-amber-800 hover:bg-amber-50 px-4 py-2 rounded-full inline-block text-sm transition duration-300"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="coming-soon py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Coming to the Workshop</h2>
            <p className="subtitle text-gray-600">Upcoming artisan collections in progress</p>
          </div>
          
          <div className="coming-soon-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Coming Soon Item 1 */}
            <div className="coming-soon-item bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/33395645/pexels-photo-33395645.jpeg" 
                alt="Indigo Dye Collection" 
                className="w-full h-48 object-cover"
              />
              <div className="coming-soon-info p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Gara Tie Dye Collection</h3>
                <p className="text-gray-600 mb-3">Traditional Sierra Leonean indigo resist-dye fabrics with modern patterns</p>
                <p className="text-amber-700 font-medium mb-4">Available September 2025</p>
                <button className="notify-me bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition duration-300">
                  Notify Me
                </button>
              </div>
            </div>
            
            {/* Coming Soon Item 2 */}
            <div className="coming-soon-item bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/6474327/pexels-photo-6474327.jpeg" 
                alt="Copper Smithing" 
                className="w-full h-48 object-cover"
              />
              <div className="coming-soon-info p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Wood carvings</h3>
                <p className="text-gray-600 mb-3">Hand-carved mahogany sculptures depicting Sierra Leonean folklore</p>
                <p className="text-amber-700 font-medium mb-4">Available September 2025</p>
                <button className="notify-me bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition duration-300">
                  Notify Me
                </button>
              </div>
            </div>
            
            {/* Coming Soon Item 3 */}
            <div className="coming-soon-item bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://plus.unsplash.com/premium_photo-1661645473770-90d750452fa0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D" 
                alt="Basketry" 
                className="w-full h-48 object-cover"
              />
              <div className="coming-soon-info p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Stone Jewelry</h3>
                <p className="text-gray-600 mb-3">
                  Handcrafted jewelry from Sierra Leone&apos;s famous soapstone

                </p>
                <p className="text-amber-700 font-medium mb-4">Available September 2025</p>
                <button className="notify-me bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition duration-300">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter py-16 bg-amber-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Artisan Circle</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Receive stories of craftsmanship, exclusive previews of new collections, and special invitations to artisan workshops
          </p>
          <form className="newsletter-form flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              className="flex-grow px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <button 
              type="submit" 
              className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-full font-medium transition duration-300"
            >
              Subscribe <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </form>
          <p className="small-text mt-6 text-sm opacity-80">
            By signing up, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </section>

      {/* Footer would go here */}
    <Footer/>
    </div>
  );
};

export default NewArrivals;