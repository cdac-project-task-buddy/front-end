import axiosInstance from './axiosInstance';

export const workerService = {
  getAllWorkers: async () => {
    const response = await axiosInstance.get('/workers');
    return response.data;
  },

  getWorkerById: async (id) => {
    const response = await axiosInstance.get(`/workers/${id}`);
    return response.data;
  },

  getWorkersByService: async (serviceId) => {
    const response = await axiosInstance.get(`/workers/by-service/${serviceId}`);
    return response.data;
  },

  getAvailableWorkers: async () => {
    const response = await axiosInstance.get('/workers/available');
    return response.data;
  },

  getTopRatedWorkers: async (minRating = 4.0) => {
    const response = await axiosInstance.get(`/workers/top-rated?minRating=${minRating}`);
    return response.data?.data || {};
  },

  updateWorkerProfile: async (profileData) => {
    const response = await axiosInstance.put('/workers/profile', profileData);
    return response.data;
  },

  updateAvailability: async (workerId, available) => {
    const response = await axiosInstance.patch(
      `/workers/${workerId}/availability?available=${available}`
    );
    return response.data;
  },

  addAvailability: async (workerId, availabilityData) => {
    const response = await axiosInstance.post(
      `/workers/${workerId}/availability`,
      availabilityData
    );
    return response.data;
  },

  getWorkerAvailability: async (workerId) => {
    const response = await axiosInstance.get(`/workers/${workerId}/availability`);
    return response.data;
  },
};