import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import * as guestApi from '../api/guestApi';
import GuestList from '../components/GuestList';
import GuestForm from '../components/GuestForm';
import BulkGuestForm from '../components/BulkGuestForm';
import GuestDetails from '../components/GuestDetails';
import '../styles/App.css';

const Dashboard = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [editingGuest, setEditingGuest] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    checkedIn: 0,
    pending: 0,
    attended: 0,
  });

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const response = await guestApi.getAllGuests();
      setGuests(response.data);
      updateStats(response.data);
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
    const pending = total - checkedIn;
    const attended = guestList.filter(g => g.attend).length;

    setStats({ total, checkedIn, pending, attended });
  };

  const handleCreateGuest = async (guestData) => {
    try {
      await guestApi.createGuest(guestData);
      toast.success('Guest added successfully!');
      setShowForm(false);
      fetchGuests();
    } catch (error) {
      toast.error('Failed to add guest');
      console.error(error);
    }
  };

  const handleBulkCreate = async (guestsData) => {
    try {
      await guestApi.bulkCreateGuests(guestsData);
      toast.success(`${guestsData.length} guests added successfully!`);
      setShowBulkForm(false);
      fetchGuests();
    } catch (error) {
      toast.error('Failed to add bulk guests');
      console.error(error);
    }
  };

  const handleUpdateGuest = async (guestData) => {
    try {
      await guestApi.updateGuest(editingGuest._id, guestData);
      toast.success('Guest updated successfully!');
      setEditingGuest(null);
      setShowForm(false);
      fetchGuests();
    } catch (error) {
      toast.error('Failed to update guest');
      console.error(error);
    }
  };

  const handleDeleteGuest = async (id) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      try {
        await guestApi.deleteGuest(id);
        toast.success('Guest deleted successfully!');
        fetchGuests();
      } catch (error) {
        toast.error('Failed to delete guest');
        console.error(error);
      }
    }
  };

  const handleCheckInGuest = async (id) => {
    try {
      await guestApi.checkInGuest(id);
      toast.success('Guest checked in successfully!');
      fetchGuests();
    } catch (error) {
      toast.error('Failed to check in guest');
      console.error(error);
    }
  };

  const handleViewGuest = (guest) => {
    setSelectedGuest(guest);
  };

  const handleEditGuest = (guest) => {
    setEditingGuest(guest);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <h1>🎉 Onam <span>Celebration</span></h1>
        <div className="nav-actions">
          <button className="nav-btn" onClick={() => setShowForm(true)}>
            ➕ Add Guest
          </button>
          <button className="nav-btn" onClick={() => setShowBulkForm(true)}>
            📋 Bulk Add
          </button>
          <button className="nav-btn" onClick={fetchGuests}>
            🔄 Refresh
          </button>
        </div>
      </nav>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Guests</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h3>Checked In</h3>
          <div className="stat-number" style={{ color: '#28a745' }}>{stats.checkedIn}</div>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <div className="stat-number" style={{ color: '#ffc107' }}>{stats.pending}</div>
        </div>
        <div className="stat-card">
          <h3>Attended</h3>
          <div className="stat-number" style={{ color: '#17a2b8' }}>{stats.attended}</div>
        </div>
      </div>

      {/* Guest List */}
      <div className="main-content">
        <GuestList
          guests={guests}
          loading={loading}
          onEdit={handleEditGuest}
          onDelete={handleDeleteGuest}
          onCheckIn={handleCheckInGuest}
          onView={handleViewGuest}
        />
      </div>

      {/* Create/Edit Guest Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => {
          setShowForm(false);
          setEditingGuest(null);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingGuest ? 'Edit Guest' : 'Add New Guest'}</h3>
              <button className="modal-close" onClick={() => {
                setShowForm(false);
                setEditingGuest(null);
              }}>×</button>
            </div>
            <GuestForm
              guest={editingGuest}
              onSave={editingGuest ? handleUpdateGuest : handleCreateGuest}
              onCancel={() => {
                setShowForm(false);
                setEditingGuest(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Bulk Create Modal */}
      {showBulkForm && (
        <div className="modal-overlay" onClick={() => setShowBulkForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Bulk Add Guests</h3>
              <button className="modal-close" onClick={() => setShowBulkForm(false)}>×</button>
            </div>
            <BulkGuestForm
              onSave={handleBulkCreate}
              onCancel={() => setShowBulkForm(false)}
            />
          </div>
        </div>
      )}

      {/* Guest Details Modal */}
      {selectedGuest && (
        <GuestDetails
          guest={selectedGuest}
          onClose={() => setSelectedGuest(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;