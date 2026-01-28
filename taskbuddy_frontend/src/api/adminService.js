import axiosInstance from './axiosInstance';

export const adminService = {
  // Dashboard Stats
  getStats: async () => {
    const response = await axiosInstance.get('/admin/stats');
    return response.data;
  },

  // User Management
  getAllUsers: async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Worker Management
  getAllWorkers: async () => {
    const response = await axiosInstance.get('/admin/workers');
    return response.data;
  },

  verifyWorker: async (workerId) => {
    const response = await axiosInstance.patch(`/admin/workers/${workerId}/verify`);
    return response.data;
  },

  deleteWorker: async (workerId) => {
    const response = await axiosInstance.delete(`/admin/workers/${workerId}`);
    return response.data;
  },

  // Booking Management
  getAllBookings: async () => {
    const response = await axiosInstance.get('/admin/bookings');
    return response.data;
  },

  updateBookingStatus: async (bookingId, status) => {
    const response = await axiosInstance.patch(`/admin/bookings/${bookingId}/status?status=${status}`);
    return response.data;
  },

  deleteBooking: async (bookingId) => {
    const response = await axiosInstance.delete(`/admin/bookings/${bookingId}`);
    return response.data;
  },

  // Service Management
  createService: async (serviceData) => {
    const response = await axiosInstance.post('/services', serviceData);
    return response.data;
  },

  updateService: async (serviceId, serviceData) => {
    const response = await axiosInstance.put(`/services/${serviceId}`, serviceData);
    return response.data;
  },

  deleteService: async (serviceId) => {
    const response = await axiosInstance.delete(`/services/${serviceId}`);
    return response.data;
  },

  // Reviews Management
  getAllReviews: async () => {
    const response = await axiosInstance.get('/admin/reviews');
    return response.data;
  },

  deleteReview: async (reviewId) => {
    const response = await axiosInstance.delete(`/admin/reviews/${reviewId}`);
    return response.data;
  },
};
