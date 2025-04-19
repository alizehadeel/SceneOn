import React, { useState } from 'react';
import '../styles/main.css';

const Filters = ({ 
  cities = [], 
  categories = [], 
  filters, 
  onFilterChange, 
  onApplyFilters,
  onResetFilters 
}) => {
  const [showCustomDates, setShowCustomDates] = useState(false);

  const handleDateRangeChange = (e) => {
    onFilterChange(e);
    setShowCustomDates(e.target.value === 'custom');
  };

  return (
    <section className="filters">
      <form id="filter-form" onSubmit={onApplyFilters}>
        <div className="filter-group">
          <label htmlFor="city-filter">City</label>
          <select
            id="city-filter"
            name="cityID"
            value={filters.cityID || ''}
            onChange={onFilterChange}
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
            onChange={onFilterChange}
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

        <div className="filter-group">
          <label htmlFor="date-range">Date Range</label>
          <select
            id="date-range"
            name="dateRange"
            value={filters.dateRange}
            onChange={handleDateRangeChange}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {showCustomDates && (
          <div className="filter-group">
            <div>
              <label htmlFor="start-date">From</label>
              <input
                type="date"
                id="start-date"
                name="startDate"
                value={filters.startDate || ''}
                onChange={onFilterChange}
              />
            </div>
            <div>
              <label htmlFor="end-date">To</label>
              <input
                type="date"
                id="end-date"
                name="endDate"
                value={filters.endDate || ''}
                onChange={onFilterChange}
              />
            </div>
          </div>
        )}

        <div className="filter-actions">
          <button type="submit" className="filter-button">
            Search
          </button>
          <button 
            type="button" 
            className="filter-button reset-button"
            onClick={onResetFilters}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filters;