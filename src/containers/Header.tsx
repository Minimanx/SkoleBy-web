import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/sessionSlice";
import { useGetUserQuery } from "../redux/api";

const Header = () => {
  const user = useGetUserQuery();
  const dispatch = useDispatch();

  return (
    <Box minHeight="100vh" w="full">
      <Flex
        position="fixed"
        height="50px"
        top="0"
        w="full"
        alignItems="center"
        bg={"white"}
        justifyContent="space-between"
        borderBottom="1px"
        borderColor="#e7e7e7"
        zIndex="2"
      >
        <Skeleton isLoaded={!user.isLoading} marginLeft="2">
          <Flex alignItems="center" p="1" minWidth="120px">
            {user.currentData && (
              <Text>
                {user.currentData.name} - {user.currentData.school}
              </Text>
            )}
          </Flex>
        </Skeleton>
        <Flex
          alignSelf="center"
          marginRight="2"
          p="1"
          borderRadius="lg"
          cursor="pointer"
          _hover={{
            bg: "#e7e7e7",
          }}
          onClick={() => dispatch(logout())}
        >
          <Icon
            icon={"ic:baseline-logout"}
            width="1.5em"
            style={{ color: "black" }}
          />
        </Flex>
      </Flex>
      <Box h="100vh" w="full">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Header;
