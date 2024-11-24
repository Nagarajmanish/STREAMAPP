import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import axios from 'axios';
import './EditEvent.css';

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate(); // Initialize navigate
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

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
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event.');
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Token is missing!');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, event, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Event updated successfully!');
      navigate('/browse'); // Navigate back to BrowsePage
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!event) return <div>Loading...</div>;

  return (
    <div className="edit-event-form">
      <h3>Edit Event</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            name="eventName"
            value={event.eventName || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={event.description || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={event.location || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={event.startDate ? event.startDate.split('T')[0] : ''}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={event.endDate ? event.endDate.split('T')[0] : ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={event.startTime || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={event.endTime || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Event Type:
          <select name="eventType" value={event.eventType || ''} onChange={handleChange}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </label>
        <label>
          Tickets Required:
          <input
            type="checkbox"
            name="ticketsRequired"
            checked={event.ticketsRequired || false}
            onChange={(e) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                ticketsRequired: e.target.checked,
              }))
            }
          />
        </label>
        <label>
          Max Capacity:
          <input
            type="number"
            name="maxCapacity"
            value={event.maxCapacity || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/browse')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEvent;