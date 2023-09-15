import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-sm">
          <p>Contact Us</p>
          <p>Email: contact@evelina.com</p>
          <p>Phone: +370-370-370</p>
        </div>
        <div className="text-sm">
          <p>Legal</p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>Cookie Policy</p>
          <p>Cookie Settings</p>
        </div>
        <div className="text-sm">
          <p>Explore</p>
          <p>Shopping</p>
          <p>Services</p>

        </div>
        <div className="flex space-x-4 col-span-2 md:col-span-1">
          <Link to="https://www.facebook.com/ozas.lt/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-3xl hover:text-blue-500" />
          </Link>
          <Link to="https://www.twitter.com/ozas.lt/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-3xl hover:text-blue-500" />
          </Link>
          <Link to="https://www.instagram.com/ozas.lt/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl hover:text-blue-500" />
          </Link>
          <Link to="https://www.linkedin.com/ozas.lt/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-3xl hover:text-blue-500" />
          </Link>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2023 Evelina Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
