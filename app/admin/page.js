"use client";
import { useEffect, useState } from "react";

const FetchDataPage = () => {
  const [data, setData] = useState({ users: [], products: [] });
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace with your own secure check or backend validation
    if (adminName === process.env.NEXT_PUBLIC_ADMIN_NAME && adminPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
      fetchData();
    } else {
      alert("Invalid credentials");
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL_ADMIN);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
          <h2 className="text-xl font-bold text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Admin Name"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8 space-y-10">
      {/* USERS */}
      <section>
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Users</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.users.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg shadow bg-white">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p className="text-sm text-gray-500"><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section>
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Products</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow bg-white">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category} | {product.material}</p>
              <p className="text-sm">Price: ${product.price}</p>
              <p className="text-sm text-amber-600">Rating: {product.rating}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FetchDataPage;
