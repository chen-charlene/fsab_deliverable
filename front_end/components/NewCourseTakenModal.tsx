import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FormControl, FormLabel, Select } from "@chakra-ui/form-control";
import { Button, Input, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import {Props as CourseTakenProps} from "./CourseTaken";
import { TakenInOptionList } from "./CourseTaken";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSaveCourseTaken: (newCourseTaken: CourseTakenProps) => void;
}

const NewCourseTakenModal = ({isOpen, onClose, onSaveCourseTaken}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  function addNewCourseTaken(e: any) {
    e.preventDefault();
    setIsLoading(true);

    axios.courseTaken("http://localhost:8080/courseTaken", {
      courseName: e.target.courseName.value,
      instructor: e.target.instructor.value,
      concentration: e.target.concentration.value,
      takenIn: e.target.takenIn.value,
      notes: e.target.notes.value,
    })
    .then(function (response) {
      const newCourseTaken = {
        courseName: e.target.courseName.value,
        instructor: e.target.instructor.value,
        concentration: e.target.concentration.value,
        takenIn: e.target.takenIn.value,
        notes: e.target.notes.value,
      };
      onSaveCourseTaken(newCourseTaken);
      setIsLoading(false);
      onClose();
    })
    .catch(function (error) {
      console.log("An error has occurred: " + error)
      setIsLoading(false);
    })
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={addNewCourseTaken}>
        <ModalContent>
          <ModalHeader>Record New Course Taken</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Course Name</FormLabel>
              <Input required name="courseName" placeHolder="Enter the Course Name" />
            </FormControl>

            <FormControl>
              <FormLabel>Instructor</FormLabel>
              <Input required name="instructor" placeHolder="Enter the Course Instructor" />
            </FormControl>

            <FormControl>
              <FormLabel>Concentration</FormLabel>
              <Input required name="concentration" placeHolder="Enter the Concentration of the course"/>
            </FormControl>

            <FormControl>
              <FormLabel>Course Taken in</FormLabel>
              <Select required name="takenIn" placeholder="Select the semester & year">
              {
                TakenInOptionList.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              }
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Notes about the Course</FormLabel>
              <Input name="notes" placeHolder="Enter any notes about the course"/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
};

export default NewCourseTakenModal;