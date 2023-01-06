import { Flex, Text } from "@chakra-ui/react";
import { themes } from "../screens/ScreenThemes";
import { Icon } from "@iconify-icon/react";

const ScreenLogo = ({
  theme,
}: {
  theme: "bank" | "mail" | "jobportal" | "explore" | "newspaper" | "profile";
}) => {
  const pickedTheme = themes[theme];

  return (
    <Flex justifyContent="start" marginBottom="10" height="40px" marginTop="20">
      <Icon
        icon={pickedTheme.icon}
        height="40px"
        style={{ color: "white", textAlign: "center" }}
      />
      <Text
        alignSelf="end"
        color="white"
        fontWeight="bold"
        fontSize="26px"
        marginLeft={3}
      >
        {pickedTheme.titleText}
      </Text>
    </Flex>
  );
};

export default ScreenLogo;
