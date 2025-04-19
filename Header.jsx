// src/components/Header.jsx
import React from 'react';
import Filters from './Filters';

const Header = ({ cities, categories, filters, onFilterChange, onApplyFilters }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>SceneOn Event Management</h1>
        <Filters 
          cities={cities}
          categories={categories}
          filters={filters}
          onFilterChange={onFilterChange}
          onApplyFilters={onApplyFilters}
        />
      </div>
    </header>
  );
};

export default Header;