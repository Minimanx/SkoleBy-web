import { Box, Flex, Text } from "@chakra-ui/react";
import { Transaction } from "../../types";
import moment from "moment";

const TransactionRow = ({
  transaction,
  index,
}: {
  transaction: Transaction;
  index: number;
}) => {
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      fontSize={{ base: "18px", md: "24px" }}
      p="3"
      backgroundColor={index % 2 === 0 ? "#1f3ebf" : "#2943AE"}
      alignItems="center"
      borderRadius="10px"
      marginBottom="2"
    >
      <Flex w="70%" justifyContent="flex-start" alignItems="center">
        <Flex
          w="20%"
          marginRight={5}
          fontSize={{ base: "14px", sm: "16px", md: "18px" }}
          flexDirection="column"
        >
          <Text>{moment(transaction.date).format("DD MMM").toString()}</Text>
          <Text>{moment(transaction.date).format("YYYY").toString()}</Text>
        </Flex>
        <Box>{transaction.title}</Box>
      </Flex>
      <Box color={transaction.amount >= 0 ? "#57b357" : "#e15656"}>
        {transaction.amount}
      </Box>
    </Flex>
  );
};

export default TransactionRow;
