import React from 'react';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import '../styles/main.css';

const Header = ({ cities, categories, filters, onFilterChange, onApplyFilters, onResetFilters }) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <nav>
        <div className="logo">SceneOn</div>
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
      <div className="header-content">
        <h1>SceneOn Event Management</h1>
        <Filters 
          cities={cities}
          categories={categories}
          filters={filters}
          onFilterChange={onFilterChange}
          onApplyFilters={onApplyFilters}
          onResetFilters={onResetFilters}
        />
      </div>
    </header>
  );
};

export default Header;
