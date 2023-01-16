import { Center, Container, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setSessionLoading } from "../redux/sessionSlice";
import { RootState } from "../redux/store";

const JWTProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const session = useSelector((state: RootState) => state.session);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    const role = window.localStorage.getItem("role") as "admin" | "student";

    if (accessToken && role) {
      dispatch(
        login({
          accessToken,
          role,
        })
      );
    } else {
      dispatch(setSessionLoading({ isLoading: false }));
    }
  }, [session.isLoading]);

  if (session.isLoading) {
    return <SuspenseLoader />;
  }

  return <>{children}</>;
};

const SuspenseLoader = () => {
  return (
    <Container>
      <Flex h={"90vh"}>
        <Center w="full">
          <Spinner></Spinner>
        </Center>
      </Flex>
    </Container>
  );
};

export default JWTProvider;
