import React from 'react';
import { toast } from 'react-hot-toast';

const CheckInButton = ({ guestId, onCheckIn, disabled }) => {
  const handleCheckIn = async () => {
    if (window.confirm('Are you sure you want to check in this guest?')) {
      try {
        await onCheckIn(guestId);
        toast.success('Guest checked in successfully!');
      } catch (error) {
        toast.error('Failed to check in guest: ' + error.message);
      }
    }
  };

  return (
    <button
      onClick={handleCheckIn}
      className="btn btn-success btn-sm"
      disabled={disabled}
    >
      Check In
    </button>
  );
};

export default CheckInButton;