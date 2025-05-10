import React from 'react';

const EventCard = ({ event }) => {
  // Safely extract nested data with fallbacks
  const location = event.CityName || event?.city?.CityName || 'Location not specified';
  const category = event.CategoryName || event?.category?.CategoryName || 'Uncategorized';
  const date = event.StartTime 
    ? new Date(event.StartTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Date TBD';

  return (
    <div className="event-card">
      <h3>{event.Title || 'Untitled Event'}</h3>
      {event.Description && (
        <p className="event-description">{event.Description}</p>
      )}
      <div className="event-meta">
        <span>📍 {location}</span>
        <span>🏷️ {category}</span>
        <span>📅 {date}</span>
      </div>
      {event.TicketLink && (
        <a href={event.TicketLink} target="_blank" rel="noopener noreferrer" className="ticket-link">
          Get Tickets
        </a>
      )}
    </div>
  );
};

export default EventCard;