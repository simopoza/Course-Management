import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';

// Define the structure of a single course
interface Course {
  title: string;
  description: string;
  instructor: string;
  schedule: string;
}

// Define the structure of the API response
interface CoursesResponse {
  courses: Course[]; // Array of courses
  total: number;     // Total number of courses
}

// Fetch courses data from the server
const fetchCourses = async ({ page, limit }: { page: number; limit: number }): Promise<CoursesResponse> => {
  const { data } = await axiosInstance.get('/courses', {
    params: { page, limit },
  });
  console.log('data: ', data);
  return data; // Return the API response directly
};

// Custom hook to use pagination for courses
export const useCourses = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['courses', page],    // This is the query key
    queryFn: () => fetchCourses({ page, limit }),  // This is the query function
    select: (data) => data, // You can transform your data here if needed
    keepPreviousData: true,  // Retain previous data while new data is being fetched
  } as UseQueryOptions<CoursesResponse, Error>);
};
