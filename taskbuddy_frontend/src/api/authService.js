import axiosInstance from "./axiosInstance";

export const authService = {
  register: async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return {
      token: response.data.token,
      userId: response.data.userId,
      role: response.data.userRole,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
    };
  },

   login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return {
      token: response.data.token,
      userId: response.data.userId,
      role: response.data.userRole,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
    };
  },

  logout: async () => {
    // backend is stateless → nothing to call
    return Promise.resolve();
  },
};
