import { useState, useEffect } from 'react';
import EventCard from './EventCard';

const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3002' 
  : ''; // Empty for production

const Events = ({ events: propEvents, filters }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localEvents, setLocalEvents] = useState([]);

  // Fetch events when component mounts or when filters change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // If parent component passes events (filtered), use those
        if (propEvents) {
          setEvents(propEvents);
          setLocalEvents(propEvents);
          setLoading(false);
          return;
        }

        // Otherwise fetch all events
        const response = await fetch(`${API_BASE}/events/all`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new TypeError("Response wasn't JSON");
        }
        
        const data = await response.json();
        setEvents(data);
        setLocalEvents(data); // Store a local copy
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [propEvents]);

  // Apply local filtering if filters are provided
  useEffect(() => {
    if (!filters || !localEvents.length) return;

    const filtered = localEvents.filter(event => {
      // City filter
      if (filters.cityID && event.CityID != filters.cityID) return false;
      
      // Category filter
      if (filters.categoryID && event.CategoryID != filters.categoryID) return false;
      
      // Date filter
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

    setEvents(filtered);
  }, [filters, localEvents]);

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section className="featured-events">
      <h2>{filters ? 'Filtered Events' : 'Upcoming Events'}</h2>
      <div className="events-container">
        {events.length === 0 ? (
          <p className="no-events">No events found</p>
        ) : (
          events.map(event => (
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