import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import BusinessCard from "../components/explore/BusinessCard";
import ScreenLogo from "../components/ScreenLogo";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetUserQuery, useGetBusinessesQuery } from "../redux/api";

const ExploreScreen = () => {
  const businesses = useGetBusinessesQuery();
  const user = useGetUserQuery();

  return (
    <ScreenWrapper theme="explore">
      <Flex w="full" justifyContent="center" flexDirection="column">
        <Box>
          <ScreenLogo theme="explore" />
        </Box>
        {user.currentData && businesses.currentData ? (
          <>
            <Flex w="full" justifyContent="start" flexWrap="wrap">
              {businesses.currentData.map((i, index) => {
                return <BusinessCard key={i.id} business={i} index={index} />;
              })}
            </Flex>
          </>
        ) : user.isLoading || businesses.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </ScreenWrapper>
  );
};

export default ExploreScreen;
