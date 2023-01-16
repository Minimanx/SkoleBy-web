import {
  Textarea,
  Center,
  Flex,
  Input,
  Spinner,
  Text,
  IconButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import AdminScreenWrapper from "../../components/AdminScreenWrapper";
import { useGetUserQuery, usePostBusinessMutation } from "../../redux/api";
import { themes } from "../ScreenThemes";

const AdminBusinessesScreen = () => {
  const user = useGetUserQuery();
  const theme = themes["explore"];
  const toast = useToast();
  const [trigger, result] = usePostBusinessMutation();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [openFrom, setOpenFrom] = useState("");
  const [openTo, setOpenTo] = useState("");

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
                Opret virksomhed
              </Text>
              <Text
                fontWeight="medium"
                fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                color="white"
                alignSelf="flex-start"
              >
                Navn
              </Text>
              <Input
                placeholder="Navn..."
                size="lg"
                _placeholder={{ color: "dark-grey" }}
                value={name}
                onChange={(event) => setName(() => event.target.value)}
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
                Placering
              </Text>
              <Input
                placeholder="Placering..."
                size="lg"
                _placeholder={{ color: "dark-grey" }}
                value={location}
                onChange={(event) => setLocation(() => event.target.value)}
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
                Beskrivelse
              </Text>
              <Textarea
                placeholder="Beskrivelse..."
                size="lg"
                _placeholder={{ color: "dark-grey" }}
                value={description}
                onChange={(event) => setDescription(() => event.target.value)}
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
                Vælg ikon
              </Text>
              <Flex w="full" flexWrap="wrap">
                <IconButton
                  bgColor={
                    icon === "ic:round-restaurant" ? "#6c066c" : "#932793"
                  }
                  border={icon === "ic:round-restaurant" ? "2px" : "0px"}
                  borderColor={
                    icon === "ic:round-restaurant" ? "white" : "none"
                  }
                  aria-label="Call Segun"
                  size="lg"
                  marginRight="2"
                  marginBottom="2"
                  _hover={{ backgroundColor: "#722372" }}
                  onClick={() => {
                    setIcon(() => "ic:round-restaurant");
                  }}
                  icon={
                    <Icon
                      width="1.5em"
                      icon={"ic:round-restaurant"}
                      style={{ color: "white" }}
                    />
                  }
                />
                <IconButton
                  bgColor={icon === "mdi:tools" ? "#6c066c" : "#932793"}
                  border={icon === "mdi:tools" ? "2px" : "0px"}
                  borderColor={icon === "mdi:tools" ? "white" : "none"}
                  aria-label="Call Segun"
                  size="lg"
                  marginRight="2"
                  _hover={{ backgroundColor: "#722372" }}
                  onClick={() => {
                    setIcon(() => "mdi:tools");
                  }}
                  icon={
                    <Icon
                      width="1.5em"
                      icon={"mdi:tools"}
                      style={{ color: "white" }}
                    />
                  }
                />
                <IconButton
                  bgColor={
                    icon === "ic:outline-theater-comedy" ? "#6c066c" : "#932793"
                  }
                  border={icon === "ic:outline-theater-comedy" ? "2px" : "0px"}
                  borderColor={
                    icon === "ic:outline-theater-comedy" ? "white" : "none"
                  }
                  aria-label="Call Segun"
                  size="lg"
                  marginRight="2"
                  _hover={{ backgroundColor: "#722372" }}
                  onClick={() => {
                    setIcon(() => "ic:outline-theater-comedy");
                  }}
                  icon={
                    <Icon
                      width="1.5em"
                      icon={"ic:outline-theater-comedy"}
                      style={{ color: "white" }}
                    />
                  }
                />
                <IconButton
                  bgColor={
                    icon === "ic:outline-recycling" ? "#6c066c" : "#932793"
                  }
                  border={icon === "ic:outline-recycling" ? "2px" : "0px"}
                  borderColor={
                    icon === "ic:outline-recycling" ? "white" : "none"
                  }
                  aria-label="Call Segun"
                  size="lg"
                  marginRight="2"
                  _hover={{ backgroundColor: "#722372" }}
                  onClick={() => {
                    setIcon(() => "ic:outline-recycling");
                  }}
                  icon={
                    <Icon
                      width="1.5em"
                      icon={"ic:outline-recycling"}
                      style={{ color: "white" }}
                    />
                  }
                />
              </Flex>
              <Text
                fontWeight="medium"
                fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                color="white"
                alignSelf="flex-start"
                marginTop="5"
              >
                Åbningstid
              </Text>
              <Flex w="full">
                <Text
                  fontWeight="medium"
                  fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                  color="white"
                  alignSelf="center"
                  marginRight="2"
                >
                  Fra:
                </Text>
                <Input
                  size="lg"
                  _placeholder={{ color: "dark-grey" }}
                  value={openFrom}
                  onChange={(event) => setOpenFrom(() => event.target.value)}
                  bg="white"
                  borderColor={theme.primaryHoverColor}
                  marginBottom="5"
                  type="time"
                  maxW={"125px"}
                />
                <Text
                  fontWeight="medium"
                  fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                  color="white"
                  alignSelf="center"
                  marginRight="2"
                  marginLeft="4"
                >
                  Til:
                </Text>
                <Input
                  size="lg"
                  _placeholder={{ color: "dark-grey" }}
                  value={openTo}
                  onChange={(event) => setOpenTo(() => event.target.value)}
                  bg="white"
                  borderColor={theme.primaryHoverColor}
                  marginBottom="5"
                  type="time"
                  maxW={"125px"}
                />
              </Flex>
              <Flex w="full" justifyContent="end">
                <Button
                  size="lg"
                  marginLeft="2"
                  borderColor={theme.primaryHoverColor}
                  bg={
                    !name ||
                    !location ||
                    !description ||
                    !icon ||
                    !openFrom ||
                    !openTo
                      ? "#e15656"
                      : "#57b357"
                  }
                  disabled={
                    !name ||
                    !location ||
                    !description ||
                    !icon ||
                    !openFrom ||
                    !openTo
                  }
                  onClick={() => {
                    const descriptionWithBreaks = description.replace(
                      /\r\n|\r|\n/g,
                      ".lb."
                    );
                    trigger({
                      title: name,
                      description: descriptionWithBreaks,
                      opensAt: openFrom,
                      closesAt: openTo,
                      icon: icon,
                      location: location,
                    })
                      .unwrap()
                      .then(() => {
                        setName(() => "");
                        setDescription(() => "");
                        setOpenFrom(() => "");
                        setOpenTo(() => "");
                        setIcon(() => "");
                        setLocation(() => "");
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

export default AdminBusinessesScreen;
