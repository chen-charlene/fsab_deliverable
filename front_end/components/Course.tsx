import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";

const TakenInOptionList = ["Fall 2020", "Winter 2020", "Spring 2021", "Summer 2021", 
                            "Fall 2021", "Winter 2021", "Spring 2022", "Summer 2022", 
                            "Fall 2022", "Winter 2022", "Spring 2023", "Summer 2023",
                            "Fall 2023"] as const;

interface Props {
    courseName: string;
    concentration: string;
    takenIn: typeof TakenInOptionList[number];
    comments: string;
}

const Course = ({courseName, concentration, takenIn, comments}: Props) => {
    return (
        <Box width="100%">
          <Box my={3}>
            <Text fontSize="lg" fontWeight="bold">{courseName}</Text>
            <Text fontSize="sm">{concentration}</Text>
            <Text fontSize="sm">Taken In: {takenIn}</Text>
            <Text fontSize="xs">Comments: {comments}</Text>
          </Box>
          <Divider />
        </Box>
      );
};

export default Course;