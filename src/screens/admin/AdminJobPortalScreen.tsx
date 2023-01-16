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
import { useEffect, useState } from "react";
import AdminScreenWrapper from "../../components/AdminScreenWrapper";
import BusinessRow from "../../components/jobportal/BusinessRow";
import BusinessTable from "../../components/jobportal/BusinessTable";
import {
  useGetBusinessesQuery,
  useGetUserQuery,
  usePostJobListingMutation,
} from "../../redux/api";
import { Business } from "../../types";
import { themes } from "../ScreenThemes";

const AdminJobPortalScreen = () => {
  const user = useGetUserQuery();
  const businesses = useGetBusinessesQuery();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const theme = themes["jobportal"];
  const [trigger, result] = usePostJobListingMutation();

  const [selectedBusiness, setSelectedBusiness] = useState<Business>();
  const [filter, setFilter] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    if (!businesses.currentData) return;

    setFilteredBusinesses(
      businesses.currentData.filter((business) =>
        business.title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [businesses.currentData, filter]);

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
                Opret jobopslag
              </Text>
              <Text
                fontWeight="medium"
                fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                color="white"
                alignSelf="flex-start"
              >
                Vælg virksomhed
              </Text>
              <Input
                placeholder="Søg..."
                size="lg"
                _placeholder={{ color: "dark-grey" }}
                onChange={(event) => setFilter(() => event.target.value)}
                bg="white"
                borderColor={theme.primaryHoverColor}
                marginBottom="5"
              />
              <Box w="full">
                <BusinessTable>
                  {filteredBusinesses.map((item, index) => {
                    return (
                      <BusinessRow
                        key={item.id}
                        business={item}
                        index={index}
                        selectedBusiness={selectedBusiness}
                        setSelectedBusiness={setSelectedBusiness}
                      />
                    );
                  })}
                </BusinessTable>
              </Box>
              <Text
                fontWeight="medium"
                fontSize={{ base: "18px", sm: "20px", md: "24px" }}
                color="white"
                alignSelf="flex-start"
                marginTop="5"
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
                Beskrivelse
              </Text>
              <Textarea
                placeholder="Beskrivelse..."
                size="lg"
                _placeholder={{ color: "dark-grey" }}
                value={body}
                onChange={(event) => setBody(() => event.target.value)}
                bg="white"
                borderColor={theme.primaryHoverColor}
                marginBottom="5"
              />
              {selectedBusiness && (
                <Flex w="full" justifyContent="end">
                  <Button
                    size="lg"
                    marginLeft="2"
                    borderColor={theme.primaryHoverColor}
                    bg={
                      !title || !body || !selectedBusiness
                        ? "#e15656"
                        : "#57b357"
                    }
                    disabled={!title || !body || !selectedBusiness}
                    onClick={() => {
                      const descriptionWithBreaks = body.replace(
                        /\r\n|\r|\n/g,
                        ".lb."
                      );
                      trigger({
                        title: title,
                        body: descriptionWithBreaks,
                        businessId: selectedBusiness.id,
                      })
                        .unwrap()
                        .then(() => {
                          setTitle(() => "");
                          setBody(() => "");
                          setSelectedBusiness(() => undefined);
                          setFilter(() => "");
                          toast({
                            title: "Jobopslag oprettet",
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
              )}
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

export default AdminJobPortalScreen;
