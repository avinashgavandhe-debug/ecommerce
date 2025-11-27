import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
    <div className="py-6">
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchProducts()}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={searchProducts}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedCategory === category.slug
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    ★ {product.rating}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Products;
