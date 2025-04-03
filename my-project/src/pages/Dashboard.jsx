import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// Connect to Socket.io server
const socket = io("http://localhost:3000");

const Dashboard = () => {
    const [claimsOnMyProducts, setClaimsOnMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch user ID dynamically (Replace with actual auth logic)
    const userId = localStorage.getItem("userId");

    // Fetch claims for user's products
    useEffect(() => {
        if (!userId) {
            setError("User not authenticated.");
            setLoading(false);
            return;
        }

        axios.get(`http://localhost:3000/api/claims/my-products/${userId}`)
            .then(res => {
                setClaimsOnMyProducts(res.data.claims);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to fetch claims.");
                setLoading(false);
            });
    }, [userId]);

    // Listen for real-time claim updates
    useEffect(() => {
        socket.on("newClaim", (newClaim) => {
            setClaimsOnMyProducts(prevClaims => [newClaim, ...prevClaims]);
        });

        return () => {
            socket.off("newClaim");
        };
    }, []);

    if (loading) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-4">Loading claims...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-600">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mt-4">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            {/* Claims on My Products */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Claims on My Products</h2>

                {claimsOnMyProducts.length === 0 ? (
                    <p className="text-gray-500 mt-2">No claims on your products.</p>
                ) : (
                    <div className="mt-4 space-y-4">
                        {claimsOnMyProducts.map(claim => (
                            <div key={claim._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                                <p className="font-semibold">🛒 Product: <span className="text-blue-600">{claim.product.name}</span></p>
                                <p className="text-gray-700">👤 Claimed By: {claim.user.email}</p>
                                <p className={`font-semibold mt-1 ${claim.status === "Pending" ? "text-yellow-600" : "text-green-600"}`}>
                                    🔄 Status: {claim.status}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
