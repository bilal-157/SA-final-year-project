// components/ProductCard.js
import Image from "next/image";

const ProductCard = ({ product }) => {
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = existingCart.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    alert(`${product.name} added to cart!`);
  };

  const badgeColor = {
    New: "bg-green-500",
    Popular: "bg-blue-500",
    Limited: "bg-red-500",
    Premium: "bg-purple-500",
    Custom: "bg-indigo-500",
    Special: "bg-amber-500",
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden h-64">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {product.badge && (
          <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${badgeColor[product.badge] || "bg-amber-500"}`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-amber-800 font-bold text-xl mb-4">Le {product.price.toLocaleString()}</p>
        <button
          onClick={addToCart}
          className="w-full py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-md font-medium transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
