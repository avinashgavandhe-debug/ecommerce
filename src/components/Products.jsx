import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Star,
  Heart,
  Filter,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  X,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import Header from "./common/Header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      fetchProducts();
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Header */}
      <Header
        products={products}
        fetchProducts={fetchProducts}
        setLoading={setLoading}
        setProducts={setProducts}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Filter className="text-violet-600" size={24} />
              Filter by Category
            </h2>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200">
              <SlidersHorizontal size={16} />
              <span className="font-medium">{products.length} Results</span>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`group px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-lg ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-500/50 scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-50 hover:shadow-xl border border-slate-200"
              }`}
            >
              <Sparkles className="h-5 w-5" />
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`group px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-lg ${
                  selectedCategory === category.slug
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-500/50 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-50 hover:shadow-xl border border-slate-200"
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-violet-200 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-violet-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
            </div>
            <p className="text-slate-600 mt-6 font-bold text-lg">
              Loading amazing products...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:-translate-y-2"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 aspect-square">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg group-hover:scale-110">
                    <Heart className="h-5 w-5 text-slate-700 hover:text-red-500 hover:fill-red-500 transition-colors" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="text-xs font-bold text-violet-600 mb-2 uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-violet-600 transition-colors">
                    {product.title}
                  </h3>

                  {/* Rating & Stock */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-slate-700">
                        ({product.rating})
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      {product.stock} left
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-3xl font-black text-slate-900">
                        $
                        {calculateDiscountedPrice(
                          product.price,
                          product.discountPercentage
                        )}
                      </div>
                      {product.discountPercentage > 0 && (
                        <div className="text-sm text-slate-500 line-through">
                          ${product.price}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-2xl font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center group"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={64} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                fetchProducts();
              }}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
