import {
  Box,
  Button,
  Card,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Image,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Textarea,
} from "@chakra-ui/react";
import { Business, JobListing } from "../../types";
import moment from "moment";
import { themes } from "../../screens/ScreenThemes";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import { usePostJobApplicationMutation } from "../../redux/api";

const JobListingCard = ({
  jobListing,
  index,
}: {
  jobListing: JobListing;
  index: number;
}) => {
  const theme = themes["jobportal"];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [value, setValue] = useState("");
  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    // const inputWithBreak = inputValue.replace(/\r\n|\r|\n/g, ".lb.");
    setValue(inputValue);
  };

  const [trigger, result] = usePostJobApplicationMutation();

  return (
    <>
      <Card
        w="100%"
        direction="column"
        variant="elevated"
        color="white"
        backgroundColor={theme.primaryColor}
      >
        <Stack>
          <CardBody paddingBottom="1">
            <Flex justifyContent="space-between">
              <Flex>
                <Icon icon={jobListing.business.icon} width="40px" />
                <Heading size="lg" marginLeft="4">
                  {jobListing.title}
                </Heading>
              </Flex>
              <Button
                onClick={() => {
                  onOpen();
                }}
                size="lg"
                backgroundColor="white"
                color={theme.primaryColor}
                paddingX={{ base: "25", md: "55" }}
              >
                Ansøg
              </Button>
            </Flex>
          </CardBody>
          <CardFooter fontWeight="bold">
            <Flex flexDirection="column" marginRight={{ base: "10", md: "20" }}>
              <Text fontSize="14px" fontWeight="normal">
                Virksomhed
              </Text>
              <Text fontSize="17px" py="2">
                {jobListing.business.title}
              </Text>
            </Flex>
            <Flex flexDirection="column" marginRight={{ base: "10", md: "20" }}>
              <Text fontSize="14px" fontWeight="normal">
                Åbningstider
              </Text>
              <Text fontSize="17px" py="2">
                {jobListing.business.opensAt} - {jobListing.business.closesAt}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="14px" fontWeight="normal">
                Sted
              </Text>
              <Text fontSize="17px" py="2">
                {jobListing.business.location}
              </Text>
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ansøg job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex paddingTop={3} paddingBottom={10}>
              <Flex
                flexDirection="column"
                marginRight={{ base: "10", md: "20" }}
              >
                <Text fontSize="14px">Virksomhed</Text>
                <Text fontSize="17px" py="1" fontWeight="bold">
                  {jobListing.business.title}
                </Text>
              </Flex>
              <Flex flexDirection="column">
                <Text fontSize="14px">Sted</Text>
                <Text fontSize="17px" py="1" fontWeight="bold">
                  {jobListing.business.location}
                </Text>
              </Flex>
            </Flex>
            <Textarea
              value={value}
              onChange={handleInputChange}
              placeholder="Skriv hvorfor du gerne vil arbejde her"
              size="sm"
              border="none"
              backgroundColor="gray.200"
              borderRadius="8px"
              resize="none"
              height="250px"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              backgroundColor={theme.primaryColor}
              color="white"
              onClick={() => {
                trigger({
                  body: value,
                  jobListingId: jobListing.id,
                });
              }}
              width="full"
            >
              Send ansøgning
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JobListingCard;
