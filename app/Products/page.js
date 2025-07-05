"use client";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag, faStar } from '@fortawesome/free-solid-svg-icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
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
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.origin !== 'all' && product.origin !== filters.origin) return false;
    if (filters.material !== 'all' && product.material !== filters.material) return false;
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.artisan.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
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
      default: return 0;
    }
  });

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
        <section className="bg-amber-800 text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Handcrafted Artisan Creations</h1>
            <p className="text-xl">Discover unique pieces crafted with passion by skilled artisans</p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="mb-8 max-w-2xl mx-auto">
              <div className="relative flex">
                <input
                  type="text"
                  className="flex-grow px-6 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  placeholder="Search for pottery, textiles, artisans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded-r-full"
                >
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                  Search
                </button>
              </div>
            </form>

            {/* Filter dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['category', 'origin', 'material', 'sort'].map((filterKey) => {
                const options = {
                  category: [
                    ['all', 'All Categories'],
                    ['pottery', 'Pottery & Ceramics'],
                    ['textiles', 'Textiles & Weaving'],
                    ['woodwork', 'Woodwork'],
                    ['metalwork', 'Metalwork'],
                    ['glass', 'Glass Art'],
                    ['jewelry', 'Jewelry'],
                    ['stone', 'Stone Carvings']
                  ],
                  origin: [
                    ['all', 'All Locations'],
                    ['Freetown', 'Freetown'],
                    ['Kenema', 'Kenema'],
                    ['Bo', 'Bo'],
                    ['Bonthe', 'Bonthe'],
                    ['Kono', 'Kono'],
                    ['Makeni', 'Makeni']
                  ],
                  material: [
                    ['all', 'All Materials'],
                    ['clay', 'Clay'],
                    ['wood', 'Wood'],
                    ['metal', 'Metal'],
                    ['fabric', 'Fabric'],
                    ['glass', 'Glass'],
                    ['leather', 'Leather'],
                    ['stone', 'Stone']
                  ],
                  sort: [
                    ['popular', 'Most Popular'],
                    ['newest', 'Newest Arrivals'],
                    ['price-low', 'Price: Low to High'],
                    ['price-high', 'Price: High to Low'],
                    ['rating', 'Customer Rating']
                  ]
                };
                return (
                  <div key={filterKey}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{filterKey}</label>
                    <select
                      name={filterKey}
                      value={filters[filterKey]}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    >
                      {options[filterKey].map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
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
                    <ProductCard key={product.id} product={product} />
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
                        let pageNumber = totalPages <= 5
                          ? i + 1
                          : currentPage <= 3
                            ? i + 1
                            : currentPage >= totalPages - 2
                              ? totalPages - 4 + i
                              : currentPage - 2 + i;
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
                  className="mt-4 bg-amber-800 hover:bg-amber-700 text-white px-6 py-2 rounded-full"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-amber-800 text-white text-center">
          <div className="container mx-auto px-4">
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
                className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-full font-medium"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-6 text-sm opacity-80">
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