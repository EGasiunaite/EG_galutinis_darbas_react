import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="container flex justify-between items-center">
        <div className="text-sm">
          <p >Contact Us</p>
          <p>Email: contact@evelina.com</p>
          <p>Phone: +370-370-370</p>
        </div>
        <div>
          <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-3xl hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
