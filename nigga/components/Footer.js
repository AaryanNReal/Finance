// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Stay Connected</h2>
          <p className="text-sm">Subscribe to our newsletter for the latest updates</p>
          <form className="flex justify-center mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-lg focus:outline-none"
              required
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded-r-lg">
              Subscribe
            </button>
          </form>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#about" className="hover:text-blue-400">About Us</a>
          <a href="#services" className="hover:text-blue-400">Services</a>
          <a href="#contact" className="hover:text-blue-400">Contact</a>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} YourWebsiteName. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
