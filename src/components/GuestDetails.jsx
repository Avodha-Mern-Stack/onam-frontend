import React from 'react';
import { format } from 'date-fns';

const GuestDetails = ({ guest, onClose }) => {
  if (!guest) return null;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Guest Details</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div style={{ padding: '10px 0' }}>
          <div style={{ marginBottom: '15px' }}>
            <strong>Name:</strong> {guest.name}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Phone:</strong> {guest.phone}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Check In:</strong> {formatDate(guest.checkIn)}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Attend:</strong> {guest.attend ? 'Yes' : 'No'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Attend At:</strong> {formatDate(guest.attendAt)}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>QR Token:</strong> {guest.qrToken || 'Not generated'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Status:</strong>{' '}
            <span className={`badge ${guest.checkIn ? 'badge-checked' : 'badge-pending'}`}>
              {guest.checkIn ? 'Checked In' : 'Pending'}
            </span>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;