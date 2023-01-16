import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useState } from "react";
import DashboardButton from "../components/DashboardButton";
import { useGetUserQuery } from "../redux/api";
import AdminBankScreen from "./admin/AdminBankScreen";
import AdminBusinessesScreen from "./admin/AdminBusinessesScreen";
import AdminJobPortalScreen from "./admin/AdminJobPortalScreen";
import AdminNewspaperScreen from "./admin/AdminNewspaperScreen";
import { themes } from "./ScreenThemes";

const AdminDashboardScreen = () => {
  const user = useGetUserQuery();
  const [tabIndex, setTabIndex] = useState(0);
  const theme: ["bank", "jobportal", "explore", "newspaper"] = [
    "bank",
    "jobportal",
    "explore",
    "newspaper",
  ];

  return (
    <>
      {user.currentData ? (
        <Flex w="full" h="full" justifyContent="space-evenly" paddingTop="50px">
          <Box
            w="full"
            bg={themes[theme[tabIndex]].primaryColor}
            h="100vh"
            position="fixed"
            zIndex="-1"
            top="0"
          ></Box>
          <Tabs
            onChange={(index) => setTabIndex(index)}
            isFitted
            w="full"
            variant="enclosed"
          >
            <TabList bg="white">
              <Tab
                fontWeight="bold"
                _selected={{
                  color: "white",
                  bg: themes[theme[tabIndex]].primaryColor,
                }}
              >
                Bank
              </Tab>
              <Tab
                fontWeight="bold"
                _selected={{
                  color: "white",
                  bg: themes[theme[tabIndex]].primaryColor,
                }}
              >
                Job Portal
              </Tab>
              <Tab
                fontWeight="bold"
                _selected={{
                  color: "white",
                  bg: themes[theme[tabIndex]].primaryColor,
                }}
              >
                Virksomhed
              </Tab>
              <Tab
                fontWeight="bold"
                _selected={{
                  color: "white",
                  bg: themes[theme[tabIndex]].primaryColor,
                }}
              >
                Avis
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AdminBankScreen />
              </TabPanel>
              <TabPanel>
                <AdminJobPortalScreen />
              </TabPanel>
              <TabPanel>
                <AdminBusinessesScreen />
              </TabPanel>
              <TabPanel>
                <AdminNewspaperScreen />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      ) : user.isLoading ? (
        <Center marginTop="40">
          <Spinner color="black" size="xl" />
        </Center>
      ) : null}
    </>
  );
};

export default AdminDashboardScreen;
