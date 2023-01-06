import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { ReactElement } from "react";
import { themes } from "../../screens/ScreenThemes";

const MailTable = ({ children }: { children: ReactElement[] }) => {
  const theme = themes["mail"];
  return (
    <Flex
      w="full"
      maxWidth="800px"
      justifyContent="center"
      flexDirection="column"
      color="white"
    >
      <Flex
        w="full"
        justifyContent="space-between"
        fontSize={{ base: "18px", md: "24px" }}
        p="3"
      >
        <Flex w="70%" justifyContent="flex-start">
          <Box w="20%" marginRight={5}>
            Dato
          </Box>
          <Box>Emne</Box>
        </Flex>
        <Box>Fra</Box>
      </Flex>
      {children}
    </Flex>
  );
};

export default MailTable;
