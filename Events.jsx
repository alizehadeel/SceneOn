import React, { useMemo } from 'react';
import EventCard from './EventCard';

const Events = ({ events = [], filters = {}, cities = [], categories = [] }) => {
  const filteredEvents = useMemo(() => {
    if (!events || !events.length) return [];

    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));

    return events.filter(event => {
      const eventDate = new Date(event.StartTime);
      
      // City filter
      if (filters.cityID) {
        const city = cities.find(c => c.CityID == filters.cityID);
        if (!city || event.CityName !== city.CityName) return false;
      }

      // Category filter
      if (filters.categoryID) {
        const category = categories.find(c => c.CategoryID == filters.categoryID);
        if (!category || event.CategoryName.trim() !== category.CategoryName.trim()) return false;
      }

      // Date filtering
      if (filters.dateRange && filters.dateRange !== 'all') {
        switch(filters.dateRange) {
          case 'today':
            return eventDate >= todayStart && eventDate <= todayEnd;
          
          case 'week':
            const weekEnd = new Date();
            weekEnd.setDate(weekEnd.getDate() + 7);
            return eventDate >= todayStart && eventDate <= weekEnd;
          
          case 'month':
            const monthEnd = new Date();
            monthEnd.setMonth(monthEnd.getMonth() + 1);
            return eventDate >= todayStart && eventDate <= monthEnd;
          
          case 'custom':
            const startDate = filters.startDate ? new Date(filters.startDate) : null;
            const endDate = filters.endDate ? new Date(filters.endDate) : null;
            endDate?.setHours(23, 59, 59, 999); // Include entire end day
            
            if (startDate && eventDate < startDate) return false;
            if (endDate && eventDate > endDate) return false;
            return true;
          
          default:
            return true;
        }
      }
      
      return true;
    });
  }, [events, filters, cities, categories]);

  return (
    <section className="featured-events">
      <h2>Filtered Events</h2>
      <div className="events-container">
        {filteredEvents.length === 0 ? (
          <p className="no-events">No events match your filters</p>
        ) : (
          filteredEvents.map(event => (
            <EventCard key={event.EventID} event={event} />
          ))
        )}
      </div>
    </section>
  );
};

export default Events;
