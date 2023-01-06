import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import MailRow from "../components/mail/MailRow";
import MailTable from "../components/mail/MailTable";
import ScreenLogo from "../components/ScreenLogo";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetMailsQuery } from "../redux/api";

const MailScreen = () => {
  const mails = useGetMailsQuery();

  return (
    <ScreenWrapper theme="mail">
      <Flex w="full" justifyContent="center" flexDirection="column">
        <Box>
          <ScreenLogo theme="mail" />
        </Box>
        {mails.currentData ? (
          <>
            <Flex justifyContent="center">
              <MailTable>
                {mails.currentData.map((i, index) => {
                  return <MailRow key={i.id} mail={i} index={index} />;
                })}
              </MailTable>
            </Flex>
          </>
        ) : mails.isLoading ? (
          <Center>
            <Spinner color="white" size="xl" />
          </Center>
        ) : null}
      </Flex>
    </ScreenWrapper>
  );
};

export default MailScreen;
