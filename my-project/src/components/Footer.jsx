import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#013220] text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold">🌱 Footprintx</h2>
        <p className="text-sm opacity-80 mt-2">Connecting People Through Reusable Products</p>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-gray-300 transition-all duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-gray-300 transition-all duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-gray-300 transition-all duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="hover:text-gray-300 transition-all duration-300">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs opacity-70 mt-4">&copy; {new Date().getFullYear()} Footprintx. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
