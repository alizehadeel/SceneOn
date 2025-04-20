import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Events from './components/Events';
import Categories from './components/Categories';
import Footer from './components/Footer';
import UpcomingEvents from './components/UpcomingEvents';
import './styles/main.css';

const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3002' 
  : '';

function App() {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
const [resetTrigger, setResetTrigger] = useState(0);
  const [filters, setFilters] = useState({
    cityID: '',
    categoryID: '',
    dateRange: 'all',
    startDate: '',
    endDate: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilteredResults, setShowFilteredResults] = useState(false);

  const fetchData = useCallback(async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE}/events/${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new TypeError(`Expected JSON, got ${contentType}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to load ${endpoint}:`, error);
      throw error;
    }
  }, []);

  const fetchCities = useCallback(async () => {
    try {
      const data = await fetchData('cities');
      setCities(data);
    } catch (error) {
      setError(`Cities: ${error.message}`);
    }
  }, [fetchData]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await fetchData('categories');
      setCategories(data);
    } catch (error) {
      setError(`Categories: ${error.message}`);
    }
  }, [fetchData]);

  const fetchUpcomingEvents = useCallback(async () => {
    try {
      const data = await fetchData('upcoming');
      setUpcomingEvents(data);
      setEvents(data); // Also set main events
    } catch (error) {
      setError(`Upcoming Events: ${error.message}`);
    }
  }, [fetchData]);

  // Helper function in App.js
const getDateRangeParams = (range) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  switch(range) {
    case 'today':
      return {
        startDate: today.toISOString(),
        endDate: new Date(today).setHours(23, 59, 59, 999)
      };
    case 'week':
      const weekEnd = new Date(today);
      weekEnd.setDate(weekEnd.getDate() + 7);
      return {
        startDate: today.toISOString(),
        endDate: weekEnd.toISOString()
      };
    case 'month':
      const monthEnd = new Date(today);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      return {
        startDate: today.toISOString(),
        endDate: monthEnd.toISOString()
      };
    default:
      return {};
  }
};
  // Update your fetchFilteredEvents:
const fetchFilteredEvents = useCallback(async () => {
  setIsLoading(true);
  try {
    const params = new URLSearchParams();
    
    if (filters.cityID) params.append('cityID', filters.cityID);
    if (filters.categoryID) params.append('categoryID', filters.categoryID);
    
    if (filters.dateRange && filters.dateRange !== 'all') {
      const { startDate, endDate } = getDateRangeParams(filters.dateRange);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
    }

    const response = await fetch(`${API_BASE}/events/filtered?${params}`);
    const data = await response.json();
    setEvents(data);
    setShowFilteredResults(true);
  } catch (error) {
    console.error("Filter error:", error);
  } finally {
    setIsLoading(false);
  }
}, [filters]);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchCities(),
          fetchCategories(),
          fetchUpcomingEvents()
        ]);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [fetchCities, fetchCategories, fetchUpcomingEvents]);
  
  // Add this helper function
  const getDateRange = (range) => {
    const today = new Date();
    switch(range) {
      case 'today':
        return { 
          startDate: today.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0]
        };
      case 'week':
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return {
          startDate: today.toISOString().split('T')[0],
          endDate: nextWeek.toISOString().split('T')[0]
        };
      case 'month':
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + 1);
        return {
          startDate: today.toISOString().split('T')[0],
          endDate: nextMonth.toISOString().split('T')[0]
        };
      default:
        return {};
    }
  };
  // Add this state
const [filterChanged, setFilterChanged] = useState(false);
  // Modify your handleFilterChange function
const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters(prev => ({ ...prev, [name]: value }));
  setFilterChanged(true); // Set flag when filters change
};
 // Modify your applyFilters function
const applyFilters = (e) => {
  e.preventDefault();
  setFilterChanged(false); // Reset the change flag
  fetchFilteredEvents();
};

const resetFilters = async () => {
  console.log("Resetting filters...");
  
  // Reset filter state
  setFilters({
    cityID: '',
    categoryID: '',
    dateRange: 'all',
    startDate: '',
    endDate: ''
  });

  // Hide filtered results view
  setShowFilteredResults(false);

  // Reload upcoming events
  try {
    const data = await fetchData('upcoming');
    setUpcomingEvents(data);
    setEvents(data);
    console.log("Reset completed successfully");
  } catch (error) {
    console.error("Reset failed:", error);
  }
};
  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <Header 
        cities={cities} 
        categories={categories} 
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={applyFilters}
        onResetFilters={resetFilters} // Make sure this is passed
      />
     {!showFilteredResults ? (
  <UpcomingEvents events={upcomingEvents} />
) : (
  <Events 
    events={events}
    filters={filters}
    cities={cities}
    categories={categories}
  />
)}
      <Categories categories={categories} />
      <Footer />
    </div>
  );
}

export default App;
