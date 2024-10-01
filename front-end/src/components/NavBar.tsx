// src/components/NavBar.tsx
import React, { useState } from 'react';
import { Flex, Input, Spacer, HStack, Select } from '@chakra-ui/react';
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

interface NavBarProps {
  onSearch: (value: string, searchType: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("title");

  return (
    <Flex align="center" p={4} bg="teal.500">
      <Select
        placeholder="Search by"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        mr={4}
        maxWidth="200px"
        color="black"
      >
        <option value="title">Title</option>
        <option value="instructor">Instructor</option>
      </Select>
      <Input
        placeholder={`Search by ${searchType}`}
        onChange={(e) => onSearch(e.target.value, searchType)} // Pass the search type
        variant="filled"
        mr={4}
      />
      <Spacer />
      <HStack spacing={4}>
        <LogoutButton /> {/* Use the LogoutButton component here */}
      </HStack>
    </Flex>
  );
};

export default NavBar;
