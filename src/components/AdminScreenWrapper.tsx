import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { themes } from "../screens/ScreenThemes";
import { Icon } from "@iconify-icon/react";
import { ReactElement } from "react";

const AdminScreenWrapper = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();

  return (
    <Flex
      w="full"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      marginTop={{ sm: 20, base: 10 }}
    >
      <Box w="full" h="full" maxWidth="800px">
        {children}
      </Box>
    </Flex>
  );
};

export default AdminScreenWrapper;
