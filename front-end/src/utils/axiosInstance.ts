import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000', // Base URL for your API
  withCredentials: true, // Send cookies along with requests
});

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check for 401 error and if it's not already retried
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Attempt to refresh the token
//         const refreshResponse = await axiosInstance.post('/auth/refresh-token', {}, {
//           withCredentials: true,
//         });

//         // If successful, set new access token in cookies and retry original request
//         return axiosInstance(originalRequest); // Retry original request with new token
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError);
//         window.location.href = '/'; // Redirect to login or home if refresh fails
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
