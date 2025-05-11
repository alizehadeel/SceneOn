import React from 'react';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import '../styles/main.css';
import logo from '../styles/logo.jpg'; // Adjust path based on your file location

const Header = ({ cities, categories, filters, onFilterChange, onApplyFilters, onResetFilters }) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-content">
          <nav className="header-nav">
            <div className="logo-container">
              <img src={logo} alt="SceneOn Logo" className="logo-image" />
              <h1 className="logo-text">SceneOn</h1>
            </div>
            <div className="auth-buttons">
              <button 
                className="auth-button login" 
                onClick={() => navigate('/')}
              >
                Login
              </button>
              <button 
                className="auth-button signup" 
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="header-content">
          <Filters 
            cities={cities}
            categories={categories}
            filters={filters}
            onFilterChange={onFilterChange}
            onApplyFilters={onApplyFilters}
            onResetFilters={onResetFilters}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
