import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000',
  withCredentials: true, // Send cookies along with requests
});

// Response interceptor to handle token expiration and refresh
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, return it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token and if we haven't retried the request yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Send a request to refresh the token
        const refreshResponse = await axios.post('https://localhost:3000/auth/refresh-token', {}, {
          withCredentials: true, // Include cookies (refreshToken)
        });

        console.log('Token refreshed successfully:', refreshResponse);

        // Cookies (accessToken and refreshToken) are updated in the browser by the backend response

        // Retry the original request with the new token, the cookie should now have the refreshed access token
        return axiosInstance(originalRequest); // Retry the request
      } catch (refreshError) {
        // Handle refresh token failure, e.g., log out the user
        console.error('Refresh token failed:', refreshError);
        window.location.href = '/'; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // If not a 401 or already retried, reject the error
  }
);

export default axiosInstance;


// const handleLogout = async () => {
//   try {
//     await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
//     // Redirect to login or homepage
//     window.location.href = '/login';
//   } catch (error) {
//     console.error("Error during logout: ", error);
//   }
// };