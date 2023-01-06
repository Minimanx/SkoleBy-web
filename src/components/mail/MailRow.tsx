import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { Mail } from "../../types";
import moment from "moment";
import { themes } from "../../screens/ScreenThemes";
import LineBreakText from "../common/LineBreakText";

const MailRow = ({ mail, index }: { mail: Mail; index: number }) => {
  const theme = themes["mail"];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        w="full"
        justifyContent="space-between"
        fontSize={{ base: "18px", md: "24px" }}
        p="3"
        backgroundColor={index % 2 === 0 ? "#861B1B" : "#8f2b2b"}
        alignItems="center"
        _hover={{
          cursor: "pointer",
          transform: "scale(1.02)",
        }}
        transition="transform 30ms linear"
        onClick={() => {
          onOpen();
        }}
        marginBottom="2"
        borderRadius="10px"
      >
        <Flex w="70%" justifyContent="flex-start" alignItems="center">
          <Flex
            w="20%"
            marginRight={5}
            fontSize={{ base: "14px", sm: "16px", md: "18px" }}
            flexDirection="column"
          >
            <Text>{moment(mail.date).format("DD MMM").toString()}</Text>
            <Text>{moment(mail.date).format("YYYY").toString()}</Text>
          </Flex>
          <Box>{mail.title}</Box>
        </Flex>
        <Box>{mail.from}</Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{mail.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              borderBottom="1px"
              marginBottom={5}
              justifyContent="space-between"
            >
              <Text>Fra: {mail.from}</Text>
              <Text>
                Modtaget:{" "}
                {moment(mail.date).format("DD.MM.YYYY - hh:mm").toString()}
              </Text>
            </Flex>
            <Box>
              <LineBreakText>{mail.body}</LineBreakText>
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

export default MailRow;
