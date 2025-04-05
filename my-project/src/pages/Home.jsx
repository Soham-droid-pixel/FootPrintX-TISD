import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products")
      .then(res => {
        if (res.data.success) {
          setProducts(res.data.data);
        } else {
          console.error("Failed to fetch products");
        }
      })
      .catch(err => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleClaim = async (productId) => {
    try {
      const response = await axios.post("http://localhost:3000/api/claim", {
        productId,
        userId: "USER_ID_HERE"
      });
      if (response.data.success) {
        setProducts(products.filter(product => product._id !== productId));
      }
    } catch (error) {
      console.error("Error claiming product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-500">
        🌱 Available Reusable Products
      </h1>

      {loading ? (
        <p className="text-center text-green-400 animate-pulse">
          Loading products...
        </p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onClaim={handleClaim}
              theme="dark"
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available at the moment.</p>
      )}
    </div>
  );
};

export default Home;
