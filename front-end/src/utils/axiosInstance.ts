import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000', // Base URL for your API
  withCredentials: true, // Send cookies along with requests
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axiosInstance.post('/auth/refresh-token', {}, {
          withCredentials: true,
        });
        return axiosInstance(originalRequest); // Retry with refreshed token
      } catch (refreshError) {
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
