import { Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

const TransactionTable = ({ children }: { children: ReactElement[] }) => {
  return (
    <Flex
      w="full"
      maxWidth="800px"
      justifyContent="center"
      flexDirection="column"
      color="white"
    >
      <Flex w="full" justifyContent="space-between" fontSize="18px" p="3">
        <Flex w="70%" justifyContent="flex-start">
          <Box w="20%" marginRight={5}>
            Dato
          </Box>
          <Box>Navn</Box>
        </Flex>
        <Box>Beløb</Box>
      </Flex>
      {children}
    </Flex>
  );
};

export default TransactionTable;
