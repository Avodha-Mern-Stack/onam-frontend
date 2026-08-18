import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const BulkGuestForm = ({ onSave, onCancel }) => {
  const [bulkData, setBulkData] = useState('');
  const [format, setFormat] = useState('json');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bulkData.trim()) {
      toast.error('Please enter guest data');
      return;
    }

    try {
      let guests;
      if (format === 'json') {
        guests = JSON.parse(bulkData);
        if (!Array.isArray(guests)) {
          throw new Error('Data must be an array of guests');
        }
      } else {
        // CSV format: name,phone per line
        const lines = bulkData.split('\n').filter(line => line.trim());
        guests = lines.map(line => {
          const [name, phone] = line.split(',').map(s => s.trim());
          return { name, phone };
        });
      }

      // Validate each guest
      const invalidGuests = guests.filter(g => !g.name || !g.phone);
      if (invalidGuests.length > 0) {
        toast.error(`Found ${invalidGuests.length} invalid entries. Please check name and phone.`);
        return;
      }

      await onSave(guests);
      setBulkData('');
    } catch (error) {
      toast.error('Invalid data format: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Data Format</label>
        <div style={{ display: 'flex', gap: '15px' }}>
          <label>
            <input
              type="radio"
              value="json"
              checked={format === 'json'}
              onChange={() => setFormat('json')}
            />
            JSON
          </label>
          <label>
            <input
              type="radio"
              value="csv"
              checked={format === 'csv'}
              onChange={() => setFormat('csv')}
            />
            CSV
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Guest Data</label>
        {format === 'json' ? (
          <textarea
            className="bulk-textarea"
            value={bulkData}
            onChange={(e) => setBulkData(e.target.value)}
            placeholder='[{ "name": "John Doe", "phone": "1234567890" }, { "name": "Jane Smith", "phone": "0987654321" }]'
          />
        ) : (
          <textarea
            className="bulk-textarea"
            value={bulkData}
            onChange={(e) => setBulkData(e.target.value)}
            placeholder="John Doe, 1234567890&#10;Jane Smith, 0987654321"
          />
        )}
        <div className="bulk-help">
          <strong>Format:</strong><br />
          {format === 'json' ? (
            <>
              <code>[{`{ "name": "Name", "phone": "Phone" }`}]</code>
            </>
          ) : (
            <>
              <code>name, phone</code> per line
            </>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Add Bulk Guests
        </button>
      </div>
    </form>
  );
};

export default BulkGuestForm;