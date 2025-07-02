import ProductCard from "@/components/ProductCard";

const ProductGallery = () => {
  const products = [
    {
      id: 1,
      name: "Handwoven Rattan Basket",
      price: 1979,
      image: "https://i.etsystatic.com/56300479/r/il/3f1a34/6538116580/il_300x300.6538116580_salt.jpg",
      badge: "New",
    },
    {
      id: 2,
      name: "Handcarved Wooden Bowl",
      price: 2859,
      image: "https://i.etsystatic.com/26837831/r/il/22051d/4461460053/il_794xN.4461460053_5u4x.jpg",
      badge: "Popular",
    },
    {
      id: 3,
      name: "Artisan Pottery Set",
      price: 3959,
      image: "https://i.etsystatic.com/52989827/c/1925/1925/421/412/il/2f330c/6831303591/il_600x600.6831303591_4nnh.jpg",
      badge: "Limited",
    },
    {
      id: 4,
      name: "Handwoven Textile",
      price: 3079,
      image: "https://i.etsystatic.com/9495956/r/il/915037/4148132039/il_600x600.4148132039_ghvc.jpg",
      badge: "Premium",
    },
    {
      id: 5,
      name: "Handmade Ceramic Mug",
      price: 1099,
      image: "https://i.etsystatic.com/24883855/r/il/4b08c3/6195668267/il_300x300.6195668267_rarj.jpg",
      badge: "Custom",
    },
    {
      id: 6,
      name: "Handcarved Wooden Sculpture",
      price: 4399,
      image: "https://i.etsystatic.com/9495956/r/il/848a33/4229740833/il_600x600.4229740833_gsrr.jpg",
      badge: "Special",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            Our Collection
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-amber-800 -mb-4"></span>
          </h2>
          <p className="text-gray-600">
            Explore our exclusive range of handcrafted artisan pieces
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
