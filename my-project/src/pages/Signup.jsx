import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState(null);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signup(formData.name, formData.email, formData.password);
        if (result.success) {
            navigate("/dashboard");
        } else {
            setMessage(result.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
            {message && <p className="text-red-600 text-sm">{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" className="border p-2 w-full mb-3" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-3" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-3" onChange={handleChange} required />
                <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-md">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
