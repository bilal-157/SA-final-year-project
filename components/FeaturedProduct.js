import Image from "next/image";
const FeaturedProduct = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 relative inline-block">
          Featured Artisan Piece
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-amber-800 -mb-4"></span>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            import Image from 'next/image';

<Image
  src="https://i.etsystatic.com/56767725/r/il/173e9b/6978031697/il_300x300.6978031697_k4nv.jpg"
  alt="Traditional Pottery Set"
  width={800}  // Set your desired width
  height={600} // Set your desired height
  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
  unoptimized={true} // Required for external URLs
/>
          </div>

          <div className="md:w-1/2">
            <span className="inline-block bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Handmade
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Traditional Pottery Set</h3>
            <p className="text-2xl text-amber-800 font-bold mb-6">Le 200</p>
            <p className="text-gray-600 mb-8">
              This exquisite pottery set is handcrafted by master artisans using centuries-old techniques. 
              Each piece is unique, with subtle variations that celebrate the beauty of handmade craftsmanship.
            </p>
            <button className="px-8 py-3 bg-amber-800 hover:bg-amber-700 text-white rounded-full font-semibold uppercase tracking-wide transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;