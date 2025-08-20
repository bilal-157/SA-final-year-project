"use client";
import { useEffect, useState } from "react";

const FetchDataPage = () => {
  const [data, setData] = useState({ users: [], products: [] });
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editingCollection, setEditingCollection] = useState("");
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("users");

  const handleLogin = (e) => {
    e.preventDefault();
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
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item, collection) => {
    setEditingItem(item._id);
    setEditingCollection(collection);
    const { _id, ...rest } = item;
    setFormData(rest);
    // Scroll to the edit form
    setTimeout(() => {
      document.getElementById('edit-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditingCollection("");
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL_ADMIN, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: editingCollection,
          id: editingItem,
          updates: formData
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Update failed');
      }

      await fetchData();
      handleCancelEdit();
      alert("Update successful!");
    } catch (error) {
      console.error("Failed to update:", error);
      alert(`Update failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-gray-50 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 border border-gray-100">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Admin Portal</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name</label>
              <input
                type="text"
                placeholder="Enter admin name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition duration-200 font-medium shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600"></div>
        <p className="mt-4 text-gray-600">Loading data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            Admin Dashboard
          </h1>
          <button 
            onClick={() => {
              setAuthenticated(false);
              setAdminName("");
              setAdminPassword("");
            }}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "users" ? "bg-amber-100 text-amber-800" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "products" ? "bg-amber-100 text-amber-800" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Products
            </button>
          </div>
          <button 
            onClick={() => fetchData()} 
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh Data
          </button>
        </div>
      </header>

      {/* Edit Form */}
      {editingItem && (
        <div id="edit-form" className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Edit {editingCollection === 'users' ? 'User' : 'Product'}
            </h3>
            <button
              onClick={handleCancelEdit}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmitUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type={key.toLowerCase().includes('password') ? 'password' : 'text'}
                    name={key}
                    value={value || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-5 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition font-medium shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Content */}
      <main className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* USERS SECTION */}
        {activeTab === "users" && (
          <section>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
                Users Management
              </h2>
              <p className="text-gray-500 text-sm mt-1">Manage all registered users</p>
            </div>
            
            {data.users.length === 0 ? (
              <div className="p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-700">No users found</h3>
                <p className="mt-1 text-gray-500">There are currently no registered users.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {data.users.map((user) => (
                  <div key={user._id} className="p-4 hover:bg-gray-50 transition flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="flex gap-2 mt-1">
                          {user.role && (
                            <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                              {user.role}
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEdit(user, 'users')}
                      className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-full transition"
                      title="Edit user"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* PRODUCTS SECTION */}
        {activeTab === "products" && (
          <section>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                Products Management
              </h2>
              <p className="text-gray-500 text-sm mt-1">Manage all available products</p>
            </div>
            
            {data.products.length === 0 ? (
              <div className="p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-700">No products found</h3>
                <p className="mt-1 text-gray-500">There are currently no products available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {data.products.map((product) => (
                  <div key={product._id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
                    <div className="relative h-48 bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/300?text=No+Image";
                        }}
                      />
                      <button
                        onClick={() => handleEdit(product, 'products')}
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow text-gray-500 hover:text-amber-600 transition"
                        title="Edit product"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description || "No description available"}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded">
                          {product.category}
                        </span>
                        {product.material && (
                          <span className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded">
                            {product.material}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">SLL {product.price}</span>
                        <div className="flex items-center">
                          <div className="flex items-center text-amber-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm font-medium">{product.rating || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default FetchDataPage;