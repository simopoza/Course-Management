// import { useState, useEffect } from 'react';
// import { Heading, Box, Spinner, Text } from '@chakra-ui/react';
// import CoursesList from '../components/Courses';
// import NavBar from '../components/NavBar';
// import axios from 'axios';

// const HomePage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchType, setSearchType] = useState("title");
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // For checking auth status
//   const [loading, setLoading] = useState(true); // To show a loading spinner while checking auth

//   const handleSearch = (value: string, type: string) => {
//     setSearchQuery(value);
//     setSearchType(type);
//   };

//   // Function to check if the user is authenticated
//   const checkAuthentication = async () => {
//     try {
//       const response = await axios.get('https://localhost:3000/auth/check', { withCredentials: true }); // assuming backend route
//       if (response.status === 200) {
//         setIsAuthenticated(true);
//       }
//     } catch (error) {
//       setIsAuthenticated(false);
//     } finally {
//       setLoading(false); // Stop loading once we know the auth status
//     }
//   };

//   useEffect(() => {
//     checkAuthentication(); // Check authentication when the component loads
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <Spinner size="xl" />
//       </Box>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <Box textAlign="center" pt={8}>
//         <Text fontSize="2xl" color="red.500">You are not authorized to view this page.</Text>
//       </Box>
//     );
//   }

//   return (
//     <>
//       <NavBar onSearch={handleSearch} />
//       <Heading as="h1" size="xl" mb={5} pt={8} textAlign="center">
//         Course List
//       </Heading>
//       <CoursesList searchQuery={searchQuery} searchType={searchType} />
//     </>
//   );
// };

// export default HomePage;


import { useState, useEffect, useCallback } from 'react';
import { Heading, Box, Spinner, Text } from '@chakra-ui/react';
import CoursesList from '../components/Courses';
import NavBar from '../components/NavBar';
import axios from 'axios';

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
      const response = await axios.get('https://localhost:3000/auth/check', { withCredentials: true });
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
