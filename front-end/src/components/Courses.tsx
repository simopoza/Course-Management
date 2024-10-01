// import { useState } from 'react';
// import { useCourses } from '../hooks/useCourses';
// import {
//   Box,
//   Button,
//   Text,
//   UnorderedList,
//   ListItem,
//   Collapse,
//   VStack,
//   HStack,
//   Spinner,
//   Alert,
//   AlertIcon,
// } from '@chakra-ui/react';

// interface Course {
//   _id: string;
//   title: string;
//   instructor: string;
//   description: string;
//   schedule: string;
// }

// const CoursesList = ({ searchQuery, searchType }: { searchQuery: string; searchType: string }) => {
//   const [page, setPage] = useState(1);
//   const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
//   const limit = 10;

//   const { data, isLoading, isError } = useCourses(page, limit);

//   const courses: Course[] = data?.data || [];
//   const totalCourses = data?.total || 0;
//   const totalPages = Math.ceil(totalCourses / limit);

//   // Filter courses based on search query and selected search type
//   const filteredCourses = courses.filter(course => {
//     const queryLower = searchQuery.toLowerCase();
//     if (searchType === 'title') {
//       return course.title.toLowerCase().includes(queryLower);
//     } else if (searchType === 'instructor') {
//       return course.instructor.toLowerCase().includes(queryLower);
//     } else {
//       // If no specific type is selected, search by both
//       return (
//         course.title.toLowerCase().includes(queryLower) ||
//         course.instructor.toLowerCase().includes(queryLower)
//       );
//     }
//   });

//   const toggleDetails = (courseId: string) => {
//     setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   if (isLoading) return <Spinner size="xl" />;
//   if (isError) return <Alert status="error"><AlertIcon />Error fetching courses</Alert>;

//   return (
//     <Box p={5} maxWidth="800px" mx="auto">
//       {/* Course List */}
//       <UnorderedList spacing={4}>
//         {filteredCourses.length > 0 ? (
//           filteredCourses.map((course) => (
//             <ListItem
//               key={course._id}
//               p={4}
//               borderWidth={1}
//               borderRadius="md"
//               boxShadow="md"
//               bg="linear-gradient(to right, yellow, orange)"
//               color="black"
//             >
//               <VStack align="start" spacing={2}>
//                 <HStack justify="space-between" width="100%">
//                   <Text fontWeight="bold" fontSize="lg">{course.title}</Text>
//                   <Button onClick={() => toggleDetails(course._id)} colorScheme="teal">
//                     {expandedCourseId === course._id ? 'Hide Details' : 'Show Details'}
//                   </Button>
//                 </HStack>
//                 <Text fontStyle="italic">Instructor: {course.instructor}</Text>

//                 <Collapse in={expandedCourseId === course._id}>
//                   <Box mt={3}>
//                     <Text fontWeight="bold">Description:</Text>
//                     <Text>{course.description}</Text>
//                     <Text fontWeight="bold" mt={2}>Schedule:</Text>
//                     <Text>{course.schedule}</Text>
//                   </Box>
//                 </Collapse>
//               </VStack>
//             </ListItem>
//           ))
//         ) : (
//           <Text>No courses found matching your search.</Text>
//         )}
//       </UnorderedList>

//       {/* Pagination Controls */}
//       <HStack justify="center" mt={4}>
//         <Button onClick={() => handlePageChange(page - 1)} isDisabled={page === 1}>
//           Previous
//         </Button>
//         {/* Render Page Buttons */}
//         {Array.from({ length: totalPages }, (_, index) => (
//           index + 1 <= 10 && ( // Only display up to 10 page buttons
//             <Button
//               key={index + 1}
//               onClick={() => handlePageChange(index + 1)}
//               isActive={page === index + 1}
//               mx={1} // Margin for spacing
//             >
//               {index + 1}
//             </Button>
//           )
//         ))}
//         <Button onClick={() => handlePageChange(page + 1)} isDisabled={page === totalPages}>
//           Next
//         </Button>
//       </HStack>
//     </Box>
//   );
// };

// export default CoursesList;


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
  const [page, setPage] = useState(1);  // Current page of displayed courses
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const limit = 10; // Number of courses per page

  // Fetching courses using the custom hook
  const { data, isLoading, isError } = useCourses(page, limit);
  const courses: Course[] = data?.data || [];
  const totalCourses = data?.total || 0; // Total number of courses
  const totalPages = Math.ceil(totalCourses / limit); // Calculate total pages

  // Filter courses based on search query and search type (title or instructor)
  const filteredCourses = courses.filter((course) => {
    const queryLower = searchQuery.toLowerCase();
    if (searchType === 'title') {
      return course.title.toLowerCase().includes(queryLower);
    } else if (searchType === 'instructor') {
      return course.instructor.toLowerCase().includes(queryLower);
    } else {
      return (
        course.title.toLowerCase().includes(queryLower) ||
        course.instructor.toLowerCase().includes(queryLower)
      );
    }
  });

  // Toggle course details when clicking 'Show Details'
  const toggleDetails = (courseId: string) => {
    setExpandedCourseId((prev) => (prev === courseId ? null : courseId));
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <Spinner size="xl" />;
  if (isError) return <Alert status="error"><AlertIcon />Error fetching courses</Alert>;

  return (
    <Box p={5} maxWidth="800px" mx="auto">
      {/* Course List */}
      <UnorderedList spacing={4}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
          ))
        ) : (
          <Text>No courses found matching your search.</Text>
        )}
      </UnorderedList>

      {/* Pagination Controls */}
      <HStack justify="center" mt={4}>
        <Button onClick={() => handlePageChange(page - 1)} isDisabled={page === 1}>
          Previous
        </Button>
        {/* Render Page Buttons in sets of 10 */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).slice((Math.ceil(page / 10) - 1) * 10, Math.ceil(page / 10) * 10).map((pageNum) => (
          <Button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            isActive={page === pageNum}
            mx={1}
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
