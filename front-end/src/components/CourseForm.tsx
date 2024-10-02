import { useState } from 'react';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import axiosInstance from '../utils/axiosInstance';

const CourseForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    schedule: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/courses', formData); // Adjust the endpoint as needed
      onSubmit(); // Call the onSubmit prop to refresh courses
      setFormData({ title: '', description: '', instructor: '', schedule: '' }); // Reset form
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <Input
        name="title"
        placeholder="Course Title"
        value={formData.title}
        onChange={handleChange}
        mb={3}
        required
      />
      <Textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        mb={3}
        required
      />
      <Input
        name="instructor"
        placeholder="Instructor"
        value={formData.instructor}
        onChange={handleChange}
        mb={3}
        required
      />
      <Input
        name="schedule"
        placeholder="Schedule"
        value={formData.schedule}
        onChange={handleChange}
        mb={3}
        required
      />
      <Button type="submit" colorScheme="teal">Submit</Button>
    </Box>
  );
};

export default CourseForm;
