import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const GuestForm = ({ guest, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (guest) {
      setFormData({
        name: guest.name || '',
        phone: guest.phone || '',
      });
    }
  }, [guest]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await onSave(formData);
      setFormData({ name: '', phone: '' });
    } catch (error) {
      console.error('Error saving guest:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter guest name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {guest ? 'Update Guest' : 'Add Guest'}
        </button>
      </div>
    </form>
  );
};

export default GuestForm;