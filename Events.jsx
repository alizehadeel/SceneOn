import { useState, useEffect } from 'react';
import EventCard from './EventCard';

const Events = ({ events, filters }) => {
  const [displayEvents, setDisplayEvents] = useState(events || []);

  useEffect(() => {
    if (!filters || !events) {
      setDisplayEvents(events || []);
      return;
    }

    const filtered = events.filter(event => {
      if (filters.cityID && event.CityID != filters.cityID) return false;
      if (filters.categoryID && event.CategoryID != filters.categoryID) return false;
      
      if (filters.dateRange && filters.dateRange !== 'all') {
        const eventDate = new Date(event.StartTime);
        const now = new Date();
        
        switch(filters.dateRange) {
          case 'today':
            return eventDate.toDateString() === now.toDateString();
          case 'week':
            const nextWeek = new Date(now);
            nextWeek.setDate(now.getDate() + 7);
            return eventDate >= now && eventDate <= nextWeek;
          case 'month':
            const nextMonth = new Date(now);
            nextMonth.setMonth(now.getMonth() + 1);
            return eventDate >= now && eventDate <= nextMonth;
          case 'custom':
            if (filters.startDate && new Date(event.StartTime) < new Date(filters.startDate)) return false;
            if (filters.endDate && new Date(event.StartTime) > new Date(filters.endDate)) return false;
            return true;
          default:
            return true;
        }
      }
      return true;
    });

    setDisplayEvents(filtered);
  }, [events, filters]);

  return (
    <section className="featured-events">
      <h2>Filtered Events</h2>
      <div className="events-container">
        {displayEvents.length === 0 ? (
          <p className="no-events">No events match your filters</p>
        ) : (
          displayEvents.map(event => (
            <EventCard 
              key={event.eventID || event.EventID} 
              event={event} 
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Events;