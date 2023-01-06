import { Container, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { themes } from "../screens/ScreenThemes";
import { Icon } from "@iconify-icon/react";

const DashboardButton = ({
  theme,
}: {
  theme: "bank" | "mail" | "jobportal" | "explore" | "newspaper" | "profile";
}) => {
  const navigate = useNavigate();
  const pickedTheme = themes[theme];

  return (
    <Container
      alignSelf="center"
      justifyContent="center"
      width={{ base: "45%", sm: "30%" }}
      rounded="8px"
      bg="white"
      paddingTop="5"
      paddingBottom="5"
      paddingLeft="0"
      paddingRight="0"
      margin="2"
      minWidth="140px"
      shadow="lg"
      _hover={{
        cursor: "pointer",
        transform: "scale(1.02)",
      }}
      transition="transform 30ms linear"
      onClick={() => {
        navigate(theme);
      }}
      bgGradient={pickedTheme.primaryGradient}
    >
      <Flex
        w="full"
        h="full"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Text
          textAlign="center"
          fontWeight="bold"
          fontSize={{ base: "20px", md: "32px" }}
          color="white"
        >
          {pickedTheme.title}
        </Text>
        <Container p="0" w={{ base: "5em", md: "10em" }}>
          <Icon
            icon={pickedTheme.icon}
            width="100%"
            style={{ color: "white" }}
          />
        </Container>
      </Flex>
    </Container>
  );
};

export default DashboardButton;
