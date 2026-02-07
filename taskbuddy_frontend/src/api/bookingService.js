import axiosInstance from './axiosInstance';

export const bookingService = {
  createBooking: async (bookingData) => {
    const response = await axiosInstance.post('/bookings', bookingData);
    return response.data;
  },

  getMyBookings: async () => {
    const response = await axiosInstance.get('/bookings/my-bookings');
    return response.data.data; // Backend wraps in ApiResponse
  },

  getWorkerBookings: async () => {
    const response = await axiosInstance.get('/bookings/worker-bookings');
    return response.data;
  },

  getBookingById: async (id) => {
    const response = await axiosInstance.get(`/bookings/${id}`);
    return response.data;
  },

  updateBookingStatus: async (id, status) => {
    const response = await axiosInstance.patch(
      `/bookings/${id}/status?status=${status}`
    );
    return response.data;
  },

  cancelBooking: async (id) => {
    const response = await axiosInstance.patch(`/bookings/${id}/cancel`);
    return response.data;
  },

  deleteBooking: async (id) => {
    const response = await axiosInstance.delete(`/bookings/${id}`);
    return response.data;
  },
};