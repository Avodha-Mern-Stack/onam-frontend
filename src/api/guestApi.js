import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Guest Operations
export const getAllGuests = () => api.get('/');
export const getGuestById = (id) => api.get(`/${id}`);
export const createGuest = (guestData) => api.post('/', guestData);
export const bulkCreateGuests = (guestsData) => api.post('/bulk', guestsData);
export const updateGuest = (id, guestData) => api.put(`/${id}`, guestData);
export const deleteGuest = (id) => api.delete(`/${id}`);

// Check-in Operations
export const checkInGuest = (id) => api.post(`/checkin/${id}`);

export default api;