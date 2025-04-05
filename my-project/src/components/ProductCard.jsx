import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000";

const ProductCard = ({ product }) => {
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleClaimProduct = async () => {
    setLoading(true);
    setMessage(null);

    // Immediately update UI to "Claimed"
    setClaimed(true);
    setMessage("🎉 Product has been successfully claimed!");

    try {
      await axios.post(`${API_URL}/api/claim`, { productId: product._id });
    } catch (error) {
      console.error("Claiming failed, but showing claimed anyway:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300 ease-in-out bg-[#F0F9F5]">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-[#013220] mt-4">
          {product.name || "Unnamed Product"}
        </h2>

        <p className="text-gray-700 text-center">{product.description || "No description available."}</p>

        <p className="font-semibold text-[#014f2c]">Category: {product.category || "Unknown"}</p>

        {product?.price ? (
          <p className="font-semibold text-[#A94438]">Price: ₹{product.price}</p>
        ) : (
          <p className="font-semibold text-gray-500">Price not available</p>
        )}

        {message && (
          <p className="text-sm text-green-600 mt-2">{message}</p>
        )}

        <Link
          to={`/product/${product._id}`}
          className="text-[#014f2c] hover:text-[#A8D5BA] font-semibold mt-3 transition"
        >
          View Details →
        </Link>

        
      </div>
    </div>
  );
};

export default ProductCard;
