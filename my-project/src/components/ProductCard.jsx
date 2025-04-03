import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000"; // Ensure this is correct

const ProductCard = ({ product }) => {
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("Product Data:", product); // Debugging - Ensure product contains the expected fields

  // Handle Claiming a Product
  const handleClaimProduct = async () => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const response = await axios.post(`${API_URL}/api/claim`, { productId: product._id });
      console.log("Claim Response:", response.data);
      setClaimed(true);
    } catch (error) {
      console.error("Error claiming product:", error);
      setError("Failed to claim product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out bg-white">
      <div className="flex flex-col items-center">
        {/* Product Image */}
        
        <h2 className="text-xl font-bold text-green-700 mt-4">{product.name || "Unnamed Product"}</h2>
        <p className="text-gray-600 text-center">{product.description || "No description available."}</p>
        <p className="font-semibold text-blue-600">Category: {product.category || "Unknown"}</p>

        {/* Display Price if Available */}
        {product?.price ? (
          <p className="font-semibold text-red-500">Price: Rs {product.price}</p>
        ) : (
          <p className="font-semibold text-gray-500">Price not available</p>
        )}

        {/* Claim Button with Loading State */}
        {!claimed ? (
          <button 
            onClick={handleClaimProduct} 
            disabled={loading}
            className={`mt-2 px-4 py-2 rounded-md transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {loading ? "Claiming..." : "Claim"}
          </button>
        ) : (
          <p className="text-green-600 font-semibold mt-2">Claimed ✅</p>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* View Details Link */}
        <Link to={`/product/${product._id}`} className="text-blue-500 hover:underline mt-2">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
