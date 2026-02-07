import axiosInstance from './axiosInstance';

export const paymentService = {
  createPaymentOrder: async (paymentData) => {
    try {
      const response = await axiosInstance.post('/payments/create-order', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  verifyPayment: async (verificationData) => {
    try {
      const response = await axiosInstance.post('/payments/verify', verificationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};