import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirect
import Topbar from './components/Topbar';
import LoginPage from './components/LoginPage'; 
import SignUpPage from './components/SignUpPage'; 
import Sidebar from './components/Sidebar';
import MainPlayer from './components/MainPlayer';
import LiveGrid from './components/LiveGrid';
import BrowsePage from './components/BrowsePage';
import CreateEventPage from './components/CreateEventPage';
import StreamPlayer from './components/StreamPlayer';  // Import the new component
import './components/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Topbar />
        <div className="content">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Home Page Route */}
              <Route
                path="/"
                element={
                  <>
                    <MainPlayer />
                    <LiveGrid />
                  </>
                }
              />

              {/* Browse Page Route */}
              <Route path="/browse" element={<BrowsePage />} />

              {/* Create Event Page Route */}
              <Route path="/create-event" element={<CreateEventPage />} />

              {/* Stream Player Route */}
              <Route path="/watch/:id" element={<StreamPlayer />} />  {/* Dynamic route for watching a stream */}

              {/* Redirect any unmatched route to the Home Page */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
