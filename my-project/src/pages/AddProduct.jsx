import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        userId: "",  // You might want to fetch this dynamically
        name: "",
        description: "",
        category: "",
        condition: "",
        imageUrl: "",
    });

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        console.log("Submitting Form Data:", formData); 

        // Basic validation
        if (!formData.userId || !formData.name || !formData.category) {
            setMessage({ type: "error", text: "User ID, Name, and Category are required!" });
            setLoading(false);
            return;
        }

        

        try {
            const response = await axios.post(`${API_URL}/api/products/add`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("✅ Product added:", response.data);
            setMessage({ type: "success", text: "Product added successfully!" });

            // Reset form
            setFormData({
                userId: "",
                name: "",
                description: "",
                category: "",
                condition: "",
                imageUrl: "",
            });
        } catch (error) {
            console.error("❌ Error adding product:", error.response?.data || error.message);
            setMessage({
                type: "error",
                text: error.response?.data?.message || "Failed to add product. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-primary mb-4">➕ Add a Product for Reuse</h1>

            {/* Success/Error Messages */}
            {message && (
                <div className={`p-3 mb-3 text-white rounded-lg ${message.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
                <input type="text" name="userId" value={formData.userId} placeholder="User ID" className="border p-2 w-full mb-3" onChange={handleChange} required />
                <input type="text" name="name" value={formData.name} placeholder="Product Name" className="border p-2 w-full mb-3" onChange={handleChange} required />
                <textarea name="description" value={formData.description} placeholder="Description" className="border p-2 w-full mb-3" onChange={handleChange} />
                <input type="text" name="category" value={formData.category} placeholder="Category" className="border p-2 w-full mb-3" onChange={handleChange} required />
                <input type="text" name="condition" value={formData.condition} placeholder="Condition (New/Used)" className="border p-2 w-full mb-3" onChange={handleChange} />
                <input type="text" name="imageUrl" value={formData.imageUrl} placeholder="Image URL" className="border p-2 w-full mb-3" onChange={handleChange} />
                
                {/* Submit button with Loading Indicator */}
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition" disabled={loading}>
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
