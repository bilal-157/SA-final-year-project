import ProductCard from "@/components/ProductCard";

const FeaturedProduct = () => {
  const product = {
    id: "prod_001",
    name: "Traditional Pottery Set",
    price: 200,
    image:
      "https://i.etsystatic.com/56767725/r/il/173e9b/6978031697/il_300x300.6978031697_k4nv.jpg",
    description:
      "This exquisite pottery set is handcrafted by master artisans using centuries-old techniques. Each piece is unique, with subtle variations that celebrate the beauty of handmade craftsmanship.",
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 relative inline-block">
          Featured Artisan Piece
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-amber-800 -mb-4"></span>
        </h2>

        {/* Use the reusable component */}
        <ProductCard product={product} />
      </div>
    </section>
  );
};

export default FeaturedProduct;
