import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import {
  Box,
  Button,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Collapse,
  VStack,
  HStack,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const CoursesList = () => {
  const [page, setPage] = useState(1);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const limit = 10;

  const { data, isLoading, isError } = useCourses(page, limit);

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <Alert status="error"><AlertIcon />Error fetching courses</Alert>;

  const courses = data?.data || [];

  const toggleDetails = (courseId) => {
    setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
  };

  return (
    <Box p={5} maxWidth="800px" mx="auto">
      <Heading as="h1" size="xl" mb={5} textAlign="center">
        Course List
      </Heading>
      <UnorderedList spacing={4}>
        {courses.map((course) => (
          <ListItem
            key={course._id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bgGradient="linear(to-r, yellow, orange)" // Apply gradient background here
            color="black" // Change text color for better contrast
          >
            <VStack align="start" spacing={2}>
              <HStack justify="space-between" width="100%">
                <Text fontWeight="bold" fontSize="lg">{course.title}</Text>
                <Button onClick={() => toggleDetails(course._id)} colorScheme="teal">
                  {expandedCourseId === course._id ? 'Hide Details' : 'Show Details'}
                </Button>
              </HStack>
              <Text fontStyle="italic">Instructor: {course.instructor}</Text>

              <Collapse in={expandedCourseId === course._id}>
                <Box mt={3}>
                  <Text fontWeight="bold">Description:</Text>
                  <Text>{course.description}</Text>
                  <Text fontWeight="bold" mt={2}>Schedule:</Text>
                  <Text>{course.schedule}</Text>
                </Box>
              </Collapse>
            </VStack>
          </ListItem>
        ))}
      </UnorderedList>

      <HStack spacing={4} justify="center" mt={5}>
        <Button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <Text>
          Page {page} of {Math.ceil((data?.total || 0) / limit)}
        </Text>
        <Button
          onClick={() => setPage((old) => old < Math.ceil((data?.total || 0) / limit) ? old + 1 : old)}
          disabled={!data || (courses.length < limit)}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default CoursesList;
