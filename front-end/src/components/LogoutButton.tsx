import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import axiosInstance from '../utils/axiosInstance';

const LogoutButton: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true); // Start loading state
    try {
      await axiosInstance.post('/auth/logout');
      window.location.href = '/'; // Redirect to the login page after logout
    } catch (error: any) {
      if (error.response) {
        console.error('Logout failed:', error.response.data.message || 'Unknown error');
      } else {
        console.error('Logout failed:', error.message);
      }
    } finally {
      setIsLoggingOut(false); // End loading state
    }
  };

  return (
    <Button onClick={handleLogout} colorScheme="red" isLoading={isLoggingOut}>
      Logout
    </Button>
  );
};

export default LogoutButton;
