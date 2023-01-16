import {
  Box,
  Center,
  Flex,
  Spinner,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminScreenWrapper from "../../components/AdminScreenWrapper";
import StudentsRow from "../../components/bank/StudentsRow";
import StudentsTable from "../../components/bank/StudentsTable";
import {
  useGetUserQuery,
  useGetStudentsQuery,
  usePostTransactionMutation,
} from "../../redux/api";
import { Student, User } from "../../types";
import { themes } from "../ScreenThemes";

const AdminBankScreen = () => {
  const toast = useToast();
  const user = useGetUserQuery();
  const students = useGetStudentsQuery();
  const [filter, setFilter] = useState("");
  const theme = themes["bank"];

  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

  const [trigger, result] = usePostTransactionMutation();

  useEffect(() => {
    if (!students.currentData) return;

    setFilteredStudents(
      students.currentData.filter((student) =>
        student.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [students.currentData, filter]);

  return (
    <AdminScreenWrapper>
      <Flex w="full" justifyContent="center" flexDirection="column">
        {user.currentData && students.currentData ? (
          <>
            <Flex
              w="full"
              justifyContent="flex-end"
              alignItems="center"
              flexDirection="column"
            >
              <Text
                fontWeight="medium"
                fontSize={{ base: "24px", md: "30px" }}
                color="white"
                marginBottom="10"
              >
                Hæv penge
              </Text>
              <Text
                fontWeight="medium"
                fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                color="white"
                alignSelf="flex-start"
              >
                Vælg elev
              </Text>
              <Input
                placeholder="Søg..."
                size="lg"
                _placeholder={{ color: "dark-grey" }}
                value={filter}
                onChange={(event) => setFilter(() => event.target.value)}
                bg="white"
                borderColor={theme.primaryHoverColor}
                marginBottom="5"
              />
              <Box w="full">
                <StudentsTable>
                  {filteredStudents.map((item, index) => {
                    return (
                      <StudentsRow
                        key={item.id}
                        student={item}
                        index={index}
                        selectedStudent={selectedStudent}
                        setSelectedStudent={setSelectedStudent}
                      />
                    );
                  })}
                </StudentsTable>
              </Box>
              {selectedStudent && (
                <>
                  <Flex
                    marginTop="10"
                    h="40px"
                    w="full"
                    justifyContent="space-between"
                  >
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                      color="white"
                      alignSelf="flex-start"
                    >
                      {selectedStudent?.name}
                    </Text>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                      color="white"
                      alignSelf="flex-start"
                    >
                      {selectedStudent?.Transaction.reduce((acc, current) => {
                        return acc + current.amount;
                      }, 0)}
                    </Text>
                  </Flex>
                  <Flex w="full">
                    <Input
                      placeholder="Beløb..."
                      type="number"
                      size="lg"
                      _placeholder={{ color: "dark-grey" }}
                      onChange={(event) =>
                        setWithdrawAmount(() => Number(event.target.value))
                      }
                      bg="white"
                      borderColor={theme.primaryHoverColor}
                    />

                    <Button
                      size="lg"
                      marginLeft="2"
                      borderColor={theme.primaryHoverColor}
                      bg={
                        selectedStudent?.Transaction.reduce((acc, current) => {
                          return acc + current.amount;
                        }, 0) < withdrawAmount || withdrawAmount <= 0
                          ? "#e15656"
                          : "#57b357"
                      }
                      disabled={
                        selectedStudent?.Transaction.reduce((acc, current) => {
                          return acc + current.amount;
                        }, 0) < withdrawAmount || withdrawAmount <= 0
                      }
                      onClick={() => {
                        trigger({
                          title: "Hævet penge",
                          amount: withdrawAmount * -1,
                          userId: selectedStudent.id,
                        })
                          .unwrap()
                          .then(() => {
                            setWithdrawAmount(() => 0);
                            setSelectedStudent(() => undefined);
                            toast({
                              title: "Penge hævet",
                              status: "success",
                              duration: 5000,
                              isClosable: true,
                              position: "top",
                            });
                          });
                      }}
                    >
                      Hæv
                    </Button>
                  </Flex>
                </>
              )}
            </Flex>
          </>
        ) : user.isLoading || students.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </AdminScreenWrapper>
  );
};

export default AdminBankScreen;
