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
  CardHeader,
} from "@chakra-ui/react";
import { Business, JobListing, NewsPost } from "../../types";
import moment from "moment";
import { themes } from "../../screens/ScreenThemes";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import { usePostJobApplicationMutation } from "../../redux/api";
import LineBreakText from "../common/LineBreakText";

const NewsPostCard = ({
  newsPost,
  index,
}: {
  newsPost: NewsPost;
  index: number;
}) => {
  const theme = themes["newspaper"];

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
          <CardHeader>
            <Heading size="lg">{newsPost.title}</Heading>
          </CardHeader>
          <CardBody>
            <Box>
              <LineBreakText>{newsPost.body}</LineBreakText>
            </Box>
          </CardBody>
          <CardFooter fontWeight="bold">
            <Flex justifyContent="flex-end" w="full">
              <Text fontSize="14px">
                {moment(newsPost.date)
                  .format("hh:mm - DDD MMM YYYY")
                  .toString()}
              </Text>
            </Flex>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default NewsPostCard;
