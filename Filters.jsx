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
    const { name, value } = e.target;
    onFilterChange(e);
    setShowCustomDates(value === 'custom');
  };

  const handleChange = (e) => {
    onFilterChange(e);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setShowCustomDates(false);
    onResetFilters();
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
            aria-label="Select city"
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
            aria-label="Select category"
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
            aria-label="Select date range"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {showCustomDates && (
          <div className="filter-group custom-dates">
            <div>
              <label htmlFor="start-date">From</label>
              <input
                type="date"
                id="start-date"
                name="startDate"
                value={filters.startDate || ''}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                aria-label="Start date"
              />
            </div>
            <div>
              <label htmlFor="end-date">To</label>
              <input
                type="date"
                id="end-date"
                name="endDate"
                value={filters.endDate || ''}
                onChange={handleChange}
                min={filters.startDate || new Date().toISOString().split('T')[0]}
                aria-label="End date"
              />
            </div>
          </div>
        )}

        <div className="filter-actions">
          <button 
            type="submit" 
            className="filter-button"
            aria-label="Apply filters"
          >
            Search
          </button>
          <button 
            type="button" 
            className="filter-button reset-button"
            onClick={handleReset}
            aria-label="Reset filters"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filters;
