import axiosInstance from './axiosInstance';

export const reviewService = {
  createReview: async (reviewData) => {
    const response = await axiosInstance.post('/reviews', reviewData);
    return response.data;
  },

  updateReview: async (reviewId, reviewData) => {
    const response = await axiosInstance.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  getWorkerReviews: async (workerId) => {
    const response = await axiosInstance.get(`/reviews/worker/${workerId}`);
    return response.data;
  },
};