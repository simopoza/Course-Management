import { useState, useEffect, useCallback } from 'react';
import { Heading, Box, Spinner, Text } from '@chakra-ui/react';
import CoursesList from '../components/Courses';
import NavBar from '../components/NavBar';
import axiosInstance from '../utils/axiosInstance';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("title");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSearch = (value: string, type: string) => {
    setSearchQuery(value);
    setSearchType(type);
  };

  // Function to check if the user is authenticated
  const checkAuthentication = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/auth/check');
      setIsAuthenticated(response.status === 200);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  // Render loading spinner while authentication status is being checked
  const renderLoadingSpinner = () => (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Spinner size="xl" />
    </Box>
  );

  // Render message when user is not authorized
  const renderUnauthorizedMessage = () => (
    <Box textAlign="center" pt={8}>
      <Text fontSize="2xl" color="red.500">You are not authorized to view this page.</Text>
    </Box>
  );

  if (loading) return renderLoadingSpinner();
  if (!isAuthenticated) return renderUnauthorizedMessage();

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <Heading as="h1" size="xl" mb={5} pt={8} textAlign="center">
        Course List
      </Heading>
      <CoursesList searchQuery={searchQuery} searchType={searchType} />
    </>
  );
};

export default HomePage;
