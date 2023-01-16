import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import JobListingCard from "../components/jobportal/JobListingCard";
import ScreenLogo from "../components/ScreenLogo";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetJobListingsQuery, useGetUserQuery } from "../redux/api";

const JobPortalScreen = () => {
  const jobListings = useGetJobListingsQuery();
  const user = useGetUserQuery();

  return (
    <ScreenWrapper theme="jobportal">
      <Flex w="full" justifyContent="center" flexDirection="column">
        <Box>
          <ScreenLogo theme="jobportal" />
        </Box>
        {user.currentData && jobListings.currentData ? (
          <>
            <Flex w="full" justifyContent="start" flexWrap="wrap">
              {jobListings.currentData.map((i, index) => {
                return (
                  <JobListingCard key={i.id} jobListing={i} index={index} />
                );
              })}
            </Flex>
          </>
        ) : user.isLoading || jobListings.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </ScreenWrapper>
  );
};

export default JobPortalScreen;
