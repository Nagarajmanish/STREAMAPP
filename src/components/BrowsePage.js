import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BrowsePage.css';

const BrowsePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  const getCookie = (name) => {
    const cookieArr = document.cookie.split(';');
    for (let cookie of cookieArr) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) return decodeURIComponent(cookieValue);
    }
    return null;
  };

  const token = getCookie('token');

  useEffect(() => {
    const usernameFromCookie = getCookie('username');
    setUserName(usernameFromCookie || '');
  }, []);

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
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete event!');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
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

  // Filter events by category and search term
  const filteredEvents = events
    .filter((event) =>
      category ? event.eventType?.toLowerCase() === category.toLowerCase() : true
    )
    .filter((event) =>
      searchTerm
        ? event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

  return (
    <div>
      <h2>Event Listings</h2>
      <div className="search-box">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      <div className="filters">
        <div className="category-buttons">
          <button onClick={() => setCategory('')}>All Events</button>
          <button onClick={() => setCategory('public')}>Public</button>
          <button onClick={() => setCategory('private')}>Private</button>
        </div>
       
      </div>
      <div className="event-container">
        {filteredEvents.length === 0 ? (
          <div>No events match your search criteria.</div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.eventName}</h3>
              <p>{event.description}</p>
              <p>Location: {event.location || 'Online'}</p>
              <p>Start: {new Date(event.startDate).toLocaleString()} {event.startTime || ''}</p>
              <p>End: {new Date(event.endDate).toLocaleString()} {event.endTime || ''}</p>
              <p>Creator: {event.creator?.name || 'Unknown'}</p>
              {event.creator?.name === userName && (
                <>
                  <button onClick={() => handleDelete(event._id)}>Delete</button>
                  <button onClick={() => handleEdit(event._id)}>Edit</button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
