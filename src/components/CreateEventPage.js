import React, { useState } from 'react';
import './CreateEventPage.css';

const CreateEventPage = () => {
  const [eventType, setEventType] = useState('public');
  const [locationType, setLocationType] = useState('physical');
  const [capacity, setCapacity] = useState(50); // default max capacity set to 50
  const [requireApproval, setRequireApproval] = useState(false); // state for toggle

  const handleLocationChange = (event) => {
    setLocationType(event.target.value);
  };

  const handleCapacityChange = (event) => {
    const value = event.target.value;
    if (value <= 50) { // Restrict the max capacity to 50
      setCapacity(value);
    }
  };

  const handleToggleChange = () => {
    setRequireApproval(!requireApproval);
  };

  return (
    <div className="create-event-page">
      <h2>Create Event</h2>
      <form>
        {/* Event Type: Public or Private */}
        <label>Event Type:</label>
        <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        {/* Event Name */}
        <label>Event Name:</label>
        <input type="text" placeholder="Enter event name" required />

        {/* Start Date and Time */}
        <label>Start Date:</label>
        <input type="date" required />
        
        <label>Start Time:</label>
        <input type="time" required />

        {/* End Date and Time */}
        <label>End Date:</label>
        <input type="date" required />
        
        <label>End Time:</label>
        <input type="time" required />

        {/* Event Location */}
        <label>Event Location:</label>
        <select value={locationType} onChange={handleLocationChange}>
          <option value="physical">Physical Location</option>
          <option value="virtual">Virtual</option>
        </select>

        {/* Conditionally show virtual options when "Virtual" is selected */}
        {locationType === 'virtual' && (
          <>
            <label>Virtual Event Options:</label>
            <select>
              <option value="create_zoom">Create Zoom Meeting</option>
              <option value="select_zoom">Select Existing Zoom Meeting</option>
            </select>
          </>
        )}

        {/* Event Description */}
        <label>Description:</label>
        <textarea placeholder="Enter description" rows="4" required></textarea>

        {/* Event Options */}
        <legend style={{color:"black", fontWeight:"bold"}}>Event Options:</legend>
        <fieldset>
          {/* Tickets */}
          <div className='select'>
          <label>Tickets:</label>
          <select style={{marginLeft:"10px"}}>
            <option value="free">Free</option>
            <option value="paid">Paid (coming soon)</option>
          </select>
          </div>

          {/* Require Approval with Toggle Switch */}
          <div className='toggle-switch'>
          <label>Require Approval:</label>
            <input
              type="checkbox"
              id="requireApproval"
              checked={requireApproval}
              onChange={handleToggleChange}
            />
            <label htmlFor="requireApproval" className="switch-label"></label>
            <span>{requireApproval ? 'Yes' : 'No'}</span> {/* Display On/Off */}
          </div>

          {/* Event Capacity */}
          <div className='capacity'>
          <label>Max Capacity (50 max):</label>
          <input  style={{marginLeft:"10px"}}
            type="number"
            value={capacity}
            onChange={handleCapacityChange}
            min="1"
            max="50"
            required
          />
          </div>
        </fieldset>

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
