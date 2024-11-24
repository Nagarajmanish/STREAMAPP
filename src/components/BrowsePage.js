import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BrowsePage.css';

const BrowsePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');

  const getCookie = (name) => {
    const cookieArr = document.cookie.split(';');
    for (let cookie of cookieArr) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) return decodeURIComponent(cookieValue);
    }
    return null;
  };

  const userName = getCookie('username');
  const token = getCookie('token');

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Event deleted!');
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id)); // Optimistic update
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete event!');
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredEvents = category
    ? events.filter((event) => event.eventType?.toLowerCase() === category.toLowerCase())
    : events;

  return (
    <div>
      <h2>Event Listings</h2>

      <div className="category-buttons">
        <button onClick={() => setCategory('')}>All Events</button>
        <button onClick={() => setCategory('public')}>Public</button>
        <button onClick={() => setCategory('private')}>Private</button>
      </div>

      <div className="event-container">
        {filteredEvents.length === 0 ? (
          <div>No events available for this category.</div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.eventName}</h3>
              <p>{event.description}</p>
              <p>Location: {event.location || 'Online'}</p>
              <p>Start: {new Date(event.startDate).toLocaleString() || 'TBD'} {event.startTime || ''}</p>
              <p>End: {new Date(event.endDate).toLocaleString() || 'TBD'} {event.endTime || ''}</p>
              <p>Creator: {event.creator?.name || 'Unknown'}</p>
              {event.creator?.name === userName && (
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
