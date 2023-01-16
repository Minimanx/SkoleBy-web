import { Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

const StudentsTable = ({ children }: { children: ReactElement[] }) => {
  return (
    <Flex
      w="full"
      h="300px"
      maxWidth="800px"
      flexDirection="column"
      color="white"
      bg="#3c55bf"
      borderRadius="10px"
      overflowY="auto"
    >
      {children}
    </Flex>
  );
};

export default StudentsTable;
