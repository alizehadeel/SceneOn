// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} SceneOn Event Management System</p>
    </footer>
  );
};

export default Footer;