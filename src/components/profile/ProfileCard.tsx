import { Box, Container, Flex, Text } from "@chakra-ui/react";

const ProfileCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      color="white"
      flexDirection="column"
      marginBottom="8"
    >
      <Text>{title}</Text>
      <Text fontSize="32px" fontWeight="bold">
        {description}
      </Text>
    </Flex>
  );
};

export default ProfileCard;
