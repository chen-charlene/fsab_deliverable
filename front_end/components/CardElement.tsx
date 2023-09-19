import React from "react";
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text } from "@chakra-ui/react";
import CourseTaken from "./CourseTaken"; 

const CardElement = ({CourseTaken}) => {
    return (
        <Card>
            <CardHeader>
                <Heading size='md'>Course Information</Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Summary
                    </Heading>
                    <Text pt='2' fontSize='sm'>Course: + {CourseTaken.courseName}</Text>
                    <Text pt='2' fontSize='sm'>Concentration: + {CourseTaken.concentration}</Text>
                    <Text pt='2' fontSize='sm'>Course Taken in: + {CourseTaken.takenIn}</Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                    Notes
                    </Heading>
                    <Text pt='2' fontSize='sm'>{CourseTaken.notes}</Text>
                </Box>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default CardElement;

