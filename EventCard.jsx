import React from 'react';
import '../styles/EventCard.css';

const EventCard = ({ event }) => {
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

  // Category-to-image mapping
  const getCategoryImage = () => {
    const categoryImages = {
      'Music': '/images/events/music-default.jpg',
      'Food': '/images/events/food-default.jpg',
      'Art': '/images/events/art-default.jpg',
      'Sports': '/images/events/sports-default.jpg',
      'Adventure & Thrill': '/images/events/adventure-default.jpg'
    };
    return categoryImages[category] || '/default-event.jpg';
  };

  return (
    <div className="event-card">
      <div className="event-image-container">
        <img 
          src={getCategoryImage()}  // Changed to use category-based images
          alt={`${event.Title || 'Event'} - ${category}`}
          className="event-image"
          onError={(e) => {
            e.target.src = '/default-event.jpg';
            e.target.classList.add('error-image');
          }}
        />
      </div>
      
      <div className="event-details">
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
    </div>
  );
};

export default EventCard;
