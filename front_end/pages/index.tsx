import {Button, Container, HStack, Spacer, Text, VStack} from "@chakra-ui/react"
import { useState } from "react";
import NewCourseTakenModal from "../components/NewCourseTakenModal";
import CourseTaken, { Props } from "../components/CourseTaken";
import React from "react";
import axios from "axios";
import CardElement from "../components/CardElement";

export default function Home() {
    const [newCourseAdded, setNewCourseAdded] = useState(false);

    const course1 = {
        courseName: "MATH0100",
        instructor: "Prof. A",
        concentration: "MATH",
        takenIn: "Fall 2020",
        notes: "I didn't like the class.",
    };

    const course2 = {
        courseName: "ENGN0032",
        instructor: "Prof. B",
        concentration: "ENGN",
        takenIn: "Fall 2021",
        notes: "My fav class ever!!",
    };

    const course3 = {
        courseName: "MATH0180",
        instructor: "Prof. C",
        concentration: "MATH",
        takenIn: "Spring 2022",
        notes: "I didn't like the class either.",
    };

    const onSaveCourseTaken = (newCourseTaken) => {
        axios
          .post("http://localhost:8080/courseTaken", newCourseTaken)
          .then(function (response) {
            console.log("Course saved successfully");
          })
          .catch(function (error) {
            console.error("An error occurred:", error);
          });
      };

    return (
        <div>
            <NewCourseTakenModal 
                isOpen={newCourseAdded} 
                onClose={() => setNewCourseAdded(false)} 
                onSaveCourseTaken={onSaveCourseTaken}
            />
            <Container maxW="container.sm">
                <HStack my={10}>
                <Text fontSize="5xl" fontWeight={800}>
                    Archived Courses
                </Text>
                <Spacer />
                <Button onClick={() => setNewCourseAdded(true)}>New</Button>
                </HStack>
                <VStack>
                    <CardElement CourseTaken={course1}/>
                    <CardElement CourseTaken={course2}/>
                    <CardElement CourseTaken={course3}/>
                </VStack>
            </Container>
        </div>
    )
}
