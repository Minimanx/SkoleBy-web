import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import AdminScreenWrapper from "../../components/AdminScreenWrapper";
import { useGetUserQuery, usePostNewsPostMutation } from "../../redux/api";
import { themes } from "../ScreenThemes";

const AdminNewspaperScreen = () => {
  const user = useGetUserQuery();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const theme = themes["newspaper"];
  const [trigger, result] = usePostNewsPostMutation();

  return (
    <AdminScreenWrapper>
      <Flex w="full" justifyContent="center" flexDirection="column">
        {user.currentData ? (
          <>
            <Flex
              w="full"
              justifyContent="flex-end"
              alignItems="center"
              flexDirection="column"
            >
              <Text
                textAlign="center"
                fontWeight="medium"
                fontSize={{ base: "24px", md: "30px" }}
                color="white"
                marginBottom="10"
              >
                Opret nyhedsopslag
              </Text>
              <Text
                fontWeight="medium"
                fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                color="white"
                alignSelf="flex-start"
              >
                Titel
              </Text>
              <Input
                placeholder="Titel..."
                size="lg"
                _placeholder={{ color: "dark-grey" }}
                value={title}
                onChange={(event) => setTitle(() => event.target.value)}
                bg="white"
                borderColor={theme.primaryHoverColor}
                marginBottom="5"
              />
              <Text
                fontWeight="medium"
                fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                color="white"
                alignSelf="flex-start"
              >
                Brødtekst
              </Text>
              <Textarea
                placeholder="Brødtekst..."
                size="lg"
                _placeholder={{ color: "dark-grey" }}
                value={body}
                onChange={(event) => setBody(() => event.target.value)}
                bg="white"
                borderColor={theme.primaryHoverColor}
                marginBottom="5"
              />
              <Flex w="full" justifyContent="end">
                <Button
                  size="lg"
                  marginLeft="2"
                  borderColor={theme.primaryHoverColor}
                  bg={!title || !body ? "#e15656" : "#57b357"}
                  disabled={!title || !body}
                  onClick={() => {
                    const descriptionWithBreaks = body.replace(
                      /\r\n|\r|\n/g,
                      ".lb."
                    );
                    trigger({
                      title: title,
                      body: descriptionWithBreaks,
                    })
                      .unwrap()
                      .then(() => {
                        setTitle(() => "");
                        setBody(() => "");
                        toast({
                          title: "Virksomhed oprettet",
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                          position: "top",
                        });
                      });
                  }}
                >
                  Opret
                </Button>
              </Flex>
            </Flex>
          </>
        ) : user.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </AdminScreenWrapper>
  );
};

export default AdminNewspaperScreen;
