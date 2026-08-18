import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import * as guestApi from '../api/guestApi';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    checkedIn: 0,
    attended: 0,
    notAttended: 0
  });
  const [recentCheckins, setRecentCheckins] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [notAttendedGuests, setNotAttendedGuests] = useState([]);
  const [gifError, setGifError] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const response = await guestApi.getAllGuests();
      setGuests(response.data);
      updateStats(response.data);
      
      // Get recent check-ins (last 5)
      const checkedInGuests = response.data
        .filter(g => g.checkIn)
        .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
        .slice(0, 5);
      setRecentCheckins(checkedInGuests);

      // Get attendees (people who attended)
      const attendedGuests = response.data
        .filter(g => g.attend)
        .sort((a, b) => new Date(b.attendAt) - new Date(a.attendAt));
      setAttendees(attendedGuests);

      // Get guests who have NOT attended (attend = false)
      const notAttended = response.data
        .filter(g => !g.attend)
        .sort((a, b) => a.name.localeCompare(b.name));
      setNotAttendedGuests(notAttended);
      
    } catch (error) {
      toast.error('Failed to fetch guests');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (guestList) => {
    const total = guestList.length;
    const checkedIn = guestList.filter(g => g.checkIn).length;
    const attended = guestList.filter(g => g.attend).length;
    const notAttended = total - attended;
    setStats({ total, checkedIn, attended, notAttended });
  };

  const handleCheckIn = async (id) => {
    try {
      await guestApi.checkInGuest(id);
      toast.success('🎉 Check-in successful! Welcome to കൽക്കി 2.0!');
      fetchGuests();
      setSearchTerm(''); // Clear search after check-in
    } catch (error) {
      toast.error('Failed to check in');
      console.error(error);
    }
  };

  // Only show students when searching
  const filteredGuests = searchTerm.trim() === '' 
    ? [] // Empty list when no search
    : notAttendedGuests.filter(guest =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.phone.includes(searchTerm)
      );

  const formatTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="user-loading">
        <div className="onam-decoration">
          <div className="flower-decoration">🌸</div>
          <div className="flower-decoration">🌺</div>
          <div className="flower-decoration">🌻</div>
          <div className="flower-decoration">🌼</div>
          <div className="flower-decoration">🌸</div>
        </div>
        <div className="loading-spinner"></div>
        <p>🎊 Loading കൽക്കി 2.0 Celebration...</p>
      </div>
    );
  }

  return (
    <div className="user-container">
      {/* Decorative Header with Maveli GIF */}
      <div className="onam-header-decoration">
        <div className="decorative-elements">
          <span className="deco-left">🌸</span>
          <span className="deco-left">🌺</span>
          <span className="deco-left">🌻</span>
          <span className="deco-left">🌼</span>
        </div>
        
        <header className="user-header">
          <div className="header-content">
            <div className="onam-banner">
              <div className="pookalam-decoration">🌺🌸🌻🌼🌸🌺</div>
              
              {/* Maveli GIF */}
              <div className="maveli-gif-container">
                {!gifError ? (
                  <img 
                    src="https://i.makeagif.com/media/9-07-2016/LM3rmJ.gif"
                    alt="Maveli"
                    className="maveli-gif"
                    onError={() => setGifError(true)}
                  />
                ) : (
                  <div className="maveli-fallback">👑</div>
                )}
              </div>
              
              <h1>🌟 കൽക്കി 2.0 🌟</h1>
              <p className="subtitle">✦ Guest Check-in System ✦</p>
              <div className="pookalam-decoration">🌺🌸🌻🌼🌸🌺</div>
            </div>
          </div>
        </header>

        <div className="decorative-elements">
          <span className="deco-right">🌼</span>
          <span className="deco-right">🌻</span>
          <span className="deco-right">🌺</span>
          <span className="deco-right">🌸</span>
        </div>
      </div>

      {/* Stats with Theme */}
      <div className="user-stats">
        {/* <div className="stat-item total">
          <div className="stat-icon">👥</div>
          <span className="stat-label">Total Guests</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-item checked-in">
          <div className="stat-icon">✅</div>
          <span className="stat-label">Checked In</span>
          <span className="stat-value">{stats.checkedIn}</span>
        </div>
        <div className="stat-item attended">
          <div className="stat-icon">🎯</div>
          <span className="stat-label">Attended</span>
          <span className="stat-value">{stats.attended}</span>
        </div>
        <div className="stat-item not-attended">
          <div className="stat-icon">⏳</div>
          <span className="stat-label">Not Attended</span>
          <span className="stat-value">{stats.notAttended}</span>
        </div> */}
      </div>

      {/* Attendees List */}
      {/* {attendees.length > 0 && (
        <div className="attendees-section">
          <h3>🎯 Attendees List ({attendees.length})</h3>
          <div className="attendees-grid">
            {attendees.map((guest) => (
              <div key={guest._id} className="attendee-card">
                <span className="attendee-name">{guest.name}</span>
                <span className="attendee-time">
                  🕐 {formatTime(guest.attendAt)}
                </span>
                <span className="attendee-date">
                  📅 {formatDate(guest.attendAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Recent Check-ins */}
      {recentCheckins.length > 0 && (
        <div className="recent-checkins">
          <h3>🕐 Recent Check-ins</h3>
          <div className="recent-list">
            {recentCheckins.map((guest) => (
              <div key={guest._id} className="recent-item">
                <span className="recent-name">{guest.name}</span>
                <span className="recent-time">{formatTime(guest.checkIn)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="search-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="user-search"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
        {/* <button onClick={fetchGuests} className="refresh-btn">
          🔄 Refresh
        </button> */}
      </div>

      {/* Guest List - Shows students ONLY when searching */}
      <div className="user-guest-list">
        <div className="list-header">
          <h2>
            🌟 Guests List 
            <span style={{fontSize: '14px', color: '#ff6b6b', marginLeft: '8px'}}>
              (Not Attended)
            </span>
          </h2>
          <span className="guest-count">
            {searchTerm ? `${filteredGuests.length} found` : 'Search to find guests'}
          </span>
        </div>
        
        {!searchTerm ? (
          // Show search prompt when no search term
          <div className="empty-state search-prompt">
            <div className="empty-icon">🔍</div>
            <p>Search for a guest</p>
            <span className="empty-sub">Enter name or phone number to find guests</span>
          </div>
        ) : filteredGuests.length === 0 ? (
          // Show no results when search has no matches
          <div className="empty-state">
            <div className="empty-icon">😕</div>
            <p>No results found for "{searchTerm}"</p>
            <span className="empty-sub">Try searching with a different name or phone number</span>
          </div>
        ) : (
          // Show search results
          <div className="guest-grid">
            {filteredGuests.map((guest) => (
              <div key={guest._id} className={`guest-card ${guest.checkIn ? 'checked-in-card' : ''}`}>
                <div className="guest-avatar">
                  {guest.checkIn ? '🎉' : '👤'}
                </div>
                <div className="guest-info">
                  <h3 className="guest-name">{guest.name}</h3>
                  <p className="guest-phone">📱 {guest.phone}</p>
                  <div className="guest-status">
                    <span className={`status-badge ${guest.checkIn ? 'checked-in' : 'pending'}`}>
                      {guest.checkIn ? '✅ Checked In' : '⏳ Pending'}
                    </span>
                    {guest.checkIn && (
                      <span className="checkin-time">
                        🕐 {formatTime(guest.checkIn)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleCheckIn(guest._id)}
                  disabled={guest.checkIn}
                  className={`checkin-btn ${guest.checkIn ? 'checked-in-btn' : ''}`}
                >
                  {guest.checkIn ? (
                    <>
                      <span>✓</span> Checked In
                    </>
                  ) : (
                    <>
                      <span>🎊</span> Check In
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="user-footer">
        <div className="footer-content">
          <p>🌸 Welcome to കൽക്കി 2.0 Celebration! 🌸</p>
          <p className="footer-copy">© 2026 കൽക്കി 2.0. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;