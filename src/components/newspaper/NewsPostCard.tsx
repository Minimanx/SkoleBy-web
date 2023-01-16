import {
  Box,
  Card,
  Flex,
  Text,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";
import { NewsPost } from "../../types";
import moment from "moment";
import { themes } from "../../screens/ScreenThemes";
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
                {moment(newsPost.createdAt)
                  .format("hh:mm - DD/MM YYYY")
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
