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
const fetchCourses = async ({
  page,
  limit,
  query = '',
  searchType = 'title',  // Default search type is 'title'
}: {
  page: number;
  limit: number;
  query?: string;
  searchType?: string;
}): Promise<CoursesResponse> => {
  const { data } = await axiosInstance.get('https://localhost:3000/courses', {
    params: { page, limit, query, searchType },
  });
  return data; // Return the API response directly
};

// Custom hook to use pagination and search for courses
export const useCourses = (
  page: number, 
  limit: number, 
  query: string = '',         
  searchType: string = 'title'
) => {
  return useQuery({
    queryKey: ['courses', page, query, searchType],
    queryFn: () => fetchCourses({ page, limit, query, searchType }),
    select: (data) => data,
    keepPreviousData: true,  // Retain previous data while new data is being fetched
  } as UseQueryOptions<CoursesResponse, Error>);
};
