import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-6 px-6">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2024 My Website. All rights reserved.</p>
          <ul className="flex space-x-4">
            <li><a href="https://facebook.com" className="hover:text-gray-400">Facebook</a></li>
            <li><a href="https://twitter.com" className="hover:text-gray-400">Twitter</a></li>
            <li><a href="https://linkedin.com" className="hover:text-gray-400">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
