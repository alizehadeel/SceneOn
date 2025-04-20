import React from 'react';
import '../styles/main.css';

const Filters = ({ 
  cities = [], 
  categories = [], 
  filters, 
  onFilterChange, 
  onApplyFilters,
  onResetFilters 
}) => {

  
  const handleReset = (e) => {
    e.preventDefault();
    console.log("Reset button clicked");
    onResetFilters();
  };

  const handleChange = (e) => {
    onFilterChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(e);
  };
  return (
    <section className="filters">
      <form id="filter-form" onSubmit={handleSubmit}>
        <div className="filter-group">
          <label htmlFor="city-filter">City</label>
          <select
            id="city-filter"
            name="cityID"
            value={filters.cityID || ''}
            onChange={handleChange}
            disabled={!cities.length}
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city.CityID} value={city.CityID}>
                {city.CityName}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            name="categoryID"
            value={filters.categoryID || ''}
            onChange={handleChange}
            disabled={!categories.length}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.CategoryID} value={cat.CategoryID}>
                {cat.CategoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-actions">
          <button type="submit" className="filter-button">
          Search
          </button>
          <button 
            type="reset" 
            className="filter-button reset-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filters;
