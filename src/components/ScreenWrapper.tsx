import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { themes } from "../screens/ScreenThemes";
import { Icon } from "@iconify-icon/react";
import { ReactElement } from "react";

const ScreenWrapper = ({
  children,
  theme,
}: {
  children: ReactElement;
  theme: "bank" | "mail" | "jobportal" | "explore" | "newspaper" | "profile";
}) => {
  const navigate = useNavigate();
  const pickedTheme = themes[theme];
  return (
    <Flex
      w="full"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      paddingLeft={5}
      paddingRight={5}
    >
      <Box
        w="full"
        bgGradient={pickedTheme.primaryGradient}
        h="100vh"
        position="fixed"
        zIndex="-1"
        top="0"
      ></Box>
      <Flex w="full" justifyContent="center" marginTop="50px">
        <Flex w="full" justifyContent="space-between" marginTop={5}>
          <Flex
            onClick={() => {
              navigate(-1);
            }}
            _hover={{ cursor: "pointer" }}
            alignItems="center"
          >
            <Icon
              icon={"mdi:arrow-left-bold-circle"}
              style={{ color: "white" }}
              height="40px"
            />
            <Text color="white" marginLeft="2">
              Tilbage til menu
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box w="full" h="full" maxWidth="800px">
        {children}
      </Box>
    </Flex>
  );
};

export default ScreenWrapper;
