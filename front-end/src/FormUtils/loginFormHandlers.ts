// src/FormUtils/loginFormHandlers.ts

import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

export const handleLoginSubmit = ({
  email,
  password,
  setErrorMessage,
  navigate,
}: {
  email: string;
  password: string;
  setErrorMessage: (message: string) => void;
  navigate: (path: string) => void;
}) => async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!/\S+@\S+\.\S+/.test(email)) {
    setErrorMessage('Your email is not valid');
    return;
  }

  if (password.length < 8) {
    setErrorMessage('Your password must be at least 8 characters long');
    return;
  }

  setErrorMessage('');

  try {

    const response = await axiosInstance.post(
      '/auth/login',
      { email, password }
    );

    console.log('Login successful', response.data);
    const { user } = response.data;
    console.log('user: ', user);


    // Redirect based on user role
    navigate('/HomePage'); // Redirect to client page
  } catch (error) {
    console.error('Login error:', error);

    if (axios.isAxiosError(error) && error.response) {
      const errorData = error.response.data;
      setErrorMessage(errorData.message || 'Login failed');
    } else {
      setErrorMessage('An error occurred during login');
    }
  }
};


// const handleLogout = () => {
//   // Remove token and user data from localStorage
//   localStorage.removeItem('authToken');
//   localStorage.removeItem('userData');

// 	//send request to backend??

//   // Redirect to login page or show a logged-out state
//   window.location.href = '/login';
// };

// const token = localStorage.getItem('authToken');
// const userData = localStorage.getItem('userData');

// // Parse user data if it exists
// const user = userData ? JSON.parse(userData) : null;

// console.log('Retrieved user data:', user);