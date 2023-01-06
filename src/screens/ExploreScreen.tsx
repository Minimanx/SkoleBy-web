import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import BusinessCard from "../components/explore/BusinessCard";
import ScreenLogo from "../components/ScreenLogo";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetStudentQuery, useGetBussinessesQuery } from "../redux/api";

const ExploreScreen = () => {
  const businesses = useGetBussinessesQuery();
  const student = useGetStudentQuery();

  return (
    <ScreenWrapper theme="explore">
      <Flex w="full" justifyContent="center" flexDirection="column">
        <Box>
          <ScreenLogo theme="explore" />
        </Box>
        {student.currentData && businesses.currentData ? (
          <>
            <Flex w="full" justifyContent="start" flexWrap="wrap">
              {businesses.currentData.map((i, index) => {
                return <BusinessCard key={i.id} business={i} index={index} />;
              })}
            </Flex>
          </>
        ) : student.isLoading || businesses.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </ScreenWrapper>
  );
};

export default ExploreScreen;
