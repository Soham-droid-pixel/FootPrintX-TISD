import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaClock, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claimSuccess, setClaimSuccess] = useState(false);

  useEffect(() => {
    const claimed = JSON.parse(localStorage.getItem("claimedProducts")) || [];
    if (claimed.includes(id)) {
      setClaimSuccess(true);
    }
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${id}`)
      .then(res => {
        if (res.data.success) {
          setProduct(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleClaim = () => {
    const claimed = JSON.parse(localStorage.getItem("claimedProducts")) || [];
    if (!claimed.includes(id)) {
      claimed.push(id);
      localStorage.setItem("claimedProducts", JSON.stringify(claimed));
    }

    setClaimSuccess(true);
    toast.success("🎉 Product successfully claimed!");
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-[#111] rounded-lg shadow-md animate-pulse">
        <div className="h-8 w-1/2 bg-gray-700 rounded mb-4"></div>
        <div className="w-full h-64 bg-gray-700 rounded-md mb-4"></div>
        <div className="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

      <h1 className="text-3xl font-bold text-green-500 mb-4">{product.name}</h1>

      <p className="text-gray-300 mt-4 text-lg">{product.description || "No description available."}</p>

      <div className="mt-4">
        <p className="text-gray-400">
          <span className="font-semibold text-white">Category:</span> {product.category}
        </p>
        <p className={`text-lg font-semibold mt-2 ${product.condition === "New" ? "text-green-500" : "text-yellow-400"}`}>
          {product.condition === "New" ? <FaCheckCircle className="inline-block mr-1" /> : <FaClock className="inline-block mr-1" />}
          {product.condition || "Unknown Condition"}
        </p>
        <p className={`mt-2 text-lg font-semibold ${claimSuccess ? "text-red-400" : "text-green-500"}`}>
          {claimSuccess ? "Claimed by You" : "Available for Pickup"}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-lg font-semibold text-white">
          <span className="text-gray-400">Price:</span> Rs {product.price}
        </p>
      </div>

      <div className="mt-6 bg-[#111] border border-gray-700 p-4 rounded-md shadow-md">
        <h3 className="text-lg font-bold mb-2 text-green-500">📢 User Information</h3>
        {product.userId ? (
          <p className="flex items-center text-white">
            <FaUser className="mr-2 text-green-500" /> User ID: {product.userId}
          </p>
        ) : (
          <p className="text-gray-500">No user information available.</p>
        )}
      </div>

      {claimSuccess && (
        <div className="text-green-400 font-semibold mt-4">🎉 You claimed this product!</div>
      )}

      <div className="mt-6 flex justify-between items-center">
        {product.imageUrl && (
          <a
            href={product.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 underline hover:text-green-300 text-lg"
          >
            View Image
          </a>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleClaim}
          disabled={claimSuccess}
          className={`px-4 py-2 rounded-md transition font-semibold text-white ${
            claimSuccess ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {claimSuccess ? "Claimed by You" : "Claim Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
