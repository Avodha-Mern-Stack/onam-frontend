import React, { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

const GuestList = ({ guests, onEdit, onDelete, onCheckIn, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone.includes(searchTerm)
  );

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'dd/MM/yyyy HH:mm');
    } catch {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return <div className="loading">Loading guests...</div>;
  }

  return (
    <div>
      <div className="section-header">
        <h2>All Guests ({filteredGuests.length})</h2>
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="table-container">
        <table className="guest-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Check In</th>
              <th>Attend</th>
              <th>Attend At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  No guests found
                </td>
              </tr>
            ) : (
              filteredGuests.map((guest) => (
                <tr key={guest._id}>
                  <td><strong>{guest.name}</strong></td>
                  <td>{guest.phone}</td>
                  <td>{formatDate(guest.checkIn)}</td>
                  <td>{guest.attend ? '✅ Yes' : '❌ No'}</td>
                  <td>{formatDate(guest.attendAt)}</td>
                  <td>
                    <span className={`badge ${guest.checkIn ? 'badge-checked' : 'badge-pending'}`}>
                      {guest.checkIn ? 'Checked In' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      {!guest.checkIn && (
                        <button
                          onClick={() => onCheckIn(guest._id)}
                          className="btn btn-success btn-sm"
                        >
                          Check In
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(guest)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(guest._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestList;