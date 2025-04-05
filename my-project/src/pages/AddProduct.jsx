import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    description: "",
    category: "",
    condition: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!formData.userId || !formData.name || !formData.category) {
      setMessage({
        type: "error",
        text: "User ID, Name, and Category are required!",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/products/add`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage({ type: "success", text: "Product added successfully!" });

      setFormData({
        userId: "",
        name: "",
        description: "",
        category: "",
        condition: "",
        imageUrl: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to add product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">
        ➕ Add a Product for Reuse
      </h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded-lg text-white text-center ${
            message.type === "success" ? "bg-green-600" : "bg-rose-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-700 max-w-xl mx-auto"
      >
        <input
          type="text"
          name="userId"
          value={formData.userId}
          placeholder="User ID"
          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Product Name"
          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          placeholder="Description"
          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          placeholder="Category"
          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="condition"
          value={formData.condition}
          placeholder="Condition (New/Used)"
          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          placeholder="Image URL"
          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg w-full transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
