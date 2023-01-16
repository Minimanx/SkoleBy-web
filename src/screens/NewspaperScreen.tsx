import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import NewsPostCard from "../components/newspaper/NewsPostCard";
import ScreenLogo from "../components/ScreenLogo";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetNewsPostsQuery, useGetUserQuery } from "../redux/api";

const NewspaperScreen = () => {
  const newsPosts = useGetNewsPostsQuery();
  const user = useGetUserQuery();

  return (
    <ScreenWrapper theme="newspaper">
      <Flex w="full" justifyContent="center" flexDirection="column">
        <Box>
          <ScreenLogo theme="newspaper" />
        </Box>
        {user.currentData && newsPosts.currentData ? (
          <>
            <Flex w="full" justifyContent="start" flexWrap="wrap">
              {newsPosts.currentData.map((i, index) => {
                return <NewsPostCard newsPost={i} index={index} />;
              })}
            </Flex>
          </>
        ) : user.isLoading || newsPosts.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </ScreenWrapper>
  );
};

export default NewspaperScreen;
