import { useState, useEffect } from 'react';
import EventCard from './EventCard';
const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch('http://localhost:3002/events/upcoming');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  if (loading) return <div>Loading upcoming events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="featured-events">
      <h2>Upcoming Events</h2>
      <div className="events-container">
        {events.length === 0 ? (
          <p>No upcoming events found</p>
        ) : (
          events.map(event => (
            <EventCard key={event.eventID} event={event} /> ))
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;