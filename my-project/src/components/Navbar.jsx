import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🌿 Footprintx</Link>
        <div>
          <Link to="/" className="mx-4 hover:text-secondary">Home</Link>
          <Link to="/add-product" className="mx-4 hover:text-secondary">Add Product</Link>
          <Link to="/dashboard" className="mx-4 hover:text-secondary">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
