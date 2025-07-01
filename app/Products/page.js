"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag, faStar } from '@fortawesome/free-solid-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    origin: 'all',
    material: 'all',
    sort: 'popular'
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts = [
      {
        id: 1,
        name: 'Handwoven Basket',
        category: 'textiles',
        origin: 'Freetown',
        material: 'fabric',
        price: 45.99,
        rating: 4.5,
        image: '/products/basket.jpg',
        isNew: true,
        artisan: 'Alusine Bangura',
        description: 'Handwoven using traditional Sierra Leonean techniques with natural dyes'
      },
      {
        id: 2,
        name: 'Ceramic Vase',
        category: 'pottery',
        origin: 'Kenema',
        material: 'clay',
        price: 65.50,
        rating: 4.8,
        image: '/products/vase.jpg',
        isNew: false,
        artisan: 'Fatmata Conteh',
        description: 'Hand-thrown pottery with intricate tribal patterns'
      },
      {
        id: 3,
        name: 'Wooden Sculpture',
        category: 'woodwork',
        origin: 'Bo',
        material: 'wood',
        price: 89.99,
        rating: 4.7,
        image: '/products/sculpture.jpg',
        isNew: true,
        artisan: 'Mohamed Kamara',
        description: 'Carved mahogany depicting traditional folklore'
      },
      {
        id: 4,
        name: 'Beaded Necklace',
        category: 'jewelry',
        origin: 'Makeni',
        material: 'glass',
        price: 32.99,
        rating: 4.3,
        image: '/products/necklace.jpg',
        isNew: false,
        artisan: 'Mariatu Sesay',
        description: 'Hand-strung glass beads in vibrant colors'
      },
      {
        id: 5,
        name: 'Metal Wall Art',
        category: 'metalwork',
        origin: 'Kono',
        material: 'metal',
        price: 75.25,
        rating: 4.6,
        image: '/products/wall-art.jpg',
        isNew: true,
        artisan: 'Ibrahim Koroma',
        description: 'Hand-hammered copper with geometric designs'
      },
      {
        id: 6,
        name: 'Glass Ornament',
        category: 'glass',
        origin: 'Bonthe',
        material: 'glass',
        price: 28.99,
        rating: 4.2,
        image: '/products/ornament.jpg',
        isNew: false,
        artisan: 'Hawa Bangura',
        description: 'Hand-blown glass with swirling colors'
      },
      {
        id: 7,
        name: 'Leather Sandals',
        category: 'textiles',
        origin: 'Freetown',
        material: 'leather',
        price: 55.00,
        rating: 4.4,
        image: '/products/sandals.jpg',
        isNew: true,
        artisan: 'Samuel Turay',
        description: 'Hand-stitched leather with traditional patterns'
      },
      {
        id: 8,
        name: 'Soapstone Carving',
        category: 'stone',
        origin: 'Kenema',
        material: 'stone',
        price: 42.75,
        rating: 4.9,
        image: '/products/soapstone.jpg',
        isNew: false,
        artisan: 'Aminata Kamara',
        description: 'Intricately carved soapstone figurine'
      }
    ];

    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const filteredProducts = products.filter(product => {
    // Apply filters
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.origin !== 'all' && product.origin !== filters.origin) return false;
    if (filters.material !== 'all' && product.material !== filters.material) return false;
    
    // Apply search
    if (searchQuery && 
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.artisan.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: return 0; // 'popular' - could implement actual popularity logic
    }
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="font-serif">
      <Navbar />
      
      <main className="bg-amber-50 min-h-screen">
        {/* Products Header */}
        <section className="bg-amber-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Handcrafted Artisan Creations</h1>
            <p className="text-xl">Discover unique pieces crafted with passion by skilled artisans</p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto">
              <div className="relative flex">
                <input
                  type="text"
                  className="flex-grow px-6 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  placeholder="Search for pottery, textiles, artisans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded-r-full transition duration-300"
                >
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                  Search
                </button>
              </div>
            </form>

            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="filter-group">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <option value="all">All Categories</option>
                  <option value="pottery">Pottery & Ceramics</option>
                  <option value="textiles">Textiles & Weaving</option>
                  <option value="woodwork">Woodwork</option>
                  <option value="metalwork">Metalwork</option>
                  <option value="glass">Glass Art</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="stone">Stone Carvings</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                <select
                  id="origin"
                  name="origin"
                  value={filters.origin}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <option value="all">All Locations</option>
                  <option value="Freetown">Freetown</option>
                  <option value="Kenema">Kenema</option>
                  <option value="Bo">Bo</option>
                  <option value="Bonthe">Bonthe</option>
                  <option value="Kono">Kono</option>
                  <option value="Makeni">Makeni</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                <select
                  id="material"
                  name="material"
                  value={filters.material}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <option value="all">All Materials</option>
                  <option value="clay">Clay</option>
                  <option value="wood">Wood</option>
                  <option value="metal">Metal</option>
                  <option value="fabric">Fabric</option>
                  <option value="glass">Glass</option>
                  <option value="leather">Leather</option>
                  <option value="stone">Stone</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  id="sort"
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-amber-50">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800"></div>
              </div>
            ) : currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {currentProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {product.isNew && (
                          <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            New Arrival
                          </span>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FontAwesomeIcon 
                                key={i}
                                icon={faStar}
                                className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="ml-2 text-white text-sm">{product.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                          <span className="text-amber-800 font-bold">${product.price.toFixed(2)}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">{product.origin}</span>
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">{product.material}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">By {product.artisan}</span>
                          <button className="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm transition duration-300 flex items-center">
                            <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      >
                        Previous
                      </button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`px-4 py-2 border rounded-md ${currentPage === pageNumber ? 'bg-amber-800 text-white border-amber-800' : 'border-gray-300 hover:bg-gray-100'}`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      category: 'all',
                      origin: 'all',
                      material: 'all',
                      sort: 'popular'
                    });
                  }}
                  className="mt-4 bg-amber-800 hover:bg-amber-700 text-white px-6 py-2 rounded-full inline-block transition duration-300"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-amber-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Artisan Circle</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Receive stories of craftsmanship, exclusive previews of new collections, and special invitations to artisan workshops
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
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
                Subscribe
              </button>
            </form>
            <p className="small-text mt-6 text-sm opacity-80">
              By signing up, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;