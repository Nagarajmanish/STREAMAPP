import React, { useEffect, useState } from 'react';
import './BrowsePage.css';

const BrowsePage = () => {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');

  const fetchLiveStreams = async () => {
    const clientId = 'fbd0jyq0b40dam94c23f6qv351p4b9'; // Your actual Twitch Client ID
    const accessToken = 'w8th4xxfo9lbfxlebtxpocotxwm8h3'; // Your actual OAuth token
  
    try {
      const response = await fetch('https://api.twitch.tv/helix/streams?first=100', {
        method: 'GET',
        headers: {
          'Client-ID': clientId,
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch live streams');
      }
  
      const data = await response.json();
      console.log('API Response:', data); // Log full API response for inspection
      return data.data; // This gives an array of live streams
    } catch (error) {
      console.error('Error fetching live streams:', error);
      return [];
    }
  };
  
  useEffect(() => {
    const loadStreams = async () => {
      setLoading(true);
      try {
        const liveStreams = await fetchLiveStreams();
        console.log('Fetched Live Streams:', liveStreams);
        setStreams(liveStreams);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadStreams();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredStreams = category === 'games'
    ? streams.filter((stream) => stream.game_name) // Filter streams that have a game name for "Games"
    : category
    ? streams.filter((stream) => {
        const gameName = stream.game_name ? stream.game_name.toLowerCase() : '';
        return (
          // (category === 'music' && 
          //   (gameName.includes('music') || 
          //   gameName.includes('band') || 
          //   gameName.includes('live') || 
          //   gameName.includes('performance') || 
          //   gameName.includes('concert') || 
          //   gameName.includes('dj') || 
          //   gameName.includes('just chatting')))          
          //   ||
          (category === 'irl' && gameName.includes('just chatting')) ||
          (category === 'creative' && (gameName.includes('creative') || 
          gameName.includes('art') || gameName.includes('craft'))) || 
          (category === 'esports' && (gameName.includes('esports') || 
          gameName.includes('competitive') || gameName.includes('tournament') ||
            gameName.includes('league') || 
            gameName.includes('valorant'))) 
        );
      })
    : streams; // Default to showing all streams if no category is selected

  const width = 250; // Set your desired width
  const height = 230; // Set your desired height

  return (
    <div>
      <h2>Stream Listings</h2>

      <div className="category-buttons">
        <button onClick={() => setCategory('')}>Top Recommendations</button>
        <button onClick={() => setCategory('irl')}>IRL</button>
        <button onClick={() => setCategory('creative')}>Creative</button>
        <button onClick={() => setCategory('esports')}>Esports</button>
        <button onClick={() => setCategory('games')}>Games</button>
        {/* <button onClick={() => setCategory('music')}>Music</button> */}
      </div>

      <div className="stream-container">
        {filteredStreams.length === 0 ? (
          <div>No streams available for this category.</div>
        ) : (
          filteredStreams.map((stream) => (
            <div key={stream.id} className="stream-card">
              <h3>{stream.title}</h3>
              {/* Replace width and height placeholders in the thumbnail URL */}
              <img 
                src={stream.thumbnail_url.replace('{width}', width).replace('{height}', height)} 
                alt={stream.title} 
                style={{ width: `${width}px`, height: `${height}px` }} 
              />
              <p>Viewers: {stream.viewer_count}</p>
              <a href={`https://www.twitch.tv/${stream.user_name}`} target="_blank" rel="noopener noreferrer">Watch Now</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
