import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import TransactionRow from "../components/bank/TransactionRow";
import TransactionTable from "../components/bank/TransactionTable";
import ScreenLogo from "../components/ScreenLogo";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetStudentQuery, useGetTransactionsQuery } from "../redux/api";

const BankScreen = () => {
  const transactions = useGetTransactionsQuery();
  const student = useGetStudentQuery();

  return (
    <ScreenWrapper theme="bank">
      <Flex w="full" justifyContent="center" flexDirection="column">
        <Box>
          <ScreenLogo theme="bank" />
        </Box>
        {student.currentData && transactions.currentData ? (
          <>
            <Flex justifyContent="center">
              <Flex
                w="full"
                justifyContent="flex-end"
                alignItems="start"
                flexDirection="column"
                marginBottom="10"
              >
                <Text
                  textAlign="center"
                  fontWeight="medium"
                  fontSize={{ base: "18px", sm: "24px", md: "20px" }}
                  color="white"
                >
                  Balance
                </Text>
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={{ base: "18px", sm: "24px", md: "36px" }}
                  color="white"
                >
                  {transactions.currentData.reduce((acc, current) => {
                    return acc + current.amount;
                  }, 0)}
                </Text>
              </Flex>
            </Flex>
            <Flex justifyContent="center">
              <TransactionTable>
                {transactions.currentData.map((i, index) => {
                  return (
                    <TransactionRow key={i.id} transaction={i} index={index} />
                  );
                })}
              </TransactionTable>
            </Flex>
          </>
        ) : student.isLoading || transactions.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </ScreenWrapper>
  );
};

export default BankScreen;
