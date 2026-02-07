import axiosInstance from './axiosInstance';

export const userService = {
  getProfile: async () => {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await axiosInstance.put('/users/profile', profileData);
    return response.data;
  },
};
