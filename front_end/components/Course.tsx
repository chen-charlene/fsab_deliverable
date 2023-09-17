import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
    courseName: string;
    instructor: string;
    concentration: string;
}

const Course = ({courseName, instructor, concentration}: Props) => {
    return (
        <Box width="100%">
          <Box my={3}>
            <Text fontSize="lg" fontWeight="bold">{courseName}</Text>
            <Text fontSize="md" fontWeight="bold">{concentration}</Text>
            <Text fontSize="sm">Instructor: {instructor}</Text>
          </Box>
          <Divider />
        </Box>
      );
};

export default Course;