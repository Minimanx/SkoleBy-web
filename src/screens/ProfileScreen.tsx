import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import ProfileCard from "../components/profile/ProfileCard";
import ScreenLogo from "../components/ScreenLogo";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetStudentQuery } from "../redux/api";

const ProfileScreen = () => {
  const student = useGetStudentQuery();

  return (
    <ScreenWrapper theme="profile">
      <Flex w="full" justifyContent="center" flexDirection="column">
        <Box>
          <ScreenLogo theme="profile" />
        </Box>
        {student.currentData ? (
          <>
            <Flex w="full" alignContent="start" flexWrap="wrap">
              <ProfileCard
                title={"Navn"}
                description={student.currentData.name}
              />
              <ProfileCard
                title={"Klasse"}
                description={student.currentData.class}
              />
              <ProfileCard
                title={"Skole"}
                description={student.currentData.school}
              />
              <ProfileCard
                title={"Job"}
                description={student.currentData.jobTitle ?? "Ikke ansat"}
              />
            </Flex>
          </>
        ) : student.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
