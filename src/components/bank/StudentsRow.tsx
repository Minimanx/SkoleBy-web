import { Box, Flex } from "@chakra-ui/react";
import { Student } from "../../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const StudentsRow = ({
  student,
  index,
  selectedStudent,
  setSelectedStudent,
}: {
  student: Student;
  index: number;
  selectedStudent: Student | undefined;
  setSelectedStudent: Dispatch<SetStateAction<Student | undefined>>;
}) => {
  let [color, setColor] = useState("");
  useEffect(() => {
    setColor(() => {
      return selectedStudent && selectedStudent.id === student.id
        ? "#02098f"
        : index % 2 === 0
        ? "#1f3ebf"
        : "#3c55bf";
    });
  }, [selectedStudent]);
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      fontSize={{ base: "18px", md: "24px" }}
      p="3"
      backgroundColor={color}
      alignItems="center"
      borderRadius="10px"
      _hover={{ cursor: "pointer" }}
      onClick={() => {
        setSelectedStudent(() => {
          return student;
        });
      }}
    >
      <Flex w="70%" justifyContent="flex-start" alignItems="center">
        <Box>{student.name}</Box>
      </Flex>
      <Box>
        {student.Transaction.reduce((acc, current) => {
          return acc + current.amount;
        }, 0)}
      </Box>
    </Flex>
  );
};

export default StudentsRow;
