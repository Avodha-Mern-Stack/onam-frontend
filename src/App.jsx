import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import './styles/App.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
      padding: '15px 30px',
      boxShadow: '0 2px 20px rgba(15, 52, 96, 0.4)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexWrap: 'wrap',
      gap: '15px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px'
      }}>
        {/* Maveli GIF */}
        <img 
          src="https://media.tenor.com/0vNzwruEDdAAAAAM/mahabali-onam.gif"
          alt="Maveli"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #ffd700',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
            animation: 'float 3s ease-in-out infinite'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"%3E%3Ccircle cx="30" cy="30" r="28" fill="%23ffd700"/%3E%3Ctext x="30" y="36" font-size="24" text-anchor="middle" fill="%231a1a2e" font-weight="bold"%3E👑%3C/text%3E%3C/svg%3E';
          }}
        />
        <h2 style={{ 
          margin: 0, 
          color: '#ffd700',
          fontFamily: "'Playfair Display', serif",
          fontSize: '26px',
          textShadow: '0 2px 10px rgba(255, 215, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>🌟</span> കൽക്കി 2.0
        </h2>
      </div>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: location.pathname === '/user' ? '#ffd700' : 'white',
          fontWeight: '600',
          padding: '10px 24px',
          borderRadius: '25px',
          background: location.pathname === '/user' ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
          transition: 'all 0.3s',
          border: '2px solid',
          borderColor: location.pathname === '/user' ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>🎊</span> Guest Check-in
        </Link>
        <Link to="/admin" style={{
          textDecoration: 'none',
          color: location.pathname === '/' ? '#ffd700' : 'white',
          fontWeight: '600',
          padding: '10px 24px',
          borderRadius: '25px',
          background: location.pathname === '/' ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
          transition: 'all 0.3s',
          border: '2px solid',
          borderColor: location.pathname === '/' ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>👑</span> Admin Panel
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255,215,0,0.2)',
            },
            success: {
              duration: 3000,
              style: {
                background: 'linear-gradient(135deg, #00b894, #00a86b)',
                color: 'white',
                border: '1px solid rgba(0,184,148,0.3)',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                color: 'white',
                border: '1px solid rgba(238,90,36,0.3)',
              },
            },
          }}
        />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
