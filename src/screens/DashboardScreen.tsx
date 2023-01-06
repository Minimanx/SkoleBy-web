import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import DashboardButton from "../components/DashboardButton";
import { useGetStudentQuery } from "../redux/api";

const DashboardScreen = () => {
  const student = useGetStudentQuery();

  return (
    <>
      {student.currentData ? (
        <Flex
          w="full"
          justifyContent="space-evenly"
          alignItems="center"
          flexDirection="column"
          paddingTop="50px"
        >
          <Box
            w="full"
            bgGradient="linear(to-tr, #eef1f9, #f7f7f7)"
            h="100vh"
            position="fixed"
            zIndex="-1"
            top="0"
          ></Box>
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize={{ base: "32px", md: "46px" }}
            color="Black"
            marginTop="10"
            marginBottom="10"
          >
            {student.currentData.funSchoolName}
          </Text>
          <Flex
            wrap="wrap"
            h="80%"
            alignContent="start"
            justifyContent="center"
          >
            <DashboardButton theme="bank" />
            <DashboardButton theme="mail" />
            <DashboardButton theme="jobportal" />
            <DashboardButton theme="explore" />
            <DashboardButton theme="newspaper" />
            <DashboardButton theme="profile" />
          </Flex>
        </Flex>
      ) : student.isLoading ? (
        <Center marginTop="40">
          <Spinner color="black" size="xl" />
        </Center>
      ) : null}
    </>
  );
};

export default DashboardScreen;
