import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import ProfileCard from "../components/profile/ProfileCard";
import ScreenLogo from "../components/ScreenLogo";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetUserQuery } from "../redux/api";

const ProfileScreen = () => {
  const user = useGetUserQuery();

  return (
    <ScreenWrapper theme="profile">
      <Flex w="full" justifyContent="center" flexDirection="column">
        <Box>
          <ScreenLogo theme="profile" />
        </Box>
        {user.currentData ? (
          <>
            <Flex w="full" alignContent="start" flexWrap="wrap">
              <ProfileCard title={"Navn"} description={user.currentData.name} />
              <ProfileCard
                title={"Klasse"}
                description={user.currentData.class}
              />
              <ProfileCard
                title={"Skole"}
                description={user.currentData.school}
              />
              <ProfileCard
                title={"Job"}
                description={user.currentData.jobTitle ?? "Ikke ansat"}
              />
            </Flex>
          </>
        ) : user.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
