import React, {useState} from "react";
import { ChevronRight, Search, Sparkles, X } from "lucide-react";


const Header = ({ products, fetchProducts, setLoading, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchProducts = async () => {
    if (!searchTerm.trim()) {
      fetchProducts();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to search products:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 mb-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4 border border-white/30">
              <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
              <span className="text-sm font-bold text-white">
                PREMIUM COLLECTION
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-purple-100 font-light">
              {products.length} products • Exclusive deals • Fast shipping
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative flex gap-3 bg-white rounded-3xl p-3 shadow-2xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="text-slate-400" size={22} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchProducts()}
                    placeholder="Search for products..."
                    className="flex-1 outline-none text-lg text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        fetchProducts();
                      }}
                      className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <X size={18} className="text-slate-400" />
                    </button>
                  )}
                </div>
                <button
                  onClick={searchProducts}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Search
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
