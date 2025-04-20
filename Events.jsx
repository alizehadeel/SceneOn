import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const Events = ({ events = [], filters = {}, cities = [], categories = [] }) => {
  const [displayEvents, setDisplayEvents] = useState(events);

  useEffect(() => {
    if (!filters || !events) {
      setDisplayEvents(events || []);
      return;
    }

    const filtered = events.filter(event => {
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

      return true;
    });

    console.log('Filtered events:', filtered); // Debug log
    setDisplayEvents(filtered);
  }, [events, filters, cities, categories]);

  return (
    <section className="featured-events">
      <h2>Filtered Events</h2>
      <div className="events-container">
        {displayEvents.length === 0 ? (
          <p className="no-events">No events match your filters</p>
        ) : (
          displayEvents.map(event => (
            <EventCard 
              key={event.EventID} 
              event={event} 
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Events;
