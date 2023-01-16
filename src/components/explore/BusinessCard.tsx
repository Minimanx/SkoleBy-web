import {
  Box,
  Button,
  Card,
  Flex,
  Modal,
  ModalBody,
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
} from "@chakra-ui/react";
import { Business } from "../../types";
import { themes } from "../../screens/ScreenThemes";
import { Icon } from "@iconify-icon/react";
import LineBreakText from "../common/LineBreakText";

const BusinessCard = ({
  business,
  index,
}: {
  business: Business;
  index: number;
}) => {
  const theme = themes["explore"];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        w={{ base: "100%", sm: "48%" }}
        m="1%"
        direction="column"
        variant="elevated"
        _hover={{
          cursor: "pointer",
          transform: "scale(1.02)",
        }}
        transition="transform 30ms linear"
        onClick={() => {
          onOpen();
        }}
        backgroundColor="white"
      >
        <Stack>
          <CardBody paddingBottom="1">
            <Flex justifyContent="start">
              <Icon
                icon={business.icon}
                width="40px"
                style={{ color: theme.primaryColor }}
              />
              <Heading size="lg" marginLeft="4" color={theme.primaryColor}>
                {business.title}
              </Heading>
            </Flex>
          </CardBody>
          <CardFooter color={theme.primaryColor} fontWeight="bold">
            <Flex flexDirection="column" marginRight={{ base: "10", md: "20" }}>
              <Text fontSize="15px">Åbningstider</Text>
              <Text fontSize="17px" py="2">
                {business.opensAt} - {business.closesAt}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="15px">Sted</Text>
              <Text fontSize="17px" py="2">
                {business.location}
              </Text>
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Image
              objectFit="cover"
              maxW="100%"
              w="full"
              borderRadius="lg"
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
              marginBottom={4}
              marginTop={3}
            />
            {business.title}
          </ModalHeader>

          <ModalBody>
            <Box>
              <LineBreakText>{business.description}</LineBreakText>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={theme.primaryColor}
              color="white"
              mr={3}
              onClick={onClose}
            >
              Luk
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BusinessCard;
