import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {


  return (
    <footer className="bg-[#121212] border-t border-[#292929] text-[#B0B0B0] py-6">
      <div className="max-w-[85rem] mx-auto px-6">
      
        {/* Copyright */}
        <div className="text-center mt-6 text-sm text-[#707070]">
          © {new Date().getFullYear()} Born Developer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
