import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaExclamationTriangle, FaCheckCircle, FaClock, FaUser } from "react-icons/fa";
import { io } from "socket.io-client";

// Connect to Socket.io server
const socket = io("http://localhost:3000");

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Fetch product details
  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${id}`)
      .then(res => {
        if (res.data.success) {
          setProduct(res.data.data);
        } else {
          setError("Product not found");
        }
      })
      .catch(() => setError("Error fetching product details"))
      .finally(() => setLoading(false));
  }, [id]);

  // Listen for real-time updates on product claims
  useEffect(() => {
    socket.on("productClaimed", ({ productId }) => {
      if (productId === id) {
        setProduct((prev) => ({ ...prev, claimed: true }));
      }
    });

    return () => {
      socket.off("productClaimed");
    };
  }, [id]);

  // Handle product claim
  const handleClaim = () => {
    if (!product || product.claimed) return;
    
    axios.post("http://localhost:3000/api/claim/claim", { productId: id })
      .then(res => {
        if (res.data.success) {
          setClaimSuccess(true);
          setProduct({ ...product, claimed: true });
        } else {
          setError(res.data.message || "Failed to claim product");
        }
      })
      .catch(() => setError("Error processing claim request"));
  };

  // Loading UI
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md animate-pulse">
        <div className="h-8 w-1/2 bg-gray-300 rounded mb-4"></div>
        <div className="w-full h-64 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-6">
        <FaExclamationTriangle className="inline-block text-3xl mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
      
      {/* Product Description */}
      <p className="text-gray-700 mt-4 text-lg">{product.description || "No description available."}</p>

      {/* Product Details */}
      <div className="mt-4">
        <p className="text-gray-600"><span className="font-semibold">Category:</span> {product.category}</p>
        <p className={`text-lg font-semibold mt-2 ${product.condition === "New" ? "text-green-600" : "text-yellow-600"}`}>
          {product.condition === "New" ? <FaCheckCircle className="inline-block mr-1" /> : <FaClock className="inline-block mr-1" />}
          {product.condition || "Unknown Condition"}
        </p>
        <p className={`mt-2 text-lg font-semibold ${product.claimed ? "text-red-600" : "text-green-600"}`}>
          {product.claimed ? "Already Claimed" : "Available for Pickup"}
        </p>
      </div>

      {/* Product Price */}
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-800"><span className="font-semibold">Price:</span> Rs {product.price}</p>
      </div>

      {/* User Information */}
      <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md">
        <h3 className="text-lg font-bold mb-2">📢 User Information</h3>
        {product.userId ? (
          <p className="flex items-center text-gray-700"><FaUser className="mr-2 text-blue-500" /> User ID: {product.userId}</p>
        ) : (
          <p className="text-gray-500">No user information available.</p>
        )}
      </div>

      {/* Claim Success Message */}
      {claimSuccess && (
        <div className="text-green-600 font-semibold mt-4">🎉 Product successfully claimed!</div>
      )}

      {/* Product Image Link */}
      <div className="mt-6 flex justify-between items-center">
        {product.imageUrl && (
          <a href={product.imageUrl} target="_blank" rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700 text-lg">
            View Image
          </a>
        )}
      </div>

      {/* Claim Button */}
      <div className="mt-6 flex justify-center">
        <button 
          onClick={handleClaim} 
          disabled={product.claimed}
          className={`px-4 py-2 rounded-md transition ${product.claimed ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"}`}>
          {product.claimed ? "Already Claimed" : "Claim Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
