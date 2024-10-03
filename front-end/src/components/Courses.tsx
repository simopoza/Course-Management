import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import {
  Box,
  Button,
  Text,
  UnorderedList,
  ListItem,
  Collapse,
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

interface Course {
  _id: string;
  title: string;
  instructor: string;
  description: string;
  schedule: string;
}

const CoursesList = ({ searchQuery, searchType }: { searchQuery: string; searchType: string }) => {
  const [page, setPage] = useState(1);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const limit = 10;

  const { data, isLoading, isError } = useCourses(page, limit, searchQuery, searchType);
  const courses: Course[] = data?.data || [];
  const totalCourses = data?.total || 0;
  const totalPages = Math.ceil(totalCourses / limit);

  const toggleDetails = (courseId: string) => {
    setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <Alert status="error"><AlertIcon />Error fetching courses</Alert>;

  return (
    <Box p={5} maxWidth="800px" mx="auto">
      <UnorderedList spacing={4}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <ListItem
              key={course._id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              bg="linear-gradient(to right, yellow, orange)"
              color="black"
            >
              <VStack align="start" spacing={2}>
                {/* Title and Instructor */}
                <HStack
                  justify="space-between"
                  width="100%"
                  flexDirection={{ base: 'column', md: 'row' }} // Stack on small screens
                >
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: 'md', md: 'lg' }} // Adjust font size for responsiveness
                    isTruncated
                    width={{ base: '100%', md: 'auto' }} // Full width on mobile, auto on larger screens
                  >
                    {course.title}
                  </Text>
                  <Text fontStyle="italic" width={{ base: '100%', md: 'auto' }}>Instructor: {course.instructor}</Text>
                </HStack>

                {/* Button for Show/Hide Details */}
                <Button
                  onClick={() => toggleDetails(course._id)}
                  colorScheme="teal"
                  size="md"
                  px={{ base: 2, md: 4 }}
                  mt={{ base: 2, md: 0 }} // Margin top on mobile
                >
                  {expandedCourseId === course._id ? 'Hide Details' : 'Show Details'}
                </Button>

                {/* Details Collapse */}
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
          ))
        ) : (
          <Text>No courses found matching your search.</Text>
        )}
      </UnorderedList>

      <HStack justify="center" mt={4} flexWrap="wrap">
        <Button onClick={() => handlePageChange(page - 1)} isDisabled={page === 1}>
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .slice((Math.ceil(page / 10) - 1) * 10, Math.ceil(page / 10) * 10)
          .map((pageNum) => (
            <Button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              isActive={page === pageNum}
              mx={1}
              size={{ base: "sm", md: "md" }}
            >
              {pageNum}
            </Button>
          ))}
        <Button onClick={() => handlePageChange(page + 1)} isDisabled={page === totalPages}>
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default CoursesList;
